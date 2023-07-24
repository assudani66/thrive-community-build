import React from 'react'
import ThriveLogo from './icons/thrivelogo'

const TrendingHeader = () => {
  return (
    <div className='bg-zinc-950' >
        <div className='flex items-center space-x-0'>
            <ThriveLogo />
            <div className='flex space-x-2 overflow-scroll'>
                <p className='px-3 py-1 h-8 bg-red-400
                whitespace-nowrap rounded-lg text-white text-xs font-normal flex items-center justify-center'># code
                </p>
                <p className='px-3 py-1 h-8 whitespace-nowrap bg-orange-50 rounded-lg text-black text-xs font-normal flex items-center justify-center'># code
                </p>
                <p className='px-4 py-1 h-8 bg-orange-50 
                whitespace-nowrap rounded-lg text-black text-xs font-normal flex items-center justify-center'># code
                </p>
                <p className='px-3 py-1 h-8 bg-orange-50 whitespace-nowrap rounded-lg text-black text-xs font-normal flex items-center justify-center'># code
                </p>
                <p className='px-3 py-1 h-8 bg-orange-50 whitespace-nowrap rounded-lg text-black text-xs font-normal flex items-center justify-center'># code
                </p>
            </div>
        </div>
    </div>
  )
}

export default TrendingHeader