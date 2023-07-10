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
}

export const Post = ({comments,postinfo}:PostProps) => {

    const [imageUrl,setImageUrl] = useState("")

    const supabase = createClientComponentClient()

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

    useEffect(()=>{postImage()},[])

    const PostBody = () =>{
        return(<div>
            <p>{postinfo?.postInfo}</p>
            {postinfo?.imagelink && <img className="w-full aspect-square bg-indigo-500 rounded-lg shadow-[0px_4px_13px_0px_rgba(254,144,99,0.19)]" src={imageUrl}>
        </img>}
        </div>) 
    }

    return<div className="flex-col space-y-5 w-full px-8 py-4">
        <PostHeader PostOptions="POST" userName=""/>
        <PostBody/>
        <PostFooter likes={1} bookmarks={2} likePost={()=>console.log("like")} bookmarkPost={()=>console.log("bookmark")}/>
        {comments && <div>
        </div>}
    </div>

}