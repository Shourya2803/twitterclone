import axios from "axios";
import { useEffect } from "react";
// import { TWEET_API_END_POINT } from "../utils/constant";
import { TWEET_API_END_POINT } from "../utils/constant";
import {useDispatch, useSelector} from "react-redux";
// import { getMyProfile } from "../redux/userSlice";
import { getAllTweets } from "../redux/tweetSlice";
// import {useSelector} from ""

const userGetMyTweets =  (id) => {
    const dispatch = useDispatch();
    const {refresh, isActive} = useSelector(store=>store.tweet)

    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,{
             withCredentials:true
            });
            dispatch(getAllTweets(res.data.tweets));
         } catch (error) {
             console.log(error);
         }
    }
    const followoingTweetHandler = async () => {
        try {
            axios.defaults.withCredentials=true;
        const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);    
        console.log(res)
        dispatch(getAllTweets(res.data.tweets));
        // dispatch(getRefresh());
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
       if(isActive){
        fetchMyTweets();   
       }else{
        followoingTweetHandler(); 
       }
    }, [isActive,refresh]);
};
export default userGetMyTweets;