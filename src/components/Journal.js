import React, { useContext, useEffect, useState } from 'react'
import { deleteEntry, loadJournal, updateEntry } from '../util/journal'
import ResultPanel from './ResultPanel'
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

const Back = ({ onClick }) => {
  const { theme } = useContext(StateContext)
  return (
    <div className={`journal-back-button ${theme}`} onClick={onClick}>
      <svg viewBox="0 0 512 512">
        <path
          d="M477.9,221.9H116.5L263.1,75.3c13.3-13.3,13.3-34.9,0-48.3c-13.3-13.3-34.9-13.3-48.3,0L10,231.9C3.6,238.2,0,247,0,256
 s3.6,17.8,10,24.1l204.8,204.8c13.3,13.3,34.9,13.3,48.3,0c13.3-13.3,13.3-34.9,0-48.2L116.5,290.1h361.4
 c18.9,0,34.1-15.3,34.1-34.1C512,237.1,496.7,221.9,477.9,221.9z"
        />
      </svg>
    </div>
  )
}

const Entry = ({ entry }) => {
  return (
    <div className="journal-entry">
      Consulta del
      {formatTimestamp(entry.sessionTimestamp)}
    </div>
  )
}

const Journal = () => {
  const { theme, sessionTimestamp } = useContext(StateContext)
  const [journal, setJournal] = useState(loadJournal())
  const [showResult, setShowResult] = useState(false)
  const [entry, setEntry] = useState()
  const [comments, setComments] = useState('')

  const deleteHandler = () => {
    const haveUserConfirmation = window.confirm(
      '¿Borrar esta consulta, no se puede deshacer?'
    )
    if (haveUserConfirmation) {
      deleteEntry(entry)
      setJournal(loadJournal())
      setShowResult(false)
    }
  }

  const commentsChangeHandler = e => {
    setComments(e.target.value)
    updateEntry({
      ...entry,
      comments: e.target.value,
    })
    setJournal(loadJournal())
  }

  useEffect(() => {
    if (sessionTimestamp) {
      setJournal(loadJournal())
    }
  }, [sessionTimestamp])

  useEffect(() => {
    if (entry) {
      setComments(entry.comments)
    }
  }, [entry])

  return (
    <div className={`journal ${theme}`}>
      {!showResult && (
        <ul>
          {journal.entries.map(entry => (
            <li
              key={`journal-entry-${entry.sessionTimestamp}`}
              onClick={() => {
                setShowResult(true)
                setEntry(entry)
              }}
            >
              <Entry entry={entry} />
            </li>
          ))}
        </ul>
      )}
      {showResult && (
        <>
          <div className="journal-contents">
            <div className="entry-data">
              <div className="entry-title">
                Consulta del
                {formatTimestamp(entry.sessionTimestamp)}
              </div>
              <div>
                <div>
                  <strong>Comentarios:</strong>
                </div>
                <textarea
                  rows={5}
                  cols={25}
                  value={comments}
                  onChange={commentsChangeHandler}
                />
              </div>
              <div>
                <button className={`${theme}`} onClick={deleteHandler}>
                  Eliminar consulta
                </button>
              </div>
            </div>
            <ResultPanel hexagram={entry.hexagram} />
          </div>
          {showResult && <Back onClick={() => setShowResult(false)} />}
        </>
      )}
    </div>
  )
}

export default Journal
