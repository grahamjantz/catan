// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './EndGame.css'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';

const EndGame = () => {

    const [playersListSorted, setPlayersListSorted] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()

    const roomId = searchParams.get('room_id')
    const navigate = useNavigate()

    useEffect(() => {
      const q = query(collection(dbFS, "rooms"), where("room_id", "==", roomId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const players= [];
        querySnapshot.forEach((doc) => {
          players.push(doc.data().players);
        });

        if (players[0] !== []) {
          const sort = players[0].sort((a, b) => b.active - a.active).sort((a, b) => b.victory_points - a.victory_points)
          setPlayersListSorted(sort)
        }
      });
      return () => {
        unsubscribe()
      }
    }, [roomId])

    const handleClickHome = () => {
      navigate('/')
    }

  return (
    <div className='end-game'>
      {playersListSorted[0] ? (
        <div>
          <h2>Winner: </h2>
          <h2>{playersListSorted[0].name}</h2>
        </div>
      ) : ''}
        {/* <div>
            <h2>Winner: </h2>
            <h2>{winner !== {} ? winner.name : ''}</h2>
        </div> */}
        <ul>
            {playersListSorted !== [] ? (
                playersListSorted.map((player) => {
                    return (
                        <li key={player.player_id}>
                            <h3>{player.name}</h3>
                            <h3>{player.victory_points}</h3>
                        </li>
                    )
                })
            ) : ''}
        </ul>
        <button onClick={handleClickHome}>Return to home</button>
    </div>
  )
}

export default EndGame