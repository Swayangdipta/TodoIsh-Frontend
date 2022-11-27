import React, { useContext, useState } from 'react'
import {FaPlus} from 'react-icons/fa'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { isAuthenticated } from '../utils/LocalStorage'
import { createTodo, getTodo } from '../utils/TodoApiCalls'
import {toast} from 'react-toastify'
import { TodoContext } from '../context/TodoContext'

const CreateTodoForm = () => {
    const [inputs,setInputs] = useState({
        title: '',
        tasks: [],
        task: ''
    })
    const [isLoading,setIsLoading] = useState(false)
    const [todos,setTodos] = useContext(TodoContext)
    const {title,tasks,task} = inputs
    const {user,token} = isAuthenticated()

    const handleChange = (field,e) => {
        setInputs({...inputs,[field]: e.target.value})
    }

    const addTask = e => {
        e.preventDefault()
        // let tempTask = {
        //     title: task,
        //     isCompleted: false
        // }
        if(task === ''){
            toast.error("Cannot add empty task!",{theme: "colored"})
            return false
        }
        setInputs({...inputs,tasks: [...tasks,task],task: ''})
    }

    const addTodo = e => {
        e.preventDefault()
        if(title.length === 0){
            toast.error("Todo title can not be empty!",{theme: 'colored'})
            return false
        }
        setIsLoading(true)
        createTodo({title,tasks},user._id,token).then(data=>{
            if(!data?.response?.data?.error && data?.name !== "AxiosError"){
                getTodo(data.todoId).then(todo=>{
                    if(todos){
                        if(todos.length > 0){
                            setTodos(prev => [...prev,todo])
                        }else{
                            setTodos([...todos,todo])
                        }
                    }
                })
                setInputs({...inputs,tasks: [],task: '',title: ''})
                setIsLoading(false)
                return toast.success("Todo created.",{theme: 'colored'})
            }else{
                if(data?.name === "AxiosError"){
                    return toast.error(data?.message,{theme: 'colored'})
                }
                setIsLoading(false)
                return toast.error(data?.response?.data?.error,{theme: 'colored'})
            }
        }).catch(err=>{
            setIsLoading(false)
            return toast.error(err.message,{theme: "colored"})
        })
    }
  return (
    <div className='w-[80vw] h-[200px] dark:bg-zinc-900 bg-purple-400 rounded-md mx-auto mt-[30px]'>
        <form className='w-[100%] flex justify-center gap-[20px]'>
            <div className="formLeft flex flex-col w-[70%] mt-[20px]">
                <input value={title} onChange={e=>handleChange("title",e)} type="text" placeholder='Type your todo here...' className='outline-none rounded-md indent-[10px] h-[30px]' />
                <div className='flex w-[100%] gap-[7px]'>
                <input value={task} onChange={e=>handleChange("task",e)} type="text" placeholder='Type your tasks here...' className='outline-none rounded-md indent-[10px] w-[100%] h-[30px] mt-[10px]'/>                
                <button className='w-[150px] h-[30px] mt-[10px] flex items-center justify-center bg-lime-400 font-[500] text-[#371458] rounded-md' onClick={addTask}>Add task</button>
                </div>
            </div>
            <button onClick={addTodo} className='mt-[20px] w-[70px] h-[70px] bg-amber-300 text-purple-700 rounded-md shadow-lg hover:shadow-none flex items-center justify-center text-[30px]'>{
                isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : (<FaPlus />)
            }</button>
        </form>

        <div className="taskWrapper mt-[20px] h-[80px] overflow-scroll overflow-x-hidden">
            {
                tasks.map((task,index)=>(
                    <div key={index} className="task mx-auto mt-[5px] w-[80%] h-max p-[5px] bg-purple-600 rounded-md flex items-center text-white">{task}</div>
                ))
            }
        </div>
    </div>
  )
}

export default CreateTodoForm