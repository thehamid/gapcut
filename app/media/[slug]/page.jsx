import axios from "axios";
import dynamic from 'next/dynamic'
import Loading from '@/components/elements/loading'
import SingleHeader from '@/components/media/singleMedia/singleHeader'

const SingleSidebar = dynamic(() => import('@/components/media/singleMedia/singleSidebar'), { ssr: false })
const SingleMain = dynamic(() => import('@/components/media/singleMedia/singleMain'), { ssr: false })

 //get Data from DB
const getData = async (slug) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(process.env.SERVER_URL+`/api/medias/${slug}`); 
    return response;
  } catch (error) {
    console.log(error);
  }

}

export async function generateMetadata({ params}) {
  const siteURL = process.env.SERVER_URL;
  const data= await getData(params.slug)

  return {
     title:`${data.media.title}`,
     description:`${data.media.summary}`,
     alternates: {
        canonical: `${siteURL}/media/${params.slug}`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}





const SingleMedia = async ({params}) => {

  const data= await getData(params.slug)

  return (
    <div className="min-h-screen">
      {(!data) ? <Loading style={'h-screen'} /> : 
        <>
        <SingleHeader media={data.media} season={data.seasons} page={'home'} >
        <SingleMain media={data.media} />
        <SingleSidebar media={data.media} />
        </SingleHeader>
        </>      
          
      }
    </div>
   
  )
}

export default SingleMedia;
