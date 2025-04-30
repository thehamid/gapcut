import dynamic from 'next/dynamic'


const Boxes = dynamic(() => import('@/components/boxes'), { ssr: false })
const Hero = dynamic(() => import('@/components/hero'), { ssr: false })


export default function HomePage() {
  return (
    <>
    <div className='min-h-svh'>
        <Hero />
        <Boxes />
     
    </div>  
  </>
  )
}
