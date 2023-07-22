
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect } from 'react'
import { cookies } from 'next/headers'
import { Post } from '@/components/postComponents/post'
import { useRouter } from 'next/navigation'

const PostDetailPage = async({params}:{params:{id:string}}) => {
    const supabase = createServerComponentClient({ cookies })
    try {
      const session  = await supabase.auth.getSession()
      const {data,error} = await supabase.from("posts").select().eq("id",params.id).single()
      return (
        <div>
          <Post key={data?.id} comments postinfo={data} session={session}/>
        </div>)
    } catch (error) {
      console.log(error)

  }

}

export default PostDetailPage