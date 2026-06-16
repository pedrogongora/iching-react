import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring'
import { useLocation } from 'react-router-dom'
import StateContext from './StateContext'

const StartButton = ({ onStart }) => {
  const { theme, hexagram } = useContext(StateContext)
  const location = useLocation()

  const animProps = useSpring({ opacity: 1, from: { opacity: 0 } })

  const isHome = location.pathname === '/'

  return (
    <animated.div style={animProps}>
      <button
        className={`start-button ${theme} visible ${isHome ? 'start' : ''}`}
        onClick={onStart}
      >
        <span className="button-label">
          {hexagram.length === 6 ? 'Ver resultado' : 'Tirar monedas'}
        </span>
        {!isHome && (
          <span className="toss-progress">{hexagram.length} de 6</span>
        )}
      </button>
    </animated.div>
  )
}

export default StartButton
