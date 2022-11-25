import React, { useState } from 'react'
import { loginUser, registerUser } from '../utils/AuthApiCalls'
import {toast} from 'react-toastify'
import {Navigate} from 'react-router-dom'
import { authenticate } from '../utils/LocalStorage'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'


const AuthForm = () => {

    const [type,setType] = useState("login")
    const [inputs,setInputs] = useState({
        name: '',
        email: '',
        password: '',
        cPass: ''
    })

    const [isLoading,setIsLoading] = useState(false)

    const [success,setSuccess] = useState(false)

    const {name,password,email,cPass} = inputs

    const handleChange = (field,e) => {
        setInputs({...inputs,[field]: e.target.value})
    }

    const changeForm = (newType) => {
        setType(newType)
    }

    const registrationForm = () => (
        <form className="w-[350px] h-max pb-[20px] bg-purple-500 rounded-md flex flex-col">
            <h2 className="text-[24px] w-[100%] rounded-md bg-zinc-800 p-[5px] text-zinc-100">Register</h2>

            <label htmlFor="name" className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Name</label>
            <input value={name} onChange={e=>handleChange("name",e)} name='name' placeholder='Full name...' type="text" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="email"  className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Email</label>
            <input value={email} onChange={e=>handleChange("email",e)} name='email' placeholder='Email address...' type="email" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="password"  className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Password</label>
            <input value={password} onChange={e=>handleChange("password",e)} name='password' placeholder='Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="cPassword" className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Confirm Password</label>
            <input value={cPass} name='cPassword' onChange={e=>handleChange("cPass",e)} placeholder='Confirm Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />
            
            <p className="ml-[5px] mt-[10px]">Already have an account? <span className='text-indigo-900 font-[600] cursor-pointer' onClick={e=>changeForm("login")}>Login.</span></p>

            <button className='w-[340px] h-[40px] mt-[10px] mx-auto bg-blue-700 rounded-md text-zinc-100 text-[22px]' type="submit" onClick={register}>{isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : ("Register")}</button>
        </form>
    )

    const loginForm = () => (
        <form className="w-[350px] h-max pb-[20px] bg-purple-500 rounded-md flex flex-col">
            <h2 className="text-[24px] w-[100%] rounded-md bg-zinc-800 p-[5px] text-zinc-100">Login</h2>

            <label htmlFor="email"  className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Email</label>
            <input value={email} onChange={e=>handleChange("email",e)} name='email' placeholder='Email address...' type="email" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="password"  className='text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Password</label>
            <input value={password} onChange={e=>handleChange("password",e)} name='password' placeholder='Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[340px] h-[30px] mx-auto rounded-md" />
            
            <p className="ml-[5px] mt-[10px]">Don't have an account? <span className='text-indigo-900 font-[600] cursor-pointer' onClick={e=>changeForm("register")}>Register.</span></p>

            <button className='w-[340px] h-[40px] mt-[10px] mx-auto bg-blue-700 rounded-md text-zinc-100 text-[22px] flex items-center justify-center' type="submit" onClick={login}>{
                isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : ("Login")
            }</button>
        </form>
    )

    const login = e => {
        e.preventDefault()
        setIsLoading(true)
        loginUser({email: email,password: password}).then(data=>{
            if(!data?.response?.data?.error){
                if(authenticate(data)){
                    setSuccess(true)
                    setIsLoading(false)
                    return toast.success("Login success",{theme: "colored"})
                }else{
                    setIsLoading(false)
                    return toast.error("Login faild try again!",{theme: "colored"})
                }
            }else{
                setIsLoading(false)
                return toast.error(data.response.data.error,{theme: "colored"})
            }
        }).catch(err => {
            setIsLoading(false)
            return toast.error(err,{theme: "colored"})
        })
    }
    const register = e => {
        e.preventDefault()
        setIsLoading(true)
        registerUser({name,email,password}).then(data=>{
            if(!data?.response?.data?.error){
                setIsLoading(false)
                toast.success("Successfully registered. Login Now.",{theme: 'colored'})
                return setType("login")
            }
            setIsLoading(false)
            return toast.error(data.response.data.error,{theme: 'colored'})
        }).catch(err=>{
            setIsLoading(false)
            return toast.error(err,{theme: 'colored'})
        })
    }

  return (
    <div className='w-[100vw] h-[85vh] flex items-center justify-center'>
        {
            success && (<Navigate to={"/home"} />)
        }
        {
            type == "login" ? loginForm() : registrationForm()
        }
    </div>
  )
}

export default AuthForm