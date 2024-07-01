import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import {useDispatch} from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const userOtherUsers =  (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{
                 withCredentials:true
                });
                console.log(res);
                dispatch(getOtherUsers(res.data.otherusers));
             } catch (error) {
                 console.log(error);
             }
        }
        fetchOtherUsers();     
    }, []);
};
export default userOtherUsers;