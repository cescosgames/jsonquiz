import React from 'react'
import { playerAllreadyGuessed } from '../atoms'
import { useAtomValue } from 'jotai'

const AnswerButton = ({ answer, index, onGuess, isCorrect }) => {
    // our atom to prevent re-guessing an already guessed question
    const alreadyGuessed = useAtomValue(playerAllreadyGuessed);

  return (
    <button className={`border-1 rounded-md cursor-pointer transition-all relative group overflow-hidden ${alreadyGuessed ? (!isCorrect ? 'btnFalse' : 'btnTrue') : ''}`}
    onClick={() => onGuess(index)}
    disabled={alreadyGuessed}
    >
        <span className={`absolute inset-0 bg-neon-white transition-transform transform scale-y-0 group-hover:scale-y-100`}></span>
        <p className={`relative z-10 group-hover:text-neon-purple transition-all md:text-left text-md p-1 ${alreadyGuessed ? 'text-neon-black' : 'text-neon-white'}`}>
            {`${index}: ${answer}`}
        </p>
    </button>
  )
}

export default AnswerButton