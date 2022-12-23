// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './PlayerCardCitiesKnights.css'

import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';
import { useSearchParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

const PlayerCardCitiesKnights = () => {

  const [items, setItems] = useState({
    wood: 0,
    sheep: 0,
    ore: 0,
    brick: 0,
    wheat: 0,
    paper: 0,
    cloth: 0,
    coin: 0
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
      if (item === 'wood' && player.items.wood >= 0) {
        player.items.wood++
      } 
      else if (item === 'paper' && player.items.wood >= 2) {
        player.items.wood -=2
        player.items.paper++
      } 
      else if (item === 'sheep' && player.items.sheep >= 0) {
        player.items.sheep++
      } 
      else if (item === 'cloth' && player.items.sheep >= 2) {
        player.items.sheep -= 2
        player.items.cloth++
      }
      else if (item === 'ore' && player.items.ore >= 0) {
        player.items.ore++
      } 
      else if (item === 'coin' && player.items.ore >= 2) {
        player.items.ore -= 2
        player.items.coin++
      }
      else if (item === 'brick' && player.items.brick >= 0) {
        player.items.brick++
      } 
      else if (item === 'wheat' && player.items.wheat >= 0) {
        player.items.wheat++
      } 
      else if (item === 'vp' && player.victory_points >= 0) {
        player.victory_points++
      } 
      else if (item === null || item === undefined) {
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
      if (item === 'wood' && player.items.wood > 0) {
        player.items.wood--
      }
      else if (item === 'paper' && player.items.paper > 0) {
        player.items.paper--
      }
      else if (item === 'sheep' && player.items.sheep > 0) {
        player.items.sheep--
      }
      else if (item === 'cloth' && player.items.cloth > 0) {
        player.items.cloth--
      }
      else if (item === 'ore' && player.items.ore > 0) {
        player.items.ore--
      }
      else if (item === 'coin' && player.items.coin > 0) {
        player.items.coin--
      }
      else if (item === 'brick' && player.items.brick > 0) {
        player.items.brick--
      } 
      else if (item === 'wheat' && player.items.wheat > 0) {
        player.items.wheat--
      } 
      else if (item === 'vp' && player.victory_points > 0) {
        player.victory_points--
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

  const handleInsufficientFunds = () => {
    setInsufficientFunds(true) 
    setTimeout(() => {
      setInsufficientFunds(false)
    }, 1500)
  }

  const handleClickBuy = async (item) => {
    players.map((player) => {
      if (player.player_id === playerId) {
        if (item === 'road') {
          if (player.items.wood >= 1 && player.items.brick >= 1) {
            player.items.wood--
            player.items.brick--
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'settlement') {
          if (player.items.wood >= 1 && player.items.brick >= 1 && player.items.sheep >= 1 && player.items.wheat >=1) {
            player.items.wood--
            player.items.brick--
            player.items.sheep--
            player.items.wheat--
            player.victory_points++
          } else {
            handleInsufficientFunds()
          } 
        } else if (item === 'city') {
          if (player.items.ore >= 3 && player.items.wheat >= 2) {
            player.items.ore -= 3
            player.items.wheat -= 2
            player.victory_points++
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'city wall') {
          if (player.items.brick >= 2) {
            player.items.brick -= 2
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'knight') {
          if (player.items.sheep >= 1 && player.items.ore >= 1) {
            player.items.sheep--
            player.items.ore--
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'activate-knight') {
          if (player.items.wheat >= 1) {
            player.items.wheat--
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'yellow-city-improvement') {
          if (player.items.cloth >= 1) {
            player.items.cloth--
          } else if (player.items.sheep >= 2) {
            player.items.sheep -= 2
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'blue-city-improvement') {
          if (player.items.coin >= 1) {
            player.items.coin--
          } else if (player.items.ore >= 2) {
            player.items.ore -= 2
          } else {
            handleInsufficientFunds()
          }
        } else if (item === 'green-city-improvement') {
          if (player.items.paper >= 1) {
            player.items.paper--
          } else if (player.items.wood >= 2) {
            player.items.wood -= 2
          } else {
            handleInsufficientFunds()
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
        <h3>Leaderboard</h3>
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
      <div className='get-resource-actions-cities-knights'>
{/* ---------- GET RESOURCE ACTIONS ROW 1 ---------- */}
        <div>
          <span>
            <div className='cities-button-footer'>
              <p>{items.wood}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('wood')}>Wood</button>
              <button onClick={() => handleDecrementItem('wood')}>-1</button>
            </div>
            <div className='cities-button-footer'>
              <p>{items.paper}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('paper')}>Paper</button>
              <button onClick={() => handleDecrementItem('paper')}>-1</button>
            </div>
          </span>
          <span>
            <div className='cities-button-footer'>
              <p>{items.sheep}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('sheep')}>Sheep</button>
              <button onClick={() => handleDecrementItem('sheep')}>-1</button>
            </div>
            <div className='cities-button-footer'>
              <p>{items.cloth}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('cloth')}>Cloth</button>
              <button onClick={() => handleDecrementItem('cloth')}>-1</button>
            </div>
          </span>
          <span>
            <div className='cities-button-footer'>
              <p>{items.ore}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('ore')}>Ore</button>
              <button onClick={() => handleDecrementItem('ore')}>-1</button>
            </div>
            <div className='cities-button-footer'>
              <p>{items.coin}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('coin')}>Coin</button>
              <button onClick={() => handleDecrementItem('coin')}>-1</button>
            </div>
          </span>
        </div>

{/* ---------- GET RESOURCE ACTIONS ROW 2 ---------- */}
        <div>
        <span>
            <div className='cities-button-footer'>
              <p>{items.brick}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('brick')}>Brick</button>
              <button onClick={() => handleDecrementItem('brick')}>-1</button>
            </div>
          </span>
          <span>
            <div className='cities-button-footer'>
              <p>{items.wheat}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('wheat')}>Wheat</button>
              <button onClick={() => handleDecrementItem('wheat')}>-1</button>
            </div>
          </span>
          <span>
            <div className='cities-button-footer'>
              <p>{vp}</p>
            </div>
            <div className='button-header'>
              <button onClick={() => handleClickItem('vp')}>V.P.</button>
              <button onClick={() => handleDecrementItem('vp')}>-1</button>
            </div>
          </span>
        </div>

      </div>
      <hr/>
{/* ----------  BUY ITEMS ---------- */}
      {insufficientFunds === true ? (
        <p>Insufficient Funds!</p>
      ) : ''}
      <div className='buy-items-cities-knights'>
        <div>
          <button onClick={() => handleClickBuy('road')}>Road</button>
          <button onClick={() => handleClickBuy('settlement')}>Settlement</button>
        </div>
        <div>
          <span className='city-buyers'>
            <button onClick={() => handleClickBuy('city')}>City</button>
            <button onClick={() => handleClickBuy('city wall')}>City Wall</button>
          </span>
          <span className='city-buyers'>
            <button onClick={() => handleClickBuy('knight')}>Knight</button>
            <button onClick={() => handleClickBuy('activate-knight')}>Activate Knight</button>
          </span>
        </div>
      </div>

      <div className='city-improvements'>
        <button onClick={() => handleClickBuy('yellow-city-improvement')}>Yellow City Improvement</button>
        <button onClick={() => handleClickBuy('blue-city-improvement')}>Blue City Improvement</button>
        <button onClick={() => handleClickBuy('green-city-improvement')}>Green City Improvement</button>
      </div>
      <Footer />
    </div>
  )
}

export default PlayerCardCitiesKnights