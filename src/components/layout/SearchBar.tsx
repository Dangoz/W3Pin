import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Image from 'next/image'
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import useCard from '@/hooks/useCard'
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
  const { cardStore, setCardStore } = useCard()
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

  const handleGenerateCard = (addressOrHandle: string) => {
    const generateCard = async () => {
      setOpen(false)

      const identitiesPromise = rss3.getIdentities(addressOrHandle)
      const profilesPromise = rss3.getProfiles(addressOrHandle)
      const assetsPromise = rss3.getAssetsCount(addressOrHandle)
      const transactionPromise = rss3.getNotesCount(addressOrHandle, [Tags.Transaction])
      const exchangePromise = rss3.getNotesCount(addressOrHandle, [Tags.Exchange])
      const collectiblePromise = rss3.getNotesCount(addressOrHandle, [Tags.Collectible])
      const socialPromise = rss3.getNotesCount(addressOrHandle, [Tags.Social])
      const donationPromise = rss3.getNotesCount(addressOrHandle, [Tags.Donation])
      const governancePromise = rss3.getNotesCount(addressOrHandle, [Tags.Governance])
      const poapPromise = rss3.getNotesCount(addressOrHandle, [Tags.Collectible], ['poap'])

      const [identities, profiles, assets, transaction, exchange, collectible, social, donation, governance, poap] =
        await Promise.all([
          identitiesPromise,
          profilesPromise,
          assetsPromise,
          transactionPromise,
          exchangePromise,
          collectiblePromise,
          socialPromise,
          donationPromise,
          governancePromise,
          poapPromise,
        ])

      const profileResult = parseProfiles(identities, profiles)

      const newCard = {
        ...profileResult,
        assets,
        transaction,
        exchange,
        collectible,
        social,
        donation,
        governance,
        poap,
        banner: '/banner2.png',
        description: 'lalala',
        achievements: [],
      }
      setCardStore(newCard)

      // cache most recent card for current session
      sessionStorage.setItem('card', JSON.stringify(newCard))
    }

    if (addressOrHandle.trim() === '') {
      return
    }

    const fetchTargetPromise = generateCard()
    toast.promise(fetchTargetPromise, {
      pending: {
        theme: 'dark',
        render() {
          return `Querying target's RSS3 profile...`
        },
      },
      success: {
        progressStyle: {
          background: 'linear-gradient(to right, #3461FF, #8454EB)',
        },
        autoClose: 750,
        render() {
          return `${addressOrHandle} Found!`
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
              onClick={() => handleGenerateCard(input)}
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
                  handleGenerateCard(input)
                }
              }}
            />

            {/* clear button */}
            <div className="w-10 h-full flex justify-center items-center absolute right-0">
              {input && (
                <Cross2Icon
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
                  className="w-full h-full flex justify-start items-center cursor-pointer hover:bg-bgGrey gap-2 p-2"
                  onClick={() =>
                    handleGenerateCard(`${input}${suffixes.includes(getSuffix(input)) ? '' : `.${suffix}`}`)
                  }
                >
                  <div className="w-6 h-6 relative rounded-full">
                    <Image fill alt="handle-logo" src={`/${suffix}.png`} sizes="100%" />
                  </div>
                  <div className="w-fit overflow-x-scroll">
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
