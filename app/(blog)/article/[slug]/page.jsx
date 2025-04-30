import axios from "axios";
import Loading from "@/components/elements/loading";
import dynamic from "next/dynamic";
const Article = dynamic(() => import("@/components/article/singleArticle"), {
  ssr: false,
});

//get Data from DB
const getData = async (slug) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(
      `${process.env.SERVER_URL}/api/articles/${slug}`
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
    title: `${data.data.title}`,
    description: `${data.data.excerpt}`,
    alternates: {
      canonical: `${siteURL}/article/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

const SingleArticle = async ({ params }) => {
  const postData = await getData(params.slug);

  return (
    <div className="min-h-screen">{!postData ? <Loading style={'h-screen'}/> : <Article data={postData.data} />}</div>
  );
};

export default SingleArticle;
