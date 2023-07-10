"use client"
import React, { useState } from 'react'
import { Post } from './post'

const PostList = ({listOfPost}:{listOfPost:any[]|null}) => {
  return (
    <div>
      {listOfPost?.map((post)=><div className='flex-col'>
          <Post comments postinfo={post}/></div>)}
    </div>
  )
}

export default PostList