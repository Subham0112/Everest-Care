import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HodoptionsData } from '../data/optionData';

function HodContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine type from current path
  const type = location.pathname.includes('/odp') ? 'odp' : 'hod';
  
  // Get completion status from localStorage
  const getCompletionStatus = (moduleName) => {
    return localStorage.getItem(`${moduleName}_completed`) === 'true';
  };
  
  // Check if HAB modules should be enabled
  const isHabModuleEnabled = (option, index) => {
    // HAB modules are only enabled after "Person Centered" is completed
    // For now, all HAB modules are disabled as requested
    return getCompletionStatus('Person Centered');
  };

  return (
    <div className="content-page mx-4">
      <div className="container-fluid content-container d-flex flex-column justify-content-center align-items-center py-4">
        <div className="row justify-content-center">
          <div className="w-100 text-center">
            <p className="text-center fw-bolder text-muted mb-5">
              Select an option below to start your training or take a quiz
            </p>
            {!getCompletionStatus('Person Centered') && (
              <div className="alert alert-info">
                <strong>Note:</strong> Complete ODP Training modules to unlock HAB Training content.
              </div>
            )}
          </div>
        </div>

        <div className="row g-4">
          {HodoptionsData.map((option, index) => {
            const isEnabled = isHabModuleEnabled(option, index);
            
            return (
              <div key={option.title} className="col col-md-6">
                <div className={`content-card p-4 h-100 text-center ${!isEnabled ? 'disabled-card' : ''}`}>
                  <h5 className={`card-title card-text mb-3 ${!isEnabled ? 'text-muted' : ''}`}>
                    {option.title}
                    {!isEnabled && (
                      <span className="ms-2 badge bg-secondary">
                        <i className="fas fa-lock"></i> Locked
                      </span>
                    )}
                  </h5>
                  <p className="card-text text-muted">{option.description}</p>
                  {!isEnabled && (
                    <small className="text-danger d-block mb-2">
                      Complete ODP Training to unlock HAB modules
                    </small>
                  )}
                  <div className="mt-3 d-flex justify-content-center gap-3">
                    <button
                      className={`btn ${isEnabled ? 'btn-custom2' : 'btn-secondary'}`}
                      onClick={() => isEnabled && navigate(`/training/${type}/${option.title}`)}
                      disabled={!isEnabled}
                    >
                      Training
                    </button>
                    <button
                      className={`btn ${isEnabled ? 'btn-custom2' : 'btn-secondary'}`}
                      onClick={() => isEnabled && navigate(`/quiz/${type}/${option.title}`)}
                      disabled={!isEnabled}
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
      
      {/* Add custom styles for disabled cards */}
      <style jsx>{`
        .disabled-card {
          opacity: 0.6;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
        }
        .disabled-card:hover {
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}

export default HodContent;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { HodoptionsData } from '../data/optionData';

// function HodContent() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Determine type from current path
//   const type = location.pathname.includes('/odp') ? 'odp' : 'hab';

//   return (
//     <div className="content-page mx-4">
//       <div className="container-fluid d-flex flex-column justify-content-center align-items-center py-4">
//         <div className="row justify-content-center">
//           <div className="w-100 text-center">
//             <p className="text-center fw-bolder text-muted mb-5">
//               Select an option below to start your training or take a quiz
//             </p>
//           </div>
//         </div>

//         <div className="row g-4">
//           {HodoptionsData.map((option) => (
//             <div key={option.title} className="col col-md-6">
//               <div className="content-card p-4 h-100 text-center">
//                 <h5 className="card-title card-text mb-3">{option.title}</h5>
//                 <p className="card-text text-muted">{option.description}</p>
//                 <div className="mt-3 d-flex justify-content-center gap-3">
//                   <button
//                     className="btn btn-custom2"
//                     onClick={() => navigate(`/training/${type}/${option.title}`)}
//                   >
//                     Training
//                   </button>
//                   <button
//                     className="btn btn-custom2"
//                     onClick={() => navigate(`/quiz/${type}/${option.title}`)}
//                   >
//                     Quiz
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HodContent;