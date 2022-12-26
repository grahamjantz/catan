// @ts-nocheck
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { app } from '../../utils/firebase'
import './SetVP.css'

export const dbFS = getFirestore(app)

const SetVP = () => {

  let [count, setCount] = useState(10)

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')

  const navigate = useNavigate()

  
  useEffect(() => {
    const q = query(collection(dbFS, "rooms"), where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let count;
      querySnapshot.forEach((doc) => {
        count = (doc.data().points_to_win);
      });
      setCount(count)
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])

  const handleClickAccept = async () => {
    navigate(`/select-expansion?room_id=${roomId}`)
  }

  const updateDB = async () => {
    const docRef = doc(dbFS, 'rooms', roomId)

    await updateDoc(docRef, {
      'points_to_win': count
    })
  }

  const handleClickChangeAmount = async (action) => {
    if (action === 'increment') {
      setCount(count++)
    } else if (action === 'decrement') {
      setCount(count--)
    }
    updateDB()
  }

  return (
    <div className='set-vp'>
      <h2>Room Code: {roomId}</h2>
      <h2>Enter Amount of Victory Points to Win:</h2>
      <div>
        <button onClick={() => handleClickChangeAmount('decrement')}>-</button>
        <p>{count}</p>
        <button onClick={() => handleClickChangeAmount('increment')}>+</button>
      </div>
      <button onClick={handleClickAccept}>Accept</button>
    </div>
  )
}

export default SetVP