"use client";
import Image from "next/image";
import Link from "next/link";
import {
  LuClipboard,
  LuFilm,
  LuHome,
  LuInstagram,
  LuList,
  LuPlaySquare,
  LuNewspaper,
  LuPlayCircle,
  LuStar,
  LuUsers2,
  LuListPlus,
} from "react-icons/lu";
import Tracking from "@/components/elements/tracking";
import { StarRate } from "../reviews/starRate";
import WatchListButton from "@/components/elements/watchListButton";

const SingleHeader = ({ media, season, page, children }) => {
  
  return (
    <div className="single_media relative">
      <div className="cover absolute z-0 h-72 w-full md:h-96">
        <Image
          src={media.header}
          alt={media.title}
          width={1280}
          height={500}
          className="absolute left-0 top-0 h-full w-full object-cover object-top opacity-40"
        />
      </div>

      <div className="header relative flex h-72 flex-col justify-end py-5 md:h-96">
        <div className="z-10 px-5 md:px-8 xl:px-0">
          <div className="xl:container mx-auto">
            <div className="grid w-full lg:grid-cols-8 lg:gap-8">
              <div className="col-span-2 hidden lg:flex"></div>
              <div className="col-span-8 flex flex-col items-center lg:col-span-6 lg:block">
              <StarRate med={media} />
                <div className="order-1 mb-3 flex items-center gap-1 lg:order-2 lg:mb-0">
                  <h1 className="text-2xl text-white md:text-4xl md:font-bold" >
                    <Link href={`/media/${media.slug}`} id="show-title">
                      {media.title}
                    </Link>
                  </h1>
                  <div  className="hidden">
                    {media.summary}
                  </div>
                </div>
                <ul className="order-3 my-2 inline-flex gap-5 border-y border-y-white/10 py-2 text-center text-xs text-white md:my-4 md:text-left md:text-base">
                  <li>
                    <span>{media.yearProduct}</span>
                  </li>
                  <li>
                    <span> {season} فصل</span>
                  </li>
                  {media.network.map((n, i) => (
                    <li key={i}>
                      <Link href={`/network/${n.slug}`}>
                        <span className="font-bold underline">{n.title}</span>
                      </Link>
                    </li>
                  ))}
                  {media.genre.map((g, i) => (
                    <li key={i}>
                      <span>
                        <Link href={`/genre/${g.slug}`}>{g.title}</Link>
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="order-4 my-2 flex items-center justify-start space-x-3 text-white gap-2">
                  <li>
                    <Tracking media_id={media._id} media_title={media.title} />
                  </li>
                  <li>
                   <WatchListButton media_id={media._id} media_title={media.title} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative shadow-sm bg-zinc-900 ">
        <div className="px-3 md:px-8 xl:px-0">
          <div className="xl:container mx-auto">
            <div className="grid gap-8 lg:grid-cols-8">
              <div className="col-span-2 hidden lg:block"></div>
              <div className="col-span-8 flex items-center justify-center gap-3 md:col-span-6 md:justify-between">
                <ul className="flex flex-row gap-6 md:gap-7">
                  <li key={"home"}>
                    <Link
                      href={`/media/${media.slug}`}
                      className={`${
                        page == "home" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuHome />
                      </i>
                      <span className="hidden md:inline-flex"> نیم نگاه</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/media/${media.slug}/episodes`}
                      className={`${
                        page == "episodes" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuPlayCircle />
                      </i>
                      <span className="hidden md:inline-flex">قسمت‌ها</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/media/${media.slug}/cast`}
                      className={`${
                        page == "casts" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuUsers2 />
                      </i>
                      <span className="hidden md:inline-flex">
                        {" "}
                        بازیگران و عوامل
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/media/${media.slug}/reviews`}
                      className={`${
                        page == "reviews" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuClipboard />
                      </i>
                      <span className="hidden md:inline-flex"> نقد و بررسی</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/media/${media.slug}/news`}
                      className={`${
                        page == "news" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuNewspaper />
                      </i>
                      <span className="hidden md:inline-flex"> اخبار </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/media/${media.slug}/lists`}
                      className={`${
                        page == "lists" ? "border-red-600 border-b-4" : ""
                      } flex items-center justify-center px-2 py-5 text-sm font-bold md:px-0`}
                    >
                      <i className="text-lg md:hidden">
                        <LuList />
                      </i>
                      <span className="hidden md:inline-flex"> لیست‌ها </span>
                    </Link>
                  </li>
                </ul>
                <ul className="hidden gap-2 md:flex">
                  <li>
                    {media.instagram ? (
                      <Link
                        href={`https://instagram.com/${media.instagram}`}
                        target="_blank"
                      >
                        <span className="text-2xl">
                          <LuInstagram />
                        </span>{" "}
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="xl:container mx-auto">
          <div className="grid grid-cols-8 gap-8">
            <div className="col-span-8 hidden lg:col-span-2 lg:block">
              <div className="sidebar z-30 lg:-mt-80">
                <figure className="cell relative hidden md:block">
                  <Link href={`/media/${media.slug}`}>
                    <picture className="no-progress rounded-x-sm overflow-hidden">
                      <Image
                        src={media.poster}
                        width={488}
                        height={612}
                        loading="lazy"
                        className="rounded-lg"
                        alt={media.title}
                      />
                    </picture>
                  </Link>
                </figure>
                <div className="widget !md:mb-10 mt-5 !mb-0">
                  <div className="widget-title">
                    <h2 className="mb-5 text-lg text-white font-bold">
                      <span>کجا ببینیم</span>
                    </h2>
                  </div>

                  <div className="bg-zinc-900 rounded-lg text-white p-5">
                    {media.watchLink ? (
                      <Link
                        href={media.watchLink}
                        target="_blank"
                        title={media.title}
                        data-platform={media.title}
                      >
                        <span className="flex justify-between">
                          {media.title}
                          <LuPlaySquare className="text-2xl text-red-600" />
                        </span>
                      </Link>
                    ) : (
                      <span className="flex justify-between">
                        متاسفانه وجود ندارد
                        <LuFilm />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHeader;
