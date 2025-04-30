import Loading from "@/components/elements/loading";
import Image from "next/image";
import Link from "next/link";

export const GenresPage = ({medias}) => {
  return (
    <div className="container mx-auto p-4 min-h-svh">
    <h1 className="pinline text-4xl font-bold mb-4 mt-2">
      سریال‌های {medias[0].genre[0].title} ایرانی 
    </h1>
    <div className="mb-4 text-sm ">
        {medias == -1 ? (
         <Loading/>
        ) : medias.length == 0 ? (
          <div className="flex flex-col justify-center items-center bg-zinc-900 rounded-md p-4 m-2 gap-2">
            <span>سریالی وجود ندارد!</span>
          </div>
        ) : (
          <ul className="grid md:grid-cols-4 gap-3">
            {medias.map((item,i) => (
              <li key={i} className="col-span-1">
                <Link
                  href={`/media/${item.slug}`}
                  className="flex gap-2 bg-zinc-900 rounded-md p-2"
                >
                  <Image
                    src={item.poster}
                    width={100}
                    height={150}
                    className="rounded-sm object-cover"
                    alt={item.title}
                  />
                  <span>
                    <h2 className="text-red-600 font-bold text-xl mb-2">
                      {item.title}
                    </h2>
                    <small className="text-sm text-gray-400 ">
                      ({item.yearProduct})
                    </small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
  </div>
  )
}
