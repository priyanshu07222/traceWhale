import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'

export const Footer = () => {
  return (
    <div className='bg-gray-900 text-white py-8'>
        <div className='max-w-screen-xl mx-auto '>
            <div className='flex justify-between'>
                <div className='pb-4 '>
                    <h1 className='text-4xl font-bold text-cyan-500'>                    
                        Whale Alert
                    </h1>
                    <div className='px-1 py-2'>
                        <h3 className='text-xl font-semibold text-cyan-400'>Developed By</h3>
                        <span className='flex items-center gap-2 pt-2'>
                            <Link href={'https://x.com/priyanshuu_eth'}><FaXTwitter size={30}/></Link>
                            <p>Priyanshu Tiwari</p>
                        </span>
                    </div>
                </div>
                <div className='flex gap-16'>
                    <div>
                        <h3 className='text-xl text-cyan-400 font-semibold mb-4' >Products</h3>
                        <p>Dcex Activity</p>
                    </div>
                    <div>
                        <h3 className='text-xl text-cyan-400 font-semibold mb-4'>Company</h3>
                        <p>About Us</p>
                    </div>
                    <div>
                        <h3 className='text-xl text-cyan-400 font-semibold mb-4'>Support</h3>
                        <div className='flex flex-col gap-3'>
                            <p>Contact</p>
                            <p>Support</p>
                            <p>FAQ</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className='pt-4 text-center'>
                <span>&copy;2024 Whale Alert. All Rights Reserved.</span>
            </div>
        </div>
    </div>
  )
}
