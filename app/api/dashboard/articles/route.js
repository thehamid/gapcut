import connect from '@/utils/db'
import { Article } from "@/models/Article"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req) {
    await connect();
          
    try {
        const articles = await Article.find({}).sort({_id:-1}).populate("author").lean()
        return new NextResponse(JSON.stringify(articles), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}


export async function POST(req) {

    await connect();   
    const body = await req.json()

    if (!/^[\w\d\s-]+$/.test(body.slug)) {
        return NextResponse.json({data:'خطا در انتخاب نامک مطلب وجود دارد'},{status:402})
    }

    const checkSlug=await Article.findOne({slug: body.slug})
    if (checkSlug) {
        return NextResponse.json({data:'این نامک وجود دارد، نامک دیگری انتخاب کنید.'},{status:402})
    }


    try {
        const newArticle = new Article();

        newArticle.set({ ...body });
        const article=await newArticle.save();
        return new NextResponse(JSON.stringify(article), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}