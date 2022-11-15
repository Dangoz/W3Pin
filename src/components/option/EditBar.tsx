import React from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import Button from '../ui/Button'
import ToolTip from '../ui/ToolTip'

interface EditBarProps {
  toggleEditMode: () => void
}

const EditBar: React.FC<EditBarProps> = ({ toggleEditMode }) => {
  return (
    <>
      <Toolbar.Root className="w-5/6 h-11 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex justify-between items-center py-2 px-3 border-bgGrey sticky bottom-2.5">
        {/* left */}
        <div className="flex justify-center">
          <Toolbar.Button
            className="flex items-center justify-center bg-red-500 hover:bg-red-500/80 rounded-sm w-6 h-6 m-auto"
            onClick={toggleEditMode}
          >
            <Cross1Icon />
          </Toolbar.Button>
          <Toolbar.Separator className="w-0.5 bg-white/50 mx-3" />

          <ToolTip message="Description" side="top" delayDuration={750}>
            <Toolbar.Button
              className="flex items-center justify-center bg-black border-[1px] border-bgGrey rounded-md w-7 h-7 hover:bg-bgGrey"
              onClick={toggleEditMode}
            >
              <Pencil1Icon className="w-3.5 h-3.5 text-white" />
            </Toolbar.Button>
          </ToolTip>
        </div>

        {/* right */}
        <div className="flex justify-center">
          <Button className="w-16 font-tomorrow" variant="gradient" size="sm">
            Save
          </Button>
        </div>
      </Toolbar.Root>
    </>
  )
}

export default EditBar
