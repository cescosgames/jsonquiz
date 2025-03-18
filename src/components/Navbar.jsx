import React from 'react'

const Navbar = () => {
  return (
    // the navbar outer
    <div className='w-full flex justify-between items-center px-5 my-5'>
        {/* small little simple logo with group hover for interactivity */}
        <div className='flex gap-0.5 group relative'>
            <span className='h-5 w-0.5 bg-neon-red transition-all group-hover:w-2 crtglow'></span>
            <span className='h-5 w-1 bg-neon-orange transition-all group-hover:w-1 crtglow'></span>
            <span className='h-5 w-2 bg-neon-teal transition-all group-hover:w-0.5 crtglow'></span>
        </div>
        {/* title */}
        <div>
            <p className='text-xl cursor-default'>JSON quiz</p>
        </div>
        {/* github link */}
        <div className='text-neon-teal'>
            <a href="#" className='transition-all hover:text-neon-orange'>Github</a>
        </div>
    </div>
  )
}

export default Navbar