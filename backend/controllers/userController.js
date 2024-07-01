import { User } from "../modules/userSchema.js";
import bcryptjs from "bcryptjs";

export const Register = async ( req, res) =>{
    try {
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exist.",
                success:false
            })
        } 

            const hashedPassword = await bcryptjs.hsah(password, 16);

        await User.crerate({
            name,
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message:"Account createde succesfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const Login = async(req, res) => {
    try {
        const{email, password} = req.body;
        if(!email || !password){
           return res.status(401).json({
            message:"All fields are required",
            success: false
           })
        };
        const user = await findOne({email});
        if(!user){
             return res.status(401).json({
                message:"User doesnot exist witth this email.",
                success: false

             })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"icorrect email or passwod.",
                success: false
             })
        }
        const tokenData = {
            usesrId:user._id
        }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"});
            return res.status(201).cookie("token", token, {expiresIn: "1d", httpOnly: true}).json({
                message: `Welsome back ${user.name}`,
                user,
                success:true
            })

    } catch (error) {
        console.log(error)
       
    }
}
export const logOut = (req, res) => {
    return res.cookie("token", "", {expires:new Date(Date,now())}),json({
        message:"User logged out sucessfully",
        success:true
    })
}
export const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user= await user.findById(loggedInUserId);
        if(user.bookmark.includes(tweetId)){
            //remove
            await User.findByIdAndUpdate(loggedInUserId,{$pull:{bookmark:tweetId}});
          return res.status(201).json({
            message:"Bookmark removed"
          });
     
        }else{
            //bookmark
            await User.findByIdAndUpdate(loggedInUserId,{$push:{bookmark:tweetId}});
            return res.status(201).json({
              message:"Save to Bookmaark"
            });
        }
    } catch (error) {
        console.log(error)
    }
}
export const getMyProfile = async (req,res) =>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(201).json({
            user,
        })
    } catch (error) {
        console.log(error)
    }
}
export const getOtherUsers = async (req,res) =>{ 
    try {
         const {id} = req.params;
         const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
         if(!otherUsers){
            return res.status(401).json({
                message:"Currently do not have any users."
            })
         };
         return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}
export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//patel
        const user = await User.findById(userId);//keshav
        if(!user.followers.includes(loggedInUserId)){
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUserId.updateOne({$push:{following:userId}});
        }else{
            return res.status(400).json({
                message:`User is already folowed to ${userId}`
            })
        };
        return res.status(200).json({
            message:`${loggedInUser.name} just follow to ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//patel
        const user = await User.findById(userId);//keshav
        if(loggedInUserId.followers.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUserId.updateOne({$pull:{following:userId}});
        }else{
            return res.status(400).json({
                message:"User not followed yet"
            })
        };
        return res.status(200).json({
            message:`${loggedInUser.name} unfollow to ${user.name}`,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}