import axios from "axios";
import Loading from '@/components/elements/loading'
import SingleHeader from '@/components/media/singleMedia/singleHeader'
import dynamic from 'next/dynamic'

const EpisodeMain = dynamic(() => import('@/components/media/episodePage/episodeMain'), { ssr: false })
const EpisodeSidebar = dynamic(() => import('@/components/media/episodePage/episodeSidebar'), { ssr: false })

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
  const data = await getData(params.slug)
  const season = params.season.slice(7);
  const episode = params.episode.slice(8);

  return {
     title:`${data.media.title}: فصل ${season}, قسمت ${episode} `,
     description:`${data.media.summary}`,
     alternates: {
        canonical: `${siteURL}/media/${params.slug}/${params.season}/${params.episode}`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}

const EpisodePage = async ({params}) => {

  const data= await getData(params.slug)
  
  const season = params.season.slice(7);
  const episode = params.episode.slice(8);
 
  return (
    <div className="min-h-screen">
        {(!data) ? <Loading style={'h-screen'} /> : 
        <div>
        <SingleHeader media={data.media} season={data.seasons} page={'episodes'}  >
            <EpisodeMain media_id={data.media.media_id} season_number={season} episode_number={episode} />
            <EpisodeSidebar   media={data.media} season_number={season} episode_number={episode} />
        </SingleHeader>
        </div>      
          
      }
    </div>
   
  )
}

export default EpisodePage;
