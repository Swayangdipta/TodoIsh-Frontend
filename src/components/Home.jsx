import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { isAuthenticated } from '../utils/LocalStorage'
import { getUserInfo } from '../utils/UserApiCalls'
import CreateTodoForm from './CreateTodoForm'
import Header from './Header'
import {toast} from 'react-toastify'
import TodoContainer from './TodoContainer'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const [todos,setTodos] = useContext(TodoContext)
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()

    useEffect(()=>{
        setIsLoading(true)
        getUserInfo(user._id).then(data=>{
            if(!data?.response?.data?.error){
                setTodos(data.todos);
                setIsLoading(false)
            }else{
                setIsLoading(false)
                toast.error('Faild to load your todos!',{theme: 'colored'})
            }
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
            toast.error(e,{theme: 'colored'})
        })
    },[])
  return (
    <>
        {
            !token && (<Navigate to={"/"} />)
        }
        <Header />
        <CreateTodoForm />
        <TodoContainer />
    </>
  )
}

export default Home