import React, { useState } from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import { Pencil2Icon, DownloadIcon, RocketIcon } from '@radix-ui/react-icons'
import Button from '../ui/Button'
import * as htmlToImage from 'html-to-image'
import { handleSuccess, handleError, handleInfo } from '@/common/notification'
import useUser from '@/hooks/useUser'
import useCard from '@/hooks/useCard'

interface OptionBarProps {
  toggleEditMode: () => void
  pinRef: React.RefObject<HTMLDivElement>
}

const OptionBar: React.FC<OptionBarProps> = ({ toggleEditMode, pinRef }) => {
  const { userStore } = useUser()
  const { cardStore } = useCard()
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

  return (
    <>
      <Toolbar.Root className="w-fit h-14 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex py-2 px-2 justify-evenly border-bgGrey">
        <Toolbar.Button asChild>
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

        <Toolbar.Button asChild onClick={toggleEditMode}>
          <Button className="mr-2 w-32 bg-gradient-to-l from-gradientOne to-gradientThree hover:from-gradientOne/80 hover:to-gradientThree/80">
            <Pencil2Icon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Toolbar.Button>

        <Toolbar.Button asChild>
          <Button className="w-32" variant="secondary">
            <DownloadIcon className="w-4 h-4 mr-1" />
            Download
          </Button>
        </Toolbar.Button>
      </Toolbar.Root>
    </>
  )
}

export default OptionBar
