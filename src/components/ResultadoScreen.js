import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultPanel from './ResultPanel'
import StateContext from './StateContext'

const ResultadoScreen = () => {
  const { hexagram } = useContext(StateContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (hexagram.length < 6) navigate('/', { replace: true })
  }, [hexagram, navigate])

  if (hexagram.length < 6) return null
  return <ResultPanel hexagram={hexagram} />
}

export default ResultadoScreen
