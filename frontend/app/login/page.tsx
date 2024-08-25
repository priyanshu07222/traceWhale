'use client'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {BsGoogle} from 'react-icons/bs'

export const Login = () => {
    const [email, setEmail]  = useState<String>('') 
    const [password, setPassword] = useState<String>('')
    const {data} = useSession()

    const [isUser, setIsUser] = useState(false)
    const router = useRouter()

    console.log(data)


    useEffect(() => {
        if(data?.user){
            setIsUser(true);
        }
        console.log(isUser)
    }, [data?.user])
    

    if (isUser) {
        router.push('/')
    }

    const submitData = async () => {
        try {
        //   const response = await axios.post('http://localhost:3001/api/v1/users/login', {email, password})
        const response = await signIn("credentials", {email,password})
  
          console.log(response)
        } catch (error) {
         console.log("error is this", error)
        }
     }
  return (
    <div className='flex flex-col justify-center  h-screen bg-slate-50 rounded-ee-full rounded-ss-full  '>
        <div className='flex justify-center  '>
            <div className='shadow rounded-xl rounded-tr-none px-16 py-10 bg-white '>
                <h1 className='text-center text-2xl mb-4'>Log In</h1>
                    <div className='flex flex-col gap-3'>
                        <input 
                            type="text" 
                            className='p-2 border border-gray-300 rounded-lg outline-none' 
                            placeholder='Email'
                            onChange={(e) => {
                                e.preventDefault();
                                setEmail(e.target.value);
                            }} 
                        />
                        <input 
                            type="password" 
                            className='p-2 border border-gray-3x00 rounded-lg outline-none' 
                            placeholder='Password'
                            onChange={(e) => {
                                e.preventDefault();
                                setPassword(e.target.value);
                            }} 
                        />
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button className='bg-slate-800 text-white rounded-lg px-4 py-2 w-full font-semibold text-lg ' onClick={submitData}>Submit</button>
                    </div>
                <p className='my-4 text-slate-600'>Don't have an Account? <Link href={'/register'} className='text-blue-700 hover:underline'>Register</Link></p> 

                <hr /> 
                <button className='bg-slate-800 text-white rounded-lg px-4 py-2 mt-4 mx-auto w-full flex items-center gap-2 justify-center font-semibold text-lg ' onClick={() => signIn('google')}>Login with <BsGoogle/></button>
             
            </div>
        </div>
    </div>
  )
}

export default Login
