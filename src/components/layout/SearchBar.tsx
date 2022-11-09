import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import XMarkIcon from '@heroicons/react/24/Outline/XMarkIcon'
import Image from 'next/image'
import blurURL from '@/common/blur'

const suffixes = ['eth', 'lens', 'csb']

const getSuffix = (text: string) => {
  const words = text.split('.')
  return words[words.length - 1]
}

interface SearchBarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ open, setOpen }) => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    if (input.trim() === '') {
      setResults([])
      return
    }
    const parseInput = () => {
      const words = input.trim().split('.')
      const lastWord = words[words.length - 1]
      const newResults = suffixes.filter((suffix) => {
        if (suffixes.includes(lastWord)) {
          return lastWord === suffix
        }
        return true
      })
      setResults(newResults)
    }
    parseInput()
  }, [input])

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close={true}>
        <div className="rounded-sm w-72 lg:w-[500px] h-96 py-3 gap-2 flex flex-col justify-start items-center">
          {/* search bar */}
          <div className="w-full h-9 flex justify-between items-center bg-foreground rounded-sm relative focus-within:ring-2 focus-within:ring-bgGrey">
            {/* search icon */}
            <div className="w-10 h-full flex justify-center items-center absolute">
              <MagnifyingGlassIcon className="w-5 h-5 text-whtei" />
            </div>

            {/* search input */}
            <input
              type={'text'}
              className="w-full h-full py-2 px-10 bg-foreground outline-1 rounded-sm outline-none text-sm lg:text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={'Search by Address or Handle'}
              autoFocus={false}
            />

            {/* clear button */}
            <div className="w-10 h-full flex justify-center items-center absolute right-0">
              {input && (
                <XMarkIcon
                  className="w-6 h-6 text-white cursor-pointer border-2 border-bgGrey rounded-sm hover:bg-bgGrey"
                  onClick={() => setInput('')}
                />
              )}
            </div>
          </div>

          {/* results */}
          {results.length > 0 && (
            <div className="w-full h-fit bg-foreground rounded-sm flex flex-col justify-start items-center py-2">
              {results.map((suffix) => (
                <div
                  key={suffix}
                  className="w-full h-10 flex justify-start items-center cursor-pointer hover:bg-bgGrey gap-2 p-2"
                >
                  <Image width={16} height={16} alt="handle-logo" src={`/${suffix}.png`} />
                  <div className="w-full overflow-x-scroll">
                    {input}
                    {suffixes.includes(getSuffix(input)) ? '' : `.${suffix}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default SearchBar
