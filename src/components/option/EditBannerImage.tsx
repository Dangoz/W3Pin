import React, { useState, useRef } from 'react'
import Modal from '../ui/Modal'
import useCard from '@/hooks/useCard'
import Button from '../ui/Button'
import Image from 'next/image'
import clsx from 'clsx'
import { UploadIcon } from '@radix-ui/react-icons'
import OpenAIIcon from '@/components/icon/OpenAIIcon'
import api from '@/common/api'
import { handleError } from '@/common/notification'
import Spinner from '@/components/ui/SpinnerAlt'

interface EditBannerImageProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EditBannerImage: React.FC<EditBannerImageProps> = ({ open, setOpen }) => {
  const { cardStore, setCardStore } = useCard()
  const [banner, setBanner] = useState<string>(cardStore?.banner || '/banner4.jpg')
  const [option, setOption] = useState<'upload' | 'ai'>('upload')
  const uploadRef = useRef<HTMLInputElement>(null)
  const [imagePrompt, setImagePrompt] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateImage = async () => {
    try {
      setIsGenerating(true)
      const res = await api.post('/openai/generate', {
        prompt: imagePrompt,
      })
      setBanner(res.data.image_url)
      setIsGenerating(false)
    } catch (error) {
      console.error((error as Error).message)
      handleError(error)
    }
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close>
        <div className="w-96 h-fit bg-bgBlue/75 backdrop-blur-sm p-3 gap-2 flex flex-col justify-center items-center">
          <div className="font-tomorrow font-bold text-lg">Banner</div>

          {/* image */}
          <div className="border-dashed border-2 w-[17rem] h-[11rem] flex justify-center items-center">
            <div className="relative w-64 h-40">
              <img src={banner} alt="banner" className="w-full h-full" />
            </div>
          </div>

          {/* options */}
          <div className="w-fit h-12 bg-black border-2 border-bgGrey rounded-md flex justify-evenly items-center p-2">
            <div
              className={clsx(
                'cursor-pointer px-3 py-1.5 rounded-sm flex items-center justify-center gap-2',
                option === 'upload' ? 'bg-bgGrey' : 'bg-black',
              )}
              onClick={() => setOption('upload')}
            >
              <UploadIcon className="w-5 h-5" />
              Upload
            </div>
            <div
              className={clsx(
                'cursor-pointer px-3 py-1.5 rounded-sm flex items-center justify-center gap-2',
                option === 'ai' ? 'bg-bgGrey' : 'bg-black',
              )}
              onClick={() => setOption('ai')}
            >
              <OpenAIIcon className="w-5 h-5 fill-white" />
              Dall-E
            </div>
          </div>

          {/* upload */}
          {option === 'upload' && (
            <div>
              <input
                ref={uploadRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                      if (reader.result) {
                        setBanner(reader.result.toString())
                      }
                    }
                  }
                }}
              />
              <Button onClick={() => uploadRef.current?.click()} variant="gradient">
                Choose File
              </Button>
            </div>
          )}

          {/* ai */}
          {option === 'ai' && (
            <div className="w-full">
              <textarea
                disabled={isGenerating}
                className={clsx(
                  'w-full h-24 bg-bgBlue/75 rounded-md p-2 border-bgGrey border-2',
                  isGenerating && 'cursor-wait loader',
                )}
                value={imagePrompt}
                placeholder="A digital illustration of a steampunk flying machine in the sky with cogs and mechanisms, 4k, detailed, trending in artstation, fantasy vivid colors"
                onChange={(e) => setImagePrompt(e.target.value)}
              />
              <Button variant="gradient" onClick={handleGenerateImage} isDisabled={isGenerating}>
                {isGenerating ? (
                  <div className="flex justify-center items-center">
                    <Spinner />
                    Generating...{' '}
                  </div>
                ) : (
                  'Generate Image'
                )}
              </Button>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (cardStore) {
                  setCardStore({ ...cardStore, banner })
                }
                setOpen(false)
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

export default EditBannerImage
