"use client"
import React, { useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const EditProfile = ({ session }: { session: any | null }) => {

    const supabase = createClientComponentClient()
    const  user = session?.user
    const [uploadedImage,setUploadedImage] = useState< FileList | [] >([])

    const [userInfo,setUserInfo] = useState({
        username:"",
        full_name:"",
        website:"",
        description:""
    })

    const getUserInfo = async() => {
        try {
            const {data,error} = await supabase.from('profiles').select(`full_name, username, website, avatar_url`).eq('id',user?.id).single()
        
            setUserInfo(
                {...userInfo,
                username:data?.username,
                full_name:data?.full_name,
                website:data?.website
                }
            )
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{getUserInfo()},[])

    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        setUserInfo({...userInfo,[e.target.name] :e.target.value})
    }

    const uploadPost = async () => {
        try{
         const imageName =  await uploadImage()
         console.log( imageName,"path of image uploaded")
            const {data,error} = await supabase.from('profiles').update({
              avatar_url:imageName ? imageName : ""
            }).match({
              id: session?.user?.id
            })

            if (error) throw error
        }catch(error){
          console.error(error)
        }
      }
    
      const uploadImage = async() => {
    
        const imageName = `${user?.id}_${new Date().toISOString()}`
        try{
          if(uploadedImage.length >= 1  ){
            const {data,error} = await supabase.storage.from('avatars').upload(imageName,uploadedImage[0])
            const uploadedUrl = await supabase
            .storage
            .from('avatars')
            .getPublicUrl(`folder/${data}.png`)
            console.log(uploadedUrl.data)
            return uploadedUrl.data.publicUrl
          }
        }catch(error){
          console.log(error)
        }
        return ""
      }
    
      const addInfo = async() => {
        try{
            let{error} = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name : userInfo.full_name,
                username:userInfo.username,
                website:userInfo.website,
                description:userInfo.description,
                updated_at: new Date().toISOString()
            }
            )
            if(error) throw error
        }catch(error){
            console.log(error)
        }
        
    }
    

  return (
    <div className='flex-col space-y-4'>


{
        uploadedImage.length >= 1  &&
      <div>
        <button className='bg-gray-200 font-bold text-black w-10 h-10 rounded-full flex justify-center items-center absolute ' onClick={()=>setUploadedImage([])}>x</button>
        <img className='w-80 h-80 object-cover object-top rounded-lg'
        src={ uploadedImage.length >= 1  ? URL.createObjectURL(uploadedImage[0]) : ""} alt="fsdfsdf" />
      </div>
      }

<div>
      <div className="flex items-center">
        <label>
            <input className="text-sm cursor-pointer px-4 hidden  " type="file" onChange={(e)=>{
              console.log('changes')
              setUploadedImage(e.target.files!)}} />
              <div className='flex items-center mx-4' onClick={()=>console.log("this uploades")}>
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

        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='username' name='username' onChange={e=>updateLoginState(e)}  value={userInfo?.username} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='full_name' name='full_name' onChange={e=>updateLoginState(e)}  value={userInfo?.full_name} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='website' name='website' onChange={e=>updateLoginState(e)}  value={userInfo?.website} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='description' name='description' onChange={e=>updateLoginState(e)}  value={userInfo?.description} />
        
        <button className='mainbutton w-full rounded-lg' onClick={()=>{
          addInfo()
          uploadPost()
        }} >Update</button>
    </div>
  )
}

export default EditProfile