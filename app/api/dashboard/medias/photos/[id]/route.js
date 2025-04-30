import connect from '@/utils/db'
import { Photo } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';


//Delete cat
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const photo = await Photo.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(photo), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}