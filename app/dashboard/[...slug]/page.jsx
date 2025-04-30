"use client"
import { useEffect, useState } from "react";

import MainDash from "@/components/dashboard/main";
import UsersDash from "@/components/dashboard/users";
import ArticlesDash from "@/components/dashboard/articles";
import NewArticle from "@/components/dashboard/articles/new_article";
import EditArticle from "@/components/dashboard/articles/edit_article";
import ArticleCategory from "@/components/dashboard/articles/article_cats";
import MediasDash from "@/components/dashboard/medias";
import NewMedia from "@/components/dashboard/medias/new_media";
import EditMedia from "@/components/dashboard/medias/edit_media";
import Genre from "@/components/dashboard/medias/genre";
import Network from "@/components/dashboard/medias/network";
import State from "@/components/dashboard/medias/state";
import GalleryDash from "@/components/dashboard/gallery";
import ReviewsDash from "@/components/dashboard/reviews";
import CommentsDash from "@/components/dashboard/comments";
import PersonsDash from "@/components/dashboard/persons";
import NewPerson from "@/components/dashboard/persons/new_person";
import EditPerson from "@/components/dashboard/persons/edit_person";
import PersonCategory from "@/components/dashboard/persons/person_cats";


const Pages = ({params}) => {
   const [details,setdetails]=useState(<MainDash/>);

   useEffect(()=>{
      if(params.slug[0]=="users"){
         setdetails(<UsersDash/>);
      }
      else if(params.slug[0]=="articles"){
         setdetails(<ArticlesDash/>);
      }
      else if(params.slug[0]=="medias"){
         setdetails(<MediasDash/>);
      }
      else if(params.slug[0]=="reviews"){
         setdetails(<ReviewsDash/>);
      }
      else if(params.slug[0]=="comments"){
         setdetails(<CommentsDash/>);
      }
      else if(params.slug[0]=="persons"){
         setdetails(<PersonsDash/>);
      }
      else if(params.slug[0]=="gallery"){
         setdetails(<GalleryDash/>);
      }
         
      //New Components   
      else if(params.slug[0]=="new-article"){
         setdetails(<NewArticle/>);
      }
      else if(params.slug[0]=="article-cats"){
         setdetails(<ArticleCategory/>);
      }
      else if(params.slug[0]=="new-person"){
         setdetails(<NewPerson/>);
      }
      else if(params.slug[0]=="person-cats"){
         setdetails(<PersonCategory/>);
      }
      else if(params.slug[0]=="new-media"){
         setdetails(<NewMedia/>);
      }
      else if(params.slug[0]=="genre"){
         setdetails(<Genre/>);
      }
      else if(params.slug[0]=="network"){
         setdetails(<Network/>);
      }
      else if(params.slug[0]=="state"){
         setdetails(<State/>);
      }

      //Edit Component
      else if(params.slug[0]=="edit-article"){
         setdetails(<EditArticle/>);
      }
      else if(params.slug[0]=="edit-person"){
         setdetails(<EditPerson/>);
      }
      else if(params.slug[0]=="edit-media"){
         setdetails(<EditMedia/>);
      }

   },[params.slug[0],params.slug]);


   return (
      <div>
         {details}
      </div>
   );
}

export default Pages;

