export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Person } from "@/models/Person"
import { NextResponse } from 'next/server';


export async function GET(req) {

    await connect();  
    try {
        const persons = await Person.find().lean()
        return new NextResponse(JSON.stringify(persons), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}