"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdStar } from "react-icons/io";
import { useSession } from "next-auth/react";

export const StarRate = ({ med }) => {
  const [media, setMedia] = useState(med);
  const [scoreReal, setScoreReal] = useState();
  const [myScore, setMyScore] = useState();
  const [hover, setHover] = useState(false);
  const [reload, setReload] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const user_id = session?.user?.id;


  useEffect(() => {
    getData();
    getMedia();
  }, [reload]);

  // Get score for a specific media_id
  async function getData() {
    await axios
      .get(`/api/medias/scores/${user_id}`)
      .then((response) => {
        const scoresData = response.data.data;
        const score = scoresData.find(
          (item) => item.media_id === media._id
        );
        setMyScore(score);
      })
      .catch((error) => {
        console.error(
          "Error fetching tracking data:",
          error.response || error.message
        );
      });
  }

// Get score for a specific media_id
async function getMedia() {
  await axios
    .get(`/api/medias/${med.slug}`)
    .then((response) => {
      setMedia(response.data.media); 
      setReload(false)
    })
    .catch((error) => {
      console.error(
        "Error fetching tracking data:",
        error.response || error.message
      );
    });
}







  //Set Score Handler
  async function handlerScore(score) {
    if (sessionStatus !== "authenticated") {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }

    if (!myScore?._id) {

      const body = {
        media_id: media._id,
        user_id: user_id,
        score: score,
      };
      const response = await fetch(`/api/medias/scores`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      toast.success(`شما نمره ${score} را به ${media.title} دادید!`);
      setReload(true)

    } else {


      const body = {
        media_id: media._id,
        user_id: user_id,
        score: score,
     } 
      const response = await fetch(`/api/medias/scores/${myScore?._id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const responseData = await response.json();
      toast.success(`شما نمره ${score} را به ${media.title} دادید!`);
      setReload(true)

      
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center order-2 lg:order-1">
        <div className="mb-3 mr-2 flex items-center space-x-2 text-xs">
          <span className="inline-flex h-7 items-center rounded-full bg-white/10 text-white">
            <span className="bg-primary inline-flex h-7 w-7 items-center justify-center rounded-full">
              <i className="text-white text-xl">
                <IoMdStar />
              </i>
            </span>
            <span className="pl-2 pr-3 text-center text-sm font-bold">
              <span>
                <span itempropx="ratingValue">
                  5/
                  {media.score.length
                    ? media.score.reduce((a, b) => a + b.score, 0) /
                      media.score.length
                    : 0}
                </span>
              </span>
              <span className="mr-1 font-normal lowercase">
                ({media.score.length})
              </span>
            </span>

            {hover ? (
              <div
                onMouseLeave={() => setHover(false)}
                className="relative flex flex-col items-center group"
              >
                <div
                  data-tooltip-target="tooltip-animation"
                  className="flex flex-row-reverse justify-center text-2xl cursor-pointer"
                >
                  <IoMdStar
                    onMouseEnter={() => setScoreReal(5)}
                    onClick={() => handlerScore(5)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onMouseEnter={() => setScoreReal(4)}
                    onClick={() => handlerScore(4)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onMouseEnter={() => setScoreReal(3)}
                    onClick={() => handlerScore(3)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onMouseEnter={() => setScoreReal(2)}
                    onClick={() => handlerScore(2)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onMouseEnter={() => setScoreReal(1)}
                    onClick={() => handlerScore(1)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                </div>

                <div className="absolute bottom-5  flex-col items-center hidden mb-6 group-hover:flex translate-y-3 animate-fade">
                  <span className="relative z-10 p-2 text-xs rounded-lg leading-none text-white whitespace-no-wrap bg-black bg-opacity-50 shadow-lg">
                    نمره: {scoreReal}
                  </span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-black bg-opacity-50"></div>
                </div>
              </div>
            ) : (
              <div
                onMouseEnter={() => setHover(true)}
                className="relative flex flex-col items-center group"
              >
                <div
                  data-tooltip-target="tooltip-animation"
                  className="flex flex-row justify-center text-2xl cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <IoMdStar
                      key={index}
                      className={
                        index < myScore?.score ? "text-red-600" : "text-gray-50"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
