"use client";
import React from "react";
import Link from "next/link";
import { LuBarChart3 } from "react-icons/lu";
import dynamic from "next/dynamic";

const MyModal = dynamic(() => import("@/components/elements/mymodal"), {
  ssr: false,
});

const SingleSidebar = ({ media }) => {
  return (
    <div className="col-span-8 lg:col-span-2 p-2">
      <div className="sidebar">
        <div className="widget">
          <MyModal video={media.videoTizer} />

          <button className="border-2 border-white/80 text-white rounded-lg w-full text-center p-3 mb-2">
            <span className="flex justify-between">
              <p>امتیاز هر قسمت (بزودی)</p>
              <LuBarChart3 className="text-2xl" />
            </span>
          </button>
        </div>
        <div className="widget !md:mb-10 mt-5 !mb-0">
          <div className="widget-title">
            <h2 className="mb-5 text-lg text-white font-bold">
              <span>اطلاعات سریال</span>
            </h2>
          </div>
          <div className="bg-zinc-900 p-5 text-gray-100 flex flex-col gap-1 rounded-lg">
            {media.premiereDate ? (
              <span className="inline-flex">
                {" "}
                شروع نمایش: {media.premiereDate}
              </span>
            ) : (
              ""
            )}
            {media.status ? (
              <span className="inline-flex">وضعیت: {media.status}</span>
            ) : (
              ""
            )}
            {media.schedule ? (
              <span className="inline-flex">زمان پخش: {media.schedule}</span>
            ) : (
              ""
            )}
            {media.runtime ? (
              <span className="inline-flex">مدت: {media.runtime}</span>
            ) : (
              ""
            )}
            {media.production ? (
              <span className="inline-flex">محصول: {media.production}</span>
            ) : (
              ""
            )}
            {media.link ? (
            <span className="inline-flex"> پیوند: <Link className="text-red-700" href={media.link}>سایت رسمی  </Link> </span>
          ) : (
              ""
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSidebar;
