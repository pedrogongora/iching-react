import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import hexagrams from '../assets/json/hexagrams.json'
import Hexagram from './Hexagram'
import MDHexagramText from './MDHexagramText'
import StateContext from './StateContext'

const HexagramDetail = () => {
  const { theme } = useContext(StateContext)
  const { numero } = useParams()
  const navigate = useNavigate()
  const hexagramNumber = parseInt(numero, 10)

  if (
    isNaN(hexagramNumber) ||
    hexagramNumber < 1 ||
    hexagramNumber > 64
  ) {
    navigate('/hexagramas', { replace: true })
    return null
  }

  const lines = hexagrams[hexagramNumber - 1].binaryString
    .split('')
    .map(c => (c === '1' ? 7 : 8))
    .reverse()

  return (
    <div className={`hexagram-detail-screen ${theme}`}>
      <Hexagram lines={lines} />
      <MDHexagramText hexagramNumber={hexagramNumber} />
    </div>
  )
}

export default HexagramDetail
