import connect from '@/utils/db'
import { Network } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';



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
       
        const catUpdate = await Network.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(catUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}

//Delete cat
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const category = await Network.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(category), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}