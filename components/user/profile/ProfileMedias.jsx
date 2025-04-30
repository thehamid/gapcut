'use client'
import Item from '@/components/items/item'


function ProfileMedias({ data }) {

    return (
        <div class="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5">
        {(data).length!= 0?         
          data.map((da, i) => (
         <div class="tracked-item" key={i}>
            <Item data={da.media_id}  />
            </div>
          )) :
          <div className="w-relative col-span-full text-center bg-zinc-900 rounded-md p-4">      
            <span>این کاربر هیچ اثری را دنبال نمی‌کند!</span>
        </div>                      
        }
             
      </div>
  )
}

export default ProfileMedias