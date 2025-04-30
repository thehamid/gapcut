import connect from '@/utils/db'
import { Episode } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id



    try {
        const episodes = await Episode.find({media_id:id})
        return  NextResponse.json({data:episodes}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}

// //update cat data
export async function PUT(req, { params }) {
    await connect();
    const id = params.id;
    const updateOption = {
        new: true,
        upsert: true,
        rawResult: true,
    }; 
    
    const body = await req.json()

    try {
       
        const partUpdate = await Episode.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(partUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}

//Delete cat
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const part = await Episode.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(part), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}