import React from 'react'
import { PostHeader } from '../postComponents/post-components'

const Tags = () => {
  return (
    <div>
        <div className='bg-white h-screen w-full py-5 flex-col
        justify-items-end
        space-y-4
        '>
            <div className='px-5 flex-col
            justify-items-end
            space-y-4'>
            <h2 className='font-medium text-2xl '>Topics</h2>
            <p className='px-5 py-3 bg-[#FE9063] rounded-2xl text-white text-lg'>fdsfsdf</p>
            <p className='px-5 py-3 bg-[#FFF1EB] rounded-2xl text-black text-lg'>fdsfsdf</p>
            <h2 className='font-medium text-2xl '>Who to follow</h2>
            <PostHeader userName='Piyush Assudani' PostOptions='FOLLOW_REQUEST'/>
            </div>
        </div>
    </div>
  )
}

export default Tags