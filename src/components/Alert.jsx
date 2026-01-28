import React from 'react';

export default function Alert({ alert}) {
  if (!alert) return null;

  return (
    <div className="alert-container">
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {alert.message}
      </div>
    </div>
  );
}