import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PdfViewpage.css';

const PdfViewer = () => {
  const { formType } = useParams();
  const navigate = useNavigate();

  // Map form types to their PDF URLs
  const formPaths = {
    form1: '/pdfs/complete-orientation-packet.pdf',
    form2: '/pdfs/consumer-packet-complete.pdf',
    form3: '/pdfs/hab-consumer-packet.pdf'
  };

  const formTitles = {
    form1: 'Complete Orientation Packet',
    form2: 'Consumer Packet',
    form3: 'HAB Consumer Packet'
  };

  const pdfUrl = formPaths[formType];
  const title = formTitles[formType] || 'Form';

  // Debug: Log the formType to see what's being passed
  console.log('FormType from URL:', formType);
  console.log('Available forms:', Object.keys(formPaths));
  console.log('PDF URL:', pdfUrl);

  if (!formType || !pdfUrl) {
    return (
      <div className="pdf-not-found">
        <div className="not-found-content">
          <h2>Form Not Found</h2>
          <p>FormType: {formType || 'undefined'}</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container">
      {/* Header */}
      <div className="pdf-header">
        <div className="header-content">
          <div>
            <button onClick={() => navigate('/')} className="back-button">
              <span className="back-arrow">←</span>
              Back to Home
            </button>
            <h1 className="pdf-title">{title}</h1>
          </div>
          
          <a
            href={pdfUrl}
            download
            className="btn btn-success download-btn"
          >
            <span className="download-icon">⬇</span>
            Download PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="pdf-content">
        <div className="pdf-frame-wrapper">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="pdf-iframe"
            title={title}
          />
        </div>
        
        {/* Instructions */}
        <div className="pdf-fallback-message">
          <p>
            <strong>Note:</strong> The PDF will open in your browser's built-in viewer. 
            If you need to fill out the form, download it using the button above, 
            fill it out with a PDF reader (like Adobe Acrobat), and submit it back to us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;