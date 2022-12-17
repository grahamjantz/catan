import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import './EnterPlayerInfo.css'

const EnterPlayerInfo = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  
  const [name, setName] = useState<string>('')
  const [colour, setColour] = useState<string>('')
  
  const roomId = searchParams.get('room-id')
  
  const generatePlayerId = () => {
    let id;
    for (let i=0; i<8; i++) {
      id = Math.floor(Math.random() * 10000000).toString(26).toUpperCase()
    }
    return id
  }
  const playerId = generatePlayerId()

  const handleSubmit = async () => {
    if(name !== '' && colour !== '') {
      console.log(name, colour, playerId)
      console.log(roomId)
      navigate(`/player-card?room-id=${roomId}&player_id=${playerId}`)
    }
  }

  return (
    <div className='enter-player-info'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Enter Name:</label>
        <input type='text' name='name' value={name} placeholder='Enter Name' 
        onChange={(e) => setName(e.target.value)}/>

        <select onChange={(e) => setColour(e.target.value)}>
          <option>--Please Select Colour--</option>
          <option>Blue</option>
          <option>Red</option>
          <option>White</option>
          <option>Orange</option>
        </select>

        <input type='submit' value='Done'/>
      </form>
    </div>
  )
}

export default EnterPlayerInfo