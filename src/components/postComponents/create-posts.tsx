"use client"
import React, { useEffect, useState } from 'react'
import { PostHeader } from './post-components'
import { Session,createClientComponentClient,createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const CreatePost = ({ session }: { session: Session | null }) => {
  const user = session?.user
  const supabase = createClientComponentClient()
  const [uploadedImage,setUploadedImage] = useState< FileList | [] >([])
  const [postData,setPostData] = useState<string>("")
  type userInfoTypes = {full_name:string}
  const [userInfo,setUserInfo] = useState< userInfoTypes| null>({}as userInfoTypes) 

  const getUsers = async() => {
    try {
      const {data,error} = await supabase.from('profiles').select().eq(
          'id',session?.user?.id
      ).single()
      console.log(data)
      setUserInfo(data ? data : {})
    } catch (error) {
      console.error(error)
    }
}

useEffect(()=>{getUsers()},[])

  const uploadPost = async () => {
    try{
     const imageName =  await uploadImage()
     console.log( imageName,"path of image uploaded")

        const {data,error} = await supabase.from('posts').insert({
          user_id : user?.id ,
          postInfo:postData,
          imagelink:imageName ? imageName : ""
        })
        console.log(data)
  console.log("this is working")
    }catch(error){
      console.error(error)
    }
  }

  const uploadImage = async() => {

    const imageName = `${user?.id}_${new Date().toISOString()}`

    try{
      if(uploadedImage.length >= 1  ){
        console.log("this should run")
        const {data,error} = await supabase.storage.from('public_posts').upload(imageName,uploadedImage[0])
        console.log(data)
        return `${data?.path}`
      }
    }catch(error){
      console.log(error)
    }
    return ""
  }


  return (
    <div className='w-fit flex-col space-y-2'>
        <PostHeader PostOptions='CREATE_POST' userName={userInfo?.full_name ? userInfo.full_name : ""}/>
        <div>
        <textarea id="comment" className="w-full p-2 h-fit focus:outline-none" placeholder="Write your content..." onChange={(e)=>setPostData(e.target.value)}/>
        </div>

        {/* Images upload */}
        {
        uploadedImage.length >= 1  &&
      <div>
        <button className='bg-gray-200 font-bold text-black w-10 h-10 rounded-full flex justify-center items-center absolute ' onClick={()=>setUploadedImage([])}>x</button>
        <img className='w-80 h-80 object-cover object-top rounded-lg'
        src={ uploadedImage.length >= 1  ? URL.createObjectURL(uploadedImage[0]) : ""} alt="fsdfsdf" />
      </div>
      }
        {/* upload File section */}

        <div>
            <div className="flex items-center">
        <label>
            <input className="text-sm cursor-pointer px-4 hidden  " type="file" onChange={(e)=>setUploadedImage(e.target.files!)} />
              <div className='flex items-center mx-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36" fill="none">
                <path d="M9 30C8.175 30 7.4685 29.706 6.8805 29.118C6.2925 28.53 5.999 27.824 6 27V22.5H9V27H27V22.5H30V27C30 27.825 29.706 28.5315 29.118 29.1195C28.53 29.7075 27.824 30.001 27 30H9ZM16.5 24V11.775L12.6 15.675L10.5 13.5L18 6L25.5 13.5L23.4 15.675L19.5 11.775V24H16.5Z" fill="#FE9063"/>
                </svg>
                <p className='text-base'>Upload</p>
              </div>
        </label>
              <div className='flex pl-3 space-x-3'>
                <div className='w-12 h-12 bg-indigo-500 rounded-md'></div>
                <div className='w-12 h-12 bg-indigo-500 rounded-md'></div>
                <div className='w-12 h-12 bg-indigo-500 rounded-md'></div>
              </div>
            </div>
        </div>
        
        {/* post */}
        <div className='flex w-full justify-items-end'>
          <button onClick={()=>uploadPost()} className='mainbutton rounded-3xl'>POST</button>
        </div>

    </div>
  )
}

export default CreatePost