import React from 'react';
import './App.css'

import Header from './features/Header/Header'
import Footer from './features/Footer/Footer'
import EnterPlayerInfo from './features/EnterPlayerInfo/EnterPlayerInfo'
import InitializeApp from './features/InitializeApp/InitializeApp'
import JoinRoom from './features/JoinRoom/JoinRoom'
import PlayerCard from './features/PlayerCard/PlayerCard'
import SetVP from './features/SetVP/SetVP'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<InitializeApp />}></Route>
        <Route path='/join-room' element={<JoinRoom />}></Route>
        <Route path='/enter-player-info' element={<EnterPlayerInfo />}></Route>
        <Route path='/player-card' element={<PlayerCard />}></Route>
        <Route path='/set-vp' element={<SetVP />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
