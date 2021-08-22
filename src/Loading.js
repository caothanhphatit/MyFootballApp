import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loading = ({ loading, height = '200px' }) => {
  return (
    <div style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default Loading
