import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import Todo from './Todo'
import {RiSearchFill} from 'react-icons/ri'

const TodoContainer = () => {
    const [todos,setTodos] = useContext(TodoContext)
    const [searchQuery,setSearchQuery] = useState('')
    const [searchResults,setSearchResults] = useState([])

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
  return (
    <div className='w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] bg-purple-300 mt-[20px] rounded-md'>
        <form className='w-[90%] mx-[5%] relative top-[0px]'>
            <input className='w-[100%] rounded-full h-[35px] indent-[40px] outline-none placeholder:text-white text-white font-[600] bg-rose-400 shadow-lg' value={searchQuery} onChange={handleChange} type="text" placeholder='Search your todos...' />
            <RiSearchFill className='absolute text-white text-[24px] top-[6px] left-[10px]' />
        </form>
        {
            searchQuery !== '' && searchResults.length > 0 ? (
                searchResults.map((todo,index)=>(
                    <Todo todo={todo} key={index} />
                ))
            ) 
            : searchQuery !== '' && searchResults.length === 0 ? (
                <div className="w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] bg-purple-300 mt-[20px] rounded-md text-black flex items-center justify-center">
                    <p>No todos found!</p>
                </div>
            ) :  todos && todos.length > 0 ? (
                todos.map((todo,index)=>(
                    <Todo todo={todo} key={index} />
                ))

            ) : (
                <div className="w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] bg-purple-300 mt-[20px] rounded-md text-black flex items-center justify-center">
                    <p>Loading your todos...</p>
                </div>
            )
         }
    </div>
  )
}

export default TodoContainer