/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import React, { useContext, useEffect, useState } from 'react';
import he from "he";

/*=================================================
Questions
=================================================*/
const QuestionContainer = ({
  question, answers, correctAnswer, gameHasEnded,  setScore }) => {
  /*=================================
  States
  =================================*/
  const [userAnswer, setUserAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [stopCounting, setStopCounting] = useState(false);


  /*=================================
  Preventing the options from
  jumping around during re-renders
  =================================*/
  // Takes a snapshot of the answers initial order/indexes
  useEffect(() => {
    setOptions(answers);
  }, []);

  /*=================================
  Ending the game and calculating
  the score
  =================================*/
  useEffect(() => {
    if(gameHasEnded) {
      calculateScore();
    }
  }, [gameHasEnded]);

  /*=================================
  Functions
  =================================*/
  // Select option
  // If option is not selected, highlight it
  function handleAnswer(e) {
    // Registers the user's answer
    // Disables the user to change answer when game has ended
    if (!gameHasEnded) {
      setUserAnswer(e.target.innerText)
    }
  }

  function calculateScore() {
    if(userAnswer === he.decode(correctAnswer) && !stopCounting) {
      setScore(prev => prev + 1);

      // To prevent user from scoring by refreshing the game
      setStopCounting(true);
    }
  }

  /*=================================
  Answer elements
  =================================*/
  const answerElements = options.map((answer, index) => {
    // For conditionally rendering the options background color
    // when the game ends
    let endClass = "";

    if (gameHasEnded) {
      if(answer === correctAnswer) {
        endClass = "correct"
      } else {
        endClass = "incorrect"
      }
    }

    return (
      <button 
        className={`btn btn--option 
          ${userAnswer === he.decode(answer) ? "selected" : ""}
          ${gameHasEnded && endClass}
          ${he.decode(answer)?.length > 17 ? "shorten": ""}`}
        key={index} 
        onClick={(e) => handleAnswer(e)}
        disabled={gameHasEnded ? true : false}
      >
        {he.decode(answer)}
      </button>
    );
  });

  /*=================================
  JSX
  =================================*/
  return (
    <div className='question-container'>
      <p className='question'>{he.decode(question)}</p>
      
      <div className='question-container__options'>
        {answerElements}
      </div>
    </div>
  );
};

export default QuestionContainer;