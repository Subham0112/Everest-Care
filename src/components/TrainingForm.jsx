import React, { useState, useEffect } from 'react';
import SignatureCanvas from './forms/formElements/SignatureCanvas';

const TrainingForm = ({ selectedMember }) => {
  const [trainings, setTrainings] = useState([]);
  const [completedTrainings, setCompletedTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all trainings and user's completed trainings
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedMember?.id) {
        setError('No member selected');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch all trainings
        const trainingsResponse = await fetch('https://www.everesthealth.somee.com/api/Training');
        if (!trainingsResponse.ok) {
          throw new Error(`Failed to fetch trainings: ${trainingsResponse.status}`);
        }
        const trainingsData = await trainingsResponse.json();

        // Fetch completed trainings for this user
        const completedResponse = await fetch(
          `https://www.everesthealth.somee.com/api/TrainingComplete/user/${selectedMember.id}`
        );
        
        let completedData = [];
        if (completedResponse.ok) {
          completedData = await completedResponse.json();
        } else if (completedResponse.status === 404) {
          // User hasn't completed any trainings yet - this is fine
          completedData = [];
        } else {
          console.warn('Error fetching completed trainings:', completedResponse.status);
        }

        setTrainings(trainingsData);
        setCompletedTrainings(completedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load training data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMember]);

  // Helper function to get completion date for a training
  const getCompletionDate = (trainingId) => {
    const completion = completedTrainings.find(
      (ct) => ct.trainingId === trainingId
    );
    return completion ? completion.completedDate : null;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Handle different date formats
    try {
      const date = new Date(dateString);
      // Format as MM/DD/YYYY
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (err) {
      return dateString; // Return original if parsing fails
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className='my-4 px-4'>
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='my-4 px-4'>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className='my-4 px-4'>
      <h4 className='text-info'>HAB Aide – Mandatory Trainings & Completion Record</h4>
      <p>
        This form must be completed for all Habilitation Aides employed under the Office of 
        Developmental Programs (ODP). All listed trainings are required to be completed before 
        unsupervised service delivery and must be refreshed according to regulation and agency policy
      </p>
      
      <div>
        <strong>Staff Name: </strong> 
        {selectedMember?.firstName} {selectedMember?.lastName}
        <br/>
        <strong>SSN: </strong> {selectedMember?.ssn}<br/>
        <strong>Start Date:</strong>__________________________<br />
        <strong>Trainer/Supervisor:</strong>__________________________<br />
        <strong>Position:</strong>__________________________<br />
      </div>

      <div className='table-responsive mt-4'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr className='table-info text-center fw-bold'>
              <td>Training Topics</td>
              <td>Date Completed</td>
              <td>Trainer Initials</td>
              <td>Staff Initials</td>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training, index) => {
              const completionDate = getCompletionDate(training.id);

              return (
                <tr 
                  style={{ fontSize: "14px" }} 
                  key={training.id}
                >
                  <td>{training.trainingName}</td>
                  <td>
                    <input 
                      type='text' 
                      style={{ minWidth: "150px" }} 
                      className='form-control' 
                      id={`dateComplete_${index}`} 
                      name={`dateComplete_${index}`}
                      value={formatDate(completionDate)}
                      disabled 
                    />
                  </td>
                  <td>
                    <input 
                      style={{ minWidth: "150px" }} 
                      type='text' 
                      className='form-control' 
                      id={`trainerInitials_${index}`} 
                      name={`trainerInitials_${index}`} 
                      disabled 
                    />
                  </td>
                  <td>
                    <input 
                      style={{ minWidth: "150px" }} 
                      type='text' 
                      id={`staffInitials_${index}`} 
                      className='form-control' 
                      name={`staffInitials_${index}`} 
                      disabled 
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='mt-4'>
        <p>
          I acknowledge that I have completed or will complete all mandatory trainings required 
          for my role and understand the importance of maintaining current certifications and 
          compliance with ODP regulations.
        </p>
        <div className='mb-4'>
          <div className="col-md-4">
            <SignatureCanvas label="Staff Signature" name="staffSignature"/>
          </div>
          <div className="col-md-4">
            <SignatureCanvas label="Supervisor Signature" name="supervisorSignature"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingForm;