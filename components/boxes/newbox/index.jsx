"use client";
import { useState, useEffect } from "react";
import Items from '../../items'
import axios from "axios";

const NewMedia = () => {
   const [allMedia, setallMedia] = useState(-1);


    useEffect(() => {
        getData();
      }, []);
      //get
      async function getData() {
        await axios
          .get(`/api/medias/boxes/new`)
          .then((d) => {
             setallMedia(d.data.data);
          })
          .catch((e) => {
            console.log(e.response);
            setallMedia(-2);
          });
      }




    return (
      <div className='slider mt-5 xl:mr-48 mr-5 overflow-visible xl:container'>
      <h2 className="pinline text-xl  font-extrabold text-red-600">
              تازه‌ها
      </h2>
        <Items newItems={allMedia} />
      </div>
    
  )
}

export default NewMedia