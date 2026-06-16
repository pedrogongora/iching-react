import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEntry, findEntry, loadJournal, updateEntry } from '../util/journal'
import ResultPanel from './ResultPanel'
import StateContext from './StateContext'
import { formatTimestamp } from './Journal'

const JournalEntry = () => {
  const { theme } = useContext(StateContext)
  const { timestamp } = useParams()
  const navigate = useNavigate()

  const decodedTimestamp = decodeURIComponent(timestamp)
  const [entry, setEntry] = useState(() =>
    findEntry(decodedTimestamp, loadJournal())
  )
  const [comments, setComments] = useState(entry ? entry.comments : '')

  useEffect(() => {
    if (entry) setComments(entry.comments)
  }, [entry])

  if (!entry) {
    navigate('/bitacora', { replace: true })
    return null
  }

  const commentsChangeHandler = e => {
    setComments(e.target.value)
    const updated = { ...entry, comments: e.target.value }
    updateEntry(updated)
    setEntry(updated)
  }

  const deleteHandler = () => {
    const haveUserConfirmation = window.confirm(
      '¿Borrar esta consulta, no se puede deshacer?'
    )
    if (haveUserConfirmation) {
      deleteEntry(entry)
      navigate('/bitacora', { replace: true })
    }
  }

  return (
    <div className={`journal ${theme}`}>
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
    </div>
  )
}

export default JournalEntry
