import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import './SelectExpansion.css'

const SelectExpansion = () => {

  const [selectBaseGame, setSelectBaseGame] = useState(true)
  const [selectCitiesKnights, setSelectCitiesKnights] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate() 

  const roomId = searchParams.get('room_id')

  const handleSubmit = async () => {
    if (selectBaseGame === false) {
      return 0
    } else {
      if (selectCitiesKnights === false) {
        navigate(`/enter-player-info?room_id=${roomId}&expansion=none`)
      } else {
        navigate(`/enter-player-info?room_id=${roomId}&expansion=cities-knights`)
      }
    }
  }
  
  return (
    <div className='select-expansion'>
      <h4>Select Expansion:</h4>
      <fieldset>
        <legend>Select:</legend>

        <div>
          <label htmlFor="base-game">Base Game</label>
          <input type='checkbox' id="base-game" name="expansion" value="base-game"
             defaultChecked
             onChange={() => 
              selectBaseGame === false 
              ? setSelectBaseGame(true) 
              : setSelectBaseGame(false)}/>
        </div>

        <div>
          <label htmlFor="cities-knights">Cities & Knights</label>
          <input type='checkbox' id="cities-knights" name="expansion" value="cities-knights" 
          onChange={() => 
            selectCitiesKnights === false 
            ? setSelectCitiesKnights(true) 
            : setSelectCitiesKnights(false)}/>
        </div>
        <input type='submit' value='Accept' onClick={handleSubmit}/>
      </fieldset>
    </div>
  )
}

export default SelectExpansion