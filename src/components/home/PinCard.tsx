import React, { useState } from 'react'
import useTarget from '@/hooks/useTarget'
import Image from 'next/image'
import Button from '../ui/Button'
import { parseAddress } from '@/common/utils'
import { Target } from '@/types/target'

const stats = ['assets', 'poap', 'transaction', 'exchange', 'collectible', 'social', 'donation', 'governance']

const PinCard: React.FC = () => {
  const { targetStore } = useTarget()
  const [banner, setBanner] = useState<string>('/banner.jpg')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('2022 Footprints!')

  if (!targetStore) {
    return <></>
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col my-36 gap-5">
        <div className="w-96 min-h-[800px] bg-bgBlue/80 rounded-md pb-10 flex flex-col backdrop-blur-md">
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

          {/* title named stats */}
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
            {targetStore.assets >= 50 && <Image alt="hatch-achievement" src="/hatch.png" width={300} height={300} />}
            {targetStore.transaction >= 30 && (
              <Image alt="achiever-achievement" src="/achiever.png" width={300} height={300} />
            )}
            {targetStore.social >= 100 && (
              <Image alt="influencer-achievement" src="/influencer.png" width={300} height={300} />
            )}
          </div>

          {/* description */}
          <div className="flex justify-start items-center gap-2 mt-6 mb-3 ml-5 text-2xl">Description</div>
          <div className="flex justify-start items-center gap-2 px-5 break-words text-sm">{description}</div>
        </div>

        {!editMode ? (
          <div className="flex items-center w-96 primaryShadow">
            <Button
              className="w-1/3"
              shadow={false}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setEditMode(true)
              }}
            >
              Edit
            </Button>

            <Button
              className="w-1/3"
              shadow={false}
              // variant='gradient'
            >
              Mint
            </Button>

            <Button className="w-1/3" shadow={false}>
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
