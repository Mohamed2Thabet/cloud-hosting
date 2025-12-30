import React from 'react'
import CluodImage from '../../../public/cloud-hosting.png'
import Image from 'next/image'
export default function AboutPage() {
  return (
    <section className=' container mx-auto min-h-[calc(100vh-(80px+92px))] flex flex-col justify-center items-center'>
      
      <h1 className='text-3xl font-bold text-gray-800 p-5'> About Page</h1>
      <div>
        <Image src={CluodImage} alt='cloud hosting' width={500} height={500} priority/>
      </div>
    </section>
  )
}
