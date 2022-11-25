import React from 'react'

const Menu = ({location="home"}) => {
  return (
    <div className='absolute rounded-lg top-[80px] right-[30px] w-[300px] h-max pb-[20px] max-h-[200px] bg-purple-500'>
    <div className="w-[90%] h-[35px] bg-purple-300 rounded-lg mx-auto mt-[10px] cursor-pointer flex items-center justify-center text-[22px] text-zinc-900">Profile</div>
    <div className="w-[90%] h-[35px] bg-rose-600 rounded-lg mx-auto mt-[10px] cursor-pointer flex items-center justify-center text-[22px] text-zinc-200">Logout</div>
    </div>
  )
}

export default Menu