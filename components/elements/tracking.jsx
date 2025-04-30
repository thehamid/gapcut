"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LuNavigation } from "react-icons/lu";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const Tracking = ({ media_id,media_title }) => {
    const [track, setTrack] = useState(false);
    const user_id = Cookies.get('token_id')

   
  useEffect(() => {
    getData();
  });

  //get
  async function getData() {
    await axios
  .get(`/api/users/tracking/${user_id}`)
  .then((response) => {
   const trackingData = response.data.data;
    // Assume trackingData is an array of objects
    const found = trackingData.some(item => item.media_id === media_id);
    if (found) {
      setTrack(true);
    } else {
      setTrack(false); // Optionally handle the case where media_id is not found
    }
    
  })
  .catch((error) => {
    console.error("Error fetching tracking data:", error.response || error.message);
  });
  }


//track on
  async function track_on() {
    if (!user_id) {
      toast.warning("وارد حساب کاربری خود شوید")
      return;
    }

  const body = {
    media_id: media_id,
    user_id: user_id,
 }
  
  const response = await fetch(`/api/users/tracking`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.success(`آفرین! شما ${media_title} را دنبال میکنید`);
  setTrack(true)
  }


//track off
  async function track_off() {
  const body = {
    media_id: media_id,
 } 
  const response = await fetch(`/api/users/tracking/${user_id}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.error(`متاسفم! که شما ${media_title} را دنبال نمی‌کنید`);
  setTrack(false)
  }



  return (
    <>
      {track ? (
        <button
          onClick={track_off}
          className="btn border-2 rounded-md px-6 py-2 border-red-600 bg-red-600 text-white flex gap-2 "
        >
          <i className="text-white text-xl">
            <LuNavigation />
          </i>
          دنبال می کنم
        </button>
      ) : (
        <button
          onClick={track_on}
          className="btn border-2 rounded-md px-6 py-2 border-white/60 text-white flex gap-2 "
        >
          <i className="text-white text-xl">
            <LuNavigation />
          </i>
          دنبال
        </button>
      )}
    </>
  );
};

export default Tracking;
