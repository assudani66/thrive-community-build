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
}

export const Post = ({comments,postinfo,session}:PostProps) => {
    
    const [imageUrl,setImageUrl] = useState("")
    const [userDetails,setUserDetais] = useState<any|null>()
    // console.log(postinfo)
    
    const supabase = createClientComponentClient()
    console.log(postinfo)

    // post funcationality

    const likePost = async () => {
        try {   
            const {data,error} =  await supabase.rpc("add_like",{post_id:postinfo?.id,selected_user:session?.data?.session?.user?.id})
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }
    
    const bookmarkPost = async () => {
        try {
            const {data,error} =  await supabase.rpc("bookmark_post",{post_id:postinfo?.id,selected_user:session?.data?.session?.user?.id})
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }

// postDetails

    const postImage = async() => {
        try {
            if(postinfo?.imagelink !== ""){
                const {data,error} = await supabase.storage.from('public_posts').download(postinfo?.imagelink)
                const url = URL.createObjectURL(data!)
                console.log(url)
                setImageUrl(url)
                if(error) throw error
            }
        } catch (error) {
            console.error(error)
        }
    }

    const userPostInfo = async() => {

        try {
            const {data,error} = await supabase.from('profiles').select().eq( 'id', postinfo.user_id).single()
            setUserDetais(data)
        } catch (error) {
            
        }
    }
    
    console.log(userDetails)
    useEffect(()=>{postImage(),userPostInfo()},[])

    const PostBody = () =>{
        return(<div>
            <p>{postinfo?.post_info}</p>
            {postinfo?.imagelink && <img className="w-full aspect-square bg-indigo-500 rounded-lg shadow-[0px_4px_13px_0px_rgba(254,144,99,0.19)]" src={imageUrl}>
        </img>}
        </div>) 
    }

    return<div className="flex-col space-y-5 w-full px-8 py-4">
        <PostHeader PostOptions="POST" userName={userDetails?.username}/>
        <PostBody/>
        <PostFooter likes={postinfo?.likes?.length} bookmarks={postinfo?.bookmarks?.length} likePost={()=>likePost()} bookmarkPost={()=>bookmarkPost()}/>
        {comments && <div>
        </div>}
    </div>

}