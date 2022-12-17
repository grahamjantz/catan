import React, { useEffect, useState } from 'react'
import './PlayerCard.css'

import { collection, query, where, onSnapshot, DocumentData } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';
import { useSearchParams } from 'react-router-dom';

const PlayerCard = () => {

  let [wood, setWood] = useState<number>(0)
  let [sheep, setSheep] = useState<number>(0)
  let [ore, setOre] = useState<number>(0)
  let [brick, setBrick] = useState<number>(0)
  let [wheat, setWheat] = useState<number>(0)
  let [vp, setVp] = useState<number>(0)
  const [insufficientFunds, setInsufficientFunds] = useState<boolean>(false)
  const [players, setPlayers] = useState<any[]>()
  const [playersListSorted, setPlayersListSorted] = useState()

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')
  let id:string;
  if (roomId !== null) {
    id = roomId.toString().toUpperCase()
  }
  // console.log(id)
  const playerId = searchParams.get('player_id')
  
  useEffect(() => {
    const q = query(collection(dbFS, "rooms"), where("room_id", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
          players.push(doc.data());
      });
      setPlayers(players)
      console.log(players)
      if (players) {
        // const sort = players.sort((a:number, b: number) => b.victory_points - a.victory_points).sort((a: boolean, b: boolean) => b.active - a.active)
        // setPlayersListSorted(sort)
      }
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])

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