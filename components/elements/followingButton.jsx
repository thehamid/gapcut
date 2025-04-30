"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

const FollowingButton = ({ user }) => {
    const [follow, setFollow] = useState(false);
    const { data: session, status: sessionStatus } = useSession();
    const user_id = session?.user?.id;

   
  useEffect(() => {
    
    const followersData = user.followers;
    // Assume trackingData is an array of objects
    const found = followersData.some(item => item === user_id);
    if (found) {
      setFollow(true);
    } else {
      setFollow(false); // Optionally handle the case where media_id is not found
    }


  }, [user.followers,user_id]);

 


//track on
  async function follow_on() {
    if (sessionStatus !== "authenticated") {
      toast.warning("وارد حساب کاربری خود شوید")
      return;
    }

  const body = {
    username:user.username,
 }
  
  const response = await fetch(`/api/users/following/${user_id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.success(`آفرین! شما ${user.name} را دنبال میکنید`);
  setFollow(true)
  }


//track off
  async function follow_off() {
  const body = {
    username:user.username,
 } 
  const response = await fetch(`/api/users/following/${user_id}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  toast.error(`متاسفم! که شما ${user.name} را دنبال نمی‌کنید`);
  setFollow(false)
  }



  return (
    <>
      {follow ? (
        <button
          onClick={follow_off}
          className="btn  font-bold rounded-md px-6 py-2  bg-red-600  text-white flex gap-2 "
        >
          دنبال نمی کنم
        </button>
      ) : (
        <button
          onClick={follow_on}
          className="btn font-bold border-2 rounded-md px-6 py-2  border-red-600 text-white flex gap-2 "
        >
        دنبال می کنم
        </button>
      )}
    </>
  );
};

export default FollowingButton;
