import React, { useContext, useState } from 'react'
import {MdExpandMore} from 'react-icons/md'
import {AiFillDelete,AiTwotoneEdit,AiOutlineClose,AiOutlineLoading3Quarters} from 'react-icons/ai'
import {BiCheckDouble} from 'react-icons/bi'
import {FaCheck} from 'react-icons/fa'
import { editTodo, removeTodo } from '../utils/TodoApiCalls'
import { isAuthenticated } from '../utils/LocalStorage'
import { toast } from 'react-toastify'
import { TodoContext } from '../context/TodoContext'

const Todo = ({todo}) => {
    const [todos,setTodos] = useContext(TodoContext)
    const [isExpanded,setIsExpanded] = useState(false)
    const [isEditOpen,setIsEditOpen] = useState(false)
    const {user,token} = isAuthenticated()
    const [updateInputs,setUpdateInputs] = useState({
        title: todo.title,
        tasks: todo.tasks,
        isCompleted: todo.isCompleted,
        task: ''
    })
    const [isLoading,setIsLoading] = useState(false)

    const {title,task,tasks} = updateInputs

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
            setIsEditOpen(true)
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
        setIsLoading(true)
        editTodo(todo._id,user._id,token,todo).then(response => {
            if(!response?.response?.data?.error){
                toast.success("Todo updated.",{theme: "colored"})
                setIsLoading(false)
                return true
            }else{
                toast.error(response?.response?.data?.error,{theme: "colored"})
                setIsLoading(false)
                return false
            }
        }).catch(e=>{
            toast.error(e,{theme: "colored"})
            setIsLoading(false)
            return false
        })
    }

    const handleChange = (field,e) => {
        setUpdateInputs({...updateInputs,[field]: e.target.value})
    }

    const addTask = e => {
        e.preventDefault()
        if(task === ''){
            toast.error("Cannot add empty task!",{theme: "colored"})
            return false
        }
        setUpdateInputs({...updateInputs,tasks: [...tasks,task],task: ''})
    }

    const handleTaskRemove = (taskToRemove,e) => {
        e.preventDefault()
        setUpdateInputs(prev => {
           return {...prev,tasks: tasks.filter(t => t !== taskToRemove)}
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        todo.title = title;
        todo.tasks = tasks
        
        if(separatedEditTodo()){
            let newTodos = todos.map(t => {
                if(t._id === todo._id){
                    return todo
                }else{
                    return t
                }
            })
            setTodos(newTodos)
            setIsEditOpen(false)
        }
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
        {
            isEditOpen && (
                <div className='z-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm'>
                    <div className='dark:bg-slate-800 shadow-xl rounded-md bg-purple-600 w-[500px] min-h-[300px] max-h-max pb-[20px]'>
                        <div className='dark:bg-black bg-purple-900 rounded-t-md flex items-center justify-between h-[50px]'>
                            <h2 className='text-[20px]'>Update</h2>
                            <div onClick={e=>setIsEditOpen(false)} className=' cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full bg-rose-600 text-[20px] mr-[10px]'><AiOutlineClose /></div>
                        </div>
                        <form className='w-[100%] flex justify-center gap-[20px]'>
                        <div className="formLeft flex flex-col w-[90%] mt-[20px]">
                            <input value={title} onChange={e=>handleChange("title",e)} type="text" placeholder='Type your todo here...' className='outline-none rounded-md indent-[10px] h-[30px] text-black' />
                            <div className='flex w-[100%] gap-[7px]'>
                            <input value={task} onChange={e=>handleChange("task",e)} type="text" placeholder='Type your tasks here...' className='outline-none rounded-md indent-[10px] w-[100%] h-[30px] mt-[10px] text-black'/>                
                            <button className='w-[150px] h-[30px] mt-[10px] flex items-center justify-center dark:bg-slate-700 dark:text-slate-200 bg-lime-400 font-[500] text-[#371458] rounded-md' onClick={addTask}>Add task</button>
                            </div>
                        </div>
                        </form>

                        <div className='w-full max-h-[200px] mt-[30px] overflow-scroll overflow-x-hidden'>
                            {
                                tasks.length > 0 && tasks.map((task,index)=>(
                                    <div key={index} className="task mx-auto mt-[5px] w-[90%] h-max p-[5px] pr-[0px] dark:bg-zinc-700 bg-purple-800 rounded-md flex items-center justify-between gap-[10px] text-white relative">
                                        <p>{task}</p>
                                        <div onClick={e=>handleTaskRemove(task,e)} className='cursor-pointer rounded-r-md hover:bg-rose-800 h-full w-[30px] flex items-center justify-center bg-rose-600 absolute top-0 right-0'><AiOutlineClose /></div>
                                    </div>
                                ))
                            }
                        </div>

                        <button onClick={handleUpdate} className='w-[90%] h-[40px] mx-[5%] mt-[10px] rounded-md dark:bg-black bg-purple-900 outline-none flex items-center justify-center'>{isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : ("Update Todo")}</button>
                    </div>
                </div>
            )
        }
    </div>

    </>
  )
}

export default Todo