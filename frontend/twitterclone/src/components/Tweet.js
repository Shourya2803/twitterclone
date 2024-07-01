import React from 'react'
import Avatar from 'react-avatar'
// import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useSelector, useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { MdDelete } from "react-icons/md";
// import { deleteTweet } from '../../../../backend/controllers/tweetController';
import { timeSince } from '../utils/constant';

const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);

            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) => {
        try {
                axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);          
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }
    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex p-4'>
                    <Avatar src="https://imgs.search.brave.com/D9s5zAFOq-EMMiIZEBKViIiSTIV-zsw2tc0dfOPQbY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLW1vbmtl/eS1mYWNlLTBqeHdt/cTZicG0zaHM5Y2Iu/anBn" size="30" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center '>
                            <h1 className='font-bold'>{tweet.userDetails[0]?.name}</h1>
                            <p className='text-gray-500 text-sm ml-1'>{`@${tweet.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`} </p>
                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>
                        <div className='flex justify-between my-3'>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <FaRegCommentDots size="24px" />
                                </div>
                                <p>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                                    <FaRegHeart size="20px" />
                                </div>
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <FaRegBookmark size="24px" />
                                </div>
                                <p>0</p>
                            </div>
                            {

                            }
                            user?._id === tweet?.userId && (
                            <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                <div className='p-2 hover:bg-red-400 rounded-full cursor-pointer'>
                                    <MdDelete size="24px" />
                                </div>
                            </div>
                            )
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet