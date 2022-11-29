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
        <form className="w-[280px] sm:w-[350px] h-max pb-[20px] dark:bg-stone-900 bg-purple-500 rounded-md flex flex-col">
            <h2 className="text-[24px] w-[100%] rounded-md dark:bg-black bg-zinc-800 p-[5px] text-zinc-100">Register</h2>

            <label htmlFor="name" className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Name</label>
            <input id='name' value={name} onChange={e=>handleChange("name",e)} name='name' placeholder='Full name...' type="text" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="email"  className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Email</label>
            <input id='email' value={email} onChange={e=>handleChange("email",e)} name='email' placeholder='Email address...' type="email" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="password"  className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Password</label>
            <input id='password' value={password} onChange={e=>handleChange("password",e)} name='password' placeholder='Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="cPassword" className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Confirm Password</label>
            <input id='confirmPassword' value={cPass} name='cPassword' onChange={e=>handleChange("cPass",e)} placeholder='Confirm Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />
            
            <p className="ml-[5px] mt-[10px] dark:text-stone-200">Already have an account? <span className='dark:text-indigo-400 text-indigo-900 font-[600] cursor-pointer' onClick={e=>changeForm("login")}>Login.</span></p>

            <button className='w-[270px] sm:w-[340px] h-[40px] mt-[10px] mx-auto bg-blue-700 rounded-md text-zinc-100 text-[22px] flex items-center justify-center' type="submit" onClick={register}>{isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : ("Register")}</button>
        </form>
    )

    const loginForm = () => (
        <form className="w-[280px] sm:w-[350px] h-max pb-[20px] dark:bg-stone-900 bg-purple-500 rounded-md flex flex-col">
            <h2 className="text-[24px] w-[100%] rounded-md dark:bg-black bg-zinc-800 p-[5px] text-zinc-100">Login</h2>

            <label htmlFor="email"  className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Email</label>
            <input id='lEmail' value={email} onChange={e=>handleChange("email",e)} name='email' placeholder='Email address...' type="email" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />

            <label htmlFor="password"  className='dark:text-stone-200 text-[19px] mt-[10px] mb-[5px] ml-[5px] font-[500]'>Password</label>
            <input id='lPassword' value={password} onChange={e=>handleChange("password",e)} name='password' placeholder='Password...' type="password" className="indent-[5px] outline-none placeholder:text-zinc-500 w-[270px] sm:w-[340px] h-[30px] mx-auto rounded-md" />
            
            <p className="ml-[5px] mt-[10px] dark:text-stone-200">Don't have an account? <span className='dark:text-indigo-400 text-indigo-900 font-[600] cursor-pointer' onClick={e=>changeForm("register")}>Register.</span></p>

            <button className='w-[270px] sm:w-[340px] h-[40px] mt-[10px] mx-auto bg-blue-700 rounded-md text-zinc-100 text-[22px] flex items-center justify-center' type="submit" onClick={login}>{
                isLoading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : ("Login")
            }</button>
        </form>
    )

    const login = e => {
        e.preventDefault()
        clearStyling()
        if(!validate()) return false
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
        clearStyling()
        if(!validate()) return false
        setIsLoading(true)
        registerUser({name,email,password}).then(data=>{
            if(!data?.response?.data?.error){
                setIsLoading(false)
                setInputs({...inputs,name: '',email:'',password:'',cPass:''})
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

    const clearStyling = () => {
        if(type === "login"){
            document.getElementById("lEmail").style.border = "2px solid transparent"
            document.getElementById("lPassword").style.border = "2px solid transparent"
        }else{
            document.getElementById("name").style.border = "2px solid transparent"
            document.getElementById("email").style.border = "2px solid transparent"
            document.getElementById("password").style.border = "2px solid transparent"
            document.getElementById("confirmPassword").style.border = "2px solid transparent"
        }
    }

    const validate = () => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(type === "login"){
            if(email === ''){
                document.getElementById("lEmail").style.border = "2px solid red"
                toast.error("Email is required!",{theme: "dark"})
                return false
            }else if(!email.match(mailFormat)){
                document.getElementById("lEmail").style.border = "2px solid red"
                toast.error("Email is invalid!",{theme: "dark"})
                return false
            }
            
            if(password === ''){
                document.getElementById("lPassword").style.border = "2px solid red"
                toast.error("Password is required!",{theme: "dark"})
                return false
            }else if(password.length < 6){
                document.getElementById("lPassword").style.border = "2px solid red"
                toast.error("Password must be at least 6 characters!",{theme: "dark"})
                return false
            }
            return true
        }else{
            if(name === ''){
                document.getElementById("name").style.border = "2px solid red"
                toast.error("Name is required!",{theme: "dark"})
                return false
            }

            if(email === ''){
                document.getElementById("email").style.border = "2px solid red"
                toast.error("Email is required!",{theme: "dark"})
                return false
            }else if(!email.match(mailFormat)){
                document.getElementById("email").style.border = "2px solid red"
                toast.error("Email is invalid!",{theme: "dark"})
                return false
            }
            
            if(password === ''){
                document.getElementById("password").style.border = "2px solid red"
                toast.error("Password is required!",{theme: "dark"})
                return false
            }else if(password.length < 6){
                document.getElementById("password").style.border = "2px solid red"
                toast.error("Password must be at least 6 characters!",{theme: "dark"})
                return false
            }

            if(password !== cPass){
                document.getElementById("confirmPassword").style.border = "2px solid red"
                toast.error("Passwords did not matched!",{theme: "dark"})
                return false
            }
            return true
        }
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