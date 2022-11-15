import React, { useState } from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import { Pencil2Icon, DownloadIcon, RocketIcon } from '@radix-ui/react-icons'
import Button from '../ui/Button'
import * as htmlToImage from 'html-to-image'
import { handleSuccess, handleError, handleInfo } from '@/common/notification'
import useUser from '@/hooks/useUser'
import useCard from '@/hooks/useCard'
import api from '@/common/api'
import { toast } from 'react-toastify'
import { convertBase64ToFile } from '@/common/utils'
import type { IPFSMetadataInput } from '@/types/nftport'
import Modal from '@/components/ui/Modal'

interface OptionBarProps {
  toggleEditMode: () => void
  pinRef: React.RefObject<HTMLDivElement>
}

const OptionBar: React.FC<OptionBarProps> = ({ toggleEditMode, pinRef }) => {
  const { userStore } = useUser()
  const { cardStore } = useCard()
  const [pinImage, setPinImage] = useState<string>('')
  const [isMintConfirmOpen, setIsMintConfirmOpen] = useState<boolean>(false)

  const generateImage = async () => {
    const node = pinRef.current
    if (node) {
      const data = await htmlToImage.toPng(node)
      return data
    }
    return ''
  }

  const handleDownloadPin = async () => {
    const pinImageFile = pinImage === '' ? await generateImage() : pinImage
    if (pinImageFile === '') {
      handleInfo('Image Gnereation Failed, Please Try Again')
      return
    }

    const link = document.createElement('a')
    link.download = 'W3Pin.png'
    link.href = pinImageFile
    link.click()
  }

  const handleMintPin = async () => {
    try {
      if (cardStore === null) {
        return
      }
      const pinImageFile = pinImage === '' ? await generateImage() : pinImage
      if (pinImageFile === '') {
        handleInfo('Image Gnereation Failed, Please Try Again')
        return
      }

      const mintProcesses = async () => {
        // upload image file of pin to ipfs
        const formData = new FormData()
        const file = convertBase64ToFile(pinImageFile, 'W3Pin.png')
        formData.append('file', file)
        console.log('formData', formData)
        console.log('file', formData.get('file'))
        const fileResponse = await api.post('/nftport/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        const ipfsUrl = fileResponse.data.ipfsUrl

        // upload metadata to ipfs
        const metadataInput: IPFSMetadataInput = {
          name: 'W3Pin',
          description: 'W3Pin',
          file_url: ipfsUrl,
          attributes: [],
        }
        const metadataReponse = await api.post('/nftport/metadata', { metadataInput })
        const metadataUrl = metadataReponse.data.metadataUrl

        // mint nft
        const mintTo = userStore.address === cardStore.address ? userStore.address : cardStore.address
        const mintResponse = await api.post('/nftport/mint', { mintTo, metadataUrl })
        const txHash = mintResponse.data.transactionHash
        console.log('txHash', txHash)
        return txHash
      }

      toast.promise(mintProcesses(), {
        pending: {
          theme: 'dark',
          render: () => 'Minting Pin...',
        },
        success: {
          progressStyle: {
            background: 'linear-gradient(to right, #3461FF, #8454EB)',
          },
          render: (data) => {
            return `Pin minted successfully, txHash: ${data.data}`
          },
        },
        error: {
          render({ data }) {
            return `${(data as Error).message}`
          },
        },
      })
    } catch (error) {
      console.error((error as Error).message)
      handleError(error)
    }
  }

  const confirmMintPin = async () => {
    setIsMintConfirmOpen(true)
  }

  return (
    <>
      <Toolbar.Root className="w-fit h-14 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex py-2 px-2 justify-evenly border-bgGrey">
        <Toolbar.Button
          asChild
          onClick={() => {
            if (userStore.address === '') {
              return handleInfo('Please connect wallet first')
            }
            confirmMintPin()
          }}
        >
          <Button className="mr-2 w-32">
            {userStore.address === cardStore?.address ? (
              <>
                <RocketIcon className="w-4 h-4 mr-2" />
                Mint
              </>
            ) : (
              <>
                <img alt="gift icon" src="/gift-icon.svg" className="w-4 h-4 mr-2" />
                Gift
              </>
            )}
          </Button>
        </Toolbar.Button>

        <Toolbar.Button
          asChild
          onClick={() => {
            if (userStore.address === '') {
              return handleInfo('Please connect wallet first')
            }
            toggleEditMode()
          }}
        >
          <Button className="mr-2 w-32 bg-gradient-to-l from-gradientOne to-gradientThree hover:from-gradientOne/80 hover:to-gradientThree/80">
            <Pencil2Icon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Toolbar.Button>

        <Toolbar.Button asChild>
          <Button className="w-32" variant="secondary" onClick={handleDownloadPin}>
            <DownloadIcon className="w-4 h-4 mr-1" />
            Download
          </Button>
        </Toolbar.Button>
      </Toolbar.Root>

      {/* confirm modal for mint pin */}
      <Modal open={isMintConfirmOpen} setOpen={setIsMintConfirmOpen} close={true}>
        <div className="w-72 h-44 bg-bgBlue/75 backdrop-blur-sm flex flex-col justify-center items-center gap-3">
          <div className="font-tomorrow text-lg">Mint Confirmation</div>
          <div className="flex gap-6">
            <Button variant="ghost" onClick={() => setIsMintConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleMintPin()
                setIsMintConfirmOpen(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default OptionBar
