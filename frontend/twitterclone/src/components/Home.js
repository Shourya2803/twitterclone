import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
// import Feed from './Feed'
import { Outlet, useNavigate } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import userOtherUsers from '../hooks/userOtherUsers'
import {useSelector} from "react-redux";
import userGetMyTweets from '../hooks/userGetMyTweets'


const Home = () => {
 const {user,otherUsers} = useSelector(store=>store.user);
const navigate = useNavigate();
useEffect(()=>{
  if(!user){
    navigate("/login");
  }
},[navigate,user]);



  //custom hooks
userOtherUsers(user?._id);
userGetMyTweets(user?._id);



  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home;
