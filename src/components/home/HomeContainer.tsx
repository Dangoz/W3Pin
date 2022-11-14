import React, { useEffect } from 'react'
import useTarget from '@/hooks/useTarget'
import Image from 'next/image'
import PinCardWrapper from './PinCardWrapper'

const HomeContainer: React.FC = () => {
  const { targetStore, setTargetStore } = useTarget()

  // retrieve most recent card/target for current session
  useEffect(() => {
    const data = sessionStorage.getItem('card')
    if (data) {
      const cache = JSON.parse(data)
      setTargetStore(cache)
    }
  }, [setTargetStore])

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen">
        {!targetStore ? (
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-80 h-80">
              <Image
                fill
                alt="logo"
                src="/logo-bg.png"
                priority={true}
                className="rounded-full primaryShadow"
                sizes="100%"
              />
            </div>
          </div>
        ) : (
          <PinCardWrapper />
        )}
      </div>
    </>
  )
}

export default HomeContainer
