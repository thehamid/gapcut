"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"



// Network colors for better visual distinction
const networkColors = {
  "فیلیمو": "bg-yellow-600",
  "نماوا": "bg-blue-600",
  "صداوسیما": "bg-white-600",
  "فیلم نت": "bg-red-600",
  "شیدا": "bg-purple-600",
  "استارنت": "bg-pink-600",
  // Add more networks and their corresponding colors as needed

}

export function TVCalendar({ list }) {
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]

  const [shows, setShows] = useState(list)


  // Group shows by day
  
const showsByDay = days.map((day) => ({
  day,
  shows: shows
    .filter((show) => {
      const schedule = show.schedule || "";
      // فقط زمانی که روز دقیق در ابتدای schedule بیاد:
      return schedule.startsWith(day);
    })
    .map((show) => {
      const schedule = show.schedule || "";

    // پیدا کردن اولین عدد در رشته (فارسی یا انگلیسی)
    const timeMatch = schedule.match(/(\d+)/);
    let time = "نامشخص";

    if (timeMatch && timeMatch.index !== undefined) {
      time = schedule.substring(timeMatch.index).trim();
    }

      return {
        ...show,
        time, // زمان استخراج‌شده اضافه میشه
      };
    }),
}));

  return (
  
      <div className=" p-2 sm:p-4 w-full max-w-6xl mx-auto">
      

        <div className="space-y-4">
          {showsByDay.map((dayData, index) => (
            <div key={index} className="bg-zinc-900 border-zinc-800 rounded-md overflow-hidden shadow-lg hover:shadow-red-900/20">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-auto sm:min-w-[100px] bg-gradient-to-b from-red-600 to-red-800 p-3 flex items-center justify-center">
                  <h3 className="font-bold text-center whitespace-nowrap text-white">{dayData.day}</h3>
                </div>

                <div className="p-3 sm:p-4 w-full overflow-x-auto">
                  {dayData.shows.length > 0 ? (
                    <div className="flex gap-4 min-w-max pb-2">
                      {dayData.shows.map((show) => (
                        <Link key={show.id} href={`/media/${show.slug}`} target="_blank" className="flex flex-col items-center w-[90px] group">
                          <div className="relative mb-2 overflow-hidden rounded-md  transition-all duration-300 shadow-md">
                            <div
                              className={`absolute top-0 right-0 w-full h-1 ${networkColors[show?.network[0]?.title] || "bg-zinc-600"}`}
                            ></div>
                            <Image
                              src={show.poster}
                              alt={show.title}
                              className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-300"
                              width={100}
                              height={150}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-medium text-center line-clamp-1 text-white">{show.title}</h4>
                          </div>
                          <div
                            className={`text-xs px-2 py-0.5 text-white rounded-full mt-1 ${networkColors[show?.network[0]?.title] || "bg-zinc-600"}`}
                          >
                            {show?.network[0]?.title}
                          </div>
                          <span className="text-xs text-zinc-300 mt-1">{show.time}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[100px]">
                      <span className="text-zinc-400">اثری برای نمایش وجود ندارد</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
  )
}

