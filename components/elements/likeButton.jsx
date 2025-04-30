"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

const LikeButton = ({ person_id,person_name }) => {
    const [like, setLike] = useState(false);
    const { data: session, status: sessionStatus } = useSession();
    const user_id = session?.user?.id;

  useEffect(() => {
    getData();
  });

  //get
  async function getData() {
    await axios
  .get(`/api/persons/like/${person_id}`)
  .then((response) => {
   const fansData = response.data.data.fans;
      // Assume trackingData is an array of objects
      console.log(fansData)
    const found = fansData.some(item => item === user_id);
    if (found) {
        setLike(true);
    } else {
        setLike(false); // Optionally handle the case where media_id is not found
    }
    
  })
  .catch((error) => {
    console.error("Error fetching fans data:", error.response || error.message);
  });
  }


//track on
  async function like_on() {
    if (sessionStatus !== "authenticated") {
      toast.warning("وارد حساب کاربری خود شوید")
      return;
    }

  const body = {
    user_id: user_id,
 }
  
  const response = await fetch(`/api/persons/like/${person_id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.success(`خوشحالم! که شما ${person_name} را می‌پسندید`);
  setLike(true)
  }


//track off
  async function like_off() {
  const body = {
    user_id: user_id,
 } 
  const response = await fetch(`/api/persons/like/${person_id}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.error(`متاسفم! که شما ${person_name} را نمی‌پسندید`);
  setLike(false)
  }



  return (
    <>
       {user_id?(              
        like ? (
        <button
          onClick={like_off}
          className="btn border-2 rounded-md px-6 py-2 border-red-600 bg-red-600 text-white text-xs flex gap-2 shadow-md shadow-red-700 "
        >
          <i className="text-white text-xs">
          <FaHeart />
          </i>
          می‌پسندم
        </button>
      ) : (
        <button
          onClick={like_on}
          className="btn border-2 rounded-md px-6 py-2 border-red-600 bg-red-600 text-white text-xs flex gap-2 "
        >
          <i className="text-white text-xs">
            <LuHeart/>
          </i>
            پسند
        </button>
              )
          ) :
              ""
        }
    </>
  );
};

export default LikeButton;
