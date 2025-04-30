import connect from '@/utils/db'
import {Review} from "@/models/Media"
import {User} from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const reviewList = await Review.find({ media_id: id })
        
   // Fetch user data for each review
   const reviewListWithUserData = await Promise.all(reviewList.map(async (review) => {
    const user = await User.findById(review.user_id).select({name:1,username:1,avatar:1});
    return {
        ...review.toObject(),
        user: user ? user.toObject() : null
    };
}));

         return  NextResponse.json({data:reviewListWithUserData}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//Update Score
export async function PUT(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'Score ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        if (!body?.media_id) {
            return new NextResponse(JSON.stringify({ error: 'Media data is required' }), { status: 400 });
        }

        // Fetch the user
        const myScore = await Score.findById(id);
        if (!myScore) {
            return new NextResponse(JSON.stringify({ error: 'Score not found' }), { status: 404 });
        }

    
        // Define update options
        const updateOption = {
            new: true,
            upsert: true,
            rawResult: true,
        };

        // Update the user document
        const updatedScore  = await Score.findByIdAndUpdate(
            id,
            { $set: { score: body.score } },
            updateOption
        );

        // Return the updated user
        return new NextResponse(JSON.stringify(updatedScore ), { status: 200 });
    } catch (error) {
        console.error('Error updating Score:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}



