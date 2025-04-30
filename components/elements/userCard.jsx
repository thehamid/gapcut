import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({ data }) => {
  return (
    <div className="w-relative flex flex-row bg-zinc-900 rounded-md p-2">
      <Link
        className="relative text-center"
        href={`/user/${data.username}`}
      >
        <Image
          className="aspect-square rounded-lg object-cover"
          src={data.avatar}
          alt={data.username}
          width={80}
          height={80}
        />
      </Link>
      <div className="flex items-center justify-center  mr-2">
        <Link
          className="relative text-center"
          href={`/person/${data.username}`}
        >
          <h2 className="font-extrabold text-sm text-gray-50">{data.name}</h2>
          <span className="text-xs font-extralight text-red-600">{data.username}</span>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;