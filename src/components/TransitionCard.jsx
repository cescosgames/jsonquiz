import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react'
import { playerScore } from '../atoms';

const TransitionCard = ({ advanceQuestion, restartQuiz, isQuizStart }) => {
    // our final score atom to display
    const finalScore = useAtomValue(playerScore);

  return (
    <div className='border-1 rounded-lg w-xs mt-10 bg-neon-purple border-neon-teal p-3'>
        {isQuizStart ? 
            // this is what we'll show on quiz start
            <>            
                <div className='text-left text-lg'>Welcome</div>
                <div className='text-left text-sm'>
                    <p>- You have 10 seconds to answer each question.</p>
                    <p>- Each second remaining equates to 1 point. </p>
                    <p>- There are 10 total questions for a total of 100 possible points. </p>
                    <p>-Not answering will result in the deduction of 1 point.</p>
                </div>
                <hr className='text-neon-teal'/>
                {/* next button */}
                <button className='mt-5 hover:text-neon-teal cursor-pointer transition hover:opacity-50'
                disabled=''
                onClick={() => {
                    advanceQuestion(); // start the quiz
                }}
                >
                    Start
                </button>
            </>
            :
            // this is what we'll show on quiz end
            <>
                <div className='text-left text-lg'>Quiz Complete</div>
                <div className='text-left text-sm'>See results, questions, and answers below</div>
                {/* I forgot to fix this, but in case you don't have 10 questions, you should pass questions.length as a prop to this component and */}
                {/* multiply that value by 10 to get correct max points; i.e. ${questions.length * 10}  */}
                <div className='text-left text-sm'>{`You got ${finalScore} out of 100 possible points`}</div>
                <hr className='text-neon-teal'/>
                {/* next button */}
                <button className='mt-5 hover:text-neon-teal cursor-pointer transition hover:opacity-50'
                disabled=''
                onClick={() => {
                    restartQuiz();
                }}
                >
                    Try Again
                </button>
            </>
        }
    </div>
  )
}

export default TransitionCard