import axios from "axios";
import Loading from '@/components/elements/loading'
import dynamic from 'next/dynamic'
import ProfileHeader from '@/components/user/profile/ProfileHeader'


const ProfileFollowing = dynamic(() => import('@/components/user/profile/ProfileFollowing'), { ssr: false })

 //get Data from DB
 const getData = async (username) => {
  try {
    // use data destructuring to get data from the promise object
    const { data: response } = await axios.get(`${process.env.SERVER_URL}/api/users/page/${username}`); 
    return response;
  } catch (error) {
    console.log(error);
  }

}


export async function generateMetadata({ params}) {
  const siteURL = process.env.SERVER_URL;
  const data= await getData(params.username)

  return {
     title:`${data.user.name}`,
     description:`${data.user.bio}`,
     alternates: {
        canonical: `${siteURL}/user/${params.username}`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}




const Following = async ({params}) => {
  const userData= await getData(params.username)

  return (
    <div className="min-h-screen">
    {(!userData) ? <Loading style={'h-screen'} /> : 
       
        <div>
        <ProfileHeader data={userData} page={'following'} >
            <ProfileFollowing data={userData} />
        </ProfileHeader>
        </div>  
    }
    </div>
   
  )
}

export default Following