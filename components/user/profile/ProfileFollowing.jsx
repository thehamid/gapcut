import UserCard from '@/components/elements/userCard'

export default function ProfileFollowing({ data }) {
 
  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
    <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
        {(data.user.following).length!= 0?
           data.following.map((user, i) => (
              <UserCard data={user} key={i} />
            )
          ) :
          <div className="w-relative col-span-full text-center bg-zinc-900 rounded-md p-4">      
            {data.user.name} هیچ کسی را دنبال نمیکند
          </div>
                      
        }
        </div>

  </div>
  )
}

