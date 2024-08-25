'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export const TrackAccount = () => {
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>()
  const [account, setAccount] = useState<string[]>([])
  const {data} = useSession();
  console.log(data)

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
   
    setAddress(e.target.value)
    console.log("accoutn", address)
  }

  const addAccount = async() => {
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/accounts/trackAddress?userId=2`, {address, amount})
      setAmount(0)
      setAddress('')
    } catch (error) {
      console.log(error)
    }
  }

  console.log("account", address, amount)
  return (
    <div className=' shadow-2xl h-[70vh] rounded-xl'>
      <div className='flex justify-between p-4 items-center gap-4'>
        <input 
          type="text" 
          className=' w-3/4 outline-none p-2 border border-slate-600 rounded-lg text-slate-800' 
          placeholder='Enter the Address to Track' 
          onChange={handleChange} 
          value={address}
        />
        <input 
          type="text" 
          className=' w-3/4 outline-none p-2 border border-slate-600 rounded-lg text-slate-800' 
          placeholder='Amount' 
          value={amount}
          onChange={(e) => {
            e.preventDefault();
            setAmount(Number(e.target.value));
          }} 
          
        />
        <button 
          type='button'
          className='outline-1 outline w-1/4  hover:bg-gray-800  hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
          onClick={addAccount}
        >Add</button>
      </div>
     {account.map((item) => <p className='px-4 bg-gray-200'>{item}, {amount}</p>)}
    </div>
  )
}

export const getTrackAccount = () => {
  
}
