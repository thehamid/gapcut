"use client";
import { useState, useEffect } from "react";
import Items from "../../items";
import axios from "axios";
import Loading from "@/components/elements/loading";

const HomeBox = () => {
  const [allState, setallState] = useState(-1);

  useEffect(() => {
    getData();
  }, []);
  //get
  async function getData() {
    await axios
      .get(`/api/medias/boxes/home`)
      .then((d) => {
        setallState(d.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallState(-2);
      });
  }

  
  return (
    <div>
      {allState == -1 ? (
        <Loading />
      ) : allState == -2 ? (
        <Loading />
      ) : (
        <div>
          {allState.map((da, i) => (
            <div key={i} className="slider mt-5 xl:mr-48 mr-5 overflow-visible xl:container">
              <h2 className="pinline text-xl  font-extrabold text-red-600">
                {da.title}
              </h2>
              <Items newItems={da.media_id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBox;
