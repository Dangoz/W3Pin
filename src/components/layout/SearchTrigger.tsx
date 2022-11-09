import React, { useEffect, useState } from 'react'
import ToolTip from '../ui/ToolTip'
import SearchBar from './SearchBar'

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
        <div className="border-2 rounded-md border-foreground p-1.5 bg-black" onClick={() => setShowSearch(true)}>
          {system === 'windows' ? windowsShortCut : appleShortCut}
        </div>
      </ToolTip>

      <SearchBar open={showSearch} setOpen={setShowSearch} />
    </>
  )
}

export default SearchTrigger
