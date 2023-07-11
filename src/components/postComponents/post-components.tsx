type PostHeaderPropsType = {
    userName:string
    time?:string
    PostOptions : "FOLLOW_REQUEST" | "POST" | "CREATE_POST"
}

export const PostHeader= ({userName,time,PostOptions}:PostHeaderPropsType) => {

    return(<div className="flex justify-between w-full">
    <div className="flex">
    <div className="w-12 h-12 bg-indigo-500 rounded-lg aspect-square object-cover"></div>
            <div className="px-4 flex-col justify-between">
                <p className="text-base">{userName}</p>
                <p className="text-xs">{time}{time && "ago"}</p>
            </div>
    </div>
    <div>
{
PostOptions === "POST" ? <svg onClick={()=>console.log("this works")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
    :PostOptions === "CREATE_POST" ? <></> 
    :PostOptions === "FOLLOW_REQUEST"?
    <div className="flex-col items-center">
        <button className='mainbutton rounded-[1rem] h-12 w-12 text-[10] flex items-center'>
            <svg width="70" height="70" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2V23" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 12.5H23.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
    :<></>

}
</div>
</div>)
}

type PostFooterProp = {
    likes:number;
    bookmarks:number;
    bookmarkPost:()=>void;
    likePost: ()=>void;
}

export const PostFooter = ({likes,bookmarks,bookmarkPost,likePost}:PostFooterProp) => {
    return(<div className="flex space-x-2">
    <div className="flex space-x-2 bg-[#F56F6F26] px-2 rounded-full cursor-pointer" onClick={()=>likePost()}>
    <div className="flex justify-center items-center">
        <svg width="16" height="16" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.447 0.888894C12.7345 -0.466216 10.1877 -0.22247 8.61584 1.28353L8.00023 1.87258L7.38462 1.28353C5.8159 -0.22247 3.26595 -0.466216 1.55348 0.888894C-0.408984 2.44422 -0.512107 5.23569 1.24411 6.9216L7.29087 12.7193C7.68149 13.0936 8.31585 13.0936 8.70647 12.7193L14.7532 6.9216C16.5126 5.23569 16.4094 2.44422 14.447 0.888894V0.888894Z" fill="#F56F6F"/>
        </svg>
    </div>
    <p>{likes}</p>
    </div>
    <div className="flex space-x-2 bg-[#704FFE26] px-2 rounded-full">
    <div className="flex justify-center items-center" onClick={()=>bookmarkPost()}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 8.3235V12.0682C15.75 14.3902 15.75 15.552 15.1995 16.059C14.937 16.3013 14.6055 16.4535 14.2523 16.494C13.512 16.5788 12.6473 15.8137 10.9185 14.2845C10.1535 13.6087 9.77175 13.2705 9.33 13.182C9.11219 13.1381 8.88781 13.1381 8.67 13.182C8.2275 13.2705 7.84575 13.6087 7.0815 14.2845C5.35275 15.8137 4.488 16.5787 3.74775 16.4932C3.39393 16.4527 3.06218 16.3006 2.8005 16.059C2.25 15.552 2.25 14.391 2.25 12.0682V8.32275C2.25 5.1075 2.25 3.49875 3.2385 2.49975C4.227 1.5 5.8185 1.5 9 1.5C12.1823 1.5 13.773 1.5 14.7615 2.499C15.75 3.49875 15.75 5.1075 15.75 8.3235ZM6.1875 4.5C6.1875 4.35082 6.24676 4.20774 6.35225 4.10225C6.45774 3.99676 6.60082 3.9375 6.75 3.9375H11.25C11.3992 3.9375 11.5423 3.99676 11.6477 4.10225C11.7532 4.20774 11.8125 4.35082 11.8125 4.5C11.8125 4.64918 11.7532 4.79226 11.6477 4.89775C11.5423 5.00324 11.3992 5.0625 11.25 5.0625H6.75C6.60082 5.0625 6.45774 5.00324 6.35225 4.89775C6.24676 4.79226 6.1875 4.64918 6.1875 4.5Z" fill="#704FFE"/>
        </svg>
    </div>
    <p>{bookmarks}</p>
    </div>
    </div>)
}