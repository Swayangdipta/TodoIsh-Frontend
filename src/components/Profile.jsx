import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TodoContext } from '../context/TodoContext'
import { isAuthenticated } from '../utils/LocalStorage'
import Header from './Header'

const Profile = ({darkToggle,setDarkToggle=f=>f}) => {
    const [todos,setTodos] = useContext(TodoContext)
    const [separetedTodos,setSeparatedTodos] = useState({
        complete: [],
        incomplete: []
    })
    const {user,token} = isAuthenticated()
    const [isPopUpOpen,setIsPopUpOpen] = useState(false)
    const {complete,incomplete} = separetedTodos

    // useEffect(() => {
    //     todos.map(todo => {
    //         console.log(todo);
    //         if(todo.isCompleted){
    //             setSeparatedTodos({...separetedTodos,complete: [...complete,todo]})
    //         }else{
    //             setSeparatedTodos({...separetedTodos,incomplete: [...incomplete,todo]})
    //         }
    //     })
    // },[])
  return (
    <div>
        {
            (!user || !token) && (<Navigate to="/" />)
        }
        <Header darkToggle={darkToggle} setDarkToggle={setDarkToggle} location="profile" />

        <div className="top w-[95%] mx-[2.5%] flex flex-col sm:flex-row gap-[30px] justify-between mt-[30px]">
            <div className='w-[98%] sm:w-[60%] lg:w-[40%] h-[300px] rounded-md dark:bg-slate-900 bg-purple-500 text-white relative'>
                <div className='w-[90%] mx-[5%] flex justify-between'> 
                    <div>
                        <div className=' mt-[20px]'>
                            <h1 className='text-[24px] underline text-teal-400'>Name</h1>
                            <h3 className='text-[20px]'>{user.name}</h3>
                        </div>
                        <div className='mt-[20px]'>
                            <h1 className='text-[24px] underline text-teal-400'>Email</h1>
                            <h3 className='text-[20px]'>{user.email}</h3>
                        </div>  
                    </div>
                    <img className='w-[80px] sm:w-[150px] mt-[20px]' src={`https://avatars.dicebear.com/api/bottts/${user.name.split(" ")[0]}.svg`} alt="" />                
                </div>

                <button disabled onClick={e=>{
                    e.preventDefault()

                }} className='cursor-not-allowed w-[90%] h-[35px] rounded-md dark:bg-rose-700 bg-rose-600 absolute bottom-[10px] left-[5%]'>Delete All Todos</button>
            </div>
            {/* <div className=''>
                <div className=''>
                    <h1>All Todos</h1>
                    <h3>{todos.length}</h3>
                </div>
                <div className=''>
                    <h1>Complete</h1>
                    <h3>{complete.length}</h3>
                </div>
                <div className=''>
                    <h1>Incomplete</h1>
                    <h3>{incomplete.length}</h3>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Profile