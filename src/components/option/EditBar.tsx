import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'

interface EditBarProps {}

const EditBar: React.FC<EditBarProps> = () => {
  return (
    <>
      <Toolbar.Root className="w-5/6 h-10 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex py-2 px-2 justify-evenly border-bgGrey sticky bottom-2.5">
        <Toolbar.Button>Edit</Toolbar.Button>
        <Toolbar.Separator className="" />
        <Toolbar.Button>111</Toolbar.Button>
      </Toolbar.Root>
    </>
  )
}

export default EditBar
