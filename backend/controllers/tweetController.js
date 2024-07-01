import { Tweet } from "../modules/tweetschema.js";

export const createTweet = async (req, res)=> {
    try {
        const { description, id } = req.body;
        if(!description || !id) {
            return res.status(401).json({
                message:"Fields are requires",
                success:false
            });
        };
        const user = await user.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:" Tweet successfully created",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteTweet = async (req, res) => {
  try {
    const{id} = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(201).json({
        message:"Tweet deleted succesfully",
        succes: true
    })
  } catch (error) {
    console.log(error)
  }
}
export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            //dislike
            await Tweet.findByIdAndUpdate    (tweetId, {$pull:{like:loggedInUserId}});
            return res.status(201).json({
                message:"Tweet dislike succesfully",
                succes: true
            })
        }else{
            //like
            await Tweet.findByIdAndUpdate    (tweetId, {$push:{like:loggedInUserId}});
            return res.status(201).json({
                message:"Tweet liked succesfully",
                succes: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const getAllTweets = async (req, res) => {
    //loggedInUser ka tweet +  followinguser ka tweet
    try {
        const id = req.params.id;
        const loggedInUser =  await User.findById(id);
        const loggedInUserTweet = await Tweet.find({userId:id});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            tweets: loggedInUserTweet.concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser =  await User.findById(id);
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return Tweet.find({userId:otherUserId});
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error);
    }
}