import React, { useEffect } from 'react'
import useCard from '@/hooks/useCard'
import Image from 'next/image'
import PinCardWrapper from './PinCardWrapperStale'

const HomeContainer: React.FC = () => {
  const { cardStore, setCardStore } = useCard()

  // retrieve most recent card/target for current session
  useEffect(() => {
    const data = sessionStorage.getItem('card')
    if (data) {
      const cache = JSON.parse(data)
      setCardStore(cache)
    }
  }, [setCardStore])

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen">
        {!cardStore ? (
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
