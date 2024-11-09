"use client";
import React, { useState, useEffect } from 'react';

import { handleEmailSubmit } from '@/actions/handle-submit';

const quizData = [
  {
    question: "1. How satisfied are you with your current job or career path?",
    options: [
      { text: "Very satisfied", score: 1 },
      { text: "Somewhat satisfied", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat dissatisfied", score: 4 },
      { text: "Very dissatisfied", score: 5 }
    ]
  },
  {
    question: "2. How financially prepared are you to take an extended break from work?",
    options: [
      { text: "Not prepared and concerned about finances", score: 1 },
      { text: "Not prepared but willing to make financial adjustments", score: 2 },
      { text: "Somewhat prepared but need to budget carefully", score: 3 },
      { text: "Fully prepared with sufficient savings", score: 4 },
      { text: "Extremely well-prepared with ample savings and investments", score: 5 }
    ]
  },
  {
    question: "3. Have you set clear goals for what you want to achieve during your sabbatical?",
    options: [
      { text: "No, I haven't thought about it", score: 1 },
      { text: "Not yet, but I plan to set goals soon", score: 2 },
      { text: "I have general ideas but need to refine them", score: 3 },
      { text: "Yes, I have specific goals", score: 4 },
      { text: "Yes, I have specific and detailed goals", score: 5 }
    ]
  },
  {
    question: "4. How supportive do you think your company will be if you ask for a career break?",
    options: [
      { text: "Not supportive at all", score: 1 },
      { text: "Not very supportive", score: 2 },
      { text: "Neutral or mixed feelings", score: 3 },
      { text: "Somewhat supportive", score: 4 },
      { text: "Yes, they are very supportive", score: 5 }
    ]
  },
  {
    question: "5. How comfortable are you with uncertainty and stepping out of your comfort zone?",
    options: [
      { text: "Very uncomfortable", score: 1 },
      { text: "Slightly uncomfortable", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat comfortable", score: 4 },
      { text: "Very comfortable and excited", score: 5 }
    ]
  },
  {
    question: "6. Are you prepared to handle potential career implications of taking a sabbatical (e.g., job security, career progression)?",
    options: [
      { text: "Not prepared and worried about the consequences", score: 1 },
      { text: "Not sure, need more information", score: 2 },
      { text: "Somewhat prepared but have concerns", score: 3 },
      { text: "Mostly prepared and accept the implications", score: 4 },
      { text: "Yes, I've planned for it and accept the implications", score: 5 }
    ]
  },
  {
    question: "7. How ready are you to take action to start the process of planning a career sabbatical?",
    options: [
      { text: "I don't know if I even want to try", score: 1 },
      { text: "Not ready to commit yet", score: 2 },
      { text: "Ready but I don't know where to start", score: 3 },
      { text: "Mostly ready and committed", score: 4 },
      { text: "Fully ready and committed", score: 5 }
    ]
  }
];

export default function Quiz(){
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState('');

//   useEffect(() => {
//     loadQuestion();
//   }, [currentQuestion]);

//   const loadQuestion = () => {
//     // Logic to load the current question
//   };

//   useEffect( () => {
//     console.log("emailModalVisible changed")
//   }, [emailModalVisible])

  const submitQuiz = () => {
    // console.log("Inside submitQuiz")
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        // console.log("selectedOption is true")
      setScore(prevScore => prevScore + quizData[currentQuestion].options[selectedOption.value].score);
      setCurrentQuestion(prev => prev + 1);
    //   console.log("currentQuestion + 1", currentQuestion + 1)
    //   console.log("quizData.length: ", quizData.length)
      if (currentQuestion + 1 >= quizData.length) {
        // console.log("setting email modal visible to true")
        setEmailModalVisible(true);
      }
    } else {
        console.log("selected option does not exist")
    }
  };

  const submitEmail = (e) => {
    e.preventDefault();
    // console.log("inside result message")
    if (validateEmail(email)) {
      handleEmailSubmit(email, getResultMessage())
      alert("Thank you! Your results have been sent to your email.");
      setEmailModalVisible(false);
      showQuizResults();
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getResultMessage = () => {
    if (score >= 30) {
      return "High Readiness - You appear ready to take a sabbatical";
    } else if (score >= 22) {
      return "Moderate Readiness - You're on the right track, but may need more planning";
    } else {
      return "Low Readiness - You may need more preparation before taking a sabbatical";
    }
  };

  const showQuizResults = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      <div id="quiz">
        {currentQuestion < quizData.length ? (
          <div className="question">
            <h2>{quizData[currentQuestion].question}</h2>
            <div className="options">
              {quizData[currentQuestion].options.map((option, index) => (
                <label className="option" key={index}>
                  <input type="radio" name="answer" value={index} required />
                  {option.text}
                </label>
              ))}
            </div>
            <button id="submit" onClick={submitQuiz}>Next Question</button>
          </div>
        ) : null}

        {showResults && (
          <div id="results">
            <h2>Your Results</h2>
            <p id="score-result">{getResultMessage()}</p>
          </div>
        )}

        {emailModalVisible && (
          <div id="emailModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEmailModalVisible(false)}>&times;</span>
              <h2>Enter your email to receive your results</h2>
              <form id="email-form-modal" onSubmit={submitEmail}>
                <label htmlFor="email-modal">Email:</label>
                <input
                  type="email"
                  id="email-modal"
                  placeholder="Your email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
