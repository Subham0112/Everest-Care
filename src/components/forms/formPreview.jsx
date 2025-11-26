import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './css/formPreview.css';

const FormPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formType } = useParams();
  const { previewHtml, patientName } = location.state || {};
  const contentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generatePDFBase64 = async () => {
    if (!contentRef.current) return null;

    try {
      const element = contentRef.current;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Minimal margins for tight spacing
      const marginTop = 23; // Reduced for minimal gap after header
      const marginBottom = 10;
      const marginLeft = 15;
      const marginRight = 15;
      
      const contentWidth = pdfWidth - marginLeft - marginRight;
      const contentHeight = pdfHeight - marginTop - marginBottom;

      // Function to add header to each page
      const addHeader = (pdf, pageNumber) => {
        // Save the current state
        pdf.saveGraphicsState();

        // White background for header area
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, 20, 'F'); // Reduced height slightly

        // Company name - centered, blue, bold
        pdf.setTextColor(41, 199, 247);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('Everest Home Health', pdfWidth / 2, 6, { align: 'center' });

        // Contact details - centered, gray, smaller
        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(7);
        pdf.setFont(undefined, 'normal');
        
        const line1 = '109 DEWALT AVE SUITE 201B PITTSBURGH PA 15227';
        const line2 = 'EMAIL: - everestopd2025@gmail.com';
        const line3 = 'PHONE: - 412-484-6298, FAX: - 412-207-8661';
        
        pdf.text(line1, pdfWidth / 2, 11, { align: 'center' });
        pdf.text(line2, pdfWidth / 2, 15, { align: 'center' });
        pdf.text(line3, pdfWidth / 2, 19, { align: 'center' });

        // Add a thin line separator
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(marginLeft, 21, pdfWidth - marginRight, 21); // Moved up slightly

        // Restore the state
        pdf.restoreGraphicsState();
      };

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Split content by pdf-page-break class
      const allChildren = Array.from(element.children);
      let sections = [];
      let currentSection = [];

      allChildren.forEach((child) => {
        if (child.classList.contains('pdf-page-break')) {
          if (currentSection.length > 0) {
            sections.push([...currentSection]);
            currentSection = [];
          }
          currentSection.push(child);
        } else {
          currentSection.push(child);
        }
      });

      if (currentSection.length > 0) {
        sections.push([...currentSection]);
      }

      if (sections.length === 0) {
        sections.push(allChildren);
      }

      let isFirstPage = true;
      let totalPageCount = 0;

      for (let i = 0; i < sections.length; i++) {
        const sectionElements = sections[i];
        
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
          position: absolute;
          left: -9999px;
          top: 0;
          width: ${contentWidth * 3.7795275591}px;
          max-width: ${contentWidth * 3.7795275591}px;
          background: #ffffff;
          padding: 5px 20px 10px 20px;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11pt;
          color: #000;
          line-height: 1.4;
          overflow: visible;
        `;
        
        sectionElements.forEach(el => {
          const clone = el.cloneNode(true);
          tempContainer.appendChild(clone);
        });
        
        document.body.appendChild(tempContainer);
        
        await new Promise(resolve => setTimeout(resolve, 100));

        const allDescendants = tempContainer.querySelectorAll('*');
        
        // First pass: Remove problematic classes
        allDescendants.forEach(el => {
          const classList = Array.from(el.classList);
          classList.forEach(className => {
            if (className.includes('bg-') || 
                className.includes('text-') || 
                className.includes('border') || 
                className.includes('rounded') || 
                className.includes('shadow')) {
              el.classList.remove(className);
            }
          });
        });
        
        // Second pass: Force styles
        allDescendants.forEach(el => {
          const tag = el.tagName;
          
          el.style.setProperty('background', 'none', 'important');
          el.style.setProperty('background-color', 'transparent', 'important');
          el.style.setProperty('background-image', 'none', 'important');
          el.style.setProperty('box-shadow', 'none', 'important');
          el.style.setProperty('color', '#000', 'important');
          
          if (tag === 'DIV' || tag === 'P' || tag === 'SECTION' || tag === 'ARTICLE') {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
          }
          
          el.style.setProperty('display', el.style.display === 'flex' ? 'block' : el.style.display, 'important');
          el.style.setProperty('display', el.style.display === 'grid' ? 'block' : el.style.display, 'important');
          
          if (!tag.match(/^(TABLE|TD|TH|TR|THEAD|TBODY)$/)) {
            el.style.setProperty('border', 'none', 'important');
          }
          
          if (el.classList.contains('row') || 
              el.className.includes('col-') ||
              el.classList.contains('d-flex') ||
              el.classList.contains('d-inline-flex')) {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('float', 'none', 'important');
            el.style.setProperty('flex-direction', 'column', 'important');
          }
          
          if (tag.match(/^H[1-6]$/)) {
            el.style.setProperty('font-weight', '700', 'important');
            el.style.setProperty('margin', '5px 0 6px 0', 'important');
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
            const size = tag === 'H1' ? '18pt' : tag === 'H2' ? '16pt' : tag === 'H3' ? '16pt' : '12pt';
            el.style.setProperty('font-size', size, 'important');
            const color = tag === 'H1' ? '#29c7f7ff' : tag === 'H2' ? '#29c7f7ff' : tag === 'H3' ? '#191df7ff' : tag === 'H4' ? '#020481ff' : '#29c7f7ff';
            el.style.setProperty('color', color, 'important');
            
            // Remove top margin for first heading
            if (el === tempContainer.firstElementChild || el.parentElement === tempContainer) {
              el.style.setProperty('margin-top', '0', 'important');
            }
          }
          
          if (tag === 'P') {
            el.style.setProperty('margin', '5px 0', 'important');
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
          }
          
          if (tag === 'DIV') {
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('border-radius', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('margin-bottom', '4px', 'important');
            el.style.setProperty('margin-top', '4px', 'important');
            el.style.setProperty('margin-left', '0', 'important');
            el.style.setProperty('margin-right', '0', 'important');
            
            // Remove top margin for first div
            if (el === tempContainer.firstElementChild || el.parentElement === tempContainer) {
              el.style.setProperty('margin-top', '0', 'important');
            }
            
            if (el.classList.contains('pdf-page-break')) {
              el.style.setProperty('border', 'none', 'important');
              el.style.setProperty('margin', '0', 'important');
            }
          }
          
          if (tag === 'LABEL') {
            el.style.setProperty('display', 'inline-block', 'important');
            el.style.setProperty('font-weight', '600', 'important');
            el.style.setProperty('margin-right', '5px', 'important');
          }
          
          if (tag === 'SPAN') {
            el.style.setProperty('display', 'inline', 'important');
          }
          
          if (tag === 'TABLE') {
            el.style.setProperty('border', '1px solid #000', 'important');
            el.style.setProperty('border-collapse', 'collapse', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('margin', '10px 0', 'important');
            el.style.setProperty('page-break-inside', 'avoid', 'important');
          }
          
          if (tag === 'TH' || tag === 'TD') {
            el.style.setProperty('border', '1px solid #000', 'important');
            el.style.setProperty('padding', '2px 5px', 'important');
            el.style.setProperty('page-break-inside', 'avoid', 'important');
          }
          
          if (tag === 'UL' || tag === 'OL') {
            el.style.setProperty('margin', '8px 0', 'important');
            el.style.setProperty('padding-left', '25px', 'important');
            el.style.setProperty('display', 'block', 'important');
          }
          
          if (tag === 'LI') {
            el.style.setProperty('margin', '4px 0', 'important');
            el.style.setProperty('display', 'list-item', 'important');
            el.style.setProperty('page-break-inside', 'avoid', 'important');
          }
          
          if (tag === 'CANVAS') {
            // Check if this canvas is inside a signature container
            const isSignatureCanvas = el.closest('div[class*="signature"], div[class*="sign-pad"], div[id*="signature"]');
            
            if (isSignatureCanvas) {
              // Signature canvas - no border, smaller size
              el.style.setProperty('border', 'none', 'important');
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('margin', '0', 'important');
              el.style.setProperty('max-width', '150px', 'important');
              el.style.setProperty('max-height', '40px', 'important');
              el.style.setProperty('min-height', 'auto', 'important');
              el.style.setProperty('background', 'transparent', 'important');
            } else {
              // Regular canvas (charts, etc.)
              el.style.setProperty('border', '1px solid #000', 'important');
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('margin', '8px 0', 'important');
              el.style.setProperty('max-width', '250px', 'important');
              el.style.setProperty('min-height', '60px', 'important');
              el.style.setProperty('background', '#fff', 'important');
            }
          }
        });
        
        // Signature container styling - UPDATED
        tempContainer.querySelectorAll('div').forEach(div => {
          const hasSignatureClass = Array.from(div.classList).some(className => 
            className.toLowerCase().includes('signature') || 
            className.toLowerCase().includes('sign-pad') ||
            className.toLowerCase().includes('signaturepad')
          );
          
          const hasSignatureId = div.id && (
            div.id.toLowerCase().includes('signature') ||
            div.id.toLowerCase().includes('sign-pad') ||
            div.id.toLowerCase().includes('signaturepad')
          );
          
          const hasSignatureData = div.hasAttribute('data-signature') || 
                                    div.hasAttribute('data-sign-area');
          
          if (hasSignatureClass || hasSignatureId || hasSignatureData) {
            // Remove box border, only show bottom line
            div.style.setProperty('border', 'none', 'important');
            div.style.setProperty('border-bottom', '1px solid #000', 'important');
            div.style.setProperty('min-height', '40px', 'important'); // Reduced height
            div.style.setProperty('max-height', '50px', 'important'); // Max height limit
            div.style.setProperty('width', '150px', 'important');
            div.style.setProperty('margin', '8px 0 8px 0', 'important');
            div.style.setProperty('display', 'block', 'important');
            div.style.setProperty('background', 'transparent', 'important');
            div.style.setProperty('padding', '0 0 2px 0', 'important'); // Padding only at bottom
            
            const img = div.querySelector('img');
            if (img) {
              img.style.setProperty('max-width', '150px', 'important'); // Smaller signature
              img.style.setProperty('max-height', '35px', 'important'); // Smaller height
              img.style.setProperty('height', 'auto', 'important');
              img.style.setProperty('display', 'block', 'important');
              img.style.setProperty('object-fit', 'contain', 'important');
              img.style.setProperty('margin-bottom', '0', 'important');
            }
            
            // Handle canvas elements (if signature is drawn)
            const canvas = div.querySelector('canvas');
            if (canvas) {
              canvas.style.setProperty('max-width', '150px', 'important');
              canvas.style.setProperty('max-height', '35px', 'important');
              canvas.style.setProperty('height', 'auto', 'important');
              canvas.style.setProperty('display', 'block', 'important');
              canvas.style.setProperty('background', 'transparent', 'important');
              canvas.style.setProperty('border', 'none', 'important');
            }
          }
        });

        await new Promise(resolve => setTimeout(resolve, 150));

        const canvas = await html2canvas(tempContainer, {
          scale: 2.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          removeContainer: false
        });

        document.body.removeChild(tempContainer);

        if (canvas.width === 0 || canvas.height === 0) {
          console.warn(`Section ${i} is empty, skipping`);
          continue;
        }

        const imgData = canvas.toDataURL('image/jpeg', 0.85);
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pxToMm = 25.4 / 96 / 2.5;
        
        const imgWidthMm = imgWidth * pxToMm;
        const imgHeightMm = imgHeight * pxToMm;
        
        const scaleFactor = contentWidth / imgWidthMm;
        const scaledHeight = imgHeightMm * scaleFactor;

        if (!isFirstPage) {
          pdf.addPage();
          totalPageCount++;
        } else {
          totalPageCount = 1;
        }

        // Add header to the page BEFORE adding content
        addHeader(pdf, totalPageCount);

        if (scaledHeight <= contentHeight) {
          pdf.addImage(
            imgData,
            'JPEG',
            marginLeft,
            marginTop,
            contentWidth,
            scaledHeight,
            undefined,
            'FAST'
          );
          
          pdf.setFontSize(9);
          pdf.setTextColor(100);
          pdf.text(
            `${totalPageCount}`,
            pdfWidth / 2,
            pdfHeight - 10,
            { align: 'center' }
          );
        } else {
          const totalPages = Math.ceil(scaledHeight / contentHeight);
          let addedFirstPageOfSection = false;
          
          for (let pageNum = 0; pageNum < totalPages; pageNum++) {
            if (addedFirstPageOfSection) {
              pdf.addPage();
              totalPageCount++;
              // Add header to each new page
              addHeader(pdf, totalPageCount);
            }
            addedFirstPageOfSection = true;
            
            const yOffset = pageNum * contentHeight;
            const yOffsetPx = (yOffset / scaleFactor / pxToMm);
            
            const remainingHeight = scaledHeight - yOffset;
            const pageContentHeight = Math.min(contentHeight, remainingHeight);
            const pageContentHeightPx = (pageContentHeight / scaleFactor / pxToMm);
            
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = imgWidth;
            pageCanvas.height = Math.ceil(pageContentHeightPx);
            
            const ctx = pageCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            
            ctx.drawImage(
              canvas,
              0,
              Math.floor(yOffsetPx),
              imgWidth,
              Math.ceil(pageContentHeightPx),
              0,
              0,
              pageCanvas.width,
              pageCanvas.height
            );
            
            const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.85);
            
            pdf.addImage(
              pageImgData,
              'JPEG',
              marginLeft,
              marginTop,
              contentWidth,
              pageContentHeight,
              undefined,
              'FAST'
            );
            
            pdf.setFontSize(9);
            pdf.setTextColor(100);
            pdf.text(
              `Page ${totalPageCount}`,
              pdfWidth / 2,
              pdfHeight - 10,
              { align: 'center' }
            );
          }
        }
        
        isFirstPage = false;
      }

      // Return PDF as base64 string
      return pdf.output('datauristring');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

 
  const extractConsumerName = () => {
    // Try to extract consumer name from the preview HTML
    if (!contentRef.current) return 'Unknown';
    
    const element = contentRef.current;
    
    // Method 1: Look for label with "ConsumerName" attribute
    const consumerNameLabel = element.querySelector('label[for="ConsumerName"]');
    if (consumerNameLabel) {
      // Find the span that contains the actual name (next sibling or in parent's next element)
      let nameSpan = consumerNameLabel.nextElementSibling;
      
      // If next sibling is not a span, look in parent's structure
      if (!nameSpan || nameSpan.tagName !== 'SPAN') {
        const parentDiv = consumerNameLabel.closest('.col-md-6, .row, div');
        if (parentDiv) {
          nameSpan = parentDiv.querySelector('span');
        }
      }
      
      if (nameSpan && nameSpan.textContent.trim()) {
        return nameSpan.textContent.trim();
      }
    }
    
    // Method 2: Look for any label containing "Consumer's Name" OR "Individual's Name/Full Name" text
    const allLabels = element.querySelectorAll('label');
    
    // First try to find Consumer's Name
    for (const label of allLabels) {
      if (label.textContent.toLowerCase().includes('consumer') && 
          label.textContent.toLowerCase().includes('name')) {
        // Find the associated span
        let nameSpan = label.nextElementSibling;
        
        // Check if it's a span with content
        if (nameSpan && nameSpan.tagName === 'SPAN' && nameSpan.textContent.trim()) {
          return nameSpan.textContent.trim();
        }
        
        // Look in parent div structure
        const parentDiv = label.parentElement;
        if (parentDiv) {
          nameSpan = parentDiv.querySelector('span');
          if (nameSpan && nameSpan.textContent.trim()) {
            return nameSpan.textContent.trim();
          }
        }
      }
    }
    
    // If Consumer's Name not found, try Individual's Full Name or Individual's Name
    for (const label of allLabels) {
      const labelText = label.textContent.toLowerCase();
      if (labelText.includes('individual') && 
          (labelText.includes('full name') || labelText.includes('name'))) {
        // Find the associated span
        let nameSpan = label.nextElementSibling;
        
        // Check if it's a span with content
        if (nameSpan && nameSpan.tagName === 'SPAN' && nameSpan.textContent.trim()) {
          return nameSpan.textContent.trim();
        }
        
        // Look in parent div structure
        const parentDiv = label.parentElement;
        if (parentDiv) {
          nameSpan = parentDiv.querySelector('span');
          if (nameSpan && nameSpan.textContent.trim()) {
            return nameSpan.textContent.trim();
          }
        }
      }
    }

    
    // Method 3: Use regex pattern on full text
    const consumerNamePattern = /Consumer'?s?\s+Name\s*:?\s*([A-Za-z\s]+?)(?=\s*Date|\s*$|<)/i;
    const match = element.textContent.match(consumerNamePattern);
    
    if (match && match[1]) {
      const extractedName = match[1].trim();
      if (extractedName && extractedName.length > 2 && extractedName.length < 100) {
        return extractedName;
      }
    }

    // Method 4: Look for "Consumer Name" in HAB packet format
    const consumerNameInputs = element.querySelectorAll('input[name="ConsumerName"], input[id="ConsumerName"]');
    for (const input of consumerNameInputs) {
      const nextSpan = input.nextElementSibling;
      if (nextSpan && nextSpan.tagName === 'SPAN' && nextSpan.textContent.trim()) {
        return nextSpan.textContent.trim();
      }
    }
    
    // Fallback to patientName prop or default
    return patientName || 'Unknown Consumer';
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    setIsGenerating(true);

    try {
      // Extract consumer name from the form (only first one)
      const consumerName = extractConsumerName();
      
      // Generate PDF as base64
      const pdfBase64 = await generatePDFBase64();
      
      if (!pdfBase64) {
        throw new Error('Failed to generate PDF');
      }

      // Send to backend
      const response = await fetch('https://www.EverestHealth.somee.com/api/document/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64: pdfBase64,
          formType: formType,
          patientName: consumerName,
          additionalNotes: `Form Type: ${formType}`
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`Form submitted successfully!\nConsumer: ${consumerName}\nThe document has been sent to the company email.`);
        navigate('/'); // Redirect to home or forms list
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  if (!previewHtml) {
    return (
      <div className="container text-center mt-5">
        <h2>No Preview Data</h2>
        <p>Please go back to the form and click "Done".</p>
      </div>
    );
  }

  const handleBack = () => navigate(`/form/${formType}`);

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div
          ref={contentRef}
          id="consumerPacket-preview"
          className="document-preview"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>
      <div className="preview-actions no-print">
        <button className="btn-back" onClick={handleBack} disabled={isGenerating || isSubmitting}>
          ← Back to Form
        </button>
        <button 
          className="btn-submit" 
          onClick={handleSubmitForm} 
          disabled={isGenerating || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : '📧 Submit Form'}
        </button>
        <button className="btn-print" onClick={() => window.print()} disabled={isGenerating || isSubmitting}>
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

export default FormPreview;