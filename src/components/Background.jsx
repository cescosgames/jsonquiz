import React, { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from 'motion/react'

const Background = () => {
  // our colors from our palette
  const COLORS = ['#2DE2E6','#FF3864','#FF6C11','#D6FEFE'];

  // our color variable to switch through
  const color = useMotionValue(COLORS[0]);

  // using motionTemplate to bring in templates that we can modify for our background image
  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 0%, #0D0221 50%, ${color}`

  // using animate from motion 
  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 20,
      repeat: Infinity,
      repeatType: 'mirror',
    })
  },[])

  return (
    <motion.div className='fixed top-0 left-0 h-full w-full bg-neon-black z-[-1]'
      style={{backgroundImage,

      }}
    />
  )
}

export default Background