import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import { Pencil2Icon, DownloadIcon, RocketIcon } from '@radix-ui/react-icons'
import Button from '../ui/Button'

interface OptionBarProps {}

const OptionBar: React.FC<OptionBarProps> = () => {
  return (
    <>
      <Toolbar.Root className="w-fit h-14 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex py-2 px-2 justify-evenly border-bgGrey">
        <Toolbar.Button asChild>
          <Button className="mr-2 w-32">
            <RocketIcon className="w-4 h-4 mr-2" />
            Gift
          </Button>
        </Toolbar.Button>

        <Toolbar.Button asChild>
          <Button className="mr-2 w-32 bg-gradient-to-l from-gradientOne to-gradientThree hover:from-gradientOne/80 hover:to-gradientThree/80">
            <Pencil2Icon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Toolbar.Button>

        <Toolbar.Button asChild>
          <Button className="w-32" variant="secondary">
            <DownloadIcon className="w-4 h-4 mr-1" />
            Download
          </Button>
        </Toolbar.Button>
      </Toolbar.Root>
    </>
  )
}

export default OptionBar
