import React from 'react'
import './InitializeApp.css'

import { useNavigate } from 'react-router'
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../utils/firebase'

const InitializeApp = () => {
  const navigate = useNavigate()

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const generateRoomId = () => {
      let id: string = ''
      const ranIndex = () => {
          return Math.floor(Math.random() * 26)
      }

      for (let i = 0; i < 4; i++) {
              id += letters[ranIndex()]
          }   
          return id
  }

  const roomId = generateRoomId().toUpperCase()


  const handleClickHost = async () => {

    const colRef = doc(db, 'rooms', roomId)

    await setDoc(doc(db, 'rooms', roomId), {
      'players': [],
      'points_to_win': 10,
      'room_id': roomId
    })

    navigate(`/set-vp?room_id=${roomId}`)
  }

  const handleClickJoin = async () => {
    navigate('/join-room')
  }

  return (
    <div className='initialize-app'>
      <h1>Welcome to Catan Calculator!</h1>

      <button onClick={handleClickHost}>Host Room</button>
      <button onClick={handleClickJoin}>Join Room</button>
    </div>
  )
}

export default InitializeApp