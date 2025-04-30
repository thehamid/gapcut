import connect from '@/utils/db'
import { Episode, Seen } from "@/models/Media"
import {User} from "@/models/User"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id
    const s_num=params.season_number
    const e_num=params.episode_number

    try {
        const episode = await Episode.find({ media_id: id, season_number: s_num, episode_number: e_num })
        const seens = await Seen.find({ episode_id: episode[0]._id })
        
          // Fetch user data for each review
           const reviewListWithUserData = await Promise.all(seens.map(async (review) => {
            const user = await User.findById(review.user_id).select({name:1,username:1,avatar:1});
            return {
                ...review.toObject(),
                user: user ? user.toObject() : null
            };
        }));

        return  NextResponse.json({data:episode,seens:reviewListWithUserData}, { status: 200 });   
    } catch (error) {     
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}