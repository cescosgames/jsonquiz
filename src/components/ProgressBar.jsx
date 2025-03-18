import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    // the progress bar 'filling' based off of progress (current question / max questions) passed down from quiz info
    <div className='w-full h-5 border-b-1 border-neon-teal'>
        <div className='bg-neon-orange h-4 rounded-t-full transition-all ease-in-out'
        style={{ width:`${progress}%`}}>

        </div>
    </div>
  )
}

export default ProgressBar