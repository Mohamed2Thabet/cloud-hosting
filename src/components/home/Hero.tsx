import Image from 'next/image'
import React from 'react'
import { TiTick } from 'react-icons/ti'
import CloudImage from '../../../public/cloud-hosting.png'

export default function Hero() {
  return (
    <section className='min-h-[calc(100vh-148px)] flex flex-col items-center justify-center text-gray-900 px-4 py-8 md:px-8 lg:px-16 xl:px-24 md:flex-row md:gap-12 lg:gap-16'>
      {/* Content Section */}
      <div className='flex-1 text-center md:text-left max-w-2xl'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold pb-4 md:pb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight'>
          Cloud Hosting
        </h1>
        
        <p className='text-gray-700 text-lg md:text-xl lg:text-2xl pb-6 md:pb-8 leading-relaxed font-medium'>
          The best web hosting solution for your online success
        </p>
        
        {/* Features List */}
        <div className='space-y-3 md:space-y-4 pb-6 md:pb-8'>
          <div className='flex items-center gap-3 font-semibold text-base md:text-lg justify-center md:justify-start text-gray-800 hover:text-blue-600 transition-colors duration-200'>
            <TiTick className='text-green-500 text-xl md:text-2xl flex-shrink-0' />
            <span>Easy To Use Control Panel</span>
          </div>
          
          <div className='flex items-center gap-3 font-semibold text-base md:text-lg justify-center md:justify-start text-gray-800 hover:text-blue-600 transition-colors duration-200'>
            <TiTick className='text-green-500 text-xl md:text-2xl flex-shrink-0' />
            <span>Secure Hosting</span>
          </div>
          
          <div className='flex items-center gap-3 font-semibold text-base md:text-lg justify-center md:justify-start text-gray-800 hover:text-blue-600 transition-colors duration-200'>
            <TiTick className='text-green-500 text-xl md:text-2xl flex-shrink-0' />
            <span>Website Maintenance</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            Get Started
          </button>
          <button className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200'>
            Learn More
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className='flex-1 mt-8 md:mt-0 max-w-lg lg:max-w-xl'>
        <div className='relative group'>
          <Image 
            src={CloudImage} 
            alt='cloud hosting' 
            width={600} 
            height={600} 
            priority
            className='w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300'
          />
          {/* Decorative elements */}
          <div className='absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-pulse'></div>
          <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000'></div>
        </div>
      </div>
    </section>
  )
}