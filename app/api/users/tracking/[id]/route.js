import connect from '@/utils/db'
import {Track ,User} from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const trackList = await Track.find({user_id:id})
         return  NextResponse.json({data:trackList}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//add track
export async function PUT(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'User  ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        if (!body?.media) {
            return new NextResponse(JSON.stringify({ error: 'Media data is required' }), { status: 400 });
        }

        // Fetch the user
        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        // Update tracking array
        const newTrack = [...user.tracking, body.media];

        // Define update options
        const updateOption = {
            new: true,
            upsert: true,
            rawResult: true,
        };

        // Update the user document
        const updatedUser  = await User.findByIdAndUpdate(
            id,
            { $set: { tracking: newTrack } },
            updateOption
        );

        // Return the updated user
        return new NextResponse(JSON.stringify(updatedUser ), { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}



export async function DELETE(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        // Parse request body
        const body = await req.json();
     
            // Validate input
            if (!id || !body.media_id) {
                return NextResponse.json(
                { error: "userId and mediaId are required" },
                { status: 400 }
                );
            }

        // Delete the track from the database
        const result = await Track.deleteOne({user_id:id,media_id:body?.media_id});


        // Check if the user was found and updated
        if (!result  ) {
            return new NextResponse(JSON.stringify({ error: 'not found' }), { status: 404 });
        }

        // Return success response
        return new NextResponse(JSON.stringify({ message: 'Media deleted from tracking array', updatedUser   }), { status: 200 });
    } catch (error) {
        console.error('Error deleting media from tracking array:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}