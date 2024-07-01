import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import userGetProfile from '../hooks/userGetProfile';
import {useDispatch, useSelector} from "react-redux";
// import axios fron "axios";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';


const Profile = () => {
    const {user, profile} = useSelector(store=>store.user);
    const {id} = useParams();
    userGetProfile(id);
    const dispatch = useDispatch();

    //custom hook
    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            //unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id: user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }else{
            //follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id: user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh()); 
                toast.success(res.data.message);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
    }
  
    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center  py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdArrowRoundBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-sm'>5 posts</p>
                    </div>

                </div>
                <img src='https://imgs.search.brave.com/IP6GgPj6UycTx3-Ju4Fk9rh8TgIGR1HVAVLsVNAT-LI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kZXNrdG9wLXNv/dXJjZS1jb2RlLXdh/bGxwYXBlci1ieS1j/b21wdXRlci1sYW5n/dWFnZS13aXRoLWNv/ZGluZy1wcm9ncmFt/bWluZ18zMzc3MS01/OTUuanBnP3NpemU9/NjI2JmV4dD1qcGc' alt='banner' />
               <div className='absolute top-52 ml-2 border-white boder-4 rounded-full'>
               <Avatar src="https://imgs.search.brave.com/D9s5zAFOq-EMMiIZEBKViIiSTIV-zsw2tc0dfOPQbY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLW1vbmtl/eS1mYWNlLTBqeHdt/cTZicG0zaHM5Y2Iu/anBn" size="120" round={true} />
               </div>
               <div className='text-right ml-4'>
                {
                    profile?._id === user?._id ? (
                <button className='px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400'>Edit Profile</button>
                    ) : (
                <button onClick={followAndUnfollowHandler} className='px-4 py-1 rounded-full bg-black text-white'>{user.following.includes(id)? "Following" : "Follow"}</button>
                    )
                }
               </div>
               <div className='m-4'>
                <h1 className='font-bold text-xl'>{profile?.name}</h1>
               <p>{`@${profile?.username}`}</p>
               </div>
               <div className='m-4 text-sm'>
                <p>Experienced former full-stack developer skilled in JavaScript, Python, and SQL. Passionate about creating efficient solutions and improving user experiences.</p>
               </div>
            </div>
        </div>
    )
}

export default Profile