import React from "react";
import Link from "next/link";
import Image from "next/image";

const CardHero = ({ data }) => {
  return (
    <div className="cardhero">
      <article className="relative flex aspect-video h-auto w-[100%] m-5 items-end overflow-hidden rounded-lg bg-black text-white">
        <div className="w-full relative pt-[100%]">
          {data ? (
            <Image
              src={data.imgArticle}
              alt={data.title}
              width={750}
              height={420}
              priority={true}
              className="w-full h-full  top-0 left-0 object-cover rounded-lg opacity-40"
            />
          ) : (
            <div className="card__placeholder w-full h-full top-0 left-0 object-cover rounded-lg opacity-40"></div>
          )}
        </div>
        <div className="absolute bottom-2 flex flex-col m-3 ">
          <Link href={`/article/${data.slug}`}>
            <h3 className="font-bold text-2xl mb-3">{data.title}</h3>{" "}
          </Link>
          <p className=" text-gray-200 line-clamp-2 text-base sm:text-sm mb-3">
            {data.excerpt}
          </p>
          <Link
            href={`/article/${data.slug}`}
            className=" text-white bg-red-600 transition-all duration-300 hover:bg-red-700 max-w-[120px] text-center px-3 py-1 rounded mb-3"
          >
            ادامه مطلب
          </Link>
        </div>
      </article>
    </div>
  );
};

export default CardHero;
