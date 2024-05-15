/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import GameScreen from './components/GameScreen';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

/*=================================================
App
=================================================*/
const App = () => {
  /*=================================
  States
  =================================*/
  const [score, setScore] = useState(0);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [formData, setFormData] = useState({
    amount: "2",
    category: "",
    difficulty: ""
  });
  
  /*=================================
  Background manipulation, based on
  https://www.digitalocean.com/community/tutorials/how-to-change-a-css-background-images-opacity 
  =================================*/
  if (gameHasStarted) {
    document.getElementsByClassName("background")[0].style.opacity = "0.6"
  } else {
    document.getElementsByClassName("background")[0].style.opacity = "0.3"
  }

  /*=================================
  JSX
  =================================*/
  return (
    <> 
      <Header 
        score={score}
        formData = {formData}
        gameHasStarted = {gameHasStarted}
        gameHasEnded = {gameHasEnded}
      />

      <main className='app'>
        {!gameHasStarted ? 
          (
            <OpeningScreen 
              setFormData = {setFormData}
              setGameHasStarted = {setGameHasStarted}
              setGameHasEnded = {setGameHasEnded}
            />
          ) : (
            <GameScreen 
              formData = {formData}
              setFormData = {setFormData}
              gameHasStarted = {gameHasStarted}
              setGameHasStarted = {setGameHasStarted}
              gameHasEnded = {gameHasEnded}
              setGameHasEnded = {setGameHasEnded}
              score = {score}
              setScore = {setScore}
            />
          )
        }
      </main>

      <Footer />
    </>
  );
};

export default App;
