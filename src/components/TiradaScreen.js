import React, { useContext } from 'react'
import CoinShuffle from './CoinShuffle'
import StartButton from './StartButton'
import StateContext from './StateContext'

const TiradaScreen = () => {
  const { onStart } = useContext(StateContext)
  return (
    <>
      <CoinShuffle />
      <StartButton onStart={onStart} />
    </>
  )
}

export default TiradaScreen
