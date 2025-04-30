"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IoMdStar } from "react-icons/io";

export const StarReview = ({setScore}) => {
  const [myScore, setMyScore] = useState(0);
  const [hover, setHover] = useState(false);



  //Set Score Handler
 function handlerScore(score) {
    setMyScore(score)
    setScore(score)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center order-2 lg:order-1">
        <div className="flex flex-col items-center text-xs gap-4">
          <span className="inline-flex h-7 items-center  text-white">
            {hover ? (
              <div
                onMouseLeave={() => setHover(false)}
                className="relative flex flex-col items-center group"
              >
                <div
                  data-tooltip-target="tooltip-animation"
                  className="flex flex-row-reverse justify-center text-xl cursor-pointer"
                >
                  <IoMdStar
                    onClick={() => handlerScore(5)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onClick={() => handlerScore(4)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onClick={() => handlerScore(3)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onClick={() => handlerScore(2)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                  <IoMdStar
                    onClick={() => handlerScore(1)}
                    className="text-gray-50 peer peer-hover:text-red-600 hover:text-red-600"
                  />
                </div>
               
              </div>
            ) : (
              <div
                onMouseEnter={() => setHover(true)}
                className="relative flex flex-col items-center group"
              >
                <div
                  data-tooltip-target="tooltip-animation"
                  className="flex flex-row justify-center text-xl cursor-pointer"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <IoMdStar
                      key={index}
                      className={
                        index < myScore ? "text-red-600" : "text-gray-50"
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
