import React from "react"
import Image from "next/image"
import Link from "next/link"
import { LuInstagram } from "react-icons/lu"
import { RiTelegramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full min-h-48 bg-zinc-900">
      <div className="container m-auto flex flex-col items-center md:items-start md:flex-row justify-between gap-3 text-gray-50 p-5 mt-20">
        
      <div className="flex flex-col justify-start items-center">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/images/logo-header.png"
            alt="logo"
            width={200}
            height={85}
              className="object-contain"
              priority
          />
          </Link>
          <h2>گپ و گفت با سریال‌های ایرانی</h2>
        </div>
        
        <div className="footer-widget flex flex-col items-center md:items-start font-light gap-3 text-sm">
          <h2 className="font-normal">درباره گپ کات</h2>
          <Link href="/about" className="text-gray-50">درباره با ما</Link>
          <Link href="/contact" className="text-gray-50">تماس با ما</Link>
        </div>

        <div className="footer-widget flex flex-col items-center md:items-start font-light gap-3 text-sm">
          <h2 className="font-normal">چی ببینیم</h2>
          <Link href="/#" className="text-gray-50">سریال‌های جدید</Link>
          <Link href="/#" className="text-gray-50">سریال‌های برتر</Link>
          <Link href="/#" className="text-gray-50">سریال‌های پیشنهادی</Link>


       
        </div>

        <div className="footer-widget flex flex-col items-center md:items-start font-light gap-3 text-sm">
          <h2 className="font-normal">دسترسی سریع</h2>
          <Link href="/blog" className="text-gray-50">مطالب</Link>
          <Link href="/reviews" className="text-gray-50">بررسی‌ها</Link>
          <Link href="/calender" className="text-gray-50">تقویم پخش</Link>
          <Link href="/stars" className="text-gray-50">ستارگان</Link>

       
        </div>
     

        <div className="flex flex-col justify-between items-center gap-2 max-w-xs">
        <span> در شبکه‌های اجتماعی همراه ما باشید  </span>
          <Link href="https://instagram.com/gapcut.ir" target="_blank" className="flex w-full flex-row items-center justify-between bg-pink-600  p-2 rounded-md">
              <span > gapcut.ir </span>
              <LuInstagram className="text-xl"/>
          </Link>
          <Link href="https://t.me/gapcutir" target="_blank" className="flex w-full flex-row items-center justify-between bg-sky-600  p-2 rounded-md">
              <span > gapcutir </span>
              <RiTelegramLine className="text-2xl"/>
          </Link>
          <span className="text-xs text-gray-400">All Right Reserved GAPCUT.IR © 2025</span>
        </div>


        </div>
    </footer>
  )
}

export default Footer
