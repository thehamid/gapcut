import connect from '@/utils/db'
import {WatchList,User} from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const watchList = await WatchList.find({user_id:id})
         return  NextResponse.json({data:watchList}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//add track
export async function PUT(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        const id = params.id;
        // Fetch the watchlist
        const watchlist = await WatchList.findById(id);
        if (!watchlist) {
            return new NextResponse(JSON.stringify({ error: 'Watchlist not found' }), { status: 404 });
        }
    
        // Parse request body
        const body = await req.json();
        if (!body?.media_id) {
            return new NextResponse(JSON.stringify({ error: 'Media data is required' }), { status: 400 });
        }
    
        // Add or remove media_id from the media_id array
        const mediaIndex = watchlist.media_id.indexOf(body.media_id);
        if (mediaIndex === -1) {
            // Add media_id if it doesn't exist
            watchlist.media_id.push(body.media_id);
        } else {
            // Remove media_id if it exists
            watchlist.media_id.splice(mediaIndex, 1);
        }
    
        // Define update options
        const updateOption = {
            new: true,
            upsert: true,
            rawResult: true,
        };
    
        // Update the watchlist document
        const updatedWatchList = await WatchList.findByIdAndUpdate(
            id,
            { $set: { media_id: watchlist.media_id } },
            updateOption
        );
    
        return new NextResponse(JSON.stringify(updatedWatchList), { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

