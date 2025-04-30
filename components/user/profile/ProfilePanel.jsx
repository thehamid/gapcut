'use client'
import Image from 'next/image'
import Link from 'next/link'
import ProfileMedias from './ProfileMedias'
import { LuSend,LuStar,LuPlay,LuHeart } from "react-icons/lu";
import ProfileLists from './ProfileLists';

function ProfilePanel({ data }) {
 
  return (
      <div>
           <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <div className="card flex flex-row items-center gap-4 bg-zinc-950 p-4 rounded-md">
              <LuSend className='md:text-4xl text-xl text-primary' />         
              <div>
                <Link href="/user/ihamid/tracking">
                  <h2 className="text-2xl font-bold sm:text-4xl">{(data.tracks).length} </h2>
                  <span className="text-sm font-bold text-slate-600">آثار دنبال کننده</span>
                </Link>
              </div>
            </div>
            <div className="card flex flex-row items-center gap-4  bg-zinc-950 p-4 rounded-md">
            <LuPlay className='md:text-4xl text-xl text-primary' /> 
              <div>
                <h2 className="text-2xl font-bold sm:text-4xl">{(data.seens)}</h2>
                <span className="text-sm font-bold text-slate-600">قسمت‌های دیده شده</span>
              </div>
            </div>
            <div className="card flex flex-row items-center gap-4  bg-zinc-950 p-4 rounded-md">
            <LuHeart className='md:text-4xl text-xl text-primary' /> 
              <div>
                <h2 className="text-2xl font-bold sm:text-4xl">{(data.user.favs).length} </h2>
                <span className="text-sm font-bold text-slate-600">مورد پسند‌ها</span>
              </div>
            </div>
            <div className="card flex flex-row items-center gap-4  bg-zinc-950 p-4 rounded-md">
            <LuStar className='md:text-4xl text-xl text-primary' /> 
              <div>
                <h2 className="text-2xl font-bold sm:text-4xl">{(data.scores)}</h2>
                <span className="text-sm font-bold text-slate-600">نمره‌های آثار </span>
              </div>
            </div>
          </div>
          <section className="my-6">
            <div className="flex items-center justify-between">
              <h2 className="pinline text-2xl font-bold"> آخرین فعالیت</h2>
            </div>
            <div className="activity-feed">
              <div className="text-center bg-zinc-950 p-4 rounded-md"> شما تاکنون فعالیتی نداشته‌اید. </div>
            </div>
          </section>
          <section className="my-6">
            <div className="flex items-center justify-between">
              <h2 className="pinline text-2xl   font-bold">آثاری که دنبال می‌کنم</h2>
            </div>
            <ProfileMedias data={data.tracks.slice(0,5)} />
          </section>
          <section className="my-6">
            <div className="flex items-center justify-between">
              <h2 className="pinline text-2xl font-bold"> فهرست تماشای شما</h2>
            </div>
              <ProfileLists data={data.watchlists.slice(0,3)} />  
          </section>
    </div>
  )
}

export default ProfilePanel