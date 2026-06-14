import React, { useContext } from 'react'
import { animated, useSpring } from 'react-spring'
import StateContext from './StateContext'

const StartButton = ({ onStart }) => {
  const { theme, step, hexagram } = useContext(StateContext)

  // animate mount at start or back
  const animProps = useSpring({ opacity: 1, from: { opacity: 0 } })

  // visible flag
  const visible =
    step === 'start' || step === 'coinshuffle' ? 'visible' : 'hidden'

  // first time?
  const start = step === 'start' ? 'start' : ''

  const clickHandler = onStart

  return (
    <animated.div style={animProps}>
      <button
        className={`start-button ${theme} ${visible} ${start}`}
        onClick={clickHandler}
      >
        <span className="button-label">
          {hexagram.length === 6 ? 'Ver resultado' : 'Tirar monedas'}
        </span>
        {step === 'coinshuffle' && (
          <span className="toss-progress">{hexagram.length} de 6</span>
        )}
      </button>
    </animated.div>
  )
}

export default StartButton
