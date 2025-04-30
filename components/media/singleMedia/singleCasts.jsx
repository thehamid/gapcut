"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/elements/loading";
import ActorCard from "@/components/media/casts/actor";
import axios from "axios";

const SingleCasts = ({ media_id }) => {
  const [allCast, setallCast] = useState(-1);

  useEffect(() => {
    getData();
  }, [media_id]);

  //Episodes
  async function getData() {
    await axios
      .get(`/api/medias/casts/${media_id}`)
      .then((d) => {
        setallCast(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallCast(-2);
      });
  }

  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
      {allCast == -1 ? (
        <Loading />
      ) : allCast == -2 ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-start">
          <h2 className="pinline text-base font-normal capitalize dark:font-extrabold text-white">
            بازیگر
          </h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
            {allCast.map((cast, i) =>
              cast.person_cat == "بازیگر" ? (
                <ActorCard data={cast} key={i} />
              ) : (
                ""
              )
            )}
          </div>

          <h2 className="pinline text-base font-normal capitalize dark:font-extrabold text-white mt-4">
            کارگردان
          </h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-6">
            {allCast.map((cast, i) =>
              cast.person_cat == "کارگردان" ? (
                <Link
                  key={i}
                  href={`/person/${cast.person_id.slug}`}
                  className="flex flex-col justify-center gap-2 bg-zinc-800 rounded-md md:flex-row md:justify-start"
                >
                  <div className="p-1">
                    <Image
                      src={cast.thumb}
                      width={80}
                      height={80}
                      className="rounded-md w-20 h-20 "
                      alt={cast.person_id.name}
                    />
                  </div>
                  <div className="p-1 flex flex-col gap-2">
                    <span className="font-extrabold">
                      {cast.person_id.name}
                    </span>
                    <span className="text-gray-400">{cast.role_name}</span>
                  </div>
                </Link>
              ) : (
               ""

              )
            )}
          </div>

          <h2 className="pinline text-base font-normal capitalize dark:font-extrabold text-white mt-4">
            تهیه کننده
          </h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-6">
            {allCast.map((cast, i) =>
              cast.person_cat == "تهیه کننده" ? (
                <Link
                  key={i}
                  href={`/person/${cast.person_id.slug}`}
                  className="flex flex-col justify-center gap-2  bg-zinc-800 rounded-md md:flex-row md:justify-start"
                >
                  <div className="p-1">
                    <Image
                      src={cast.thumb}
                      width={80}
                      height={80}
                      className="rounded-md w-20 h-20 "
                      alt={cast.person_id.name}
                    />
                  </div>
                  <div className="p-1 flex flex-col gap-2">
                    <span className="font-extrabold">
                      {cast.person_id.name}
                    </span>
                    <span className="text-gray-400">{cast.role_name}</span>
                  </div>
                </Link>
              ) : (
                  ""
              )
            )}
          </div>
          <h2 className="pinline text-base font-normal capitalize dark:font-extrabold text-white mt-4">
            نویسنده
          </h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-6">
            {allCast.map((cast, i) =>
              cast.person_cat == "نویسنده" ? (
                <Link
                  key={i}
                  href={`/person/${cast.person_id.slug}`}
                  className="flex flex-col justify-center  bg-zinc-800 rounded-md gap-2 md:flex-row md:justify-start"
                >
                  <div className="p-1">
                    <Image
                      src={cast.thumb}
                      width={80}
                      height={80}
                      className="rounded-md w-20 h-20 "
                      alt={cast.person_id.name}
                    />
                  </div>
                  <div className="p-1 flex flex-col gap-2">
                    <span className="font-extrabold">
                      {cast.person_id.name}
                    </span>
                    <span className="text-gray-400">{cast.role_name}</span>
                  </div>
                </Link>
              ) : (
""
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCasts;
