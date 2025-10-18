import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PdfViewpage.css';

const PdfViewer = () => {
  const { formType } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check if running on production (not localhost)
    setIsProduction(!window.location.hostname.includes('localhost'));
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Use Google Docs Viewer ONLY on production + mobile
  let viewerUrl = `${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`;
  
  if (isProduction && isMobile) {
    viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`;
  }

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

      <div className="pdf-content">
        <div className="pdf-frame-wrapper">
          <iframe
            src={viewerUrl}
            className="pdf-iframe"
            title={title}
            type="application/pdf"
          />
        </div>
        
        <div className="pdf-fallback-message">
          <p>
            <strong>Note:</strong> View the PDF above. Download it using the button to fill out offline, 
            or view and read all the information directly on this page.
            {!isProduction && isMobile && (
              <span className="dev-note"> (Mobile view will work better after deployment)</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;