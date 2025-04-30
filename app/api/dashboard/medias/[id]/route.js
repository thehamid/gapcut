import connect from '@/utils/db'
import { Media } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const id =params.id;
      
    try {
        //find article
        const media = await Media.findById(id)
        return  NextResponse.json({data:media}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}

// //update user data
export async function PUT(req, { params }) {
    await connect();
    const id = params.id;
    const updateOption = {
        new: true,
        upsert: true,
        rawResult: true,
    }; 
    
    const body = await req.json()

    if (!/^[\w\d\s-]+$/.test(body.slug)) {
        return NextResponse.json({data:'خطا در انتخاب نامک مطلب وجود دارد'},{status:402})
    }

    const checkSlug=await Media.findOne({slug: body.slug})
    if (checkSlug && checkSlug._id != id) {
        return NextResponse.json({data:'این نامک وجود دارد، نامک دیگری انتخاب کنید.'},{status:402})
    }

    try {
       
        const mediaUpdate = await Media.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(mediaUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}

//Delete Article
export async function DELETE(req, { params }) {
    await connect();
    const id = params.id;

    try {
       
        const media = await Media.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify(media), { status: 200 });
      
    } catch (error) {
        return new NextResponse({ status: 500 });
    }
}
