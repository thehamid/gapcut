import connect from '@/utils/db'
import { Cast } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id

    try {
        const casts = await Cast.find({media_id:id}).populate("person_id")
        return  NextResponse.json({data:casts}, { status: 200 });
    
      
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
       
        const roleUpdate = await Cast.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(roleUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}

//Delete cat
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const role = await Cast.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(role), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}