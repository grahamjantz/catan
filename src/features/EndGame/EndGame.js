// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './EndGame.css'

import { useSearchParams } from 'react-router-dom'

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { dbFS } from '../SetVP/SetVP';

const EndGame = () => {

    const [players, setPlayers] = useState([])
    const [playersListSorted, setPlayersListSorted] = useState([])
    console.log(players)

    const [searchParams, setSearchParams] = useSearchParams()

    const roomId = searchParams.get('room_id')

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

  return (
    <div className='end-game'>
        <div>
            <h2>Winner: </h2>
            <h2>{playersListSorted ? playersListSorted[0].name : ''}</h2>
        </div>
        <ul>
            {playersListSorted !== [] ? (
                playersListSorted.map((player) => {
                    return (
                        <li>
                            <h3>{player.name}</h3>
                            <h3>{player.victory_points}</h3>
                        </li>
                    )
                })
            ) : ''}
        </ul>
    </div>
  )
}

export default EndGame