import React, { useEffect, useState } from 'react'
import AnswerButton from './AnswerButton'
import { useAtom, useSetAtom } from 'jotai'
import { playerAllreadyGuessed, playerScore } from '../atoms'

const QuestionCard = ({ questionNum, question, answers, advanceQuestion, correctAnswer }) => {
    // our score global atom to update only
    const setPScore = useSetAtom(playerScore);
    // our global justGuessed to track if we guessed this question already, reset on next question
    const [alreadyGuessed, setAlreadyGuessed] = useAtom(playerAllreadyGuessed);
    
    // our timer for auto-ending questions
    const [seconds, setSeconds] = useState(10);
    // our state for counting down
    const [isCountingDown, setIsCountingDown] = useState(true);

    // our array for checking if which of answ1234 is correct
    const [answerResults, setAnswerResults] = useState([
        false,false,false,false
    ])

    // check answer function
    const checkAnswer = (ansIndex) => {
        // check if it's the right answer by index
        if (answers[ansIndex-1].isCorrect === true) {
            // console.log('correct answer!')
            setPScore((prevScore) => prevScore + seconds); // score based on how many secs left
        } else {
            // console.log('wrong answer!')
            // setPScore((prevScore) => prevScore - 1);
        };
        setAlreadyGuessed(true);
        // REMEMBER! react state should only be updated in an immutable way! in the case of updating an array, copy the original into a new array and return the updated array
        setAnswerResults((prevResults) => {
            const newResults = [...prevResults]; // spread operator to copy previous results into new newResults Array
            newResults[correctAnswer] = true; // update the answer index that's correct
            return newResults; // return the updated array which will update the answers
        });

        // stop the countdown
        setIsCountingDown(false);
    }

    // skip answer function
    const skipAnswer = () => {
        setAlreadyGuessed(true);
        // REMEMBER! react state should only be updated in an immutable way! in the case of updating an array, copy the original into a new array and return the updated array
        setAnswerResults((prevResults) => {
            const newResults = [...prevResults]; // spread operator to copy previous results into new newResults Array
            newResults[correctAnswer] = true; // update the answer index that's correct
            return newResults; // return the updated array which will update the answers
        });

        setPScore((prevScore) => prevScore - 1); // deduct points on skip
    }

    // our reset answers function
    const resetAnswers = () => {
        setAlreadyGuessed(false);
        advanceQuestion();

        // need to reset the answerResults array (which updates color) to all false
        setAnswerResults((prevResults) => {
            const newResults = [false, false, false, false];  // our default state
            return newResults; // return the updated array which will update the answers
        });

        // reset our timer
        setSeconds(10);
        // set our countdown to true
        setIsCountingDown(true);
    }

    // our timer functions
    useEffect(() => {
        // don't start if we aren't counting down
        if(!isCountingDown) {
            return;
        }
        // if we are at 0 seconds...
        if (seconds <= 0) {
            skipAnswer();
            setIsCountingDown(false);
            return
        }

        const intervalID = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000); // 1000 ms = 1 second

        // our cleanup function, see docs on cleanup functions for explanation, explained in last project
        return () => clearInterval(intervalID);
    },[seconds, isCountingDown]); // dependent on if we are counting down and how many secs we have left

  return (
    <div className='border-1 rounded-lg w-xs mt-10 bg-neon-purple border-neon-teal p-3 crtglow'>
        <div className='flex items-center justify-between'>
            <div className='text-left text-lg'>{`Q-${questionNum}`}</div>
            <div>{seconds}</div>
        </div>
        <div className='text-left text-sm'>{`${question}`}</div>
        <hr className='text-neon-teal'/>
        <ul className='flex flex-col mt-2 gap-2'>
            <AnswerButton index={1} answer={answers[0].text} onGuess={checkAnswer} isCorrect={answerResults[0]}/>
            <AnswerButton index={2} answer={answers[1].text} onGuess={checkAnswer} isCorrect={answerResults[1]}/>
            <AnswerButton index={3} answer={answers[2].text} onGuess={checkAnswer} isCorrect={answerResults[2]}/>
            <AnswerButton index={4} answer={answers[3].text} onGuess={checkAnswer} isCorrect={answerResults[3]}/>
        </ul>
        {/* next question button */}
        <button className='mt-5 hover:text-neon-teal cursor-pointer transition'
        disabled={!alreadyGuessed}
        onClick={() => resetAnswers()}
        >
            Next Question
        </button>
    </div>
  )
}

export default QuestionCard