/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import React, { useEffect } from 'react'

/*=================================================
OptionsForm
=================================================*/
const OptionsForm = ({ setFormData, setGameHasEnded, setGameHasStarted }) => {
  /*=================================
  Resetting the gameHasEnded state
  =================================*/
  useEffect(() => {
    setGameHasEnded(false);
  }, []);

  /*=================================
  Functions
  =================================*/
  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setGameHasStarted(true);
  }

  /*=================================
  JSX
  =================================*/
  return (
    <form className='options-form' onSubmit={handleSubmit}>
      <h2>Game Options</h2>
      <div className='form-input-wrapper'>
        {/* Number of questions */}
        <label htmlFor="questions-num">
          Number of questions
        </label>
        <input 
          id="questions-num" 
          name='amount'
          type="number" 
          min={1} 
          max={10}
          defaultValue={2}
          placeholder='Min 1, max 10'
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div className='form-input-wrapper'>
        <label htmlFor="questions-category">
          Category
        </label>
        <select 
          id="questions-category" 
          name="category" 
          onChange={handleChange}
        >
          {/* The option values are parts of OpenTrivia's API URL query string
            See https://opentdb.com/api_config.php
            for OpenTriviaDB's API URL details */}
          <option value="">Any category</option>
          <option value="&category=9">General Knowledge</option>
          <option value="&category=17">Science and Nature</option>
        </select>
      </div>

      {/* Difficulty */}
      <div className='form-input-wrapper'>
        <label htmlFor="questions-difficulty">
          Difficulty
        </label>
        <select 
          id="questions-difficulty" 
          name="difficulty" 
          onChange={handleChange}
        >

          {/* The option values are parts of OpenTrivia's API URL query string
            See https://opentdb.com/api_config.php
            for OpenTriviaDB's API URL details */}
          <option value="">Any difficulty</option>
          <option value="&difficulty=easy">Easy</option>
          <option value="&difficulty=medium">Medium</option>
          <option value="&difficulty=hard">Hard</option>
        </select>
      </div>

      <button className='btn btn--form'>Start the Quiz!</button>
    </form>
  );
};

export default OptionsForm;