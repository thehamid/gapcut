"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/elements/loading";
import ActorCard from "@/components/media/casts/actor";
import axios from "axios";

const SingleNews = ({ media_id }) => {
//   const [allCast, setallCast] = useState(-1);

//   useEffect(() => {
//     getData();
//   }, []);

//   //Episodes
//   async function getData() {
//     await axios
//       .get(`/api/medias/casts/${media_id}`)
//       .then((d) => {
//         setallCast(d.data.data);
//         console.log(d.data.data);
//       })
//       .catch((e) => {
//         console.log(e.response);
//         setallCast(-2);
//       });
//   }

  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
    <div className="flex justify-center bg-red-700 rounded-md p-3 m-2 ">
     بزودی
    </div>
</div>
  );
};

export default SingleNews;
