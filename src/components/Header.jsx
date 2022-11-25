import React, { useState } from 'react'
import {ImMenu} from 'react-icons/im'
import Menu from './Menu'

const Header = ({location="home"}) => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div className='w-[100vw] h-[70px] bg-purple-500 flex items-center justify-between shadow-lg'>
        <h3 className="text-[30px] text-white font-[700] ml-[30px]">TodoIsh</h3>
        {
            location === "home" || location === "profile" ? (
                <ImMenu onClick={toggleMenu} className='text-[30px] text-white mr-[30px] cursor-pointer' />
            ) : ''
        }
        {
            isMenuOpen && (<Menu />)
        }
    </div>
  )
}

export default Header