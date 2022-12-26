// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { dbFS } from '../SetVP/SetVP';
import { collection, onSnapshot, query, where } from "firebase/firestore";

import './JoinRoom.css'

const JoinRoom = () => {

  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    const q = query(collection(dbFS, "rooms"), where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players= [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data().players);
      });
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (roomId && roomId !== '') {
      setRoomId('')
      navigate(`/enter-player-info?room_id=${roomId.toUpperCase().trim()}`)
    }
  }

  return (
    <div className='join-room'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='room-code'><h2>Enter Room Code:</h2></label>
        <input name='room-code' type='text' value={roomId} placeholder='Room Code' onChange={(e) => setRoomId(e.target.value)}/>
        <input type='submit' value='Done'/>
      </form>
    </div>
  )
}

export default JoinRoom