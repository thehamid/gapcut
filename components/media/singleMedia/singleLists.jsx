"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/elements/loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { PiPlayCircle } from "react-icons/pi";


const SingleLists = ({ media_id }) => {
  const [lists, setLists] = useState(-1);


  useEffect(() => {
    getReviews();
  },[]);

  //getReviews
  async function getReviews() {
    await axios
      .get(`/api/medias/lists/${media_id}`)
      .then((d) => {
        setLists(d.data.data);
        console.log(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setLists(-2);
      });
  }




  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
    {lists == -1 ? (
        <Loading />
      ) : lists == -2 ? (
        <Loading />
      ) : lists.length == 0 ? (
        <div className="flex flex-col justify-center items-center bg-zinc-900 rounded-md p-4 m-2 gap-2">
          <span>این عنوان در هیچ فهرستی وجود ندارد.</span>
        </div>
      ) : (
        <div class="grid grid-cols-full md:grid-cols-2 gap-4">
          {lists.map((list, i) => (
            <div key={i} class="card bg-zinc-900 rounded-md p-4">
              <div class="flex flex-col gap-2">
                <div class="grid md:grid-cols-5 grid-cols-6 sm:gap-6 gap-5 relative">
                  <div class="col-span-2 md:col-span-1">
                    <div class="multiply-effect relative block">
                      <Link href={`/lists/${list.slug}`}>
                        <Image class="relative z-40 rounded" width="108" height="305" src={list.media.poster} alt={list.media.title}/>    
                      </Link>
                    </div>
                  </div>
                  <div class="md:col-span-4 col-span-4 flex flex-col lg:justify-between"><div>
                    <h2 class="text-lg font-bold">
                      <Link href={`/lists/${list.slug}`}> {list.title}</Link>
                    </h2>
                    <div class="mt-1 flex items-center gap-3 text-sm">
                      <Link href={`/user/${list.user.username}`} class="hidden flex-row items-center gap-1 dark:text-white sm:flex">
                        <Image src={list.user.avatar} width="18" height="18" alt="" class="h-5 w-5 rounded-full border border-white/5"/>
                          <small class="flex-1">{list.user.name}</small>
                      </Link>
                      <span class="flex flex-row items-center gap-1">
                      <PiPlayCircle/>{list.media_id.length} سریال‌ </span>
                    </div>
                  </div>
                    <div class="mt-5 lg:mt-2 text-left">
                      <Link href={`/lists/${list.slug}`} class="bg-red-600 text-white rounded-md text-center p-1">دیدن فهرست</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleLists;
