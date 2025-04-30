import connect from '@/utils/db'
import  { User,Track,WatchList }  from "@/models/User"
import  { Person }  from "@/models/Person"
import  { Score,Seen,Review }  from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const slug =params.username;

    try {
        //find user
        const user = await User.findOne({ username: slug }).select({
            name: 1,
            username: 1,
            avatar: 1,
            bio: 1,
            reviews: 1,
            favs: 1,
            followers: 1,
            following: 1,
            createdAt: 1,
            lastLoginAt: 1
        })
       
        const favsData = await Person.find({ _id: { $in: user.favs } }).select({ name: 1, slug: 1, imgPerson: 1 })   
        
        const ScoreData = (await Score.find({ user_id: { $in: user._id } })).length
        
        const SeenData = (await Seen.find({ user_id: { $in: user._id } })).length    

            // Fetch all user fields for users in the followers array
        const followersData = await User.find({ _id: { $in: user.followers } }).select({name:1,username:1,avatar:1})
            // Fetch all user fields for users in the followers array
         const followingData = await User.find({ _id: { $in: user.following } }).select({name:1,username:1,avatar:1})


        const getUser = await User.findOne({username: slug});

        const tracks = await Track.find({ user_id: getUser._id }).sort({_id:-1}).populate("media_id", "title poster slug").select({title:1,poster:1,slug:1})
        const watchlists = await WatchList.find({ user_id: getUser._id }).sort({_id:-1}).populate("media_id", "title slug  poster").select({title:1,poster:1,slug:1})
        const reviewlists = await Review.find({ user_id: getUser._id }).sort({ _id: -1 }).populate("media_id", "title slug  poster")

  
         return  NextResponse.json({user:user,followers: followersData,following:followingData,tracks:tracks,watchlists:watchlists,favs:favsData,scores:ScoreData,seens:SeenData,reviews:reviewlists}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}