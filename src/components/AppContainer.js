import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import seedrandom from 'seedrandom'
import StateContext from './StateContext'
import DarkmodeSwitch from './DarkmodeSwitch'
import BackButton from './BackButton'
import LogbookButton from './LogbookButton'
import HexagramListButton from './HexagramListButton'
import NuevaTiradaButton from './NuevaTiradaButton'
import { findEntry, loadJournal, saveEntry } from '../util/journal'

const rng = new seedrandom()

const defaultTheme =
  window.localStorage.getItem('theme') ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const AppContainer = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [hexagram, setHexagram] = useState([])
  const [coinResult, setCoinResult] = useState([])
  const [sessionTimestamp, setSessionTimestamp] = useState(undefined)

  const location = useLocation()
  const navigate = useNavigate()

  // reset state when returning to home
  useEffect(() => {
    if (location.pathname === '/') {
      setHexagram([])
      setCoinResult([])
      setSessionTimestamp(undefined)
    }
  }, [location.pathname])

  // save session to journal when hexagram is complete
  useEffect(() => {
    if (hexagram.length === 6) {
      const timestamp = new Date().toISOString()
      setSessionTimestamp(timestamp)
      const journal = loadJournal()
      const prevEntry = findEntry(timestamp, journal)
      if (!prevEntry) {
        saveEntry({
          sessionTimestamp: timestamp,
          hexagram,
          comments: '',
        })
      }
    }
  }, [hexagram])

  const onStart = () => {
    if (hexagram.length === 6) {
      navigate('/resultado')
      return
    }
    const res = [1, 2, 3].map(() => Math.abs(rng.int32() % 2))
    const line = res.map(v => (v === 0 ? 2 : 3)).reduce((a, v) => a + v)
    setCoinResult(res)
    setHexagram([line].concat(hexagram))
    navigate('/tirada', { replace: location.pathname === '/tirada' })
  }

  const resetHexagram = () => {
    setHexagram([])
    setCoinResult([])
    setSessionTimestamp(undefined)
    navigate('/')
  }

  const changeTheme = t => {
    setTheme(t)
    window.localStorage.setItem('theme', t)
  }

  return (
    <StateContext.Provider
      value={{ theme, hexagram, coinResult, sessionTimestamp, onStart, resetHexagram }}
    >
      <div className={`app-container ${theme}`}>
        <div className="vertical-scroll">
          <div className="contents">
            <Outlet />
          </div>
        </div>
        {location.pathname !== '/' && <BackButton />}
        <NuevaTiradaButton />
        <HexagramListButton />
        <LogbookButton />
        <DarkmodeSwitch changeTheme={changeTheme} />
      </div>
    </StateContext.Provider>
  )
}

export default AppContainer
