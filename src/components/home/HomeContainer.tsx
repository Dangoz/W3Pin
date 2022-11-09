import React from 'react'
import useTarget from '@/hooks/useTarget'
import SearchTrigger from '../layout/SearchTrigger'
import Image from 'next/image'
import PinCard from './PinCard'

const HomeContainer: React.FC = () => {
  const { targetStore } = useTarget()

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        {!targetStore ? (
          <div className="flex items-center justify-center gap-2">
            <Image width={450} height={450} alt="logo" src="/logo-bg.png" className="rounded-full primaryShadow" />
          </div>
        ) : (
          <div>123</div>
        )}
      </div>
    </>
  )
}

export default HomeContainer
