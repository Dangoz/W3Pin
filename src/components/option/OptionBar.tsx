import React, { useState } from 'react'
import Button from '../ui/Button'
import * as htmlToImage from 'html-to-image'
import { handleSuccess, handleError, handleInfo } from '@/common/notification'

interface EditBarProps {
  editMode: boolean
  toggleEditMode: () => void
  pinRef: React.RefObject<HTMLDivElement>
}

const OptionBar: React.FC<EditBarProps> = ({ editMode, toggleEditMode, pinRef }) => {
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
      {!editMode ? (
        <div className="flex items-center w-96 primaryShadow">
          <Button
            className="w-1/3 rounded-none"
            shadow={false}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              toggleEditMode()
            }}
          >
            Edit
          </Button>
          {/* 
        <Button className="w-1/3 rounded-none" shadow={false} variant="secondary" onClick={handleMintPin}>
          {cardS.address === cardStore.address ? 'Mint' : 'Gift'}
        </Button> */}

          <Button className="w-1/3 rounded-none" shadow={false} onClick={handleDownloadPin}>
            Download
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default OptionBar
