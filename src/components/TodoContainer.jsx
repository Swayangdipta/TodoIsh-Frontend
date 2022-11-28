import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import Todo from './Todo'
import {RiSearchFill} from 'react-icons/ri'

const TodoContainer = () => {
    const [todos,setTodos] = useContext(TodoContext)
    const [searchQuery,setSearchQuery] = useState('')
    const [searchResults,setSearchResults] = useState([])
    const [sortBy,setSortBy] = useState("old")

    const handleChange = e => {
        setSearchQuery(e.target.value)
        setSearchResults([])
        let newRegEx = new RegExp(e.target.value,'gi')
        todos.map(todo => {
            if(todo.title.match(newRegEx)){
                setSearchResults(prev => [...prev,todo])
            }
        })
    }

    const handleSort = e => {
        setSortBy(e.target.value)
    }


    useEffect(()=>{
        if(sortBy === "old"){
            setTodos(prev => [...prev.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))])
        }else{
            setTodos(prev => [...prev.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))])
        }
    },[sortBy])
  return (
    <div className='w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] dark:bg-stone-700 bg-purple-300 mt-[20px] rounded-md'>
        <form className='w-[90%] flex justify-between gap-[10px] mx-[5%] relative top-[0px]'>
            <div className='w-[80%]'>
                <input className='w-[100%] rounded-full h-[35px] indent-[40px] outline-none placeholder:text-white text-white font-[600] dark:bg-slate-900 bg-rose-400 shadow-lg' value={searchQuery} onChange={handleChange} type="text" placeholder='Search your todos...' />
                <RiSearchFill className='absolute text-white text-[24px] top-[6px] left-[10px]' />                
            </div>

            <select value={sortBy} onChange={handleSort} className="w-[20%] cursor-pointer dark:bg-zinc-900 bg-emerald-600 text-white rounded-full px-[5px] outline-none" name="sort" id="sort">
                <option value="old">Oldest</option>
                <option value="new">Latest</option>
            </select>

        </form>
        {
            searchQuery !== '' && searchResults.length > 0 ? (
                searchResults.map((todo,index)=>(
                    <Todo todo={todo} key={index} />
                ))
            ) 
            : searchQuery !== '' && searchResults.length === 0 ? (
                <div className="w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] dark:bg-stone-700 bg-purple-300 mt-[20px] rounded-md text-black flex items-center justify-center">
                    <p>No todos found!</p>
                </div>
            ) :  todos && todos.length > 0 ? (
                todos.map((todo,index)=>(
                    <Todo todo={todo} key={index} />
                ))

            ) : (
                <div className="w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] dark:bg-stone-700 bg-purple-300 mt-[20px] rounded-md text-black flex items-center justify-center">
                    <p>Loading your todos...</p>
                </div>
            )
         }
    </div>
  )
}

export default TodoContainer