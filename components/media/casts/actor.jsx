import React from "react";
import Image from "next/image";
import Link from "next/link";

const ActorCard = ({ data }) => {
  return (
    <div className="w-relative  w-full max-w-[220] p-2">
      <Link
        className="relative text-center"
        href={`/person/${data.person_id.slug}`}
      >
        <Image
          className="w-full aspect-square rounded-lg object-cover"
          src={data.thumb}
          alt={data.person_id.name}
          width={240}
          height={240}
        />
      </Link>
      <div className="flex items-center justify-center  mt-1">
        <Link
          className="relative text-center"
          href={`/person/${data.person_id.slug}`}
        >
          <h2 className="font-bold text-sm text-gray-50">{data.person_id.name}</h2>
          <span className="text-xs font-extralight text-gray-300">{data.role_name}</span>
        </Link>
      </div>
    </div>
  );
};

export default ActorCard;
