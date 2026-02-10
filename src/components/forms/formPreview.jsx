import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './css/formPreview.css';

const FormPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formType } = useParams();
  const { previewHtml, patientName, previousPath } = location.state || {};
  const contentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generatePDFBase64 = async () => {
    if (!contentRef.current) return null;

    // Special handling for missed-evv form
    if (formType === 'miss-evv') {
      return await generateMissedEvvPDF();
    }

    // Regular PDF generation for other forms
    return await generateRegularPDF();
  };

const generateMissedEvvPDF = async () => {
  if (!contentRef.current) return null;

  try {
    const element = contentRef.current;
    
    // Extract data from the form
    const formData = extractMissedEvvData(element);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    
    let yPos = 10;

    // Header with company info
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 188, 212);
    pdf.text('Everest Home Health', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 5;
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text('109 DEWALT AVE SUITE 201B PITTSBURGH PA 15227', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 4;
    pdf.text('EMAIL: everestopd2025@gmail.com | PHONE: 412-484-6298 | FAX: 412-207-8661', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 6;
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    
    yPos += 10;

    // Title
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 188, 212);
    pdf.text('MISSED EVV FORM', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 6;
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Electronic Visit Verification - Missed Event Documentation', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;

    // Issue Type Section - LARGER CHECKMARK SYMBOL FOR CHECKED ITEMS
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Issue Type:', margin, yPos);
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    
    const issueX = margin + 28;
    const checkSize = 3.5;
    
    
    // Missed In
    pdf.rect(issueX, yPos - 3, checkSize, checkSize);
    if (formData.issueType === 'missedIn') {
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      const check1=formData.issueType==='missedIn'?'☑':'☐';
      pdf.text(check1, issueX + 0.2, yPos); 
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(9);
    }
    pdf.text('Missed In', issueX + 6, yPos);
    
    // Missed Out
    pdf.rect(issueX + 30, yPos - 3, checkSize, checkSize);
    if (formData.issueType === 'missedOut') {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      const check2=formData.issueType==='missedOut'?'☑':'☐';
      pdf.text(check2, issueX + 30.2, yPos);
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(9);
    }
    pdf.text('Missed Out', issueX + 36, yPos);
    
    // Missed In and Out
    pdf.rect(issueX + 65, yPos - 3, checkSize, checkSize);
    if (formData.issueType === 'missedInAndOut') {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      const check3=formData.issueType==='missedInAndOut'?'☑':'☐';
      pdf.text(check3, issueX + 65.2, yPos);
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(9);
    }
    pdf.text('Missed In and Out', issueX + 71, yPos);
    
    // Other Issue
    pdf.rect(issueX + 110, yPos - 3, checkSize, checkSize);
    if (formData.issueType === 'otherIssue') {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      const check4=formData.issueType==='otherIssue'?'☑':'☐';
      pdf.text(check4, issueX + 110.2, yPos);
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(9);
    }
    pdf.text('Other Issue', issueX + 116, yPos);

    yPos += 8;

    // Consumer and Service Info - ADJUSTED FIELD SIZES
    pdf.setFontSize(9);
    const labelX = margin;
    const valueGap = 35;
    const lineOffset = 1;
    
    // Row 1 - Consumer Name and Medicaid ID
    pdf.setFont(undefined, 'bold');
    pdf.text('Consumer Name:', labelX, yPos);
    pdf.setFont(undefined, 'normal');
    const name = formData.consumerName || '';
    pdf.text(name, labelX + valueGap, yPos);
    pdf.line(labelX + valueGap - 2, yPos + lineOffset, labelX + 90, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Medicaid ID:', labelX + 95, yPos);
    pdf.setFont(undefined, 'normal');
    const medId = formData.medicaidId || '';
    pdf.text(medId, labelX + 120, yPos);
    pdf.line(labelX + 118, yPos + lineOffset, pageWidth - margin, yPos + lineOffset);
    
    yPos += 7;

    // Row 2 - Service Location, City, State, ZIP - ADJUSTED
    pdf.setFont(undefined, 'bold');
    pdf.text('Service Location:', labelX, yPos);
    pdf.setFont(undefined, 'normal');
    const servLoc = formData.serviceLocation || '';
    pdf.text(servLoc, labelX + 35, yPos);
    pdf.line(labelX + 33, yPos + lineOffset, labelX + 85, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('City:', labelX + 90, yPos);
    pdf.setFont(undefined, 'normal');
    const city = formData.city || '';
    pdf.text(city, labelX + 100, yPos);
    pdf.line(labelX + 98, yPos + lineOffset, labelX + 125, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('State:', labelX + 130, yPos);
    pdf.setFont(undefined, 'normal');
    const state = formData.state || '';
    pdf.text(state, labelX + 142, yPos);
    pdf.line(labelX + 140, yPos + lineOffset, labelX + 155, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('ZIP:', labelX + 160, yPos);
    pdf.setFont(undefined, 'normal');
    const zip = formData.zip || '';
    pdf.text(zip, labelX + 170, yPos);
    pdf.line(labelX + 168, yPos + lineOffset, pageWidth - margin, yPos + lineOffset);
    
    yPos += 7;
    
    // Row 3 - Employee Name and Last Four SSN - ADJUSTED
    pdf.setFont(undefined, 'bold');
    pdf.text('Employee Name (PRINT):', labelX, yPos);
    pdf.setFont(undefined, 'normal');
    const empName = formData.employeeName || '';
    pdf.text(empName, labelX + 50, yPos);
    pdf.line(labelX + 48, yPos + lineOffset, labelX + 115, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Last Four SSN:', labelX + 120, yPos);
    pdf.setFont(undefined, 'normal');
    const ssn = formData.lastFourSSN || '';
    pdf.text(ssn, labelX + 150, yPos);
    pdf.line(labelX + 148, yPos + lineOffset, pageWidth - margin, yPos + lineOffset);
    
    yPos += 7;

    // Row 4 - Date, Times - ADJUSTED
    pdf.setFont(undefined, 'bold');
    pdf.text('Date of Service:', labelX, yPos);
    pdf.setFont(undefined, 'normal');
    const dateServ = formData.dateOfService || '';
    pdf.text(dateServ, labelX + 32, yPos);
    pdf.line(labelX + 30, yPos + lineOffset, labelX + 55, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Missed In Time:', labelX + 60, yPos);
    pdf.setFont(undefined, 'normal');
    const missIn = formData.missedInTime || '';
    pdf.text(missIn, labelX + 87, yPos);
    pdf.line(labelX + 85, yPos + lineOffset, labelX + 110, yPos + lineOffset);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Missed Out Time:', labelX + 115, yPos);
    pdf.setFont(undefined, 'normal');
    const missOut = formData.missedOutTime || '';
    pdf.text(missOut, labelX + 148, yPos);
    pdf.line(labelX + 146, yPos + lineOffset, pageWidth - margin, yPos + lineOffset);
    
    yPos += 7;

    // Row 5 - Total Hours
    pdf.setFont(undefined, 'bold');
    pdf.text('Total Hours Worked:', labelX, yPos);
    pdf.setFont(undefined, 'normal');
    const hours = formData.totalHoursWorked || '';
    pdf.text(hours, labelX + 42, yPos);
    pdf.line(labelX + 40, yPos + lineOffset, labelX + 65, yPos + lineOffset);
    
    yPos += 10;

    // Description box (WITH BORDER)
    pdf.setFont(undefined, 'bold');
    pdf.text('Describe the reason in detail:', labelX, yPos);
    yPos += 2;
    
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    const boxHeight = 18;
    pdf.rect(labelX, yPos, contentWidth, boxHeight);
    
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(8);
    const reasonText = formData.reason || '[No data provided]';
    const reasonLines = pdf.splitTextToSize(reasonText, contentWidth - 4);
    pdf.text(reasonLines, labelX + 2, yPos + 4);
    
    yPos += boxHeight + 4;

    // Certification text
    pdf.setFontSize(7);
    pdf.setFont(undefined, 'italic');
    pdf.text('By signing this form, I hereby certify that I received these documented services on the date and time listed above.', labelX, yPos);
    
    yPos += 8;

    // Duties Performed Table - LARGER CHECKMARK SYMBOL FOR CHECKED ITEMS
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'bold');
    pdf.text('Duty Performed: (Tasks completed per Service Plan - check all that apply)', labelX, yPos);
    
    yPos += 5;

    // Create duties table
    const tableStartY = yPos;
    const numCols = 4;
    const colWidth = contentWidth / numCols;
    const rowHeight = 6;
    
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setLineWidth(0.2);
    pdf.setDrawColor(0, 0, 0);
    
    // Duties data in 4 columns (corrected based on form options)
    const dutiesRows = [
      [
        { code: '115', checkbox: formData.duties.includes('115'), text: '115 - Meal Preparation' },
        { code: '122', checkbox: formData.duties.includes('122'), text: '122 - Hygiene' },
        { code: '127', checkbox: formData.duties.includes('127'), text: '127 - Toilet Use' },
        { code: '137', checkbox: formData.duties.includes('137'), text: '137 - Lotion/Ointment' }
      ],
      [
        { code: '116', checkbox: formData.duties.includes('116'), text: '116 - Housework/Chore' },
        { code: '123', checkbox: formData.duties.includes('123'), text: '123 - Dressing Upper' },
        { code: '128', checkbox: formData.duties.includes('128'), text: '128 - Bed Mobility' },
        { code: '138', checkbox: formData.duties.includes('138'), text: '138 - Laundry' }
      ],
      [
        { code: '117', checkbox: formData.duties.includes('117'), text: '117 - Managing Finances' },
        { code: '124', checkbox: formData.duties.includes('124'), text: '124 - Dressing Lower' },
        { code: '129', checkbox: formData.duties.includes('129'), text: '129 - Eating' },
        { code: '140', checkbox: formData.duties.includes('140'), text: '140 - Supervision/Coaching' }
      ],
      [
        { code: '118', checkbox: formData.duties.includes('118'), text: '118 - Managing Medications' },
        { code: '125', checkbox: formData.duties.includes('125'), text: '125 - Locomotion' },
        { code: '134', checkbox: formData.duties.includes('134'), text: '134 - Bathing' },
        { code: '141', checkbox: formData.duties.includes('141'), text: '141 - Incontinence Care' }
      ],
      [
        { code: '119', checkbox: formData.duties.includes('119'), text: '119 - Shopping' },
        { code: '126', checkbox: formData.duties.includes('126'), text: '126 - Transfer' },
        { code: '120', checkbox: formData.duties.includes('120'), text: '120 - Transportation' },
        { code: '203', checkbox: formData.duties.includes('203'), text: '203 - Other' }
      ]
    ];

    // Draw table with LARGER checkmark symbols
    for (let row = 0; row < dutiesRows.length; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = labelX + (col * colWidth);
        const y = tableStartY + (row * rowHeight);
        
        // Draw cell border
        pdf.rect(x, y, colWidth, rowHeight);
        
        const duty = dutiesRows[row][col];
        if (duty.text) {
          // Draw checkbox (empty square)
          const cbX = x + 2;
          const cbY = y + 2;
          const cbSize = 3;
          pdf.setLineWidth(0.3);
          pdf.rect(cbX, cbY, cbSize, cbSize);
          
          // Add LARGER checkmark if checked
          if (duty.checkbox) {
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text('✓', cbX + 0.1, cbY + 2.8);
            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(8);
          }
          
          // Draw text
          pdf.setLineWidth(0.2);
          pdf.text(duty.text, cbX + 5, y + 4);
        }
      }
    }
    
    yPos = tableStartY + (dutiesRows.length * rowHeight) + 6;

    // Certification statement
    pdf.setFontSize(7);
    pdf.setFont(undefined, 'italic');
    pdf.text('I certify that the above information is true and correct to the best of my knowledge.', labelX, yPos);
    
    yPos += 8;

    // SIGNATURES SIDE BY SIDE (Consumer and Employee)
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'bold');
    
    const sigCol1 = labelX;
    const sigCol2 = labelX + (contentWidth / 2) + 5;
    
    // Consumer Signature (Left)
    pdf.text('Consumer Signature:', sigCol1, yPos);
    if (formData.consumerSignature) {
      try {
        pdf.addImage(formData.consumerSignature, 'PNG', sigCol1 + 42, yPos - 4, 35, 7);
      } catch (e) {
        console.log('Could not add consumer signature');
      }
    }
    pdf.line(sigCol1 + 40, yPos + 1, sigCol1 + 85, yPos + 1);
    
    // Employee Signature (Right)
    pdf.text('Employee Signature:', sigCol2, yPos);
    if (formData.employeeSignature) {
      try {
        pdf.addImage(formData.employeeSignature, 'PNG', sigCol2 + 42, yPos - 4, 35, 7);
      } catch (e) {
        console.log('Could not add employee signature');
      }
    }
    pdf.line(sigCol2 + 40, yPos + 1, sigCol2 + 85, yPos + 1);
    
    yPos += 8;
    
    // Dates
    pdf.text('Date:', sigCol1, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text(formData.consumerSignatureDate || '', sigCol1 + 12, yPos);
    pdf.line(sigCol1 + 10, yPos + 1, sigCol1 + 40, yPos + 1);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Date:', sigCol2, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text(formData.employeeSignatureDate || '', sigCol2 + 12, yPos);
    pdf.line(sigCol2 + 10, yPos + 1, sigCol2 + 40, yPos + 1);
    
    yPos += 10;

    // Office Use Only Table (WITH BORDER)
    const officeBoxY = yPos;
    const officeBoxHeight = 38;
    
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.5);
    pdf.setFillColor(250, 250, 250);
    pdf.rect(labelX, officeBoxY, contentWidth, officeBoxHeight, 'FD');
    
    yPos += 5;
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Office Use Only', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 7;

      // Office use only table with 3 columns
      const officeColWidth = contentWidth / 3;
      pdf.setFontSize(8);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont(undefined, 'bold');
      
      const col1 = labelX + 2;
      const col2 = labelX + officeColWidth + 2;
      const col3 = labelX + (officeColWidth * 2) + 2;
      
      // Column 1 - Issue
      pdf.text('Issue:', col1, yPos);
      yPos += 5;
      pdf.setFont(undefined, 'normal');
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.2);
      pdf.rect(col1, yPos - 3, 3, 3);
      pdf.text('Pending Clock-In', col1 + 5, yPos);
      yPos += 5;
      pdf.rect(col1, yPos - 3, 3, 3);
      pdf.text('Time Overlap', col1 + 5, yPos);
      
      // Column 2 - (middle)
      yPos = officeBoxY + 12;
      pdf.rect(col2, yPos - 3, 3, 3);
      pdf.text('Pending Clock-Out', col2 + 5, yPos);
      yPos += 5;
      pdf.rect(col2, yPos - 3, 3, 3);
      pdf.text('Missing Time (EVV not used)', col2 + 5, yPos);
      
      // Column 3
      yPos = officeBoxY + 12;
      pdf.rect(col3, yPos - 3, 3, 3);
      pdf.text('Time Exceeds Authorized Hours', col3 + 5, yPos);
      yPos += 5;
      pdf.rect(col3, yPos - 3, 3, 3);
      pdf.text('Other', col3 + 5, yPos);
      
      yPos += 7;
      
      // Bottom fields
      pdf.setFont(undefined, 'bold');
      pdf.text('Payor:', col1, yPos);
      pdf.line(col1 + 12, yPos + 1, col1 + officeColWidth - 5, yPos + 1);
      
      pdf.text('Pay Period:', col2, yPos);
      pdf.line(col2 + 20, yPos + 1, col2 + officeColWidth - 5, yPos + 1);
      
      pdf.text('Pay Period:', col3, yPos);
      pdf.line(col3 + 20, yPos + 1, col3 + officeColWidth - 5, yPos + 1);
      
      yPos += 6;
      pdf.text('Agency Role:', col1, yPos);
      pdf.line(col1 + 22, yPos + 1, col1 + officeColWidth - 5, yPos + 1);
      
      pdf.text('Approved by:', col2, yPos);
      pdf.line(col2 + 24, yPos + 1, col2 + officeColWidth - 5, yPos + 1);
      
      pdf.text('Approved by:', col3, yPos);
      pdf.line(col3 + 24, yPos + 1, col3 + officeColWidth - 5, yPos + 1);
      
      yPos += 6;
      pdf.text('Date:', col2, yPos);
      pdf.line(col2 + 10, yPos + 1, col2 + officeColWidth - 5, yPos + 1);
      
      pdf.text('Date:', col3, yPos);
      pdf.line(col3 + 10, yPos + 1, col3 + officeColWidth - 5, yPos + 1);

      return pdf.output('datauristring');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

  const extractMissedEvvData = (element) => {
    const data = {
      duties: []
    };
    
    // Extract radio button value - look for checked radio
    const allSpans = element.querySelectorAll('span');
    const allLabels = element.querySelectorAll('label');
    
    // Find checked issue type by looking for ☑ symbol followed by label
    for (let i = 0; i < allSpans.length; i++) {
      const span = allSpans[i];
      if (span.textContent.trim() === '☑') {
        // Get the next label sibling
        let nextSibling = span.nextSibling;
        while (nextSibling) {
          if (nextSibling.nodeType === Node.TEXT_NODE && nextSibling.textContent.trim()) {
            const labelText = nextSibling.textContent.trim().toLowerCase();
            if (labelText.includes('missed in') && !labelText.includes('and out')) {
              data.issueType = 'missedIn';
              break;
            } else if (labelText.includes('missed out') && !labelText.includes('and')) {
              data.issueType = 'missedOut';
              break;
            } else if (labelText.includes('missed in and out')) {
              data.issueType = 'missedInAndOut';
              break;
            } else if (labelText.includes('other issue')) {
              data.issueType = 'otherIssue';
              break;
            }
          } else if (nextSibling.tagName === 'LABEL') {
            const labelText = nextSibling.textContent.trim().toLowerCase();
            if (labelText.includes('missed in') && !labelText.includes('and out')) {
              data.issueType = 'missedIn';
              break;
            } else if (labelText.includes('missed out') && !labelText.includes('and')) {
              data.issueType = 'missedOut';
              break;
            } else if (labelText.includes('missed in and out')) {
              data.issueType = 'missedInAndOut';
              break;
            } else if (labelText.includes('other issue')) {
              data.issueType = 'otherIssue';
              break;
            }
          }
          nextSibling = nextSibling.nextSibling;
        }
      }
    }
    
    // Extract text values - looking for spans that replaced inputs
    const extractTextAfterLabel = (labelText) => {
      for (const label of allLabels) {
        if (label.textContent.includes(labelText)) {
          const nextSpan = label.nextElementSibling;
          if (nextSpan && nextSpan.tagName === 'SPAN') {
            const text = nextSpan.textContent.trim();
            if (text && text !== '_____' && text !== '_______________') {
              return text;
            }
          }
        }
      }
      return '';
    };
    
    data.consumerName = extractTextAfterLabel('Consumer Name') || '';
    data.medicaidId = extractTextAfterLabel('Medicaid ID') || '';
    data.serviceLocation = extractTextAfterLabel('Service Location') || '';
    data.city = extractTextAfterLabel('City') || '';
    data.state = extractTextAfterLabel('State') || '';
    data.zip = extractTextAfterLabel('ZIP') || '';
    data.employeeName = extractTextAfterLabel('Employee Name (PRINT)') || '';
    data.lastFourSSN = extractTextAfterLabel('Last Four SSN') || '';
    data.dateOfService = extractTextAfterLabel('Date of Service') || '';
    data.missedInTime = extractTextAfterLabel('Missed In Time') || '';
    data.missedOutTime = extractTextAfterLabel('Missed Out Time') || '';
    data.totalHoursWorked = extractTextAfterLabel('Total Hours Worked') || '';
    data.consumerSignatureDate = extractTextAfterLabel('Consumer Signature:') ? 
      (allLabels[Array.from(allLabels).findIndex(l => l.textContent.includes('Consumer Signature:')) + 1]?.nextElementSibling?.textContent || '') : '';
    data.employeeSignatureDate = extractTextAfterLabel('Employee Signature:') ? 
      (allLabels[Array.from(allLabels).findIndex(l => l.textContent.includes('Employee Signature:')) + 1]?.nextElementSibling?.textContent || '') : '';
    
    // Better extraction for signature dates
    for (let i = 0; i < allLabels.length; i++) {
      const label = allLabels[i];
      if (label.textContent.includes('Date:')) {
        const parent = label.parentElement;
        if (parent) {
          const h6 = parent.querySelector('h6');
          if (h6 && h6.textContent.includes('Consumer Signature')) {
            const dateSpan = label.nextElementSibling;
            if (dateSpan && dateSpan.tagName === 'SPAN') {
              data.consumerSignatureDate = dateSpan.textContent.trim();
            }
          } else if (h6 && h6.textContent.includes('Employee Signature')) {
            const dateSpan = label.nextElementSibling;
            if (dateSpan && dateSpan.tagName === 'SPAN') {
              data.employeeSignatureDate = dateSpan.textContent.trim();
            }
          }
        }
      }
    }
    
    // Extract reason from description div
    const allDivs = element.querySelectorAll('div');
    for (const div of allDivs) {
      const style = div.getAttribute('style');
      if (style && style.includes('border: 1px solid')) {
        data.reason = div.textContent.trim();
        break;
      }
    }
    
    // Extract signature images
    const images = element.querySelectorAll('img');
    let consumerSigFound = false;
    images.forEach((img) => {
      if (img.src && img.src.startsWith('data:image')) {
        const parent = img.closest('.col-md-6');
        if (parent) {
          const h6 = parent.querySelector('h6');
          if (h6 && h6.textContent.includes('Consumer Signature')) {
            data.consumerSignature = img.src;
            consumerSigFound = true;
          } else if (h6 && h6.textContent.includes('Employee Signature') && consumerSigFound) {
            data.employeeSignature = img.src;
          } else if (!consumerSigFound) {
            data.consumerSignature = img.src;
            consumerSigFound = true;
          } else {
            data.employeeSignature = img.src;
          }
        }
      }
    });
    
    // Extract checked duties - look for ☑ symbol followed by label with duty code
    for (let i = 0; i < allSpans.length; i++) {
      const span = allSpans[i];
      if (span.textContent.trim() === '☑') {
        // Get the next label sibling
        let nextElement = span.nextSibling;
        while (nextElement) {
          if (nextElement.tagName === 'LABEL') {
            const labelText = nextElement.textContent.trim();
            // Extract duty code (3 digits or specific text)
            const codeMatch = labelText.match(/^(\d+)\s*-/);
            if (codeMatch) {
              data.duties.push(codeMatch[1]);
              break;
            } else if (labelText.toLowerCase().includes('personal care')) {
              data.duties.push('Personal Care');
              break;
            }
          } else if (nextElement.nodeType === Node.TEXT_NODE && nextElement.textContent.trim()) {
            const text = nextElement.textContent.trim();
            const codeMatch = text.match(/^(\d+)\s*-/);
            if (codeMatch) {
              data.duties.push(codeMatch[1]);
              break;
            }
          }
          nextElement = nextElement.nextSibling;
        }
      }
    }
    
    return data;
  };

  const generateRegularPDF = async () => {
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
      
      const marginTop = 23;
      const marginBottom = 10;
      const marginLeft = 15;
      const marginRight = 15;
      
      const contentWidth = pdfWidth - marginLeft - marginRight;
      const contentHeight = pdfHeight - marginTop - marginBottom;

      const addHeader = (pdf, pageNumber) => {
        pdf.saveGraphicsState();

        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, 20, 'F');

        pdf.setTextColor(41, 199, 247);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('Everest Home Health', pdfWidth / 2, 6, { align: 'center' });

        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(7);
        pdf.setFont(undefined, 'normal');
        
        const line1 = '109 DEWALT AVE SUITE 201B PITTSBURGH PA 15227';
        const line2 = 'EMAIL: - everestopd2025@gmail.com';
        const line3 = 'PHONE: - 412-484-6298, FAX: - 412-207-8661';
        
        pdf.text(line1, pdfWidth / 2, 11, { align: 'center' });
        pdf.text(line2, pdfWidth / 2, 15, { align: 'center' });
        pdf.text(line3, pdfWidth / 2, 19, { align: 'center' });

        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(marginLeft, 21, pdfWidth - marginRight, 21);

        pdf.restoreGraphicsState();
      };

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

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
            const isSignatureCanvas = el.closest('div[class*="signature"], div[class*="sign-pad"], div[id*="signature"]');
            
            if (isSignatureCanvas) {
              el.style.setProperty('border', 'none', 'important');
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('margin', '0', 'important');
              el.style.setProperty('max-width', '150px', 'important');
              el.style.setProperty('max-height', '40px', 'important');
              el.style.setProperty('min-height', 'auto', 'important');
              el.style.setProperty('background', 'transparent', 'important');
            } else {
              el.style.setProperty('border', '1px solid #000', 'important');
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('margin', '8px 0', 'important');
              el.style.setProperty('max-width', '250px', 'important');
              el.style.setProperty('min-height', '60px', 'important');
              el.style.setProperty('background', '#fff', 'important');
            }
          }
        });
        
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
            div.style.setProperty('border', 'none', 'important');
            div.style.setProperty('border-bottom', '1px solid #000', 'important');
            div.style.setProperty('min-height', '40px', 'important');
            div.style.setProperty('max-height', '50px', 'important');
            div.style.setProperty('width', '150px', 'important');
            div.style.setProperty('margin', '8px 0 8px 0', 'important');
            div.style.setProperty('display', 'block', 'important');
            div.style.setProperty('background', 'transparent', 'important');
            div.style.setProperty('padding', '0 0 2px 0', 'important');
            
            const img = div.querySelector('img');
            if (img) {
              img.style.setProperty('max-width', '150px', 'important');
              img.style.setProperty('max-height', '35px', 'important');
              img.style.setProperty('height', 'auto', 'important');
              img.style.setProperty('display', 'block', 'important');
              img.style.setProperty('object-fit', 'contain', 'important');
              img.style.setProperty('margin-bottom', '0', 'important');
            }
            
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

      return pdf.output('datauristring');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

  const extractConsumerName = () => {
    if (!contentRef.current) return 'Unknown';
    
    const element = contentRef.current;
    
    const consumerNameLabel = element.querySelector('label[for="ConsumerName"]');
    if (consumerNameLabel) {
      let nameSpan = consumerNameLabel.nextElementSibling;
      
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
    
    const allLabels = element.querySelectorAll('label');
    
    for (const label of allLabels) {
      if (label.textContent.toLowerCase().includes('consumer') && 
          label.textContent.toLowerCase().includes('name')) {
        let nameSpan = label.nextElementSibling;
        
        if (nameSpan && nameSpan.tagName === 'SPAN' && nameSpan.textContent.trim()) {
          return nameSpan.textContent.trim();
        }
        
        const parentDiv = label.parentElement;
        if (parentDiv) {
          nameSpan = parentDiv.querySelector('span');
          if (nameSpan && nameSpan.textContent.trim()) {
            return nameSpan.textContent.trim();
          }
        }
      }
    }
    
    for (const label of allLabels) {
      const labelText = label.textContent.toLowerCase();
      if (labelText.includes('individual') && 
          (labelText.includes('full name') || labelText.includes('name'))) {
        let nameSpan = label.nextElementSibling;
        
        if (nameSpan && nameSpan.tagName === 'SPAN' && nameSpan.textContent.trim()) {
          return nameSpan.textContent.trim();
        }
        
        const parentDiv = label.parentElement;
        if (parentDiv) {
          nameSpan = parentDiv.querySelector('span');
          if (nameSpan && nameSpan.textContent.trim()) {
            return nameSpan.textContent.trim();
          }
        }
      }
    }

    const consumerNamePattern = /Consumer'?s?\s+Name\s*:?\s*([A-Za-z\s]+?)(?=\s*Date|\s*$|<)/i;
    const match = element.textContent.match(consumerNamePattern);
    
    if (match && match[1]) {
      const extractedName = match[1].trim();
      if (extractedName && extractedName.length > 2 && extractedName.length < 100) {
        return extractedName;
      }
    }

    const consumerNameInputs = element.querySelectorAll('input[name="ConsumerName"], input[id="ConsumerName"]');
    for (const input of consumerNameInputs) {
      const nextSpan = input.nextElementSibling;
      if (nextSpan && nextSpan.tagName === 'SPAN' && nextSpan.textContent.trim()) {
        return nextSpan.textContent.trim();
      }
    }
    
    return patientName || 'Unknown Consumer';
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    setIsGenerating(true);

    try {
      const consumerName = extractConsumerName();
      const pdfBase64 = await generatePDFBase64();
      
      if (!pdfBase64) {
        throw new Error('Failed to generate PDF');
      }

      const response = await fetch('https://localhost:44345/api/document/submit-form', {
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
        
        if (formType === 'miss-evv') {
          navigate('/');
        } else {
          navigate('/home');
        }
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
  
  const handleBack = () => {
    if (previousPath) {
      navigate(previousPath);
    } else if (formType === 'miss-evv') {
      navigate('/miss-evv');
    } else {
      navigate(`/home/form/${formType}`);
    }
  };

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