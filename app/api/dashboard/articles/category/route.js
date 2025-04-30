import connect from '@/utils/db'
import { ArticleCats } from "@/models/Article"
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

export async function GET(req) {
    // const session = await getServerSession();
    // console.log(session.user)
    //    if (!session || (session && !session.user.isAdmin)) {
    //   return NextResponse.json({data:'خطا در انتخاب نامک دسته وجود دارد'},{status:402})
    // }

    await connect();  
    try {
        const categories = await ArticleCats.find().lean()
        return new NextResponse(JSON.stringify(categories), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}


export async function POST(req) {

    // const session = await getSession({ req })

    // if (!session || (session && !session.user.isAdmin)) {
    //   return res.status(401).send('singin required')
    // }

    await connect();   
    const body = await req.json()


    if (!/^[\w\d\s-]+$/.test(body.slug)) {
        return NextResponse.json({data:'خطا در انتخاب نامک دسته وجود دارد'},{status:402})
    }

    const checkSlug=await ArticleCats.findOne({slug: body.slug})
    if (checkSlug) {
        return NextResponse.json({data:'این نامک وجود دارد، نامک دیگری انتخاب کنید.'},{status:402})
    }

    try {
        const newCategory = new ArticleCats();

        newCategory.set({ ...body });
        const category=await newCategory.save();
        //const userUpdate = await User.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(category), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}