"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Loading from "@/components/elements/loading";
import { LuCalendar, LuInstagram, LuTags } from "react-icons/lu";
import { RiTelegramLine } from "react-icons/ri";
import Pagination from "./pagination";

const BlogPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`/api/articles/blog?page=${currentPage}&limit=${itemsPerPage}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [currentPage, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
    

  return (
    <div className="single_article container mx-auto flex lg:flex-row flex-col p-5">
      <section className="content flex flex-col justify-center basis-8/12 m-2">
        {data.length == 0 ? (
          <Loading />
        ) : (
        currentItems.map((article, i) => (
            <div
              key={i}
              className="article md:grid md:grid-cols-2 gap-1 bg-zinc-900 rounded-md m-2"
            >
              <div className="col-span-1 relative ">
                <Image
                  className="w-full h-full rounded-lg object-cover"
                  src={article.imgArticle}
                  width={500}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  objectFit="cover"
                  loading="lazy"
                  alt={article.title}
                />
              </div>

              <div className="col-span-1 p-4">
                <Link
                  href={`/article/${article.slug}`}
                  className="article-title text-white font-bold text-xl"
                >
                  {article.title}
                </Link>
                <div className="article-meta mt-5 flex flex-row items-center justify-between">
                  <div className="article-meta-date flex gap-1 text-xs text-gray-300">
                    <LuCalendar />
                    {article.createdAt}
                  </div>
                </div>
                <div className="article-content text-sm font-light text-gray-300 mt-5">
                  {article.excerpt}
                </div>

                <div className="article-more mt-6 ">
                  <Link
                    href={`/article/${article.slug}`}
                    className="bg-red-600  text-white text-sm font-bold px-2 py-1 mt-4 rounded-md"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

              <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              
      </section>
      <section className="sidebar basis-4/12 m-2 flex flex-col">
        <div className="widget !md:mb-10 mt-5 !mb-0">
          <div className="widget-title">
            <h2 className="mb-5 text-lg text-white font-bold">
              <span> در شبکه‌های اجتماعی همراه ما باشید </span>
            </h2>
          </div>
          <div className="bg-zinc-900 p-5 text-gray-100 flex flex-col gap-1 rounded-lg">
            <Link
              href="https://instagram.com/gapcut.ir"
              target="_blank"
              className="flex w-full flex-row items-center justify-between bg-pink-600  p-2 rounded-md"
            >
              <span> gapcut.ir </span>
              <LuInstagram className="text-xl" />
            </Link>
            <Link
              href="https://t.me/gapcutir"
              target="_blank"
              className="flex w-full flex-row items-center justify-between bg-sky-600  p-2 rounded-md"
            >
              <span> gapcutir </span>
              <RiTelegramLine className="text-2xl" />
            </Link>
          </div>
        </div>
        {/* 
        <div className='widget w-full h-auto bg-gray-700 text-gray-50 rounded-lg text-center font-bold p-10 my-5'>
            پرببیننده ترین مطالب
         </div>

        <div className='widget w-full h-auto bg-gray-700 text-gray-50 rounded-lg text-center font-bold p-10 my-5'>
              بازیگران مرتبط با مطلب

        </div> */}
      </section>
    </div>
  );
};

export default BlogPage;
