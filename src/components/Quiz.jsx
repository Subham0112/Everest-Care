import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizData } from '../data/odpquizData';
import { HabgetQuizData } from '../data/habquizData';

function Quiz({ user, handleAlert }) {
  const { option, type } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [trainingId, setTrainingId] = useState(null);

  const quizData = type === 'odp' ? getQuizData(option) : HabgetQuizData(option);

  // Fetch training ID based on training name
  useEffect(() => {
    const fetchTrainingId = async () => {
      try {
        const response = await fetch(`https://localhost:44345/api/Training/category/${type}`);
        if (response.ok) {
          const trainings = await response.json();
          const training = trainings.find(t => t.trainingName === option);
          if (training) {
            setTrainingId(training.id);
          }
        }
      } catch (err) {
        console.error('Error fetching training ID:', err);
      }
    };

    fetchTrainingId();
  }, [option, type]);

  useEffect(() => {
    if (answers[currentQuestion]) {
      setSelectedAnswer(answers[currentQuestion]);
    } else {
      setSelectedAnswer('');
    }
  }, [currentQuestion, answers]);

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
    navigate(`/home/${type}`);
  };

  const handleAnswerSelect = (answer) => {
    if (!reviewMode) {
      setSelectedAnswer(answer);
      setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    }
  };

  const handleNext = () => {
    if (reviewMode && currentQuestion === quizData.questions.length) {
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
    setQuizCompleted(false);
    setCurrentQuestion(1);
  };

  const handleSubmitAnswer = async () => {
  if (!user || !user.id) {
    handleAlert('User information is missing. Please log in again.', 'danger');
    return;
  }

  if (!trainingId) {
    handleAlert('Training information is missing. Cannot submit quiz.', 'danger');
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch('https://localhost:44345/api/TrainingComplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        trainingId: trainingId
      })
    });

    if (response.ok) {
      handleAlert('Quiz submitted successfully! Training marked as complete.', 'success');
      setIsAnswerSubmitted(true);
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate(`/home/${type}`);
      }, 2000);
    } else {
      // Check content type before parsing
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        
        if (response.status === 400 && errorData.message.includes('already completed')) {
          handleAlert('You have already completed this training.', 'info');
          setIsAnswerSubmitted(true);
        } else {
          handleAlert(errorData.message || 'Failed to submit quiz. Please try again.', 'danger');
        }
      } else {
        // Server returned non-JSON response (likely HTML error page)
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        handleAlert(`Server error (${response.status}): Failed to submit quiz. Please check the console for details.`, 'danger');
      }
    }
  } catch (err) {
    console.error('Error submitting quiz:', err);
    handleAlert('An error occurred while submitting the quiz. Please try again.', 'danger');
  } finally {
    setSubmitting(false);
  }
};

  const getOptionStyle = (option) => {
    if (!reviewMode) {
      return selectedAnswer === option ? 'selected' : '';
    }
    const currentQuestionData = quizData.questions[currentQuestion - 1];
    const userAnswer = answers[currentQuestion];
    const correctAnswer = currentQuestionData.correct;

    if (option === correctAnswer) {
      return 'correct-answer';
    } else if (option === userAnswer && userAnswer !== correctAnswer) {
      return 'wrong-answer';
    }
    return '';
  };

  if (quizCompleted) {
    const isPerfectScore = score === quizData.questions.length;
    
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
                    {isPerfectScore ? (
                      <div className="alert alert-success">
                        <strong>Excellent!</strong> You've mastered {option}. Click "Submit Answer" to complete this training.
                      </div>
                    ) : score >= 6 ? (
                      <div className="alert alert-warning">
                        <strong>Good job!</strong> You need all correct answers to complete the training. Please retake the quiz.
                      </div>
                    ) : (
                      <div className="alert alert-danger">
                        <strong>Keep learning!</strong> Review the training material for {option} and retake the quiz.
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-custom2" onClick={handleRetakeQuiz}>
                      Retake Quiz
                    </button>
                    <button className="btn btn-custom2" onClick={handleCheckAnswer}>
                      Check Answers
                    </button>
                    <button
                      className={`btn ${isPerfectScore ? 'btn-success' : 'btn-secondary'}`}
                      onClick={handleSubmitAnswer}
                      disabled={!isPerfectScore || isAnswerSubmitted || submitting}
                    >
                      {submitting ? 'Submitting...' : isAnswerSubmitted ? 'Submitted ✓' : 'Submit Answer'}
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

  const getInlineStyle = (option) => {
    if (!reviewMode) {
      return { borderRadius: '10px' };
    }
    const currentQuestionData = quizData.questions[currentQuestion - 1];
    const userAnswer = answers[currentQuestion];
    const correctAnswer = currentQuestionData.correct;

    let styles = { borderRadius: '10px', cursor: 'default' };

    if (option === correctAnswer) {
      styles = { ...styles, backgroundColor: '#d4edda', borderColor: '#28a745', color: '#155724' };
    } else if (option === userAnswer && userAnswer !== correctAnswer) {
      styles = { ...styles, backgroundColor: '#f8d7da', borderColor: '#dc3545', color: '#721c24' };
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
              <button className="btn mx-3 btn-secondary back-btn" onClick={handleBackToOptions}>
                ← Back
              </button>
            </div>
            <div className="card shadow-lg border-0">
              <div className="card-header text-white quiz-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 style={{ color: '#87CEEB' }} className="mb-0">
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
                <h5 className="mb-4 question-text">
                  {currentQuestion}. {currentQuestionData?.question}
                </h5>
                <div className="row g-3">
                  {currentQuestionData?.options.map((optionText, index) => (
                    <div key={index} className="col-12">
                      <div
                        className={`card answer-option p-3 border-2 ${getOptionStyle(optionText)} ${!reviewMode && selectedAnswer === optionText ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(optionText)}
                        style={{ ...getInlineStyle(optionText), cursor: reviewMode ? 'default' : 'pointer' }}
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
                    className={`btn ${currentQuestion === 1 ? 'btn-outline-secondary' : 'btn-secondary'}`}
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
                      ? currentQuestion === quizData.questions.length
                        ? 'Back to Results'
                        : 'Next Question'
                      : currentQuestion === quizData.questions.length
                      ? 'Submit Quiz'
                      : 'Next Question'}
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