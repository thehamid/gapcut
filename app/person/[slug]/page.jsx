import axios from "axios";
import Loading from '@/components/elements/loading'
import dynamic from 'next/dynamic'

const Person = dynamic(() => import('@/components/person/singlePerson'), { ssr: false })

 //get Data from DB
 const getData = async (slug) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(`${process.env.SERVER_URL}/api/persons/${slug}`); 
    return response;
  } catch (error) {
    console.log(error);
  }

}


export async function generateMetadata({params}) {
  const siteURL = process.env.SERVER_URL;
  const data= await getData(params.slug)

  return {
     title:`${data.person.name}`,
     description:`${data.person.bio}`,
     alternates: {
        canonical: `${siteURL}/person/${params.slug}`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}




const SinglePerson = async ({params}) => {

  const personData= await getData(params.slug)

  return (
    <div className="min-h-screen">
    {(!personData) ? <Loading style={'h-screen'} /> : 
        
        <Person data={personData} />
      }
    </div>
   
  )
}

export default SinglePerson