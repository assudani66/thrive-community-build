"use client"
import React, { useEffect, useState } from 'react'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const EditProfile = ({ session }: { session: Session | null }) => {

    const supabase = createClientComponentClient()
    const  user = session?.user
    console.log(user,"editSession")

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
    
            const {data,error} = await supabase.from('posts').insert({
              user_id : user?.id ,
              post_info:postData,
              imagelink:imageName ? imageName : ""
            })
     
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
    
    const addInfo = async() => {
        try{
            let{error} = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name : userInfo.full_name,
                username:userInfo.username,
                website:userInfo.website,
                description:userInfo.description,
                likedposts:"90abd3ad-9b42-42d5-a30e-a500473d4327",
                updated_at: new Date().toISOString()
            }
            )
            if(error) throw error
            alert('Profile Updated')
        }catch(error){
            alert("error in updating the data")
        }
        
    }
    

  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='username' name='username' onChange={e=>updateLoginState(e)}  value={userInfo?.username} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='full_name' name='full_name' onChange={e=>updateLoginState(e)}  value={userInfo?.full_name} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='website' name='website' onChange={e=>updateLoginState(e)}  value={userInfo?.website} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='description' name='description' onChange={e=>updateLoginState(e)}  value={userInfo?.description} />
        
        <button className='mainbutton w-full rounded-lg' onClick={()=>addInfo()} >Update</button>
    </div>
  )
}

export default EditProfile