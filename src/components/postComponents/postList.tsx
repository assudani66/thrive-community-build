import React, { useEffect, useState } from 'react'
import { Post } from './post'

const PostList = ({setListofPost,listOfPost,session}:{setListofPost:any;listOfPost:any[]|null;session:any}) => {
  return (
    <div>
      {listOfPost?.map((post)=><div className='flex-col flex'>
          <Post key={post?.id} postList={listOfPost} setListPost={setListofPost} comments postinfo={post} session={session}/></div>)}
    </div>
  )
}

export default PostList