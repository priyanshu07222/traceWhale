'use client'
import React, { useEffect, useState } from 'react'
import { Appbar } from './Appbar'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const Landing = () => {
  const {data} = useSession();
  const [isUser, setIsUser] = useState(false);
  
  useEffect(() => {
    if (data?.user) {
      setIsUser(true);
    }
  }, [data?.user])

  return (
    <div className='w-full text-white bg-gradient-to-r from-gray-600 to-slate-900 h-[80vh] '>
        <div className='max-w-screen-lg mx-auto text-center pt-20 '>
            <h1 className='text-5xl leading-normal font-bold '>
            Stay Ahead of the Whale Moves on Solana
            </h1>
            <p className='text-xl px-16 font-semibold'>Get real-time notifications for large transactions on the Solana blockchain or for a specified solana address or a group of specified solana address.</p>
            {!isUser ? (<div className='mt-10'>
              <Link href={'/login'}><button type="button" className="text-gray-900 bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Login </button></Link>
            </div>): ""  }
        </div>
    </div>
  )
}
