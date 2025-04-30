import connect from '@/utils/db'
import {Media} from "@/models/Media"
import {User,WatchList} from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const watchList = await WatchList.find({ media_id: id })
        
   // Fetch user data for each list
   const ListWithUserData = await Promise.all(watchList.map(async (list) => {
       const user = await User.findById(list.user_id).select({ name: 1, username: 1, avatar: 1 });
       const media = await Media.findById(list.media_id).select({ title: 1, poster: 1 });
    return {
        ...list.toObject(),
        user: user ? user.toObject() : null,
        media: media ? media.toObject() : null
    };
}));

         return  NextResponse.json({data:ListWithUserData}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}





