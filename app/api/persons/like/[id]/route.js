import connect from '@/utils/db'
import { Person } from "@/models/Person"
import { User } from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const fansList = await Person.findById(id).select({fans:1})
         return  NextResponse.json({data:fansList}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//add track
export async function PUT(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        const person = await Person.findById(id);
        if (!person) {
            return new NextResponse(JSON.stringify({ error: 'Person ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        // Fetch the user
        const user = await User.findById(body.user_id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

       
           // Define update options
        const updateOption = {
            new: true,
            upsert: true,
            rawResult: true,
        };

         // Update tracking array
         const newlike = [...person.fans,body.user_id];

        // Update the user document
        const updatedPersonFans  = await Person.findByIdAndUpdate(
            id,
            { $set: { fans: newlike } },
            updateOption
        );


         // Update tracking array
         const newfavs = [...user.favs,id];
        // Update the user document
        const updatedUserFavs = await User.findByIdAndUpdate(
            body.user_id,
            { $set: { favs: newfavs } },
            updateOption
        );

        // Return the updated user
        return new NextResponse(JSON.stringify(updatedPersonFans,updatedUserFavs ), { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        const person = await Person.findById(id);
        if (!person) {
            return new NextResponse(JSON.stringify({ error: 'User  ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
       // Fetch the user
        const user = await User.findById(body.user_id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        // Check if user is following the target user
        if (!user.favs.includes(id)) {
            return new NextResponse(JSON.stringify({ error: 'User  is not fans the target person' }), { status: 400 });
        }


        // Update the user document
        const updatedPersonFans = await Person.findByIdAndUpdate(
            id,
            { $pull: { fans:  body.user_id } },
            { new: true}
        );

       

        // Update the user document
        const updatedUserFavs= await User.findByIdAndUpdate(
            body.user_id,
            { $pull: { favs: id } },
            { new: true }
        );


        // Return the updated user
        return new NextResponse(JSON.stringify(updatedPersonFans,updatedUserFavs), { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

