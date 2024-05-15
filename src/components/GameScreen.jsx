/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import { useEffect, useState } from "react";
import QuestionContainer from "./QuestionContainer";

/*=================================================
GameScreen
=================================================*/
const GameScreen = ({
  formData, setFormData, setGameHasStarted, setGameHasEnded, setScore, gameHasEnded, score }) => {
  /*=================================
  States
  =================================*/
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState("");

  /*=================================
  Getting the quiz data
  =================================*/
  useEffect(() => {
    getQuizData();
  }, []);

  async function getQuizData() {
    setLoading(true);
    
    // The url's query string is dynamic. "type=multiple" is fixed, though, 
    // to prevent true/false questions. 
    // See https://opentdb.com/api_config.php for OpenTriviaDB's API URL details
    const url = `
      https://opentdb.com/api.php?amount=${formData?.amount}${formData?.category}${formData?.difficulty}&type=multiple`;
    
    const res = await fetch(url);

    if (!res.ok) {
      throw {
        message: "Failed to fetch questions",
        statusText: res.statusText,
        status: res.status
      };
    }

    const data = await res.json();
    
    // Delay for UX purposes
    setTimeout(() => {
      setQuestions(data.results);
      setLoading(false);
    }, 500);
  }

  /*=================================
  Function for handling game over
  =================================*/
  function handleGameOver(e) {
    // Ends the game. This changes the last button's inner text 
    // from "Check answers" to "New Game"
    setGameHasEnded(true);

    // This resets the game if the last button's inner text is "New Game"
    if(e.target.innerText === "New Game") {
      setScore(0);
      setFormData({
        amount: "2",
        category: "",
        difficulty: ""
      });
      setGameHasStarted(false);
    }
  }

  /*=================================
  Function for randomizing the answers
  =================================*/
  function shuffleAnswers(correct_answer, incorrect_answers) {
    // Initialize an empty array
    let answers = [];
    // Push the correct answer to the answers array
    answers.push(correct_answer);
    // Since the incorrect answers are in their own array,
    // that's how TriviaDB stores them,
    // iterate through the array and push each answer to the
    // answers array
    incorrect_answers.forEach(incorrect_answer => answers.push(incorrect_answer));

    // Randomizing the answers https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let shuffledAnswers = answers
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    // Return the shuffled answers
    return shuffledAnswers;
  }

  /*=================================
  Function for refreshing the page, 
  in case of a loading error
  =================================*/
  function refreshPage() {
    getQuizData();
  }

  /*=================================
  Question elements
  =================================*/
  const questionElements = questions.map((question, index) => {
    // Randomizing the answers
    const shuffle = shuffleAnswers(
      question.correct_answer, question.incorrect_answers);

    return (
      <QuestionContainer 
        key={index} 
        answers={shuffle} 
        question={question.question}
        correctAnswer={question.correct_answer}
        gameHasEnded = {gameHasEnded}
        score = {score}
        setScore= {setScore}
      />
    );
  });

  /*=================================
  JSX
  =================================*/
  return (
    <section className="game-screen">
      {/* A preloader */}
      {loading ? (
          <>
            <p>
              Loading <br /> 
              (click the refresh page button <br /> 
              if the questions are not loading)
            </p>
            <button className="btn" onClick={refreshPage}>Refresh page</button>
          </>
        ) : (
          <>
          {/* Game content */}
            <div className="game-screen-wrapper">
              {questionElements}

              <button 
                onClick={handleGameOver} 
                className={`btn ${gameHasEnded ?"btn--gameover" : "btn--check"}`}
              >
                {!gameHasEnded ? "Check answers" : "New Game"}
              </button>
            </div>
          </>
        )
      }
    </section>
  );
};

export default GameScreen;