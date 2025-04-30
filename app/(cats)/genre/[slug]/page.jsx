import axios from "axios";
import Loading from "@/components/elements/loading";
import { GenresPage } from "@/components/media/category/genresPage";

//get Data from DB
const getData = async (slug) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(
      `${process.env.SERVER_URL}/api/medias/genre/${slug}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export async function generateMetadata({ params }) {
  const siteURL = process.env.SERVER_URL;
  const data = await getData(params.slug);

  return {
    title: `سریال‌های ایرانی ژانر ${data.data[0].genre[0].title}`,
    description: `ژانرهای مختلف سریال های ایرانی`,
    alternates: {
      canonical: `${siteURL}/genre/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

const SingleArticle = async ({ params }) => {
  const mediaData = await getData(params.slug);
  return (
    <div className="min-h-screen">
      {!mediaData ? (
        <Loading style={"h-screen"} />
      ) : (
        <GenresPage medias={mediaData.data} />
      )}
    </div>
  );
};

export default SingleArticle;
