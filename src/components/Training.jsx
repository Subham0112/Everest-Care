import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainingData } from '../data/trainingData';

function Training() {
  const { option, type } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // 0 = overview, 1+ = topics
  
  const data = trainingData[type]?.[option];

  if (!data) {
    return (
      <div className="training-page mx-2">
        <div className="container-fluid content-container py-4">
          <div className="alert alert-danger">
            <h4>Training data not found</h4>
            <p>No training data available for "{option}" in {type.toUpperCase()} section.</p>
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

  const handleNext = () => {
    const maxIndex = data.topics ? data.topics.length : 0;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const totalItems = (data.topics ? data.topics.length : 0) + 1; // +1 for overview
  const isOverview = currentIndex === 0;
  const currentTopic = currentIndex > 0 ? data.topics[currentIndex - 1] : null;

  return (
    <div className="training-page mx-2">
      <div className="container-fluid content-container py-4">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="training-header-section mb-4">
              <div className="d-flex justify-content-end mb-2">
                <button 
                  className="btn btn-secondary back-btn-top" 
                  onClick={handleBackToOptions}
                >
                  <i className="fa-solid fa-arrow-left me-2"></i>Back 
                </button>
              </div>
              <div className="training-title-section">
                <h2 className="training-main-title mb-2">Training - {option}</h2>
                {/* <div className="topic-counter-badge">
                  <i className="fa-solid fa-book-open me-2"></i>
                  {isOverview ? 'Course Overview' : `Topic ${currentIndex} of ${data.topics ? data.topics.length : 0}`}
                </div> */}
              </div>
            </div>

            {/* Progress Bar */}
            {/* <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Progress</small>
                  <small className="text-muted">
                    {Math.round((currentIndex / (totalItems - 1)) * 100)}%
                  </small>
                </div>
                <div className="progress" style={{height: '6px'}}>
                  <div 
                    className="progress-bar bg-info" 
                    role="progressbar" 
                    style={{width: `${(currentIndex / (totalItems - 1)) * 100}%`}}
                    aria-valuenow={currentIndex} 
                    aria-valuemin="0" 
                    aria-valuemax={totalItems - 1}
                  ></div>
                </div>
              </div>
            </div> */}

            {/* Main Content Card */}
            <div className='card shadow-lg border-0'>
              <div className="card-header text-white training-header d-flex justify-content-between align-items-center">
                <h4 style={{color:'#87CEEB'}} className="mb-0">
                  {isOverview ? '📚 Course Overview' : `📝 ${currentTopic?.title}`}
                </h4>
                <small style={{color:'#87CEEB'}}>
                  {currentIndex + 1} / {totalItems}
                </small>
              </div>
              <div className="card-body p-0">
                <div className="training-card-modern p-4">
                  
                  {/* Course Overview Content */}
                  {isOverview && (
                    <>
                      <div className="row">
                        <div className="col-md-8">
                          <h5 className="text-primary mb-3">About This Course</h5>
                          <p className="mb-4">{data.description}</p>
                          
                          <h6 className="text-secondary mb-3">Learning Objectives:</h6>
                          {data.objective && data.objective.map((objective, objIndex) => (
                            <p className="mb-2" key={objIndex}>
                              <i className="fa-regular fa-circle-dot text-primary me-2"></i>
                              {objective}
                            </p>
                          ))}
                        </div>
                        
                        <div className="col-md-4">
                          <div className="course-details bg-light p-3 rounded">
                            <h6 className="text-secondary mb-3">Course Details</h6>
                            <div className="detail-item mb-2">
                              <strong>Duration:</strong> <span className="text-muted">{data.duration}</span>
                            </div>
                            <div className="detail-item mb-2">
                              <strong>Icebreaker:</strong> <span className="text-muted">{data.icebreaker}</span>
                            </div>
                            {data.topics && data.topics.length > 0 && (
                              <div className="detail-item">
                                <strong>Total Topics:</strong> <span className="text-muted">{data.topics.length}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Topic Content */}
                  {!isOverview && currentTopic && (
                    <>
                      <div className="topic-content mb-4">
                        {currentTopic.description && currentTopic.description.map((description, descIndex) => (
                          <div className="content-item p-3 mb-3 bg-light rounded" key={descIndex}>
                            <i className="fa-regular fa-lightbulb text-primary me-3"></i>
                            <span>{description}</span>
                          </div>
                        ))}
                      </div>

                      {/* Activity/Scenario Section */}
                      {(currentTopic.activity || currentTopic.scenario) && (
                        <div className="activity-section mb-4">
                          <div className="activity-modern">
                            <div className="d-flex align-items-center mb-3">
                              <i className="fa-solid fa-clipboard-list text-info me-2"></i>
                              <h6 className="mb-0 text-info fw-bold">
                                {currentTopic.activity ? 'Activity' : 'Scenario'}
                              </h6>
                            </div>
                            <div className="activity-content p-3 bg-info-subtle fw-bold rounded border-start border-info border-3">
                              {currentTopic.activity || currentTopic.scenario}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Conclusion */}
                      {currentTopic.conclusion && (
                        <div className="conclusion-section">
                          <div className="alert alert-info bg-light border-info">
                            <div className="d-flex align-items-start">
                              <i className="fa-solid fa-key text-info me-3 mt-1"></i>
                              <div>
                                <h6 className="text-info mb-2">Key Takeaway</h6>
                                <p className="mb-0 text-secondary">{currentTopic.conclusion}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                    >
                      <i className="fa-solid fa-chevron-left me-2"></i>
                      Previous
                    </button>
                    
                    <span className="text-muted">
                      {currentIndex + 1} / {totalItems}
                    </span>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={handleNext}
                      disabled={currentIndex === totalItems - 1}
                    >
                      Next
                      <i className="fa-solid fa-chevron-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* No Topics Available */}
            {(!data.topics || data.topics.length === 0) && !isOverview && (
              <div className="card shadow-lg border-0">
                <div className="card-body text-center p-5">
                  <i className="fa-solid fa-book-open text-muted mb-3" style={{fontSize: '3rem'}}></i>
                  <h5 className="text-muted">No detailed topics available</h5>
                  <p className="text-muted">This course overview provides all available information.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;