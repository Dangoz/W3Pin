import React, { useState } from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import { Cross1Icon, Pencil1Icon, ImageIcon, StarIcon } from '@radix-ui/react-icons'
import Button from '../ui/Button'
import ToolTip from '../ui/ToolTip'
import EditDescription from './EditDescription'
import EditBannerImage from './EditBannerImage'
import EditAchievements from './EditAchievements'
import useCard from '@/hooks/useCard'

interface EditBarProps {
  toggleEditMode: () => void
}

const EditBar: React.FC<EditBarProps> = ({ toggleEditMode }) => {
  const { cardStore, setCardStore } = useCard()
  const [isEditDescriptionOpen, setIsEditDescriptionOpen] = useState<boolean>(false)
  const [isEditBannerImageOpen, setIsEditBannerImageOpen] = useState<boolean>(false)
  const [isEditAchievementsOpen, setIsEditAchievementsOpen] = useState<boolean>(false)

  // discard all changes
  const handleExit = async () => {
    // retrieve most recent cache of current card from session storage, and apply its states to cardStore
    const data = sessionStorage.getItem('card')
    if (data) {
      const cache = JSON.parse(data)
      setCardStore(cache)
    }
    toggleEditMode()
  }

  // save all changes
  const handleSave = async () => {
    // save current changes/cardStore to session storage
    sessionStorage.setItem('card', JSON.stringify(cardStore))
    toggleEditMode()
  }

  return (
    <>
      <Toolbar.Root className="w-4/5 h-11 bg-[rgba(26,26,26,.8)] backdrop-blur-sm rounded-md flex justify-between items-center py-2 px-3 border-bgGrey sticky bottom-2.5">
        {/* left */}
        <div className="flex justify-center gap-3">
          <Toolbar.Button
            className="flex items-center justify-center bg-red-500 hover:bg-red-500/80 rounded-sm w-6 h-6 m-auto"
            onClick={handleExit}
          >
            <Cross1Icon />
          </Toolbar.Button>

          <Toolbar.Separator className="w-0.5 bg-white/50 mx-2" />

          <ToolTip message="Banner Image" side="top" delayDuration={250}>
            <Toolbar.Button
              className="flex items-center justify-center bg-black border-[1px] border-bgGrey rounded-md w-7 h-7 hover:bg-bgGrey"
              onClick={() => setIsEditBannerImageOpen(true)}
            >
              <ImageIcon className="w-3.5 h-3.5 text-white" />
            </Toolbar.Button>
          </ToolTip>

          <ToolTip message="Description" side="top" delayDuration={250}>
            <Toolbar.Button
              className="flex items-center justify-center bg-black border-[1px] border-bgGrey rounded-md w-7 h-7 hover:bg-bgGrey"
              onClick={() => setIsEditDescriptionOpen(true)}
            >
              <Pencil1Icon className="w-3.5 h-3.5 text-white" />
            </Toolbar.Button>
          </ToolTip>

          <ToolTip message="Achievements" side="top" delayDuration={250}>
            <Toolbar.Button
              className="flex items-center justify-center bg-black border-[1px] border-bgGrey rounded-md w-7 h-7 hover:bg-bgGrey"
              onClick={() => setIsEditAchievementsOpen(true)}
            >
              <StarIcon className="w-3.5 h-3.5 text-white" />
            </Toolbar.Button>
          </ToolTip>
        </div>

        {/* right */}
        <div className="flex justify-center">
          <Toolbar.Button asChild onClick={handleSave}>
            <Button className="w-16 font-tomorrow" variant="gradient" size="sm">
              Save
            </Button>
          </Toolbar.Button>
        </div>
      </Toolbar.Root>

      {/* edit description modal */}
      {isEditDescriptionOpen && <EditDescription open={isEditDescriptionOpen} setOpen={setIsEditDescriptionOpen} />}

      {/* edit banner image modal */}
      {isEditBannerImageOpen && <EditBannerImage open={isEditBannerImageOpen} setOpen={setIsEditBannerImageOpen} />}

      {/* edit achievements modal */}
      {isEditAchievementsOpen && <EditAchievements open={isEditAchievementsOpen} setOpen={setIsEditAchievementsOpen} />}
    </>
  )
}

export default EditBar
