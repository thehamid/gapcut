"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RxPencil2 } from "react-icons/rx";
import { RiVipCrownLine } from "react-icons/ri";
import { BsCalendar4Range } from "react-icons/bs";
import FollowingButton from "@/components/elements/followingButton";
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
  LuHeart,
  LuMenuSquare,
  LuUser2,
} from "react-icons/lu";
import { PiUsers, PiUsersThree } from "react-icons/pi";

function ProfileHeader({ data, page, children }) {
  const { data: session } = useSession();

  // این تابع فاصله بین دو زمان (timestamp) را محاسبه و خروجی را بر اساس شرایط مشخص ارائه می‌کند
  function calculateTimeDifference(startTimestamp, endTimestamp) {
    // تبدیل timestamp به میلی‌ثانیه
    const startTime = new Date(startTimestamp).getTime();
    const endTime = new Date(endTimestamp).getTime();

    // محاسبه اختلاف زمانی بر حسب میلی‌ثانیه
    const timeDiff = Math.abs(endTime - startTime);

    // محاسبه واحدهای مختلف
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // تقریبی
    const years = Math.floor(days / 365); // تقریبی

    // انتخاب قالب خروجی بر اساس شرایط
    if (seconds < 60) {
      return `${seconds} ثانیه`;
    } else if (minutes < 60) {
      return `${minutes} دقیقه`;
    } else if (hours < 24) {
      return `${hours} ساعت`;
    } else if (days < 7) {
      return `${days} روز`;
    } else if (weeks < 4) {
      return `${weeks} هفته`;
    } else if (months < 12) {
      return `${months} ماه`;
    } else {
      return `${years} سال`;
    }
  }
  return (
    <div className="single_article container min-h-screen mx-auto flex flex-col p-5 gap-3 md:flex-row">
      <div className="basis-full md:basis-1/4">
        <div className="bg-zinc-800 rounded-lg p-3 mx-auto text-center">
          <Image
            src={data.user.avatar}
            alt={data.user.name}
            width={500}
            height={500}
            className="object-cover w-full h-auto rounded-lg"
          />
          <div className="font-bold text-xl  p-2 md:text-right">
            {data.user.name}
          </div>
          <div className="font-bold text-xs text-red-600  p-2 md:text-right">
            <Link href={`/user/${data.user.username}`}>
              {data.user.username}@
            </Link>
          </div>
          <div className="my-3 md:text-right">
            {session?.user.email == data.user.email ? (
              <Link
                href="/profile"
                className="border border-red-600 bg-primary font-bold  text-white px-2 py-1 m-1 rounded-lg"
              >
                ویرابش پروفایل
              </Link>
            ) : (
              <FollowingButton user={data.user} />
            )}
          </div>
          <ul className="mt-5 divide-y divide-white/10 border-y-white/10">
            <li></li>
            <li className="flex items-center gap-2 py-3">
              <RxPencil2 />
              <p
                className="text-justify leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.user.bio }}
              ></p>
            </li>
            <li className="flex items-center gap-2 py-3">
              <RiVipCrownLine />
              <strong>تاریخ عضویت: </strong>
              <span suppressHydrationWarning>
                {calculateTimeDifference(
                  Date.now(),
                  parseInt(data.user.createdAt)
                )}{" "}
                پیش{" "}
              </span>
            </li>
            <li className="flex items-center gap-2 py-3">
              <BsCalendar4Range />
              <strong>آخرین فعالیت:</strong>
              <span suppressHydrationWarning>
                {calculateTimeDifference(
                  Date.now(),
                  parseInt(data.user.lastLoginAt)
                )}{" "}
                پیش{" "}
              </span>
            </li>

            <li
              className="grid grid-cols-2 divide-x divide-white/10 text-center"
              dir="ltr"
            >
              <Link
                href={`/user/${data.user.username}/following`}
                className="py-3"
              >
                <span>دنبال شونده‌ها:</span>
                <strong>{data.user.following.length}</strong>
              </Link>
              <Link
                href={`/user/${data.user.username}/followers`}
                className="py-3"
              >
                <span>دنبال کننده‌ها:</span>
                <strong>{data.user.followers.length}</strong>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-full md:basis-3/4">
        <div className="col-span-8 md:col-span-5 lg:col-span-6">
          <div className="-mx-4 mb-4 overflow-hidden border-b pl-4 pr-0 border-gray-900 md:mx-0 md:pl-0">
            <ul
              role="navigation"
              className="flex font-heading flex-row space-x-4 text-xl lg:text-sm justify-start md:flex-wrap flex-nowrap overflow-auto"
            >
              <li
                className={`${
                  page == "profile"
                    ? "font-bold border-b-2 border-red-600 "
                    : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}`}
                >
                  <LuUser2 />
                  <span className="text-xs">پروفایل</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "tracking"
                    ? "font-bold border-b-2 border-red-600 "
                    : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/tracking`}
                >
                  <LuPlayCircle />
                  <span className="text-xs">سریال</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "likes" ? "font-bold border-b-2 border-red-600 " : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/likes`}
                >
                  <LuHeart />
                  <span className="text-xs">علاقه‌مندی‌ها</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "reviews"
                    ? "font-bold border-b-2 border-red-600 "
                    : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/reviews`}
                >
                  <LuClipboard />
                  <span className="text-xs">بررسی‌ها</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "lists" ? "font-bold border-b-2 border-red-600 " : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/lists`}
                >
                  <LuMenuSquare />
                  <span className="text-xs">فهرست‌ها</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "followers"
                    ? "font-bold border-b-2 border-red-600 "
                    : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/followers`}
                >
                  <PiUsers />
                  <span className="text-xs">دنبال‌کننده‌ها</span>
                </Link>
              </li>
              <li
                className={`${
                  page == "following"
                    ? "font-bold border-b-2 border-red-600 "
                    : ""
                } py-2 px-3`}
              >
                <Link
                  className="flex flex-col justify-center items-center gap-1 lg:flex-row"
                  href={`/user/${data.user.username}/following`}
                >
                  <PiUsersThree />
                  <span className="text-xs">دنبال‌شونده‌ها</span>
                </Link>
              </li>
            </ul>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
