import connect from '@/utils/db'
import { Person } from "@/models/Person"
import { Cast } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const slug =params.slug;
      
    try {
        //find person
        const person = await Person.findOne({ slug: slug }).populate("cats");

        const roles = await Cast.find({ person_id: person._id }).populate("media_id");

        
         return  NextResponse.json({person:person,roles:roles}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}