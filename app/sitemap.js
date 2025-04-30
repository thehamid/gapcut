export const dynamic = "force-dynamic";
export default async function sitemap() {
  const staticRoutes = ["", "/blog", "/explore", "/about"];

    const postdata = await fetch(`${process.env.SERVER_URL}/api/articles/blog`)
    const posts = await postdata.json();

    const mediadata = await fetch(`${process.env.SERVER_URL}/api/medias/search`)
    const medias = await mediadata.json();
    
  const routes = staticRoutes.map((route) => ({
    url: `http://gapcut.ir${route}`,
    lastModified: new Date().toString(),
  }));

    
  const postroutes = posts.map((post) => ({
    url: `http://gapcut.ir/article/${post.slug}`,
    lastModified: new Date().toString(),
  }));
    
    
  const mediaroutes = medias.data.map((media) => ({
    url: `http://gapcut.ir/media/${media.slug}`,
    lastModified: new Date().toString(),
  }));
    
  return [...routes,...postroutes,...mediaroutes];
}
