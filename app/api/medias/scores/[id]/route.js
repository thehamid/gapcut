import connect from '@/utils/db'
import {Score} from "@/models/Media"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const scoreList = await Score.find({user_id:id})
         return  NextResponse.json({data:scoreList}, { status: 200 });   
      
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



