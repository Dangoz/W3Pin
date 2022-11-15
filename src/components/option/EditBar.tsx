import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'

interface EditBarProps {}

const EditBar: React.FC<EditBarProps> = () => {
  return (
    <>
      <Toolbar.Root className="w-80 h-10 bg-[rgba(26,26,26,.8)] fixed backdrop-blur-sm rounded-md flex">
        <Toolbar.Button>Edit</Toolbar.Button>
        <Toolbar.Separator className="" />
        <Toolbar.Button>111</Toolbar.Button>
        <Toolbar.Link />
        {/* <Toolbar.ToggleGroup> */}
        {/* <Toolbar.ToggleItem /> */}
        {/* </Toolbar.ToggleGroup> */}
      </Toolbar.Root>
    </>
  )
}

export default EditBar
