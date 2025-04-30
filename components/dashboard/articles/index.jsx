import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuTrash, LuPen, LuEye } from "react-icons/lu";



const ArticlesDash = () => {
  const [allArticle, setallArticle] = useState(-1);
  const [author, setAuthor] = useState('');
  const [reload, setReload] = useState('false');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/articles/");

      const data = await response.json();

		setallArticle(data);
		setReload(false)
    }

    fetchData();
  }, [reload]);
	
 async function getauthorName(id) {

      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
     
   
    if (response.status === 200) {
      setAuthor(data.data.name)
    } else {
      setAuthor('نامشخص')
    }
		
  }



	
	const deletehandler = async (id) => {
		await fetch(`/api/dashboard/articles/${id}`, {
			method: 'DELETE',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			   }
		
			})
			.then((response) => response.json())
			.then((messages) => {console.log("messages");});
			setReload(true)
	}
	
	

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">مطالب</h2>
      <div className="m-3 flex justify-start ">
        <Link
          href="/dashboard/new-article"
          className="border border-red-600 bg-red-600  text-white px-2 py-1 m-1 rounded-lg"
        >
          مطلب جدید
        </Link>
        <Link
          href="/dashboard/article-cats"
          className="border border-red-600 bg-red-600  text-white px-2 py-1 m-1 rounded-lg"
        >
          دسته‌بندی مطالب
        </Link>
      </div>

      <div class="flex items-center justify-center">
        {(allArticle == -1) ? <p>Loading...</p> : (allArticle == -2) ? <p>Error...</p> :
         <div class="w-full col-span-12">
         <div class="overflow-auto lg:overflow-visible ">
           <table class="table w-full text-gray-400 border-separate space-y-6 text-sm">
             <thead class="bg-zinc-800 text-gray-300 text-center rounded-lg">
               <tr>
                 <th class="p-3">تصویر و عنوان مطلب</th>
                 <th class="p-3 ">نویسنده</th>
                 <th class="p-3 ">تاریخ انتشار</th>
                 <th class="p-3 ">تعداد بازدید</th>
                 <th class="p-3 ">وضعیت</th>
                 <th class="p-3 ">عملیات</th>
               </tr>
             </thead>
             <tbody>
               {allArticle.map((item, index) => (                
                 <tr key={index} class="bg-zinc-800">
                   
                   <td class="p-3">
                     <div class="flex align-items-center">
                       <Image
                         class="rounded-full h-12 w-12  object-cover ml-1"
                         width={48}
                         height={48}
                         src={item.imgArticle ? item.imgArticle : ""}
                         alt={item.title}
                       />
                       <div class="mr-3 mt-2">
                         <div class="font-bold text-white">{item.title}</div>
                       </div>
                     </div>
                   </td>
                   <td class="p-3"> {item.author.name}</td>
                   <td class="p-3">{item.createdAt}</td>
                   <td class="p-3">{item.view}</td>
                   <td class="p-3">{item.published}</td>
                   <td class="p-3 flex justify-center">
                     <Link
                       target="_blank"
                       rel="noreferer"
                       href={`/article/${item.slug}`}
                       class="text-gray-400 hover:text-gray-100 mr-2"
                     >
                       <LuEye>نمایش</LuEye>
                     </Link>
                     <Link
                       href={`/dashboard/edit-article/${item._id}`}
                       class="text-gray-400 hover:text-gray-100  mx-2"
                     >
                       <LuPen>ویرایش</LuPen>
                     </Link>
                     <span
                       onClick={() => deletehandler(item._id)}
                       class="text-gray-400 hover:text-gray-100  ml-2 cursor-pointer"
                     >
                       <LuTrash>حذف</LuTrash>
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
        }
       
      </div>
    </div>
  );
};

export default ArticlesDash;
