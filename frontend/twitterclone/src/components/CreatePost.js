import axios from 'axios';
import React, { useState } from 'react'
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from '../utils/constant';
import {toast} from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {isActive} = useSelector(store=>store.tweet);

    const dispatch = useDispatch();

    const susbmmitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}`/create, {description, id:user?._id},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true           
         });
         dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);

            console.log(error)
        }
        setDescription("");
    }
    const forYouHandler = () => {
        dispatch(getIsActive(true));
    }
    const followingHandler = () => {
        dispatch(getIsActive(false));
    }
   
    return (
        <div className='w-[100%]'>
            <div> 
                <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div onClick={forYouHandler} className={`${isActive}? "border-b-4 border-blue-600" : "border-4 border-transparent"}cursor-pointer hover:bg-gray-300 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>  For You</h1>
                    </div>
                    <div onClick={followingHandler}  className={`${!isActive? "border-b-4 border-blue-600" : "border-4 border-transparent"} cursor-pointer  hover:bg-gray-300 w-full text-center px-4 py-3`}>
                       <h1 className='font-semibold text-gray-600 text-lg'> Following </h1>
                    </div>
                </div>
                <div>
                    <div className='flex items-center mp4'>
                        <div className='ml-4'>
                            <Avatar src="https://imgs.search.brave.com/D9s5zAFOq-EMMiIZEBKViIiSTIV-zsw2tc0dfOPQbY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLW1vbmtl/eS1mYWNlLTBqeHdt/cTZicG0zaHM5Y2Iu/anBn" size="30" round={true} />
                        </div>
                        <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none text-xl ml-2' type='text' placeholder='What is hapening?!' />
                    </div>
                    <div className='flex items-center justify-between p-4 border-b border-gray-200'>  
                        <div>
                            <CiImageOn size="24px"/>
                        </div>
                        <button onClick={susbmmitHandler} className='bg-[#1D9BF0] px-4 py-1 text-lg border-none rounded-full'>Post</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreatePost