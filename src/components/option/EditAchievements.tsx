import React, { useState } from 'react'
import Modal from '../ui/Modal'
import useCard from '@/hooks/useCard'
import Button from '../ui/Button'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

interface EditDescriptionProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const achievementList = ['Achiever', 'Hatch', 'Influencer', 'Winner']

const EditAchievements: React.FC<EditDescriptionProps> = ({ open, setOpen }) => {
  const { cardStore, setCardStore } = useCard()
  const [achievements, setAchievements] = useState<string[]>(cardStore?.achievements || [])

  const handleToggleAchievement = (achievement: string) => {
    if (achievements.includes(achievement)) {
      setAchievements(achievements.filter((a) => a !== achievement))
    } else {
      setAchievements([...achievements, achievement])
    }
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close>
        <div className="w-96 h-60 bg-bgBlue/75 backdrop-blur-sm flex flex-col p-3 gap-2 justify-center items-center">
          <div className="font-tomorrow font-bold text-lg">Achievements</div>

          <div className="w-full h-fit flex flex-col justify-center items-center">
            {achievementList.map((achievement) => (
              <div key={achievement} className="flex justify-center items-center gap-2">
                <div className="font-bold font-tomorrow">{achievement}</div>
                <Checkbox.Root
                  checked={achievements.includes(achievement)}
                  className="w-5 h-5 bg-black border-bgGrey border-2"
                  onClick={() => handleToggleAchievement(achievement)}
                >
                  <Checkbox.Indicator>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (cardStore) {
                  setCardStore({ ...cardStore, achievements })
                }
                setOpen(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditAchievements
