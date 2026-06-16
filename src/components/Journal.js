import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadJournal } from '../util/journal'
import { mutate, number } from '../hexagrams'
import hexagramsData from '../assets/json/hexagrams.json'
import StateContext from './StateContext'

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

const formatTimestamp = timestamp => {
  const date = new Date(timestamp)
  return `
  ${days[date.getDay()]}
  ${date.getDate()}
  de
  ${months[date.getMonth()]}
  de
  ${date.getFullYear()},
  ${date.toLocaleTimeString()}`
}

const Entry = ({ entry }) => {
  const hexNum = number(entry.hexagram)
  const hexInfo = hexagramsData[hexNum - 1]
  const mutatedHexagram = mutate(entry.hexagram)
  const hexNum2 = number(mutatedHexagram)
  const hexInfo2 = hexagramsData[hexNum2 - 1]
  const hasMutation = hexNum !== hexNum2
  return (
    <div className="journal-entry">
      {hexInfo && (
        <span className="journal-entry-name">
          {hexNum}. {hexInfo.char} {hexInfo.name}
          {hasMutation && hexInfo2 && (
            <> → {hexNum2}. {hexInfo2.char} {hexInfo2.name}</>
          )}
        </span>
      )}
      <span className="journal-entry-date">
        Consulta del{formatTimestamp(entry.sessionTimestamp)}
      </span>
    </div>
  )
}

const Journal = () => {
  const { theme, sessionTimestamp } = useContext(StateContext)
  const [journal, setJournal] = useState(loadJournal())
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionTimestamp) {
      setJournal(loadJournal())
    }
  }, [sessionTimestamp])

  return (
    <div className={`journal ${theme}`}>
      <ul>
        {journal.entries.map(entry => (
          <li
            key={`journal-entry-${entry.sessionTimestamp}`}
            onClick={() =>
              navigate('/bitacora/' + encodeURIComponent(entry.sessionTimestamp))
            }
          >
            <Entry entry={entry} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Journal

export { formatTimestamp }
