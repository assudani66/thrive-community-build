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
    const [postDetails,setPostDetails] = useState<any>({
        likes:0,
        dislike:0
    })
    // console.log(postinfo)
    
    const supabase = createClientComponentClient()
    console.log(postinfo)

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
    
    console.log(userDetails)
    useEffect(()=>{postImage(),userPostInfo()},[])
    useEffect(()=>{updatedPostInfo},[])

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
        <PostFooter session={session} supabase={supabase} postInfo={postinfo}/>
        {comments && <div>
        </div>}
    </div>

}