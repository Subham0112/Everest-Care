import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './css/formPreview.css';

const FormPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formType } = useParams();
  const { previewHtml } = location.state || {};
  const contentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsGenerating(true);

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
      
      const marginTop = 15;
      const marginBottom = 20;
      const marginLeft = 15;
      const marginRight = 15;
      
      const contentWidth = pdfWidth - marginLeft - marginRight;
      const contentHeight = pdfHeight - marginTop - marginBottom;

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

      console.log(`Split into ${sections.length} sections for PDF`);

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
          padding: 20px;
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
          
          // Universal resets
          el.style.setProperty('background', 'none', 'important');
          el.style.setProperty('background-color', 'transparent', 'important');
          el.style.setProperty('background-image', 'none', 'important');
          el.style.setProperty('box-shadow', 'none', 'important');
          el.style.setProperty('color', '#000', 'important');
          
          // Force block display for vertical stacking
          if (tag === 'DIV' || tag === 'P' || tag === 'SECTION' || tag === 'ARTICLE') {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
          }
          
          // Remove flexbox/grid that causes horizontal layout
          el.style.setProperty('display', el.style.display === 'flex' ? 'block' : el.style.display, 'important');
          el.style.setProperty('display', el.style.display === 'grid' ? 'block' : el.style.display, 'important');
          
          // Remove borders except tables
          if (!tag.match(/^(TABLE|TD|TH|TR|THEAD|TBODY)$/)) {
            el.style.setProperty('border', 'none', 'important');
          }
          
          // Force form rows/cols to stack vertically
          if (el.classList.contains('row') || 
              el.className.includes('col-') ||
              el.classList.contains('d-flex') ||
              el.classList.contains('d-inline-flex')) {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('float', 'none', 'important');
            el.style.setProperty('flex-direction', 'column', 'important');
          }
          
          // Headings
          if (tag.match(/^H[1-6]$/)) {
            el.style.setProperty('font-weight', '700', 'important');
            el.style.setProperty('margin', '12px 0 8px 0', 'important');
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
            const size = tag === 'H1' ? '14pt' : tag === 'H2' ? '13pt' : tag === 'H3' ? '12pt' : '11pt';
            el.style.setProperty('font-size', size, 'important');
          }
          
          // Paragraphs
          if (tag === 'P') {
            el.style.setProperty('margin', '8px 0', 'important');
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('width', '100%', 'important');
          }
          
          // Divs - stack vertically
          if (tag === 'DIV') {
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('border-radius', '0', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('margin-bottom', '6px', 'important');
            el.style.setProperty('margin-left', '0', 'important');
            el.style.setProperty('margin-right', '0', 'important');
            
            // Remove page break visual indicator
            if (el.classList.contains('pdf-page-break')) {
              el.style.setProperty('border', 'none', 'important');
              el.style.setProperty('margin', '0', 'important');
            }
          }
          
          // Labels - inline with content
          if (tag === 'LABEL') {
            el.style.setProperty('display', 'inline-block', 'important');
            el.style.setProperty('font-weight', '600', 'important');
            el.style.setProperty('margin-right', '5px', 'important');
          }
          
          // Spans
          if (tag === 'SPAN') {
            el.style.setProperty('display', 'inline', 'important');
          }
          
          // Tables
          if (tag === 'TABLE') {
            el.style.setProperty('border', '1px solid #000', 'important');
            el.style.setProperty('border-collapse', 'collapse', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('margin', '10px 0', 'important');
            el.style.setProperty('page-break-inside', 'avoid', 'important');
          }
          
          if (tag === 'TH' || tag === 'TD') {
            el.style.setProperty('border', '1px solid #000', 'important');
            el.style.setProperty('padding', '4px 6px', 'important');
            el.style.setProperty('page-break-inside', 'avoid', 'important');
          }
          
          // Lists
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
          
          // Handle CANVAS signatures
          if (tag === 'CANVAS') {
            el.style.setProperty('border', '1px solid #000', 'important');
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('margin', '8px 0', 'important');
            el.style.setProperty('max-width', '250px', 'important');
            el.style.setProperty('min-height', '60px', 'important');
            el.style.setProperty('background', '#fff', 'important');
          }
        });
        
        // Handle signature divs that have specific signature-related classes or IDs
        tempContainer.querySelectorAll('div').forEach(div => {
          // Only process divs with signature-specific identifiers
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
          
          // Check if this div has a data attribute indicating it's a signature area
          const hasSignatureData = div.hasAttribute('data-signature') || 
                                    div.hasAttribute('data-sign-area');
          
          // Only process if it has specific signature identifiers
          if (hasSignatureClass || hasSignatureId || hasSignatureData) {
            // This is a signature area - add border and sizing
            div.style.setProperty('border', '1px solid #000', 'important');
            div.style.setProperty('min-height', '60px', 'important');
            div.style.setProperty('width', '250px', 'important');
            div.style.setProperty('margin', '8px 0 12px 0', 'important');
            div.style.setProperty('display', 'block', 'important');
            div.style.setProperty('background', '#fff', 'important');
            
            // If it contains an image (captured signature), make sure it displays
            const img = div.querySelector('img');
            if (img) {
              img.style.setProperty('max-width', '100%', 'important');
              img.style.setProperty('height', 'auto', 'important');
              img.style.setProperty('display', 'block', 'important');
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

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        
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
            `Page ${totalPageCount}`,
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
            
            const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
            
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
        console.log(`Section ${i + 1}/${sections.length} processed`);
      }

      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `consumer_packet_${formType}_${timestamp}.pdf`;
      pdf.save(filename);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please check console for details.');
    } finally {
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
        <button className="btn-back" onClick={handleBack} disabled={isGenerating}>
          ← Back to Form
        </button>
        <button className="btn-download" onClick={handleDownloadPDF} disabled={isGenerating}>
          {isGenerating ? 'Generating PDF...' : '📥 Download PDF'}
        </button>
        <button className="btn-print" onClick={() => window.print()} disabled={isGenerating}>
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

export default FormPreview;