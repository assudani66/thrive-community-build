import React from 'react'
import { Post } from './post'

const PostList = () => {
  return (
    <div>
        <div className='flex-col '>
          <Post comments/>
          <Post comments/>
          <Post comments/>
          </div>
    </div>
  )
}

export default PostList