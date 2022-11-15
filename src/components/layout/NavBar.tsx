import React from 'react'
import Image from 'next/image'
import blurURL from '@/common/blur'
import Connection from './Connection'
import SearchTrigger from './SearchTrigger'

const NavBar: React.FC = () => {
  return (
    <>
      <div className="w-screen h-16 z-10 p-4 flex justify-between items-center fixed top-0">
        {/* logo */}
        <div className="pt-6">
          <Image
            width={40}
            height={40}
            src="/logo-transparent.png"
            alt="logo"
            placeholder="blur"
            blurDataURL={blurURL}
            className="w-auto h-auto"
          />
        </div>

        {/* nav options */}
        <div className="flex gap-2 items-center">
          <SearchTrigger />
          <Connection />
        </div>
      </div>
    </>
  )
}

export default NavBar
