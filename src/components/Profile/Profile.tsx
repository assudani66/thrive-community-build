"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import PostList from '../postComponents/postList'
import { PostHeader } from '../postComponents/post-components';
type DisplayType = 'POSTS' | 'BOOKMARK_POSTS' | 'LIKED_POSTS' | 'FOLLOWERS' | 'FOLLOWING';

const Profile = ({userId}:{userId:any}) => {
  const supabase = createClientComponentClient()
  const [session,setSession] = useState<any>()
  const [displayfeature, setDisplayfeature] = useState<{ display: DisplayType }>({ display: 'POSTS' });
  const [userInfo,setUserInfo] = useState({
    name:"",
    username:"",
    following:[],
    followers:[],
    full_name:"",
    description:"",
    avatar_url:"",
    website:""
  })
  const [listOfPost,setListofPost] = useState([]) 
  const [userList,setUserList] = useState<any[]|null>([])
  
  const getUserInfo = async() => {
    try {
        const {data,error} = await supabase.from('profiles').select(`full_name, username, website,description, avatar_url,following,followers`).eq('id',userId).single()
        setUserInfo(
          {...userInfo,
          username:data?.username,
          following:data?.following,
          full_name:data?.full_name,
          followers:data?.followers,
          description:data?.description,
          avatar_url:data?.avatar_url,
          website:data?.website
          })
        if(error) throw error
    } catch (error) {
        console.error(error)
    }
}


const getUserList = async() => {
  try{
    const {data} = await supabase.from('profiles').select()
    setUserList(data)
    console.log(data)
  }catch(error){
    console.log(error)
  }
}

const getAllPosts = async() => {
  try{
    const {data,error} = await supabase.from("posts").select().order('created_at',{ascending:false}).eq('user_id',userId)
    setListofPost(data as any)
    if(error) throw error
  }
  catch(error){
    console.error(error)
  }
}

useEffect(()=>{getUserList()},[])

useEffect(()=>{
  if(userId){
    getUserInfo()
    setDisplayfeature({display:"POSTS"})
    getAllPosts()
  }
},[userId])

interface User {
  id: string;
  username: string;
}
  return (
    <div className='p-0'>
    <img className='w-full  bg-indigo-500 h-40'></img>
    <div className='px-5 relative bottom-10'>
      <img className='w-20 h-20 rounded-xl wrap' src={userInfo.avatar_url}></img>
    <div className='flex justify-between'>
    <div className='flex-col'>
    <p className='font-medium'>{userInfo.full_name} • {}</p>
    <p>@{userInfo.username}</p>
    </div>
    <svg onClick={()=>console.log("this works")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    </div>
    <p className='max-w-20'>
      {userInfo?.description}
    </p>
    </div>
    <div className='hidden md:block pt-4'>
          </div>
          <div className='bg-indigo-500 h-fit flex justify-between rounded-lg text-white items-center'>
            <div className={`flex items-center h-full px-7 ${displayfeature.display === "POSTS" ? 'selectedDisplayFeature' : ''} `} onClick={()=>setDisplayfeature({display:'POSTS'})}>
            <div className='flex-col justify-center text-center' >
            <p>1</p>
            <p className='m-0 p-0'>Posts</p>
            </div>
            </div>
            <div className={`flex items-center h-full px-7 ${displayfeature.display === "FOLLOWING" ? 'selectedDisplayFeature' : ''} `}>
            <div className='flex-col justify-center text-center' onClick={()=>setDisplayfeature({display:'FOLLOWING'})}>
            <p>{userInfo?.following?.length}</p>
            <p className='m-0 p-0'>Following</p>
            </div>
            </div>
            <div className={`flex items-center h-full px-7 ${displayfeature.display === "FOLLOWERS" ? 'selectedDisplayFeature' : ''} `}>
              <div className='flex-col justify-center text-center' onClick={()=>setDisplayfeature({display:'FOLLOWERS'})}>
                <p>{userInfo?.followers?.length}</p>
                <p className='m-0 p-0'>Follower</p>
              </div>
            </div>
          </div>

          {/* postContent */}
          {
           displayfeature.display === "POSTS" ? <PostList listOfPost={listOfPost} setListofPost={setListofPost} session={session}/> : 
           displayfeature.display === "FOLLOWERS" ?
           <div className='flex-col space-y-4'>
            {
              // @ts-ignore
              userList?.filter((user: User) =>userInfo?.followers?.includes(user.id)).map((user)=><PostHeader session={session} supabase={supabase} userInfo={user} userName={user?.username} PostOptions='FOLLOW_REQUEST'/>)
            }
           </div> : 
           displayfeature.display === "FOLLOWING" ? 
           <div>
            {
              // @ts-ignore
              userList?.filter((user:any) =>userInfo?.following?.includes(user?.id)).map((user)=><PostHeader session={session} supabase={supabase} userInfo={user} userName={user?.username} PostOptions='FOLLOW_REQUEST'/>)
            }
           </div>:
           displayfeature.display === "BOOKMARK_POSTS"?
           <div>bookmarkPost</div>:
           displayfeature.display === "LIKED_POSTS" ?
           <div>liked Post</div> :
           <></>
          }
          
  </div>
  )
}

export default Profile