import React, { useEffect, useState } from 'react'
import { PostHeader } from '../postComponents/post-components'
import Topics_desktop from './Topics_desktop'

const Tags = ({supabase,session}:any) => {
  const [followRecomendation,setFollowReconmedation] = useState([])

  const getUnfollowedProfiles = async() => {
    try{
      const {data} = await supabase.from('profiles').select()
      setFollowReconmedation(data)
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{getUnfollowedProfiles()},[])

  return (
    <div>
        <div className='bg-white h-screen w-full py-5 flex-col
        justify-items-end
        space-y-4
        '>
            <div className='px-5 flex-col justify-items-end space-y-4'>
              {/* <Topics_desktop/> */}
            <h2 className='font-medium text-2xl '>Who to follow</h2>
            {
              followRecomendation.filter((user:any)=>user.id !== session?.data?.session?.user?.id).map(
                (user:any)=><PostHeader session={session} supabase={supabase} userInfo={user} userName={user?.username} PostOptions='FOLLOW_REQUEST'/>
              )
            }
            </div>
        </div>
    </div>
  )
}

export default Tags