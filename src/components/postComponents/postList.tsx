import React, { useState } from 'react'
import { Post } from './post'

const PostList = ({listOfPost}:{listOfPost:any[]|null}) => {

  const session = "user session"

  return (
    <div>
      {listOfPost?.map((post)=><div className='flex-col'>
          <Post comments postinfo={post} session={session}/></div>)}
    </div>
  )
}

export default PostList