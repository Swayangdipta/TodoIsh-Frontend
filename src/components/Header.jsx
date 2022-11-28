import React, { useState } from 'react'
import {ImMenu} from 'react-icons/im'
import Menu from './Menu'
import {BsToggle2On,BsToggle2Off} from 'react-icons/bs'

const Header = ({location="home",darkToggle,setDarkToggle=f=>f}) => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div className='w-[100vw] h-[70px] dark:bg-slate-900 bg-purple-500 flex items-center justify-between shadow-lg'>
        <h3 className="text-[30px] text-white font-[700] ml-[30px]">TodoIsh</h3>
        <div className='flex'>
            {
                darkToggle ? (<BsToggle2On onClick={e=>setDarkToggle(!darkToggle)} className='text-[30px] text-white mr-[30px] cursor-pointer' />) : (<BsToggle2Off onClick={e=>setDarkToggle(!darkToggle)} className='text-[30px] text-white mr-[30px] cursor-pointer' />)
            }
            {
                location === "home" || location === "profile" ? (
                    <ImMenu onClick={toggleMenu} className='text-[30px] text-white mr-[30px] cursor-pointer' />
                ) : ''
            }            
        </div>

        {
            isMenuOpen && (<Menu />)
        }
    </div>
  )
}

export default Header