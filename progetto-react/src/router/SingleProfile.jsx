import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProfile = () => {
    const params = useParams();
    console.log(params)
  return (
    <div>SingleProfile con id {params.id}</div>
  )
}

export default SingleProfile