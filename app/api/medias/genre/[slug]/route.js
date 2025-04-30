export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Media,Season } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const slug = params.slug;
      
    try {
        //find media
        const mediaList = await Media.aggregate([
            // 1. Join با جدول Genre
            {
              $lookup: {
                from: "genres", // نام collection ژانرها در دیتابیس (معمولاً جمع بسته مدل Genre است)
                localField: "genre", // فیلد ارجاعدهنده در مدل Media
                foreignField: "_id", // فیلد مرتبط در مدل Genre
                as: "genreData" // نام آرایه ذخیره دادههای ژانر
              }
            },
            // 2. تبدیل آرایه genreData به آبجکت
            { $unwind: "$genreData" },
            // 3. فیلتر بر اساس slug دریافتی
            {
              $match: {
                "genreData.slug": slug // slug دریافتی از params
              }
            },
            // 4. انتخاب فیلدهای مورد نیاز
            {
              $project: {
                _id: 0,
                title: 1,
                poster: 1,
                slug: 1,
                yearProduct: 1,
                // اضافه کردن اطلاعات ژانر به نتیجه
                genre: {
                  title: "$genreData.title",
                  slug: "$genreData.slug"
                }
              }
            }
          ]);
        
        
        return new NextResponse( JSON.stringify({data: mediaList}),{ status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}