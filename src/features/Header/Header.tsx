import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
  
  const navigate = useNavigate()

  const handleClickHeader = () => {
    navigate('/')
  }

  return (
    <header onClick={handleClickHeader}>Header</header>
  )
}

export default Header