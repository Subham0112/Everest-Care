import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizData} from '../data/odpquizData';
import { HabgetQuizData} from '../data/habquizData';

function Quiz() {
  const { option, type } = useParams(); // Get both type and option from URL
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false); // New state for review mode
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // New state to track submission
  
  // Use the type parameter to determine which data to load
  const quizData = type === 'odp' ? getQuizData(option) : HabgetQuizData(option);

  
  useEffect(() => {
    if (answers[currentQuestion]) {
      setSelectedAnswer(answers[currentQuestion]);
    } else {
      setSelectedAnswer('');
    }
  }, [currentQuestion, answers]);

  // Add error handling for missing data
  if (!quizData || !quizData.questions) {
    return (
      <div className="quiz-page mx-2">
        <div className="container-fluid py-4">
          <div className="alert alert-danger">
            <h4>Quiz data not found</h4>
            <p>No quiz data available for "{option}" in {type.toUpperCase()} section.</p>
            <button className="btn btn-secondary" onClick={() => navigate(`/home/${type}`)}>
              ← Back to {type.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBackToOptions = () => {
    navigate(`/home/${type}`); // Navigate back to the correct section
  };

  const handleAnswerSelect = (answer) => {
    if (!reviewMode) { // Only allow selection if not in review mode
      setSelectedAnswer(answer);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));
    }
  };

  const handleNext = () => {
    if (reviewMode && currentQuestion === quizData.questions.length) {
      // If in review mode and on last question, go back to results
      setQuizCompleted(true);
      setReviewMode(false);
      return;
    }
    
    if (currentQuestion < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index + 1] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(1);
    setSelectedAnswer('');
    setAnswers({});
    setQuizCompleted(false);
    setScore(0);
    setReviewMode(false);
    setIsAnswerSubmitted(false);
  };

  // New function to handle "Check Answer" button
  const handleCheckAnswer = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index + 1] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    setScore(finalScore);
    setReviewMode(true);
    setQuizCompleted(false); // Exit completed state to show review
    setCurrentQuestion(1); // Start review from question 1
  };

  // New function to handle "Submit Answer" button
  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
    
    // Save completion status to localStorage
    localStorage.setItem(`${option}_completed`, 'true');
    
    // You can add additional logic here, like saving to database
    alert(`Quiz submitted successfully! You have unlocked the next module.`);
    
    // Optional: Navigate back to content page to show unlocked modules
    // setTimeout(() => {
    //   navigate(`/${type}`);
    // }, 2000);
  };

  // Function to get option styling based on review mode
  const getOptionStyle = (option) => {
    if (!reviewMode) {
      return selectedAnswer === option ? 'selected' : '';
    }

    const currentQuestionData = quizData.questions[currentQuestion - 1];
    const userAnswer = answers[currentQuestion];
    const correctAnswer = currentQuestionData.correct;

    if (option === correctAnswer) {
      // Correct answer is always green
      return 'correct-answer';
    } else if (option === userAnswer && userAnswer !== correctAnswer) {
      // User's wrong answer is red
      return 'wrong-answer';
    }
    return '';
  };

  if (quizCompleted) {
    return (
      <div className="quiz-page mx-4">
        <div className="container-fluid content-container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 text-center">
                <div className="card-header text-white quiz-header">
                  <h4 className="mb-0">🎉 Quiz Completed!</h4>
                </div>
                <div className="card-body p-5">
                  <div className="score-display mb-4">
                    <h2 className="display-4 text-primary">{score}/{quizData.questions.length}</h2>
                    <p className="lead">Your Final Score</p>
                  </div>
                  <div className="result-message mb-4">
                    {score >= 8 ? (
                      <div className="alert alert-success">
                        <strong>Excellent!</strong> You've mastered {option}.
                      </div>
                    ) : score >= 6 ? (
                      <div className="alert alert-warning">
                        <strong>Good job!</strong> Consider reviewing the material for {option}.
                      </div>
                    ) : (
                      <div className="alert alert-danger">
                        <strong>Keep learning!</strong> Review the training material for {option}.
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-custom2" onClick={handleRetakeQuiz}>
                      Retake Quiz
                    </button>
                    <button className="btn btn-custom2" onClick={handleCheckAnswer}>
                      Check Answer
                    </button>
                    <button 
                      className={`btn ${score === quizData.questions.length ? 'btn-success' : 'btn-secondary'}`}
                      onClick={handleSubmitAnswer}
                      disabled={score !== quizData.questions.length || isAnswerSubmitted}
                    >
                      {isAnswerSubmitted ? 'Submitted' : 'Submit Answer'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion - 1];

  // Function to get inline styles for options
  const getInlineStyle = (option) => {
    if (!reviewMode) {
      return { borderRadius: '10px' };
    }

    const currentQuestionData = quizData.questions[currentQuestion - 1];
    const userAnswer = answers[currentQuestion];
    const correctAnswer = currentQuestionData.correct;

    let styles = { 
      borderRadius: '10px',
      cursor: 'default'
    };

    if (option === correctAnswer) {
      styles = {
        ...styles,
        backgroundColor: '#d4edda',
        borderColor: '#28a745',
        color: '#155724'
      };
    } else if (option === userAnswer && userAnswer !== correctAnswer) {
      styles = {
        ...styles,
        backgroundColor: '#f8d7da',
        borderColor: '#dc3545',
        color: '#721c24'
      };
    }

    return styles;
  };

  return (
    <div className="quiz-page">
      <div className="container-fluid content-container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="page-title">
                {reviewMode ? `Review - ${option}` : `Quiz - ${option}`}
              </h3>
              <button 
                className="btn mx-3 btn-secondary back-btn"
                onClick={handleBackToOptions}
              >
                ← Back 
              </button>
            </div>
            
            <div className="card shadow-lg border-0">
              <div className="card-header text-white quiz-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 style={{color:'#87CEEB'}} className="mb-0">
                    {reviewMode ? '🔍 Review Mode' : '🧠 Assessment Quiz'}
                  </h4>
                  <span className="badge bg-light text-dark">
                    Question {currentQuestion} of {quizData.questions.length}
                  </span>
                </div>
              </div>
              
              <div className="card-body p-4">
                <div className="progress mb-4">
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(currentQuestion / quizData.questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* {reviewMode && (
                  <div className="mb-3">
                    <div className="alert alert-info">
                      <small>
                        <strong>Review Mode:</strong> 
                        <span className="ms-2 badge bg-success">Green = Correct Answer</span>
                        <span className="ms-2 badge bg-danger">Red = Your Wrong Answer</span>
                      </small>
                    </div>
                  </div>
                )} */}

                <h5 className="mb-4 question-text">{currentQuestion}. {currentQuestionData?.question}</h5>
                
                <div className="row g-3">
                  {currentQuestionData?.options.map((optionText, index) => (
                    <div key={index} className="col-12">
                      <div 
                        className={`card answer-option p-3 border-2 ${getOptionStyle(optionText)} ${!reviewMode && selectedAnswer === optionText ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(optionText)}
                        style={{
                          ...getInlineStyle(optionText),
                          cursor: reviewMode ? 'default' : 'pointer'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <span className="answer-text">{optionText}</span>
                          {reviewMode && optionText === currentQuestionData.correct && (
                            <span className="ms-auto badge bg-success">✓ Correct</span>
                          )}
                          {reviewMode && optionText === answers[currentQuestion] && optionText !== currentQuestionData.correct && (
                            <span className="ms-auto badge bg-danger">✗ Your Answer</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button 
                    className={`btn ${currentQuestion === 1?'btn-outline-secondary':'btn-secondary'} `}
                    disabled={currentQuestion === 1}
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  
                  <button 
                    className={`btn btn-sm ${(!selectedAnswer && !reviewMode) ? 'btn-outline-secondary' : 'btn-success'}`}
                    onClick={reviewMode ? handleNext : handleNext}
                    disabled={!selectedAnswer && !reviewMode}
                  >
                    {reviewMode 
                      ? (currentQuestion === quizData.questions.length ? 'Back to Results' : 'Next Question')
                      : (currentQuestion === quizData.questions.length ? 'Submit Quiz' : 'Next Question')
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;