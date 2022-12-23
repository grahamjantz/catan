import React from 'react';
import './App.css'

import Header from './features/Header/Header'
import EnterPlayerInfo from './features/EnterPlayerInfo/EnterPlayerInfo';
import InitializeApp from './features/InitializeApp/InitializeApp'
import JoinRoom from './features/JoinRoom/JoinRoom'
import PlayerCardBase from './features/PlayerCardBase/PlayerCardBase'
import PlayerCardCitiesKnights from './features/PlayerCardCitiesKnights/PlayerCardCitiesKnights'
import SetVP from './features/SetVP/SetVP'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import SelectExpansion from './features/SelectExpansion/SelectExpansion';
import EndGame from './features/EndGame/EndGame';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<InitializeApp />}></Route>
        <Route path='/join-room' element={<JoinRoom />}></Route>
        <Route path='/set-vp' element={<SetVP />}></Route>
        <Route path='/select-expansion' element={<SelectExpansion />}></Route>
        <Route path='/enter-player-info' element={<EnterPlayerInfo />}></Route>
        <Route path='/player-card-base' element={<PlayerCardBase />}></Route>
        <Route path='/player-card-cities-knights' element={<PlayerCardCitiesKnights />}></Route>
        <Route path='/end-game' element={<EndGame />}></Route>
      </Routes>
    </div>
  );
}

export default App;
