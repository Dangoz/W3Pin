import React, { useState } from 'react'
import * as htmlToImage from 'html-to-image'
import { handleSuccess, handleError, handleInfo } from '@/common/notification'
import OptionBar from './OptionBar'
import EditBar from './EditBar'

interface OptionBarWrapperProps {
  editMode: boolean
  toggleEditMode: () => void
  pinRef: React.RefObject<HTMLDivElement>
}

const OptionBarWrapper: React.FC<OptionBarWrapperProps> = ({ editMode, toggleEditMode, pinRef }) => {
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

  return <>{!editMode ? <OptionBar /> : <EditBar />}</>
}

export default OptionBarWrapper
