import React, { useEffect, useState } from 'react'
import ToolTip from '../ui/ToolTip'
import SearchBar from './SearchBar'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

// search bar shortcut for apple and windows
const appleShortCut = '⌘ K'
const windowsShortCut = 'Ctrl K'

const SearchTrigger = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [system, setSystem] = useState('')

  // get the system of current browser
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('win') !== -1) {
      setSystem('windows')
    }
  }, [])

  // listen to keydown event for shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setShowSearch((showSearch) => !showSearch)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <ToolTip message="search bar" delayDuration={500}>
        <div
          className="border-2 rounded-md border-foreground bg-black flex justify-between items-center p-2 gap-5 h-fit"
          onClick={() => setShowSearch(true)}
        >
          <div className="text-gray-500 text-xs flex justify-center items-center">
            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
            Search
          </div>
          <div className="text-white text-xs">{system === 'windows' ? windowsShortCut : appleShortCut}</div>
        </div>
      </ToolTip>

      <SearchBar open={showSearch} setOpen={setShowSearch} />
    </>
  )
}

export default SearchTrigger
