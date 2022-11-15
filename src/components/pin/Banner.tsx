import React from 'react'
import useCard from '@/hooks/useCard'
import Image from 'next/image'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { parseAddress } from '@/common/utils'

const Banner: React.FC = () => {
  const { cardStore } = useCard()

  return (
    <>
      {cardStore && (
        <div className="w-full h-full rounded-t-md">
          <AspectRatio.Root ratio={16 / 9} className="relative">
            <img src={cardStore.banner} alt="banner" className="rounded-t-md w-full h-full absolute" />
            <div className="absolute  w-full h-full bg-black bg-opacity-30 flex justify-between items-center px-9 pt-20 rounded-t-md">
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={'/avatar-radial.svg'}
                    alt="avatar radial"
                    className="object-cover rounded-full w-16 h-16 absolute z-0"
                  />
                  <img src={cardStore.avatar} alt="avatar" className="object-cover rounded-full w-12 h-12 z-10" />
                </div>
                <div className="text-xs">
                  {cardStore.crossbell || cardStore.ens || cardStore.lens || parseAddress(cardStore.address)}
                </div>
              </div>

              <div className="w-24 h-16 relative">
                <Image src="/wrapped.png" alt="wrapped" fill sizes="100%" />
              </div>
            </div>
          </AspectRatio.Root>
        </div>
      )}
    </>
  )
}

export default Banner
