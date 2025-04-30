import axios from "axios";
import dynamic from 'next/dynamic'
import Loading from '@/components/elements/loading'
import SingleHeader from '@/components/media/singleMedia/singleHeader'

const SingleCasts = dynamic(() => import('@/components/media/singleMedia/singleCasts'), { ssr: false })


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
    title:`بازیگران و عوامل - ${data.media.title} `,
     description:`${data.media.summary}`,
     alternates: {
        canonical: `${siteURL}/media/${params.slug}/cast`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}



const Casts = async ({params}) => {

  const data= await getData(params.slug)

  return (
    <div className="min-h-screen">
      {(!data) ? <Loading style={'h-screen'} /> : 
        <div>
        <SingleHeader media={data.media} season={data.seasons} page={'casts'}  >
              <SingleCasts media_id={data.media._id} />
        </SingleHeader>
        </div>      
          
      }
    </div>
   
  )
}

export default Casts;
