import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logoutUser } from '../utils/AuthApiCalls'
import { removeAuthentication } from '../utils/LocalStorage'

const Menu = ({location="home"}) => {

  const [isRedirect,setIsRedirect] = useState(false)

  const handleLogout = e => {
    logoutUser().then(data=>{
      if(!data?.response?.data?.error || data?.name !== "AxiosError"){
        removeAuthentication()
        setIsRedirect(true)
        return toast.success("User signed out.",{theme: 'colored'})
      }
    })
  }

  return (
    <div className='absolute rounded-lg top-[80px] right-[10px] sm:right-[30px] w-[250px] sm:w-[300px] h-max pb-[20px] max-h-[200px] dark:bg-slate-700 bg-purple-500'>
      {
        isRedirect && (<Navigate to={"/"} />)
      }
      {
        location !== "home" ? (
          <Link to="/home" ><div className="w-[90%] h-[35px] bg-purple-300 rounded-lg mx-auto mt-[10px] cursor-pointer flex items-center justify-center text-[22px] text-zinc-900">Home</div></Link>
        ) : (
          <Link to="/profile" ><div className="w-[90%] h-[35px] bg-purple-300 rounded-lg mx-auto mt-[10px] cursor-pointer flex items-center justify-center text-[22px] text-zinc-900">Profile</div></Link>
        )
      }
      <div onClick={handleLogout} className="w-[90%] h-[35px] bg-rose-600 rounded-lg mx-auto mt-[10px] cursor-pointer flex items-center justify-center text-[22px] text-zinc-200">Logout</div>
    </div>
  )
}

export default Menu