import React from 'react'
import ProgressBar from './ProgressBar'

const QuizInfo = ({ questionNum, questionTotal, score }) => {
  // this holds our progress and score
  return (
    <div className='md:w-full w-xs flex flex-col md:flex-row gap-1 items-center'>
        <div className='flex items-center px-1 md:w-[20%] w-full gap-2 text-right md:justify-items-start justify-end'>
            <p className='md:text-left text-right text-lg text-neon-teal'>{`${score}`} </p>
            <p className='text-xs md:text-left text-right italic'>{`[ ${questionNum} | ${questionTotal} ]`}</p>
        </div>
        <ProgressBar progress={(questionNum/questionTotal) * 100} maxQuestions={questionTotal}/>
    </div>
  )
}

export default QuizInfo