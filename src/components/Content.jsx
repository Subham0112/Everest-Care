import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Content() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for trainings
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Determine type from current path
  const type = location.pathname.includes('/odp') ? 'odp' : 'hab';

  // Fetch trainings from API based on type
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.everesthealth.somee.com/api/Training/category/${type}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trainings');
        }
        
        const data = await response.json();
        setTrainings(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching trainings:', err);
        setError('Failed to load trainings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [type]); // Re-fetch when type changes

  // Loading state
  if (loading) {
    return (
      <div className="content-page mx-4">
        <div className="container-fluid content-container d-flex justify-content-center align-items-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="content-page mx-4">
        <div className="container-fluid content-container d-flex justify-content-center align-items-center py-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // No trainings found
  if (trainings.length === 0) {
    return (
      <div className="content-page mx-4">
        <div className="container-fluid content-container d-flex justify-content-center align-items-center py-4">
          <div className="alert alert-info" role="alert">
            No trainings available for {type} category.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page mx-4">
      <div className="container-fluid content-container d-flex flex-column justify-content-center align-items-center py-4">
        <div className="row justify-content-center">
          <div className="w-100 text-center">
            <p className="text-center fw-bolder text-muted mb-5">
              Select an option below to start your training or take a quiz
            </p>
          </div>
        </div>

        <div className="row g-4">
          {trainings.map((training) => {
            return (
              <div key={training.id} className="col col-md-6">
                <div className="content-card p-4 h-100 text-center">
                  <h5 className="card-title card-text mb-3">
                    {training.trainingName}
                  </h5>
                  <p className="card-text text-muted">
                    Click to access training materials and quizzes for {training.trainingName}
                  </p>
                 
                  <div className="mt-3 d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-custom2"
                      onClick={() => navigate(`/home/training/${type}/${training.trainingName}`)}
                    >
                      Training
                    </button>
                    <button
                      className="btn btn-custom2"
                      onClick={() => navigate(`/home/quiz/${type}/${training.trainingName}`)}
                    >
                      Quiz
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Content;