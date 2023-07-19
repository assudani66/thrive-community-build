import React from 'react'
import { Post } from './post'

const PostList = ({listOfPost,session}:{listOfPost:any[]|null;session:any}) => {
  return (
    <div>
      {listOfPost?.map((post)=><div className='flex-col'>
          <Post comments postinfo={post} session={session}/></div>)}
    </div>
  )
}

export default PostList