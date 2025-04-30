import axios from "axios";
import dynamic from 'next/dynamic'
import Loading from '@/components/elements/loading'
import SingleHeader from '@/components/media/singleMedia/singleHeader'


const SingleNews = dynamic(() => import('@/components/media/singleMedia/singleNews'), { ssr: false })


 //get Data from DB
 const getData = async (slug) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(`${process.env.SERVER_URL}/api/medias/${slug}`); 
    return response;
  } catch (error) {
    console.log(error);
  }

}

export async function generateMetadata({ params}) {
  const siteURL = process.env.SERVER_URL;
  const data= await getData(params.slug)

  return {
    title:`  اخبار  - ${data.media.title} `,
     description:`${data.media.summary}`,
     alternates: {
        canonical: `${siteURL}/media/${params.slug}/news`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}

const News = async ({params}) => {

  const data= await getData(params.slug)

  return (
    <div className="min-h-screen">
     {(!data) ? <Loading style={'h-screen'} /> : 
        <div>
        <SingleHeader media={data.media} season={data.seasons} page={'news'}  >
              <SingleNews media_id={data.media._id} />
        </SingleHeader>
        </div>      
          
      }
    </div>
   
  )
}

export default News;
