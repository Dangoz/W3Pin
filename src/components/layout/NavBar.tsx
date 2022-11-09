import React from 'react'
import Image from 'next/image'
import blurURL from '@/common/blur'
import Connection from './Connection'
import SearchTrigger from './SearchTrigger'

const NavBar: React.FC = () => {
  return (
    <>
      <div className="w-screen h-16 p-4 flex justify-between items-center sticky top-0">
        {/* logo */}
        <div className="pt-6">
          <Image
            width={60}
            height={60}
            src="/logo-transparent.png"
            alt="logo"
            placeholder="blur"
            blurDataURL={blurURL}
          />
        </div>

        {/* nav options */}
        <div className="flex gap-2">
          <SearchTrigger />
          <Connection />
        </div>
      </div>
    </>
  )
}

export default NavBar
