"use client";
import { useState, useEffect } from "react";
import { TVCalendar } from "@/components/pages/schedule-calendar";
import Loading from "@/components/elements/loading";

const CalenderPage = () => {
 const [Medias, setMedias] = useState(-1);
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams && searchParams.get("?");

  // fetch the medias
  useEffect(() => {
    fetch("/api/medias/calender")
      .then((response) => response.json())
      // save the complete list of users to the new state
      .then((data) => setMedias(data.media_id))
      // if there's an error we log it to the console
      .catch((err) => console.log(err));
  }, []);





    return (
        <div className="container mx-auto p-4 min-h-svh">
        <h1 className="pinline text-4xl font-bold mb-4">تقویم نمایش هفتگی </h1>

        <div className="flex flex-row flex-wrap gap-4 p-2 ">
        <span className="mb-4 text-lg bg-zinc-800 text-red-600 w-full h-full p-4 rounded-lg">
        {Medias == -1 ? (
            <Loading />
          ) : (
              <TVCalendar list={Medias} />
            )}
          </span>
          </div>
       
    </div>
     
  )
}

export default CalenderPage;
