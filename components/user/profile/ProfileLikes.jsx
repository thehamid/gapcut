'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileLikes({ data }) {
  
  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
    <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
    {(data.favs).length!= 0?
         data.favs.map((user, i) => (
          <div key={i} className="w-relative  w-full max-w-[220] p-2 bg-zinc-900 rounded-md">
          <Link
            className="relative text-center"
            href={`/person/${user.slug}`}
          >
            <Image
              className="w-full aspect-square rounded-lg object-cover"
              src={user.imgPerson}
              alt={user.name}
              width={240}
              height={240}
            />
          </Link>
          <div className="flex items-center justify-center  mt-1">
            <Link
              className="relative text-center"
              href={`/person/${user.slug}`}
            >
              <h2 className="font-bold text-sm text-gray-50">{user.name}</h2>
            </Link>
          </div>
        </div>
          )
        ) :
        <div className="w-relative col-span-full text-center bg-zinc-900 rounded-md p-4">      
          {data.user.name}هنوز به هیچ شخص  علاقه ندارد !
        </div>
                    
      }
        </div>

  </div>
  )
}
