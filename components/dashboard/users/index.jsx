import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {  LuTrash,LuPen, LuEye } from "react-icons/lu";


const UsersDash = () => {
  const [allUser, setallUser] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/dashboard/users/')

      const data = await response.json()

      setallUser(data)
    }

    fetchData()
  }, [])
	
  const roleSwitch=(role)=> {
	switch(role) {
		case 200:
			return 'کاربر عادی';

		case 201:
			return 'کاربر ویژه';

		case 100:
			return 'مدیر کل';

	  	case 101:
			return 'مدیر سایت';

	  default:
		return 'نا مشخص';
	}
  }



  return (
    <div>
      <h2 className='mb-4 text-xl border-b-[1px] border-zinc-600'>کاربران</h2>
 

      <div class="flex items-center justify-center">
	<div class="w-full col-span-12">
		<div class="overflow-auto lg:overflow-visible ">
			<table class="table w-full text-gray-400 border-separate space-y-6 text-sm">
				<thead class="bg-zinc-800 text-gray-300 text-center rounded-lg">
					<tr>
						<th class="p-3">کاربر</th>
						<th class="p-3 ">نقش کاربر</th>
						<th class="p-3 ">تاریخ عضویت</th>
						<th class="p-3 ">وضعیت</th>
						<th class="p-3 ">عملیات</th>
					</tr>
				</thead>
              <tbody>
              {allUser.map((item, index) => (
					<tr key={index} class="bg-zinc-800">
						<td class="p-3">
							<div class="flex align-items-center">
								<Image class="rounded-full h-12 w-12  object-cover ml-1" width={48} height={48} src={item.avatar?item.avatar:'avatar-holder.jpg'} alt={item.name}/>
								<div class="ml-3">
									<div class="">{item.username}</div>
									<div class="text-gray-500">{item.email}</div>
								</div> 
							</div>
						</td>
						<td class="p-3">
            {roleSwitch(item.roles)}
						</td>
						<td class="p-3 font-bold">
            {item.createdAt}
						</td>
						<td class="p-3">
							<span class="bg-green-400 text-gray-50 rounded-md px-2">فعال</span>
						</td>
						<td class="p-3 flex justify-center">
							<Link href="#" class="text-gray-400 hover:text-gray-100 mr-2">
              <LuEye>نمایش</LuEye>
							</Link>
							<Link href="#" class="text-gray-400 hover:text-gray-100  mx-2">
              <LuPen>ویرایش</LuPen>
							</Link>
							<Link href="#" class="text-gray-400 hover:text-gray-100  ml-2">
              <LuTrash>حذف</LuTrash>
							</Link>
						</td>
					</tr>
				  ))}
				</tbody>
			</table>
		</div>
	</div>
</div>

  </div>
  )
}

export default UsersDash