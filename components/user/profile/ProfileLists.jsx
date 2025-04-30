import Image from 'next/image'
import Link from 'next/link'
import { PiPlayCircle } from 'react-icons/pi'


export default function ProfileLists({ data }) {
  
  return (
    <div class="grid grid-cols-full gap-5 md:grid-cols-2 lg:grid-cols-3">
    {(data).length!= 0?         
      data.map((list, i) => (
     <div class="tracked-item" key={i}>
          <div class="card bg-zinc-900 rounded-md p-4">
              <div class="flex flex-col gap-2">
                <div class="grid md:grid-cols-5 grid-cols-6 sm:gap-6 gap-5 relative">
                  <div class="col-span-2 md:col-span-1">
                    <div class="multiply-effect relative block">
                      <Link href={`/lists/${list.slug}`}>
                        <Image class="relative z-40 rounded" width="108" height="305" src={list.media_id[0]?.poster} alt={list.media_id[0]?.title}/>    
                      </Link>
                    </div>
                  </div>
                  <div class="md:col-span-4 col-span-4 flex flex-col lg:justify-between"><div>
                    <h2 class="text-lg font-bold">
                      <Link href={`/lists/${list.slug}`}> {list.title}</Link>
                    </h2>
                    <div class="mt-1 flex items-center gap-3 text-sm">
                      <span class="flex flex-row items-center gap-1">
                      <PiPlayCircle/>{list.media_id.length} سریال‌ </span>
                    </div>
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
        </div>
      )) :
      <div className="w-relative col-span-full text-center bg-zinc-900 rounded-md p-4">      
        <span>این کاربر هیچ فهرستی ندارد!</span>
    </div>                      
    }
         
  </div>
  )
}
