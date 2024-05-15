/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import React from 'react';

/*=================================================
Header
=================================================*/
const Header = ({ score, formData, gameHasEnded, gameHasStarted }) => {
  /*=================================
  API URL "translation"

  See https://opentdb.com/api_config.php
  for OpenTriviaDB's API URL details
  =================================*/
  // Takes in the api url and returns
  // a human-readable value
  function formDataTranslator(url) {
    if(url === "&category=9") {
      return " General knowledge";
    }

    if(url === "&category=17") {
      return " Science & Nature";
    }

    if(url=== "&difficulty=easy") {
      return " Easy";
    }

    if(url=== "&difficulty=medium") {
      return " Medium";
    }

    if(url=== "&difficulty=hard") {
      return " Hard";
    }
  }

  /*=================================
  JSX
  =================================*/
  return (
  <header className='header'>
    {!gameHasStarted ? (
      <p className='header__text presentation'>Kodlus presents:</p>
      ) : (
        <div className='header-wrapper'>
          {/* Category */}
          <div className='header__text left'>
            <span className="bold">
              Category:
            </span>

            <span className={`
              ${formDataTranslator(formData.category)?.length > 15 ? "shorten" : ""}`}
            >
              {formData.category === "" ? "Any": formDataTranslator(formData.category)}
            </span>
          </div>
          
          {/* Difficulty */}
          <div className='header__text center'>
            <span className="bold">
              Difficulty:
            </span>

            <span>
              {formData.difficulty === "" ? "Any": formDataTranslator(formData.difficulty)}
            </span>
          </div>

          {/* Score */}
          <div className='header__text right'>
            <span className="bold">
              Score:
            </span>

            <span> 
              {gameHasEnded ? score : "?"} / {formData.amount}
            </span>
          </div>      
        </div>
      )}
    </header>
  );
};

export default Header;