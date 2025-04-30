'use client'
 
export default function myImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}



//for slove problem src for image with _next.url strting