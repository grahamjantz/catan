import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './JoinRoom.css'

const JoinRoom = () => {

  const [roomId, setRoomId] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (roomId && roomId !== '') {
      setRoomId('')
      navigate(`/enter-player-info?room_id=${roomId.toUpperCase().trim()}`)
    }
  }

  return (
    <div className='join-room'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='room-code'>Enter Room Code:</label>
        <input name='room-code' type='text' value={roomId} placeholder='Room Code' onChange={(e) => setRoomId(e.target.value)}/>
        <input type='submit' value='Done'/>
      </form>
    </div>
  )
}

export default JoinRoom