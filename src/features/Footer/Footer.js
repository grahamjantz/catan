import React from 'react'
import './Footer.css'

import { useNavigate, useSearchParams } from 'react-router-dom'

const Footer = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const roomId = searchParams.get('room_id')

  const handleEndGame = async () => {
    navigate(`/end-game?room_id=${roomId}`)
  }

  return (
    <footer>
      <hr />
      <button onClick={handleEndGame}>End Game</button>
    </footer>
  )
}

export default Footer