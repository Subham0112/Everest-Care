import React, { useEffect } from 'react'
import ConsumerPacket from '../forms/ConsumerPacket'
import OrientationPacket from '../forms/OrientationPacket'
import HabPacket from '../forms/HabPacket'
import { useParams, useNavigate } from 'react-router-dom'

const Formpage = () => {
  const { formType } = useParams();
  const navigate = useNavigate();

  // Valid form types
  const validFormTypes = ['consumer', 'orientation', 'hab'];

  useEffect(() => {
    // Redirect if formType is invalid
    if (!validFormTypes.includes(formType)) {
      navigate('/');
    }
  }, [formType, navigate]);

  // Render the appropriate form component
  const renderForm = () => {
    switch(formType) {
      case 'consumer':
        return <ConsumerPacket />;
      case 'orientation':
        return <OrientationPacket />;
      case 'hab':
        return <HabPacket />;
      default:
        return null; // This will show briefly before navigation
    }
  };

  return (
    <div className="form-page-container">
      {renderForm()}
    </div>
  );
}

export default Formpage