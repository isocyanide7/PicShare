import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../Components/PostList/PostList";

const USERPOSTS=[
    {
        id:"p1",
        image:"https://images.saymedia-content.com/.image/t_share/MTc2MjQ5NTYwNTQzMzQwNDIz/netflix-needs-to-keep-the-smoking-in-their-live-action-adaptation-of-cowboy-bebop.jpg",
        creator:"u1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        caption:"Spike Spiegel Part 1"
    },
    {
        id:"p2",
        image:"https://images.saymedia-content.com/.image/t_share/MTc2MjQ5NTYwNTQzMzQwNDIz/netflix-needs-to-keep-the-smoking-in-their-live-action-adaptation-of-cowboy-bebop.jpg",
        creator:"u1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        caption:"Spike Spiegel Part 2"
    }
];
const UserPosts =(props)=>{
    const userId=useParams().userId;
    const loadedPosts=USERPOSTS.filter(place=>place.creator===userId);
    return <PostList items={loadedPosts}/>;
}

export default UserPosts;