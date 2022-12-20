// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './PlayerCard.css'

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';
import { useSearchParams } from 'react-router-dom';

const PlayerCard = () => {

  let [wood, setWood] = useState(0)
  let [sheep, setSheep] = useState(0)
  let [ore, setOre] = useState(0)
  let [brick, setBrick] = useState(0)
  let [wheat, setWheat] = useState(0)
  let [vp, setVp] = useState(0)
  const [insufficientFunds, setInsufficientFunds] = useState(false)
  const [players, setPlayers] = useState([])
  const [playersListSorted, setPlayersListSorted] = useState()

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')
  const playerId = searchParams.get('player_id')
  
  useEffect(() => {
    const q = query(collection(dbFS, "rooms"), where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players= [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data().players);
      });
      setPlayers(players[0])
      if (players[0] !== []) {
        const sort = players[0].sort((a, b) => b.active - a.active).sort((a, b) => b.victory_points - a.victory_points)
        setPlayersListSorted(sort)
      }
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])

  console.log(players)
  console.log(playerId)
  
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
    } else {
      setInsufficientFunds(true) 
      setTimeout(() => {
        setInsufficientFunds(false)
      }, 1500)
    }
  }
  
  const handleClickCity = async () => {
    if (ore >= 3 && wheat >= 2) {
      setOre(ore -= 3)
      setWheat(wheat -= 2)
      setVp(vp += 1)
    } else {
      setInsufficientFunds(true) 
      setTimeout(() => {
        setInsufficientFunds(false)
      }, 1500)
    }
  }

  const handleClickDevCard = async () => {
    if (sheep >=1 && ore >= 1 && wheat >= 1) {
      setSheep(sheep -= 1)
      setOre(ore -= 1)
      setWheat(wheat -= 1)
    } else {
      setInsufficientFunds(true) 
      setTimeout(() => {
        setInsufficientFunds(false)
      }, 1500)
    }
  }

  return (
    <div className='player-card'>
        <h3>Leaderboard</h3>
      <div className='leaderboard'>
          {playersListSorted ? (
            playersListSorted.map((player) => {
              return (
                <div key={player.player_id} className='leaderboard-player'>
                  <h4>{player.name}</h4>
                  <h4>{player.victory_points}</h4>
                </div>
              )
            })
          ) : ''}
      </div>
      <div className='get-resource-actions'>
{/* ---------- GET RESOURCE ACTIONS ROW 1 ---------- */}
        <div>
          <span>
            <button onClick={() => setWood(wood += 1)}>Wood</button>
            <div className='button-footer'>
              <button onClick={() => setWood(wood -= 1)}>-1</button>
              <p>{wood}</p>
            </div>
          </span>
          <span>
            <button onClick={() => setSheep(sheep += 1)}>Sheep</button>
            <div className='button-footer'>
              <button onClick={() => setSheep(sheep -= 1)}>-1</button>
              <p>{sheep}</p>
            </div>
          </span>
          <span>
            <button onClick={() => setOre(ore += 1)}>Ore</button>
            <div className='button-footer'>
              <button onClick={() => setOre(ore -= 1)}>-1</button>
              <p>{ore}</p>
            </div>
          </span>
        </div>

{/* ---------- GET RESOURCE ACTIONS ROW 2 ---------- */}
        <div>
          <span>
            <button onClick={() => setBrick(brick += 1)}>Brick</button>
            <div className='button-footer'>
              <button onClick={() => setBrick(brick -= 1)}>-1</button>
              <p>{brick}</p>
            </div>
          </span>
          <span>
            <button onClick={() => setWheat(wheat += 1)}>Wheat</button>
            <div className='button-footer'>
              <button onClick={() => setWheat(wheat -= 1)}>-1</button>
              <p>{wheat}</p>
            </div>
          </span>
          <span>
            <button onClick={() => setVp(vp += 1)}>V.P.</button>
            <div className='button-footer'>
              <button onClick={() => setVp(vp -= 1)}>-1</button>
              <p>{vp}</p>
            </div>
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