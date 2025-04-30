import React from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/elements/loading";

const Item = ({data,delay}) => {
 
  return (
    <div className="max-w-sm relative w-full h-full">
      {data ? (
        <Link href={`/media/${data.slug}`} >
          <div className="w-full h-full relative fade-in-horiz" style={{ animationDelay: delay + "s" }}>
            {data.poster ?
             <Image
              src={data.poster}
              alt={data.title}
              width={250}
              height={500}
              className="w-full h-full top-0 left-0 object-cover rounded-lg"
              priority 
              />
              :
               <div className="card__placeholder w-full h-full top-0 left-0 object-cover rounded-lg" ></div>
          
          }  
           
          </div>
        </Link>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Item;
