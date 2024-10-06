import Image from 'next/image'
import React from 'react'

import Link from 'next/link';

export default function Header() {
 
  return (
    <div className='bg-black flex justify-between items-center h-20 p-4  fixed z-10 w-full px-[150px]'>
      <div className='flex gap-20 text-gray-300'>
      <Link href={'/'} className='font-bold '>
        <span className='text-[#3077c6] text-[20px]'>Expo</span>Planet
      </Link>
      <ul className="flex gap-6 list-none font-medium">
        <Link href={'/exo-planet-space'}>Experience the space</Link>
        <Link href={'/habitable-calculator'}>Habitable calculator</Link>
     
      </ul>
      </div>
       
    </div>
  )
};