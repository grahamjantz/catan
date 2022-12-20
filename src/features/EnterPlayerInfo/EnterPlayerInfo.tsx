// @ts-nocheck
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { dbFS } from '../SetVP/SetVP'
import './EnterPlayerInfo.css'

const EnterPlayerInfo = () : any => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [colour, setColour] = useState('')

    const roomId = searchParams.get('room_id')
  console.log(roomId)  
  
  const generatePlayerId = () => {
    let id;
    for (let i=0; i<8; i++) {
      id = Math.floor(Math.random() * 10000000).toString(26).toUpperCase()
    }
    return id;
  }
  const playerId = generatePlayerId()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(name !== '' && colour !== '') {

      const docRef = doc(dbFS, 'rooms', roomId)
      await updateDoc(docRef, {
        'players': arrayUnion({
          name: name,
          colour: colour,
          player_id: playerId,
          active: true,
          victory_points: 0,
          items: {
            wood: 0,
            brick: 0,
            wheat: 0,
            ore: 0,
            sheep: 0
          },
        })
      })

      navigate(`/player-card?room_id=${roomId}&player_id=${playerId}`)
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