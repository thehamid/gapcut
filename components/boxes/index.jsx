import React from 'react'
import NewMedia from './newbox'
import NewAddMedia from './laterbox'
import Nostalgy from './nostalgybox'
import HomeBox from './homebox'

const Boxes = () => {
  return (
    <div className='flex flex-col'>
          <HomeBox/>
          <NewMedia/>
          <NewAddMedia/>
          <Nostalgy/>
          

    </div>
  )
}

export default Boxes