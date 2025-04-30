import connect from '@/utils/db'
import  File  from "@/models/File"
import { NextRequest,NextResponse } from 'next/server';

//Delete Article
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const file = await File.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(file), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}