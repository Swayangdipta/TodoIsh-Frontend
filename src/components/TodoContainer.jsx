import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import Todo from './Todo'

const TodoContainer = () => {
    const [todos,setTodos] = useContext(TodoContext)
  return (
    <div className='w-[80vw] min-h-[30vh] h-max mx-auto py-[20px] bg-purple-300 mt-[20px] rounded-md'>
        {
            todos && todos.length > 0 ? (
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