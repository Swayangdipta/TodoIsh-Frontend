import React, { useContext, useState } from 'react'
import {MdExpandMore} from 'react-icons/md'
import {AiFillDelete,AiTwotoneEdit} from 'react-icons/ai'
import {BiCheckDouble} from 'react-icons/bi'
import {FaCheck} from 'react-icons/fa'
import { editTodo, removeTodo } from '../utils/TodoApiCalls'
import { isAuthenticated } from '../utils/LocalStorage'
import { toast } from 'react-toastify'
import { TodoContext } from '../context/TodoContext'

const Todo = ({todo}) => {
    const [todos,setTodos] = useContext(TodoContext)
    const [isExpanded,setIsExpanded] = useState(false)
    const {user,token} = isAuthenticated()


    const handleTodoDelete = e => {
        e.preventDefault()
        removeTodo(todo._id,user._id,token).then(data=>{
            if(!data?.response?.data?.error && data?.name !== "AxiosError"){
                setTodos(prevTodos => {
                    return prevTodos.filter(tempTodo => tempTodo._id !== todo._id)
                })
                return toast.success("Todo Removed.",{theme: 'colored'})
            }else{
                if(data?.name === "AxiosError"){
                    return toast.error(data.message,{theme: "colored"})
                }

                return toast.error(data?.response?.data?.error,{theme: 'colored'})
            }
        })
    }

    const editThisTodo = (type,item) => {
        if(type === "all"){

        }else if(type === "status"){
            todo.isCompleted = true
            let newTodos = todos.map(t => {
                if(t._id === todo._id){
                    return todo
                }else{
                    return t
                }
            })
            setTodos(newTodos)
            separatedEditTodo()
        }else{
            todo.tasks = todo.tasks.filter(t=> t !== item);
            let newTodos = todos.map(t => {
                if(t._id === todo._id){
                    return todo
                }else{
                    return t
                }
            })
            setTodos(newTodos)
            separatedEditTodo()
        }
    }

    const separatedEditTodo = () => {
        editTodo(todo._id,user._id,token,todo).then(response => {
            if(!response?.response?.data?.error){
                toast.success("Todo updated.",{theme: "colored"})
            }else{
                toast.error(response?.response?.data?.error,{theme: "colored"})
            }
        }).catch(e=>{
            return toast.error(e,{theme: "colored"})
        })
    }

  return (
    <>
    <div className={`w-[90%] relative mx-auto min-h-[40px] h-max mt-[10px] ${todo?.isCompleted ? ("dark:bg-stone-600 bg-purple-500") : ("dark:bg-stone-900 bg-purple-700")} rounded-md indent-[10px] text-white`}>
        <div className='flex w-[100%] h-[100%] py-[5px] items-center justify-between'>
            <h3 className={`${todo.isCompleted ? ("line-through") : ("")}`}>{todo.title}</h3>
            <div className='flex gap-[20px] mr-[10px]'>
                <div onClick={e=>setIsExpanded(!isExpanded)} className=' flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white'>
                    <MdExpandMore className='text-[36px] cursor-pointer text-black' />
                </div>

                {
                    !todo.isCompleted && (
                        <div onClick={e=>editThisTodo("status")} className=' flex items-center justify-center w-[30px] h-[30px] rounded-full bg-teal-500'>
                            <BiCheckDouble className='text-[36px] cursor-pointer text-black' />
                        </div>         
                    )
                }

                <div onClick={e=>editThisTodo("all","")} className=' flex items-center justify-center w-[30px] h-[30px] rounded-full bg-emerald-500'>
                    <AiTwotoneEdit className='text-[20px] cursor-pointer text-black' />
                </div>

                <div onClick={handleTodoDelete} className=' flex items-center justify-center w-[30px] h-[30px] rounded-md bg-rose-600'>
                    <AiFillDelete className='text-[20px] cursor-pointer text-white' />
                </div>
            </div>
        </div>

        {
            isExpanded && (
                <div className='w-[100%] dark:bg-stone-800 bg-purple-500 relative top-[0px] h-max py-[5px]'>
                    {
                        todo.tasks.map((task,index)=>(
                            <div className='relative flex items-center justify-between gap-[10px] w-[98%] mx-[1%] indent-[0px] mb-[5px] h-max p-[5px] dark:bg-stone-900 bg-purple-700 rounded-md' key={index}>
                                <p>{task}</p>
                                <p onClick={e=> editThisTodo("task",task)} className='absolute h-full flex items-center justify-center rounded-r-md cursor-pointer right-0 top-0 w-[30px] bg-emerald-500'><FaCheck /></p>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>

    </>
  )
}

export default Todo