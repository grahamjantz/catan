// @ts-nocheck
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { dbFS } from '../SetVP/SetVP'
import './SelectExpansion.css'

const SelectExpansion = () => {

  const [selectBaseGame, setSelectBaseGame] = useState(true)
  const [selectCitiesKnights, setSelectCitiesKnights] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate() 

  const roomId = searchParams.get('room_id')

  let docRef;

  if (roomId) {
    docRef = doc(dbFS, 'rooms', roomId)
  }
  
  const handleSubmit = async () => {
    if (selectBaseGame === false) {
      return 0
    } else {
      if (selectCitiesKnights === false) {
        await updateDoc(docRef, {
          expansion: 'none'
        })
        navigate(`/enter-player-info?room_id=${roomId}&expansion=none`)
      } else {
        await updateDoc(docRef, {
          expansion: 'cities-knights'
        })
        navigate(`/enter-player-info?room_id=${roomId}&expansion=cities-knights`)
      }
    }
  }
  
  return (
    <div className='select-expansion'>
      <h2>Select Expansion:</h2>
      <fieldset>
        <legend>Select:</legend>

        <div>
          <label htmlFor="base-game">Base Game</label>
          <input type='checkbox' id="base-game" name="expansion" value="base-game"
             defaultChecked
             onChange={() => 
              selectBaseGame === false 
              ? setSelectBaseGame(true) 
              : setSelectBaseGame(false)}
              className='checkbox'
              />
        </div>

        <div>
          <label htmlFor="cities-knights">Cities & Knights</label>
          <input type='checkbox' id="cities-knights" name="expansion" value="cities-knights" 
          onChange={() => 
            selectCitiesKnights === false 
            ? setSelectCitiesKnights(true) 
            : setSelectCitiesKnights(false)}
            className='checkbox'
            />
        </div>
        <button onClick={handleSubmit} className='accept'>Accept</button>
      </fieldset>
    </div>
  )
}

export default SelectExpansion