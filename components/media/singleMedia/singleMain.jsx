import Link from "next/link";
import Photos from "@/components/media/photos";
import Episodes from "@/components/media/episodes";
import Casts from "@/components/media/casts";

const SingleMain = ({ media }) => {
  return (
    <div className="col-span-8 space-y-6 p-2 lg:col-span-4">
      {media.summary ? (
        <div
          className="transition-height relative duration-300 ease-out whitespace-pre-wrap md:!mt-0"
          itemprop="description"
        >
          <h2 className="pinline mt-3 flex text-base font-normal capitalize dark:font-extrabold dark:text-white md:mt-0 md:hidden">
            خلاصه داستان
          </h2>
          <p
            className="text-justify leading-relaxed mt-4"
            dangerouslySetInnerHTML={{ __html: media.summary }}
          ></p>
        </div>
      ) : (
        <p className="text-justify leading-relaxed mt-4">
          {" "}
          خلاصه‌ای در دسترس نمی باشد{" "}
        </p>
      )}

      <Episodes media={media} />

      <Photos media_id={media._id} episode_id={0} />

      <Casts media_id={media._id} />
    </div>
  );
};

export default SingleMain;
