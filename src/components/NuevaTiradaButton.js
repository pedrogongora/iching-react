import React, { useContext } from 'react'
import StateContext from './StateContext'

const Icon = () => (
  <svg viewBox="0 0 512 512">
    <circle cx="130" cy="300" r="100" />
    <circle cx="256" cy="180" r="100" />
    <circle cx="382" cy="300" r="100" />
  </svg>
)

const NuevaTiradaButton = () => {
  const { theme, resetHexagram } = useContext(StateContext)
  return (
    <div
      className={`nueva-tirada-button ${theme}`}
      onClick={resetHexagram}
      role="button"
      aria-label="Nueva tirada"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && resetHexagram()}
    >
      <Icon />
    </div>
  )
}

export default NuevaTiradaButton
