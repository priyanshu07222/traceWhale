import Link from 'next/link'
import React from 'react'

export const Appbar = () => {
  return (
    <div className='py-4  px-6  shadow-gray-700 shadow-md  bg-gradient-to-t from-slate-900 to-slate-700'>
        <div className='max-w-screen-xl mx-auto text-white flex justify-between items-center'>
            <div className='text-3xl font-bold text-cyan-500'>
                Whale Alert
            </div>
            <div className='text-lg'>
                <ul className='flex gap-8'>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/whaleAlert'}>Whale Dcex</Link></li>
                    <li><Link href={'/'}>About Us</Link></li>
                    <li><Link href={'/'}>How it Works</Link></li>
                    <li><Link href={'/login'}>Login</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
