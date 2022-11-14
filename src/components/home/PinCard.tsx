import React, { useState, useRef, useEffect } from 'react'
import useTarget from '@/hooks/useTarget'
import Image from 'next/image'
import Button from '../ui/Button'
import { parseAddress } from '@/common/utils'
import { Target } from '@/types/target'
import * as htmlToImage from 'html-to-image'
import useUser from '@/hooks/useUser'
import api, { baseUrl } from '@/common/api'
import axios from 'axios'
import { handleSuccess, handleError, handleInfo } from '@/common/notification'
import { toast } from 'react-toastify'
import nftport from '@/common/nftport'
import { convertBase64ToFile } from '@/common/utils'
import type { IPFSMetadataInput, IPFSMetadataOutput } from '@/types/nftport'

const stats = ['assets', 'poap', 'transaction', 'exchange', 'collectible', 'social', 'donation', 'governance']

const PinCard: React.FC = () => {
  const { userStore } = useUser()
  const { targetStore } = useTarget()
  const [banner, setBanner] = useState<string>('/banner.jpg')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('2022 Footprints!')
  const pinRef = useRef<HTMLDivElement>(null)
  const [pinImage, setPinImage] = useState<string>('')

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
      if (targetStore === null) {
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
        const response = await api.post('/nftport/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('response', response.data.message)

        // // upload metadata to ipfs
        // const metadataInput: IPFSMetadataInput = {
        //   name: 'W3Pin',
        //   description: 'W3Pin',
        //   file_url: ipfsUrl,
        //   attributes: [],
        // }
        // const metadataOutput: IPFSMetadataOutput = await nftport.uploadMetadata(metadataInput)

        // // mint nft
        // const mintTo = userStore.address === targetStore.address ? userStore.address : targetStore.address
        // const txHash = await nftport.mintPin(mintTo, metadataOutput.metadata_uri)
        // return txHash
      }

      toast.promise(mintProcesses(), {
        pending: {
          theme: 'dark',
          render: () => 'Minting Pin...',
        },
        success: {
          render: (data) => {
            return `Pin minted successfully, txHash: ${data.data}`
          },
        },
        error: 'Minting Pin Failed',
      })
    } catch (error) {
      console.error((error as Error).message)
      handleError(error)
    }
  }

  if (!targetStore) {
    return <></>
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col mt-16 mb-28 gap-3">
        <div
          className="w-96 min-h-[800px] bg-bgBlue/75 rounded-md pb-10 flex flex-col backdrop-blur-md my-2 shadow-lg shadow-cyan-300/25"
          ref={pinRef}
        >
          {/* banner */}
          <Image width={450} height={450} className="w-full h-fit rounded-t-md" alt="banner" src={banner} />

          {/* profile */}
          <div className="flex justify-around items-center pt-2">
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="w-11 h-11 rounded-full gradientBG flex justify-center items-center primaryShadow cursor-pointer">
                <img alt="avatar" src={targetStore.avatar} className="object-cover rounded-full w-10 h-10" />
              </div>
              <div>
                {targetStore.crossbell || targetStore.ens || targetStore.lens || parseAddress(targetStore.address)}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
              <div className=" font-bold text-md">WRAPPED</div>
              <div className=" font-mono text-4xl">2022</div>
            </div>
          </div>

          {/* stats */}
          <div className="flex justify-start items-center gap-2 mt-6 mb-3 ml-5 text-2xl">Stats</div>
          <div className="grid grid-cols-3 gap-3 px-5">
            {stats.map((stat) => (
              <div key={stat} className="">
                <div className="gap-1 py-2 px-3 flex justify-center items-center bg-secondary/20 rounded-sm">
                  <div className="text-sm">{stat}</div>
                  <div className="font-bold">{targetStore[stat as keyof Target]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* achievements */}
          <div className="flex justify-start items-center gap-2 mt-6 mb-3 ml-5 text-2xl">Achievements</div>
          <div className="grid grid-cols-3 gap-0 px-5">
            {targetStore.assets >= 50 && <Image alt="hatch-achievement" src="/hatch.svg" width={300} height={300} />}
            {targetStore.transaction >= 30 && (
              <Image alt="achiever-achievement" src="/achiever.svg" width={300} height={300} />
            )}
            {targetStore.social >= 100 && (
              <Image alt="influencer-achievement" src="/influencer.svg" width={300} height={300} />
            )}
          </div>

          {/* description */}
          <div className="flex justify-start items-center gap-2 mt-6 mb-3 ml-5 text-2xl">Description</div>
          <div className="flex justify-start items-center gap-2 px-5 break-words text-sm">{description}</div>
        </div>

        {!editMode ? (
          <div className="flex items-center w-96 primaryShadow">
            <Button
              className="w-1/3 rounded-none"
              shadow={false}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setEditMode(true)
              }}
            >
              Edit
            </Button>

            <Button className="w-1/3 rounded-none" shadow={false} variant="secondary" onClick={handleMintPin}>
              {userStore.address === targetStore.address ? 'Mint' : 'Gift'}
            </Button>

            <Button className="w-1/3 rounded-none" shadow={false} onClick={handleDownloadPin}>
              Download
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default PinCard
