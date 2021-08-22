import React, { useState, useEffect } from 'react'

const ExpandSessionRow = ({ row }) => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSessions = (id) => {
    setLoading(true)
    fetch(`http://34.87.101.86:8090/${id}/sessions`)
      .then(res => res.json())
      .then(res => {
        if (res && res.success && Array.isArray(res.data)) {
          setSessions(res.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSessions(row.league_id)
  }, [])

  return (
    <div>
      <div>
        <p>{`This Expand row is belong to rowKey ${row.league_id}`}</p>
        {JSON.stringify(sessions)}
      </div>
    </div>
  )
}

export default ExpandSessionRow
