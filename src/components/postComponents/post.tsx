import { PostFooter, PostHeader } from "./post-components"

type PostProps = {
    comments : boolean
}

export const Post = ({comments}:PostProps) => {

    const PostBody = () =>{
        return(<div>
        <img className="w-full aspect-square bg-indigo-500 rounded-lg shadow-[0px_4px_13px_0px_rgba(254,144,99,0.19)]" src="/testImage.png">
        </img>
        </div>) 
    }


    return<div className="flex-col space-y-5 w-full px-8 py-4">
        <PostHeader PostOptions="POST" userName="Piyush Assudani"/>
        <PostBody/>
        <PostFooter likes={1} bookmarks={2} likePost={()=>console.log("like")} bookmarkPost={()=>console.log("bookmark")}/>
        {comments && <div>
        </div>}
    </div>

}