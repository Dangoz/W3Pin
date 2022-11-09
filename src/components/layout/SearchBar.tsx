import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/Outline'
import useTarget from '@/hooks/useTarget'
import { handleError } from '@/common/notification'
import rss3 from '@/common/rss3'
import { Tags } from '@/types/rss3'
import { parseProfiles } from '@/common/utils'
import { toast } from 'react-toastify'

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
  const { targetStore, setTargetStore } = useTarget()
  const [input, setInput] = useState('')
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    if (open === false) {
      setInput('')
      setResults([])
    }
  }, [open])

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

  const handleFetchTarget = (addressOrHandle: string) => {
    const fetchTarget = async () => {
      if (addressOrHandle.trim() === '') {
        return
      }

      setOpen(false)
      const profiles = await rss3.getProfiles(addressOrHandle)
      const profileResult = parseProfiles(profiles)

      const newTarget = {
        ...profileResult,
        assets: await rss3.getAssetsCount(addressOrHandle),
        transaction: await rss3.getNotesCount(addressOrHandle, [Tags.Transaction]),
        exchange: await rss3.getNotesCount(addressOrHandle, [Tags.Exchange]),
        collectible: await rss3.getNotesCount(addressOrHandle, [Tags.Collectible]),
        social: await rss3.getNotesCount(addressOrHandle, [Tags.Social]),
        donation: await rss3.getNotesCount(addressOrHandle, [Tags.Donation]),
        governance: await rss3.getNotesCount(addressOrHandle, [Tags.Governance]),
        poap: await rss3.getNotesCount(addressOrHandle, [Tags.Collectible], ['poap']),
      }

      setTargetStore(newTarget)
    }

    const fetchTargetPromise = fetchTarget()
    toast.promise(fetchTargetPromise, {
      pending: {
        theme: 'dark',
        render() {
          return "Querying target's RSS3 profile..."
        },
      },
      success: {
        autoClose: 1000,
        render() {
          return 'Success!'
        },
      },
      error: {
        render({ data }) {
          return `${(data as Error).message}`
        },
      },
    })
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close={true}>
        <div className="rounded-sm w-72 lg:w-[500px] h-96 py-3 gap-2 flex flex-col justify-start items-center">
          {/* search bar */}
          <div className="w-full h-9 flex justify-between items-center bg-foreground rounded-sm relative focus-within:ring-2 focus-within:ring-bgGrey">
            {/* search icon */}
            <div
              className="w-10 h-full flex justify-center items-center absolute cursor-pointer"
              onClick={() => handleFetchTarget(input)}
            >
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFetchTarget(input)
                }
              }}
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
                  onClick={() =>
                    handleFetchTarget(`${input}${suffixes.includes(getSuffix(input)) ? '' : `.${suffix}`}`)
                  }
                >
                  <Image width={16} height={16} alt="handle-logo" src={`/${suffix}.png`} />
                  <div className="w-full overflow-x-scroll">
                    {`${input}${suffixes.includes(getSuffix(input)) ? '' : `.${suffix}`}`}
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
