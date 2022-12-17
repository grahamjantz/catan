import React, { useState } from 'react'
import './PlayerCard.css'

const PlayerCard = () => {

  let [wood, setWood] = useState<number>(0)
  let [sheep, setSheep] = useState<number>(0)
  let [ore, setOre] = useState<number>(0)
  let [brick, setBrick] = useState<number>(0)
  let [wheat, setWheat] = useState<number>(0)
  let [vp, setVp] = useState<number>(0)
  const [insufficientFunds, setInsufficientFunds] = useState<boolean>(false)

  const handleClickRoad = async () => {
    if (wood >= 1 && brick >= 1) {
      setWood(wood -= 1)
      setBrick(brick -=1)
    } else {
      setInsufficientFunds(true) 
      setTimeout(() => {
        setInsufficientFunds(false)
      }, 1500)
    }
  }

  const handleClickSettlement = async () => {
    if (wood >=1 && brick >= 1 && wheat >= 1 && sheep >= 1) {
      setWood(wood -= 1)
      setBrick(brick -= 1)
      setWheat(wheat -= 1)
      setSheep(sheep -= 1)
      setVp(vp += 1)
    }
  }
  

  const handleClickCity = async () => {
    if (ore >= 3 && wheat >= 2) {
      setOre(ore -= 3)
      setWheat(wheat -= 2)
      setVp(vp += 1)
    }
  }

  const handleClickDevCard = async () => {
    if (sheep >=1 && ore >= 1 && wheat >= 1) {
      setSheep(sheep -= 1)
      setOre(ore -= 1)
      setWheat(wheat -= 1)
    }
  }

  return (
    <div className='player-card'>
      <div className='leaderboard'>
        <h3>Leaderboard</h3>
        <div>
          <h4>Player Name</h4>
          <h4>{vp}</h4>
        </div>
      </div>
      <div className='get-resource-actions'>
{/* ---------- GET RESOURCE ACTIONS ROW 1 ---------- */}
        <div>
          <span>
            <button onClick={() => setWood(wood += 1)}>Wood</button>
            <p>{wood}</p>
          </span>
          <span>
            <button onClick={() => setSheep(sheep += 1)}>Sheep</button>
            <p>{sheep}</p>
          </span>
          <span>
            <button onClick={() => setOre(ore += 1)}>Ore</button>
            <p>{ore}</p>
          </span>
        </div>

{/* ---------- GET RESOURCE ACTIONS ROW 2 ---------- */}
        <div>
          <span>
            <button onClick={() => setBrick(brick += 1)}>Brick</button>
            <p>{brick}</p>
          </span>
          <span>
            <button onClick={() => setWheat(wheat += 1)}>Wheat</button>
            <p>{wheat}</p>
          </span>
          <span>
            <button onClick={() => setVp(vp += 1)}>V.P.</button>
            <p>{vp}</p>
          </span>
        </div>
      </div>
      <hr/>
{/* ----------  BUY ITEMS ---------- */}
      {insufficientFunds === true ? (
        <p>Insufficient Funds!</p>
      ) : ''}
      <div className='buy-items'>
        <button onClick={handleClickRoad}>Road</button>
        <button onClick={handleClickSettlement}>Settle- ment</button>
        <button onClick={handleClickCity}>City</button>
        <button onClick={handleClickDevCard}>Dev. Card</button>
      </div>
    </div>
  )
}

export default PlayerCard