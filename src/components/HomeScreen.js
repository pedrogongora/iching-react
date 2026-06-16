import React, { useContext } from 'react'
import StartButton from './StartButton'
import StateContext from './StateContext'

const HomeScreen = () => {
  const { onStart } = useContext(StateContext)
  return <StartButton onStart={onStart} />
}

export default HomeScreen
