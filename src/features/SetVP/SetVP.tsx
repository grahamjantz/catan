import { getFirestore } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { app } from '../../utils/firebase'
import './SetVP.css'

export const dbFS = getFirestore(app)

const SetVP = () => {

  let [count, setCount] = useState(10)

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')

  const handleClickAccept = async () => {
    console.log('accept')
    
  }

  return (
    <div className='set-vp'>
      <h4>Enter Amount of Victory Points to Win:</h4>
      <div>
        <button onClick={() => setCount(count -= 1)}>-</button>
        <p>{count}</p>
        <button onClick={() => setCount(count += 1)}>+</button>
      </div>
      <button onClick={handleClickAccept}>Accept</button>
    </div>
  )
}

export default SetVP