import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import hexagrams from '../assets/json/hexagrams.json'
import StateContext from './StateContext'

const HexagramList = () => {
  const { theme } = useContext(StateContext)
  const navigate = useNavigate()

  return (
    <div className={`hexagram-list-screen ${theme}`}>
      <ul>
        {hexagrams.map(h => (
          <li key={`hex-link-${h.wenNumber}`}>
            <div
              className="hexagram-list-button"
              onClick={() => navigate(`/hexagramas/${h.wenNumber}`)}
            >
              {`${h.wenNumber}. ${h.char} ${h.name}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HexagramList
