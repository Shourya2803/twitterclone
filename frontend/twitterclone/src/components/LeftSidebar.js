import React from 'react'
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";         
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null)); 
            dispatch(getOtherUsers(null)); 
            dispatch(getMyProfile(null)); 
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
         console.log(error)   
        }
    }

    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img className='ml-1' width={"60px"} src='https://imgs.search.brave.com/3o543MSiFgbAoXqJejs-28ygqNLh0FRKUksNLQuMesk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA2/L1R3aXR0ZXItTG9n/JUQwJUJFLTUwMHgy/ODEucG5n' alt='twitter-logo' />
                </div>
                <div className='my-4'>
                    <Link to="/" className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                        <div>
                            <CiHome size={"24px"} />
                        </div>
                        <h1 className='ml-2 font-bold text-lg'>Home</h1>
                    </Link>
                    <div className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                        <div>
                            <CiHashtag size={"24px"} />
                        </div>
                        <h1 className='ml-2 font-bold text-lg'>Explore</h1>
                    </div> <div className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                        <div>
                            < IoMdNotificationsOutline  size={"24px"} />
                        </div>
                        <h1 className='ml-2 font-bold text-lg'>Notification</h1>
                    </div> 
                    <Link to={`/profile/${user?._id}`} className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                        <div>
                            <CgProfile  size={"24px"} />
                        </div>
                        <h1 className='ml-2 font-bold text-lg'>Profile</h1>
                    </Link>
                </div> 
                <div className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                    <div>
                        <FaRegBookmark size={"24px"} />
                    </div>
                    <h1 className='ml-2 font-bold text-lg'>Bookmarks</h1>
                </div>
                <div onClick={logoutHandler} className='flex  items-center my-2 px-4 py-2 hover:bg-gray-200 hover:curser-pointer  rounded-full' >
                    <div>
                        <HiOutlineLogout size={"24px"} />
                    </div>
                    <h1 className='ml-2 font-bold text-lg'>Logout</h1>
                </div>
                <button className='px-4 py-2 border-none  bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
            </div>
        </div>
    
  )
}

export default LeftSidebar