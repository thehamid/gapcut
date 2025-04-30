import dynamic from "next/dynamic";
const BlogPage = dynamic(() => import("@/components/article/blogPage"), {
  ssr: false,
});


export const metadata = {
    title: "اخبار و مطالب گپ کات",
    description: `اخبار نمایش خانگی و سینمای ایران و جهان`,
  };

const Blog = async () => {

  return (
    <div className="min-h-screen">
        <BlogPage/>
    </div>
  );
};

export default Blog;