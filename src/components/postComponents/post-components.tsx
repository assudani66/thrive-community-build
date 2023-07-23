import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type PostHeaderPropsType = {
    userInfo?: any;
    deletePost?: any;
    userName?: string;
    postInfo?: any;
    time?: string;
    session?:any;
    supabase?:any;
    PostOptions: "FOLLOW_REQUEST" | "POST" | "CREATE_POST";
}

export const PostHeader = ({ deletePost, userInfo,postInfo,session,supabase, userName, time, PostOptions }: PostHeaderPropsType) => {
    const router = useRouter()
    const [currentUserDetails,setCurrentUserDetails] = useState<any>()
    const [followed,setFollowed] = useState<boolean>(false)
    const [openModal,setOpenModal] = useState(false) 

    const getCurrentUserDetails = async() => {
        try{ 
            const session = await supabase.auth.getSession()
            const {data,error} = await supabase.from('profiles').select().eq('id',session?.data?.session?.user?.id).single()
            setCurrentUserDetails(data)
            setFollowed(!data?.following.includes(userInfo?.id))
        }catch(error){
            console.log(error)
        }
    }
    
    
    
    useEffect(()=>{getCurrentUserDetails()},[])
    
    const followUser = async() => {
        try{
            if(followed){
                const session = await supabase.auth.getSession()
                const {data,error} = await supabase.rpc('follow_people',{
                    follower_id:session?.data?.session?.user?.id,
                    following_id:userInfo?.id
                })
                const currentUserId = session?.data?.session?.user?.id
                setCurrentUserDetails({...currentUserDetails,followers:{...currentUserDetails.followers,currentUserId}})
                setFollowed(!followed)
                if(error) throw error
            }else{
                const session = await supabase.auth.getSession()
                const {data,error} = await supabase.rpc('remove_follower',{
                    follower_id:session?.data?.session?.user?.id,
                    following_id:userInfo?.id
                })
                setCurrentUserDetails({...currentUserDetails})
                setFollowed(!followed)
                if(error) throw error
            }
        }catch(error){
            console.log(error)
        }
    }

    const isPostOwner = postInfo?.user_id == session?.data?.session?.user?.id
    return (<div className="flex justify-between w-full">
        <div className="flex">
            <img className="w-12 h-12 bg-indigo-500 rounded-lg aspect-square object-cover" src={userInfo?.avatar_url}></img>
            <div className="px-2 flex-col justify-between">
                <p className="text-base font-bold">{userName}</p>
                <p className="text-xs">{time}{time && "ago"}</p>
            </div>
        </div>
        <div>
            {
                PostOptions === "POST" && isPostOwner ? <div>
                <button id="dropdownMenuIconHorizontalButton" 
                data-dropdown-offset-skidding="0"
                data-dropdown-toggle="dropdownDotsHorizontal"  type="button" onClick={()=>setOpenModal(!openModal)}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                </button>
                <div id="dropdownDotsHorizontal" className={`z-10 ${openModal? 'absolute' :  'hidden'} bg-white `}>
                    <ul className="py-2 text-sm" aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <button onClick={()=>router.push(`/post/edit/${postInfo?.id}`)} className="block px-4 py-2 ">edit</button>
                    </li>
                    <li>
                        <button onClick={()=>deletePost()} className="block px-4 py-2 ">delete</button>
                    </li>
                    </ul>
                </div>
                </div>
                
                    : PostOptions === "CREATE_POST" ? <></>
                        : PostOptions === "FOLLOW_REQUEST" ?
                            <div className="flex-col items-center justify-center" >
                                 <button className='mainbutton 
                                 items-center
                                 font-bold text-xs rounded-[1rem] flex items-center' onClick={()=>followUser()} > {followed ? "Follow" : "Unfollow"}
                                </button>
                            </div>
                            : <></>

}
        </div>
    </div>)
}

type PostFooterProp = {
    postInfo: any;
    supabase: any;
}

export const PostFooter = ({  postInfo, supabase }: PostFooterProp) => {
    const [likes, setLikes] = useState(postInfo?.likes?.length)
    const [bookMarks, setBookMarks] = useState(postInfo?.bookmarks?.length)
    const [session,setSession] = useState<any>()
    const [interaction, setInteraction] = useState(
       { liked:true,
        bookMarked:true,
        alreadyBookmarked:false,
        alreadyLiked:false}
    )
    const getCurrentUserSession = async() => {
        const session = await supabase.auth.getSession()
        setSession(session)
    }
    
    useEffect(()=>{getCurrentUserSession()},[])
    useEffect(()=>{
        setInteraction({
        liked: Boolean(postInfo?.likes
            .find((like:string)=> like === session?.data?.session?.user?.id)),
        alreadyLiked:Boolean(postInfo?.likes.includes(session?.data?.session?.user?.id)),
        alreadyBookmarked:Boolean(postInfo?.bookmarks.includes(session?.data?.session?.user?.id)),
        bookMarked: Boolean(postInfo?.bookmarks
                .find((bookMark:string)=> bookMark === session?.data?.session?.user?.id))
            })
    },[session])
    const likePost = async () => {
        try {
            if (interaction.liked) {
                const session = await supabase.auth.getSession()
                const { data, error } = await supabase.rpc("remove_user_from_likes", { post_id: postInfo?.id, selected_user: session?.data?.session?.user?.id })
                setInteraction({ ...interaction,alreadyLiked:!interaction.alreadyLiked,  liked: !interaction.liked })
                setLikes(likes - 1)
                if (error) throw error
            } else {
                const session = await supabase.auth.getSession()
                const { error } = await supabase.rpc("add_like", { post_id: postInfo?.id, selected_user: session?.data?.session?.user?.id })
                setInteraction({ ...interaction,
                    alreadyLiked:!interaction.alreadyLiked, liked: !interaction.liked })
                setLikes(likes + 1)
                if (error) throw error
            }
        } catch (error) {
            console.log(error)
        }
    }

    const bookmarkPost = async () => {
        try {
            if(interaction.bookMarked){
                const session = await supabase.auth.getSession()
                const { data, error } = await supabase.rpc("remove_user_from_bookmarks", { post_id: postInfo?.id, uuid_to_remove: session?.data?.session?.user?.id })
                setInteraction({ ...interaction,alreadyBookmarked:!interaction.alreadyBookmarked,  bookMarked: !interaction.bookMarked })
                setBookMarks(bookMarks - 1)
                if (error) throw error
            } else {
                const session = await supabase.auth.getSession()
                const { error } = await supabase.rpc("bookmark_post", { post_id: postInfo?.id, selected_user: session?.data?.session?.user?.id })
                setInteraction({ ...interaction,
                alreadyBookmarked:!interaction.alreadyBookmarked, 
                bookMarked: !interaction.bookMarked })
                setBookMarks(bookMarks + 1)
                if (error) throw error
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (<div className="flex space-x-2">
        <div 
        className={`flex space-x-2 ${(interaction.liked || interaction.alreadyLiked)  ? "bg-[#F56F6F26]" : "bg-[#ffffff26]"} px-2 rounded-full`}
          onClick={() => likePost()}>
            <div className="flex justify-center items-center">
                <svg width="16" height="16" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.447 0.888894C12.7345 -0.466216 10.1877 -0.22247 8.61584 1.28353L8.00023 1.87258L7.38462 1.28353C5.8159 -0.22247 3.26595 -0.466216 1.55348 0.888894C-0.408984 2.44422 -0.512107 5.23569 1.24411 6.9216L7.29087 12.7193C7.68149 13.0936 8.31585 13.0936 8.70647 12.7193L14.7532 6.9216C16.5126 5.23569 16.4094 2.44422 14.447 0.888894V0.888894Z" fill="#F56F6F" />
                </svg>
            </div>
            <p>{likes>0 ? likes : ""}</p>
        </div>
        <div className={`flex space-x-2 ${(interaction.bookMarked || interaction.alreadyBookmarked ) ? "bg-[#704FFE26]" : "bg-[#ffffff26]"} px-2 rounded-full`} onClick={() => { bookmarkPost() }}>
            <div className="flex justify-center items-center cursor-pointer" >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 8.3235V12.0682C15.75 14.3902 15.75 15.552 15.1995 16.059C14.937 16.3013 14.6055 16.4535 14.2523 16.494C13.512 16.5788 12.6473 15.8137 10.9185 14.2845C10.1535 13.6087 9.77175 13.2705 9.33 13.182C9.11219 13.1381 8.88781 13.1381 8.67 13.182C8.2275 13.2705 7.84575 13.6087 7.0815 14.2845C5.35275 15.8137 4.488 16.5787 3.74775 16.4932C3.39393 16.4527 3.06218 16.3006 2.8005 16.059C2.25 15.552 2.25 14.391 2.25 12.0682V8.32275C2.25 5.1075 2.25 3.49875 3.2385 2.49975C4.227 1.5 5.8185 1.5 9 1.5C12.1823 1.5 13.773 1.5 14.7615 2.499C15.75 3.49875 15.75 5.1075 15.75 8.3235ZM6.1875 4.5C6.1875 4.35082 6.24676 4.20774 6.35225 4.10225C6.45774 3.99676 6.60082 3.9375 6.75 3.9375H11.25C11.3992 3.9375 11.5423 3.99676 11.6477 4.10225C11.7532 4.20774 11.8125 4.35082 11.8125 4.5C11.8125 4.64918 11.7532 4.79226 11.6477 4.89775C11.5423 5.00324 11.3992 5.0625 11.25 5.0625H6.75C6.60082 5.0625 6.45774 5.00324 6.35225 4.89775C6.24676 4.79226 6.1875 4.64918 6.1875 4.5Z" fill="#704FFE" />
                </svg>
            </div>
            <p className="cursor-pointer">{bookMarks>0 ? bookMarks : "" }</p>
        </div>
    </div>)
}