import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StateContext from './StateContext'

const Icon = () => (
  <svg viewBox="0 0 512 512">
    <rect x="30" y="20" width="452" height="58" />
    <rect x="30" y="110" width="452" height="58" />
    <rect x="30" y="200" width="452" height="58" />
    <rect x="30" y="290" width="452" height="58" />
    <rect x="30" y="380" width="452" height="58" />
    <rect x="30" y="470" width="452" height="58" />
  </svg>
)

const HexagramListButton = () => {
  const { theme } = useContext(StateContext)
  const navigate = useNavigate()
  return (
    <div
      className={`hexagramas-nav-button ${theme}`}
      onClick={() => navigate('/hexagramas')}
      role="button"
      aria-label="Ver lista de hexagramas"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate('/hexagramas')}
    >
      <Icon />
    </div>
  )
}

export default HexagramListButton
