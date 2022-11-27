import React from 'react'
import {Navigate} from 'react-router-dom'
import { isAuthenticated } from '../utils/LocalStorage'
import AuthForm from './AuthForm'
import Header from './Header'

const AuthSection = ({darkToggle,setDarkToggle=f=>f}) => {

    const {user} = isAuthenticated()
  return (
    <>
        {user && (<Navigate to={"/home"} />)}
        <Header location='auth' darkToggle={darkToggle} setDarkToggle={setDarkToggle} />
        <AuthForm />
    </>
  )
}

export default AuthSection