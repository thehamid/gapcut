export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Article } from "@/models/Article"
import {NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const slug =params.slug;
      
    try {
        //find article
        const article = await Article.findOne({ slug: slug }).populate("author","name").populate("cats")
        
         return  NextResponse.json({data:article}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}