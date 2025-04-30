'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LuInstagram} from "react-icons/lu";
import LikeButton from '@/components/elements/likeButton';

const Person = ({ data }) => {
  return (
    <div className='single_article container min-h-screen mx-auto flex flex-col p-5 gap-3 md:flex-row'>
    
      <div className='basis-full md:basis-1/4'> 
        <div className='bg-zinc-800 rounded-lg p-3 mx-auto'>
          <Image src={data.person.imgPerson} alt={data.person.name} width={500} height={500} className='object-cover w-full h-auto rounded-lg' />
          <div className='font-extrabold text-xl text-center p-2 mt-2'>{data.person.name}</div>
          <div className='flex gap-2 justify-center'>
          {data.person.cats.map((cat, i) => (
             <small className='text-center p-2 mt-2 text-gray-300' key={i}>{ cat.title}</small>
          ))} 
          </div>        
          <div className='text-center p-2 mt-2'>متولد:{ data.person.birthday}</div>
          <p className='text-justify leading-relaxed mt-2' dangerouslySetInnerHTML={{ __html: data.person.bio }}></p>
          <div className='text-center p-2 mt-5'>
            <Link href={`https://instagram.com/${data.person.social}`} className='flex gap-2 justify-center'>
              {data.person.social}   
              <LuInstagram/>
            </Link>        
          </div>
          <div className="flex justify-center p-2 mt-5">
            <LikeButton person_id={ data.person._id} person_name={data.person.name} />
          </div> 
        </div> 
        
      </div>
      <div className='basis-full md:basis-3/4'>
      <h2 className="pinline mt-3 flex text-base font-extrabold ">
            مجموعه آثار  
       </h2>  

        <div class="grid grid-cols-2 gap-4">
          {data.roles.map((role, i) => (
            <Link key={i} href={`/media/${role.media_id.slug}`} className="flex flex-col justify-center gap-2 md:flex-row md:justify-start bg-zinc-900" >
              <div className="p-1">
                <Image
                  src={role.media_id.poster}
                  width={80}
                  height={120}
                  className="rounded-md w-20 h-28 "
                />
              </div>
              <div className="p-1 flex flex-col justify-center gap-2">
                <span className="font-extrabold text-gray-50 text-xl">{role.media_id.title} ({role.media_id.yearProduct})</span>
                <span className="text-gray-100 text-sm font-bold ">{role.role_name}</span>
              </div>
            </Link>
          ))
       
          }

       
         


       </div>


    
        
      </div>

    </div>
  )
}

export default Person