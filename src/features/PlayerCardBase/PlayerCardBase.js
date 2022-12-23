// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './PlayerCardBase.css'

import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';
import { useSearchParams } from 'react-router-dom';

const PlayerCardBase = () => {

  const [items, setItems] = useState({
    wood: 0,
    sheep: 0,
    ore: 0,
    brick: 0,
    wheat: 0
  })
  const [vp, setVp] = useState(0)
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
        players[0].map((player) => {
          if (player.player_id === playerId) {
            setItems(player.items)
            setVp(player.victory_points)
          }
          return ''
        })
      }
    });
    return () => {
      unsubscribe()
    }
  }, [roomId, playerId])


  const updatePlayers = async () => {
    const docRef = doc(dbFS, 'rooms', roomId)
    await updateDoc(docRef, {
      'players': players
    })
  }

/* ---------- CLICK GET ITEMS ---------- */

const handleClickItem = async (item) => {
  players.map((player) => {
    if (player.player_id === playerId) {
      if (item === 'wood') {
        if (player.items.wood >= 0) {
          player.items.wood++
        }
      } else if (item === 'sheep') {
        if (player.items.sheep >= 0) {
          player.items.sheep++
        }
      } else if (item === 'ore') {
        if (player.items.ore >= 0) {
          player.items.ore++
        }
      } else if (item === 'brick') {
        if (player.items.brick >= 0) {
          player.items.brick++
        }
      } else if (item === 'wheat') {
        if (player.items.wheat >= 0) {
          player.items.wheat++
        }
      } else if (item === 'vp') {
        if (player.victory_points >= 0) {
          player.victory_points++
        }
      } else if (item === null || item === undefined) {
        return 0
      } 
      updatePlayers()
    }
    return ''
  })
}

const handleDecrementItem = async (item) => {
  players.map((player) => {
    if (player.player_id === playerId) {
      if (item === 'wood') {
        if (player.items.wood > 0) {
          player.items.wood--
        }
      } else if (item === 'sheep') {
        if (player.items.sheep > 0) {
          player.items.sheep--
        }
      } else if (item === 'ore') {
        if (player.items.ore > 0) {
          player.items.ore--
        }
      } else if (item === 'brick') {
        if (player.items.brick > 0) {
          player.items.brick--
        }
      } else if (item === 'wheat') {
        if (player.items.wheat > 0) {
          player.items.wheat--
        }
      } else if (item === 'vp') {
        if (player.victory_points > 0) {
          player.victory_points--
        }
      } 
      else if (item === null || item === undefined) {
        return 0
      } 
      updatePlayers()
    }
    return ''
  })
}


/* ---------- CLICK BUY ACTIONS ---------- */

  const handleClickBuy = async (item) => {
    players.map((player) => {
      if (player.player_id === playerId) {
        if (item === 'road') {
          if (player.items.wood >= 1 && player.items.brick >= 1) {
            player.items.wood--
            player.items.brick--
          } else {
            setInsufficientFunds(true) 
            setTimeout(() => {
              setInsufficientFunds(false)
            }, 1500)
          }
        } else if (item === 'settlement') {
          if (player.items.wood >= 1 && player.items.brick >= 1 && player.items.sheep >= 1 && player.items.wheat >=1) {
            player.items.wood--
            player.items.brick--
            player.items.sheep--
            player.items.wheat--
            player.victory_points++
          } else {
            setInsufficientFunds(true) 
            setTimeout(() => {
              setInsufficientFunds(false)
            }, 1500)
          } 
        } else if (item === 'city') {
          if (player.items.ore >= 3 && player.items.wheat >= 2) {
            player.items.ore -= 3
            player.items.wheat -= 2
            player.victory_points++
          } else {
            setInsufficientFunds(true) 
            setTimeout(() => {
              setInsufficientFunds(false)
            }, 1500)
          }
        } else if (item === 'dev card') {
          if (player.items.sheep >= 1 && player.items.wheat >= 1 && player.items.ore >= 1) {
            player.items.sheep--
            player.items.wheat--
            player.items.ore--
          } else {
            setInsufficientFunds(true) 
            setTimeout(() => {
              setInsufficientFunds(false)
            }, 1500)
          }
        }
      }
      updatePlayers()
      return ''
    })
  }


  return (
    <div className='player-card'>
      <div className='leaderboard'>
        <h2>Leaderboard</h2>
          {playersListSorted ? (
            playersListSorted.map((player) => {
              return (
                <div key={player.player_id} className={`leaderboard-player ${player.victory_points >= 10 ? 'winner' : ''}`}>
                  <h4>{player.name}</h4>
                  <h4>{player.victory_points}</h4>
                </div>
              )
            })
          ) : ''}
      </div>
{/* ----------  GET RESOURCES ---------- */}
      <div className='get-resource-actions'>
{/* ---------- GET RESOURCE ACTIONS ROW 1 ---------- */}
        <div>
          <span>
            <button onClick={() => handleClickItem('wood')} className='wood'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('wood')}>-1</button>
              <p>{items.wood}</p>
            </div>
          </span>
          <span>
            <button onClick={() => handleClickItem('sheep')} className='sheep'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('sheep')}>-1</button>
              <p>{items.sheep}</p>
            </div>
          </span>
          <span>
            <button onClick={() => handleClickItem('ore')} className='ore'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('ore')}>-1</button>
              <p>{items.ore}</p>
            </div>
          </span>
        </div>

{/* ---------- GET RESOURCE ACTIONS ROW 2 ---------- */}
        <div>
          <span>
            <button onClick={() => handleClickItem('brick')} className='brick'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('brick')}>-1</button>
              <p>{items.brick}</p>
            </div>
          </span>
          <span>
            <button onClick={() => handleClickItem('wheat')} className='wheat'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('wheat')}>-1</button>
              <p>{items.wheat}</p>
            </div>
          </span>
          <span>
            <button onClick={() => handleClickItem('vp')} className='vp'></button>
            <div className='button-footer'>
              <button onClick={() => handleDecrementItem('vp')}>-1</button>
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
        <div>
          <button onClick={() => handleClickBuy('road')}>Road</button>
          <button onClick={() => handleClickBuy('settlement')}>Settlement</button>
        </div>
        <div>
          <button onClick={() => handleClickBuy('city')}>City</button>
          <button onClick={() => handleClickBuy('dev card')}>Dev. Card</button>
        </div>
      </div>
    </div>
  )
}

export default PlayerCardBase