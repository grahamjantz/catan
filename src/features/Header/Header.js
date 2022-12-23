// @ts-nocheck
import React from 'react'

import './Header.css'

import { useNavigate } from 'react-router'

import logo from '../../images/settlers-of-catan-logo.png'

const Header = () => {
  
  const navigate = useNavigate()

  const handleClickHeader = () => {
    navigate('/')
  }

  return (
    <header onClick={handleClickHeader}>
      <img src={logo} alt='logo'/>
    </header>
  )
}

export default Header