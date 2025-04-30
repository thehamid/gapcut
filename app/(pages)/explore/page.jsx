"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/elements/loading";

const Explore = () => {
  const [Medias, setMedias] = useState(-1);
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams && searchParams.get("?");

  // fetch the medias
  useEffect(() => {
    fetch("/api/medias/search")
      .then((response) => response.json())
      // save the complete list of users to the new state
      .then((data) => setMedias(data.data))
      // if there's an error we log it to the console
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-svh">
      <h1 className="pinline text-4xl font-bold mb-4 mt-2">
        کاوش در سریال‌های ایرانی
      </h1>
      <div className="mb-4 text-sm ">
          {Medias == -1 ? (
            <Loading />
          ) : Medias.length == 0 ? (
            <div className="flex flex-col justify-center items-center bg-zinc-900 rounded-md p-4 m-2 gap-2">
              <span>سریالی وجود ندارد!</span>
            </div>
          ) : (
            <ul className="grid md:grid-cols-4 gap-3">
              {Medias.map((item) => (
                <li key={item.id} className="col-span-1">
                  <Link
                    href={`/media/${item.slug}`}
                    className="flex gap-2 bg-zinc-900 rounded-md p-2"
                  >
                    <Image
                      src={item.poster}
                      width={100}
                      height={150}
                      className="rounded-sm object-cover"
                      alt={item.title}
                    />
                    <span>
                      <h2 className="text-red-600 font-bold text-xl mb-2">
                        {item.title}
                      </h2>
                      <small className="text-sm text-gray-400 ">
                        ({item.yearProduct})
                      </small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
};

export default Explore;
