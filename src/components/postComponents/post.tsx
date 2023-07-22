"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostFooter, PostHeader } from "./post-components"
import { useEffect, useState } from "react";

export type Post={
    id:string;
    created_at : any;
    postinfo:string
}

type PostProps = {
    postinfo:any
    comments : boolean
    session:any
    setListPost?:any
    postList?:any[]
}

export const Post = ({setListPost,postList, comments,postinfo,session}:PostProps) => {
    
    const [userDetails,setUserDetais] = useState<any|null>()
    const [postDetails,setPostDetails] = useState<any>({
    })
    
    const supabase = createClientComponentClient()

    const deletePost  = async() => {
        try {
            const {data,error} = await supabase.from('posts').delete().eq("id",postinfo?.id)
            setListPost(postList?.filter((post)=>post!==postinfo))
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }

    const userPostInfo = async() => {

        try {
            const {data,error} = await supabase.from('profiles').select().eq( 'id', postinfo.user_id).single()
            setUserDetais(data)
        } catch (error) {
            console.log(error)
        }
    }
    const updatedPostInfo= async()=> {
        try{
            const {data,error} = await supabase.from('posts').select().eq('id',postinfo?.id)
            setPostDetails(data)
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{userPostInfo()},[])
    useEffect(()=>{updatedPostInfo},[])

    const PostBody = () =>{
        return(<div>
            <p>{postinfo?.post_info}</p>
            {postinfo?.imagelink && <img className="w-full aspect-square bg-indigo-500 rounded-lg shadow-[0px_4px_13px_0px_rgba(254,144,99,0.19)] object-cover" src={postinfo?.imagelink}>
        </img>}
        </div>) 
    }

    return<div className="flex-col space-y-5 w-full px-8 py-4">
        <PostHeader deletePost = {()=>deletePost()} userInfo={userDetails} postInfo={postinfo} supabase={supabase} session={session} PostOptions="POST" userName={userDetails?.username}/>
        <PostBody/>
        <PostFooter supabase={supabase} postInfo={postinfo}/>
        {comments && <div>
        </div>}
    </div>

}