import connect from '@/utils/db'
import { Genre } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function GET(req) {

    await connect();  
    try {
        const categories = await Genre.find().lean()
        return new NextResponse(JSON.stringify(categories), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}


export async function POST(req) {


    await connect();   
    const body = await req.json()


    if (!/^[\w\d\s-]+$/.test(body.slug)) {
        return NextResponse.json({data:'خطا در انتخاب نامک دسته وجود دارد'},{status:402})
    }

    const checkSlug=await Genre.findOne({slug: body.slug})
    if (checkSlug) {
        return NextResponse.json({data:'این نامک وجود دارد، نامک دیگری انتخاب کنید.'},{status:402})
    }

    try {
        const newCategory = new Genre();

        newCategory.set({ ...body });
        const category=await newCategory.save();
        return new NextResponse(JSON.stringify(category), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}