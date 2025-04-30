import Image from "next/image";
import Link from "next/link";
import { LuInstagram, LuTags } from "react-icons/lu";
import { RiTelegramLine } from "react-icons/ri";


const Article = ({ data }) => {


  return (
    <div className="single_article container mx-auto flex lg:flex-row flex-col p-5">
      <section className="content flex flex-col justify-center basis-8/12 m-2">
        <h2 className="font-extrabold sm:text-2xl  text-lg text-center p-8">
          {data.title}
        </h2>
        <div className="flex justify-between justify-items-center border-b-2 border-t-2 border-gray-900 p-3 ">
          <span>تاریخ: {data.createdAt} </span>
          <span>نویسنده: {data.author.name}</span>
          <span>
            دسته:{" "}
            {data.cats.map((cat, i) => (
              <Link href={`/category/${cat.slug}`} key={i} className="p-2">
                {cat.title}
              </Link>
            ))}
          </span>
        </div>
        {/* <div className='mx-auto p-5'>Share icons</div> */}
        <picture className="p-2">
          <Image
            src={data.imgArticle}
            alt={data.title}
            width={1000}
            height={500}
            className="object-cover w-full h-auto"
          />
        </picture>
        <article className="p-2 mt2">
          <p
            className="text-justify leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </article>

        <div className="flex justify-between justify-items-center border-b-2 border-t-2 border-gray-900 p-3">
          <span className="flex flex-row gap-1">
            {" "}
            <LuTags />{" "}
            {data.tags.map((tag, i) => (
              <Link href={`/tags/${tag}`} key={i} className="ml-2">
                {" "}
                <p dangerouslySetInnerHTML={{ __html: tag }}></p>
              </Link>
            ))}
          </span>

          <span>{data.source}</span>
        </div>

        {/* <div className='mx-auto p-5'>reaction emoji</div>
        <div className='mx-auto p-5'>comment section</div> */}
      </section>
      <section className="sidebar basis-4/12 m-2 flex flex-col">
        <div className="widget !md:mb-10 mt-5 !mb-0">
          <div className="widget-title">
            <h2 className="mb-5 text-lg text-white font-bold">
              <span> در شبکه‌های اجتماعی همراه ما باشید </span>
            </h2>
          </div>
          <div className="bg-zinc-900 p-5 text-gray-100 flex flex-col gap-1 rounded-lg">
            <Link
              href="https://instagram.com/gapcut.ir"
              target="_blank"
              className="flex w-full flex-row justify-between border-[1px] p-2 rounded-md"
            >
              <span> gapcut.ir </span>
              <LuInstagram className="text-xl" />
            </Link>
            <Link
              href="https://t.me/gapcutir"
              target="_blank"
              className="flex w-full flex-row justify-between border-[1px] p-2 rounded-md"
            >
              <span> gapcutir </span>
              <RiTelegramLine className="text-2xl" />
            </Link>
          </div>
        </div>
        {/* 
        <div className='widget w-full h-auto bg-gray-700 text-gray-50 rounded-lg text-center font-bold p-10 my-5'>
            پرببیننده ترین مطالب
         </div>

        <div className='widget w-full h-auto bg-gray-700 text-gray-50 rounded-lg text-center font-bold p-10 my-5'>
              بازیگران مرتبط با مطلب

        </div> */}
      </section>
    </div>
  );
};

export default Article;
