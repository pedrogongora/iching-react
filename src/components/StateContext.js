import React from 'react'

const StateContext = React.createContext({
  theme: 'light',
  hexagram: [],
  coinResult: [],
  sessionTimestamp: undefined,
  onStart: () => {},
  resetHexagram: () => {},
})

export default StateContext
