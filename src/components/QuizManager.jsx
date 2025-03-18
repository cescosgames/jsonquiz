import React, { useState, useEffect } from 'react'
import QuizInfo from './QuizInfo'
import QuestionCard from './QuestionCard'
import TransitionCard from './TransitionCard'
import questions from '../assets/data/questions.json'
import { playerScore } from '../atoms'
import { useAtom } from 'jotai'

const QuizManager = () => {
  // our game start/game over checks 
  const [quizStart, setQuizStart] = useState(true); // true to start because it started
  const [quizEnd, setQuizEnd] = useState(false); // false to start because we're not done with the quiz yet

  // our score global atom
  const [pScore, setPScore] = useAtom(playerScore);

  // our question index to track what question we are on
  const [questionIndex, setQuestionIndex] = useState(0);

  // our answers for our current index, to be passed down to our answer buttons
  const [answers, setAnswers] = useState(questions.quiz.questions[questionIndex].answers);

  // function to advance questions
  const nextQuestion = () => {
    setQuestionIndex((prevIndex) => {
      // if it's the quiz start, return the 0 index and continue as normal
      if(quizStart === true) {
        setQuizStart(false);
        return prevIndex;
      }
      // if not continue as normal
      const newIndex = prevIndex + 1;

      if (newIndex > questions.quiz.questions.length - 1) {
        // this is where we would do the game over modal
        setQuizEnd(true);
        return prevIndex;
      } else {
        // this is where we continue the quiz
        return newIndex;
      }      
    });
  } 

  // function to get pass correct answer
  const getCorrectAnswer = () => {
    // arrow function version of 'return answer.isCorrect === true' findIndex iterates through our array, takes answer as input, if answer.iscorrect, returns true and returns our index
    const correctIndex = answers.findIndex(answer => answer.isCorrect === true);
    return correctIndex;
  };

  // function to restart the quiz
  const restartQuiz = () => {
    // set the score back to 0
    setPScore(0);
    // set the q index back to 0 
    setQuestionIndex(0);
    // set the quizStart/quizend bool to respective states
    setQuizStart(true);
    setQuizEnd(false);
  }

  // updating our correct answer whenever the answers array gets updated
  useEffect(() => {
    getCorrectAnswer();
  }, [answers]);

  // changing the answers dependent on our question index changing
  useEffect(() => {
    setAnswers(questions.quiz.questions[questionIndex].answers);
  }, [questionIndex]);

  return (
    // this will hold the quiz components i.e. the quiz card and the quiz header info
    <div className='px-3 py-1 m-auto md:w-xl w-xs mt-20 flex flex-col justify-center items-center text-center transition-all duration-1500'>
        <QuizInfo questionNum={quizStart ? 0 : questionIndex+1} questionTotal={questions.quiz.questions.length} score={pScore}/>
        {/* if it's our quiz start, show the question card, if it's the quiz end, show the end card */}
        {quizStart ?
          <TransitionCard advanceQuestion={nextQuestion} isQuizStart={quizStart}/> : quizEnd ? 
            <>
              <TransitionCard restartQuiz={restartQuiz} isQuizStart={quizStart}/>
              
              <div className='border-1 border-neon-orange w-xs rounded-md m-3 p-2 max-h-[20vh] overflow-y-scroll scrollbar-hidden gap-5 flex flex-col fade'>
                {/* down scroll icon courtesy of hero icons */}
                <div className='flex flex-col justify-center items-center gap-5'>
                  <p className='text-lg mt-2 text-neon-white'>Answers Below</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-bounce text-neon-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                  </svg>
                </div>

                {/* also at the end of the quiz, map out all questions and correct answers using our json input */}
                {questions.quiz.questions.map((data, index) => {
                  // here we will iterate over each question, and for each question we will iterate over each answer to find the one that isCorrect
                  // filter out only our correct answers using .filter - this will call for each question you have so it might get performance heavy
                  const correctAnswers = data.answers.filter(answer => answer.isCorrect);
                  
                  // then we return our map array with 1. our key 2. our question 3. our correct answer - all from our properly structured json file
                  return(
                    <div key={data.id}>
                      <div className='text-left text-md italic text-neon-teal'>{`Q${index + 1}: ${data.text}`}</div>
                      <div className='text-left text-sm text-neon-white'>{`- ${correctAnswers[0].text}`}</div>
                    </div>
                  )
                })}
              </div>
            </>:
          <QuestionCard questionNum={questionIndex+1} question={questions.quiz.questions[questionIndex].text} answers={answers} advanceQuestion={nextQuestion} correctAnswer={getCorrectAnswer()}/>
        }
    </div>
  )
}

export default QuizManager