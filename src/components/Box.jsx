import React from 'react'
import './Box.css'

const Box = ({color, handlePlay, stateXO}) => {
  return (
    <div className={`box flex justify-center items-center ${color}`} onClick={handlePlay}>{stateXO}</div>
  )
}

export default Box