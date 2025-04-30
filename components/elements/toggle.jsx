import { useState } from 'react'
import { Switch } from '@headlessui/react'

function Toggle({status}) {
  const [enabled, setEnabled] = useState(status)

  return (
    <div className="flex flex-col justify-center items-center">
    <Switch
       checked={enabled}
       onChange={setEnabled}
       className={`${
         enabled ? 'bg-red-700' : 'bg-zinc-600'
       } relative inline-flex h-6 w-11 items-center rounded-full`}
     >
       <span className="sr-only">Enable notifications</span>
       <span
         className={`${
           enabled ? 'translate-x-6' : 'translate-x-1'
         } inline-block h-4 w-4 transform rounded-full bg-zinc-900 transition`}
       />
          </Switch> 
          <small className='my-1'>{enabled?'فعال':'غیر فعال' }</small>
     </div>
  )
}

export default Toggle