import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import Navbar from '../Navbar';
import jsPDF from 'jspdf';
import logo from '../../assets/img/Everest_logo.png';

const MissedEvv = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const [checkboxValues, setCheckboxValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Logo source - uses imported logo from top of file
  const LOGO_SRC = logo;
  
  // Signature refs
  const consumerSigRef = useRef(null);
  const employeeSigRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setCheckboxValues(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setInputValue(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const clearConsumerSignature = () => {
    if (consumerSigRef.current) {
      consumerSigRef.current.clear();
    }
  };

  const clearEmployeeSignature = () => {
    if (employeeSigRef.current) {
      employeeSigRef.current.clear();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    setIsSubmitting(true);

    try {
      // Get signature data
      let consumerSignatureBase64 = '';
      let employeeSignatureBase64 = '';

      if (consumerSigRef.current && !consumerSigRef.current.isEmpty()) {
        consumerSignatureBase64 = consumerSigRef.current.toDataURL('image/png');
      }

      if (employeeSigRef.current && !employeeSigRef.current.isEmpty()) {
        employeeSignatureBase64 = employeeSigRef.current.toDataURL('image/png');
      }

      // Prepare duties performed list
      const dutiesPerformed = Object.keys(checkboxValues)
        .filter(key => checkboxValues[key] && key.startsWith('duty_'))
        .map(key => key.replace('duty_', ''));

      // Get current date for signature dates
      const currentDate = new Date().toISOString().split('T')[0];

      // Map issue type to option
      let selectedOptionB = '';
      if (inputValue.issueType === 'Missed In') selectedOptionB = 'A';
      else if (inputValue.issueType === 'Missed Out') selectedOptionB = 'B';
      else if (inputValue.issueType === 'Missed In and Out') selectedOptionB = 'C';
      else if (inputValue.issueType === 'Other Issue') selectedOptionB = 'D';

      // Generate PDF on frontend
      const doc = new jsPDF();
      const AcroForm = jsPDF.AcroForm;
      const Appearance = AcroForm.Appearance;

      // Company Header at top with blue color
      // Logo - uses LOGO_SRC constant defined at top of component
      try {
        // Add logo image - bigger and closer to text on the side, moved up
        doc.addImage(LOGO_SRC, 'PNG', 40, 5, 30, 30); // x, y, width, height (moved from y:8 to y:5)
      } catch (error) {
        console.log('Logo not loaded, using placeholder');
        // Fallback: Draw placeholder circle if image fails to load
        doc.setDrawColor(0, 112, 192);
        doc.setFillColor(0, 112, 192);
        doc.circle(55, 20, 12, 'FD'); // Adjusted position
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('EH', 55, 21, { align: 'center' });
      }
      
      // Company name in blue
      doc.setTextColor(0, 112, 192); // Blue color (RGB: 0, 112, 192)
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('EVEREST HOME HEALTH LLC', 105, 12, { align: 'center' });
      
      // Contact information in blue
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text('109 DeWalt Ave, Suite 201 B, Pittsburgh, PA 15227', 105, 17, { align: 'center' });
      doc.text('Ph: (412) 207-7383 Fax: (412) 207-8661', 105, 21, { align: 'center' });
      doc.text('Email: everestODP2025@gmail.com', 105, 25, { align: 'center' });
      doc.text('EIN-384157540', 105, 29, { align: 'center' });
      
      // Reset text color to black for rest of document
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(0, 0, 0);

      // Main Form Title - moved down to accommodate header
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('MISSED EVV FORM', 105, 38, { align: 'center' });

      // Issue Type radios - moved down
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      var radioGroup2 = new AcroForm.RadioButton();
      radioGroup2.fieldName = "IssueType";
      doc.addField(radioGroup2);

      var missedIn = radioGroup2.createOption("A");
      missedIn.Rect = [15, 45, 4, 4];
      doc.rect(15, 45, 4, 4);
      doc.text('Missed In', 22, 48.5);

      var missedOut = radioGroup2.createOption("B");
      missedOut.Rect = [55, 45, 4, 4];
      doc.rect(55, 45, 4, 4);
      doc.text('Missed Out', 63, 48.5);

      var missedInAndOut = radioGroup2.createOption("C");
      missedInAndOut.Rect = [100, 45, 4, 4];
      doc.rect(100, 45, 4, 4);
      doc.text('Missed In and Out', 107, 48.5);

      var other = radioGroup2.createOption("D");
      other.Rect = [150, 45, 4, 4];
      doc.rect(150, 45, 4, 4);
      doc.text('Other Issue', 157, 48.5);

      if (selectedOptionB === "A") missedIn.AS = "/A";
      else if (selectedOptionB === "B") missedOut.AS = "/B";
      else if (selectedOptionB === "C") missedInAndOut.AS = "/C";
      else if (selectedOptionB === "D") other.AS = "/D";

      radioGroup2.setAppearance(Appearance.RadioButton.Circle);

      // Fields - adjusted y positions down by +8 to accommodate header
      doc.text('Consumer Name:', 15, 62);
      var consumerName = new AcroForm.TextField();
      consumerName.Rect = [45, 58, 55, 6];
      doc.rect(45, 58, 55, 6);
      consumerName.multiline = false;
      consumerName.value = inputValue.consumerName || '';
      consumerName.fieldName = "ConsumerName";
      consumerName.maxFontSize = 11.5;
      doc.addField(consumerName);

      doc.text('Employee Name:', 110, 62);
      var employeeName = new AcroForm.TextField();
      employeeName.Rect = [140, 58, 55, 6];
      doc.rect(140, 58, 55, 6);
      employeeName.multiline = false;
      employeeName.value = inputValue.employeeName || '';
      employeeName.fieldName = "EmployeeName";
      employeeName.maxFontSize = 11.5;
      doc.addField(employeeName);

      doc.text('Medicaid ID:', 15, 70);
      var medicaidID = new AcroForm.TextField();
      medicaidID.Rect = [45, 66, 55, 6];
      doc.rect(45, 66, 55, 6);
      medicaidID.multiline = false;
      medicaidID.value = inputValue.medicaidId || '';
      medicaidID.fieldName = "MedicaidID";
      medicaidID.maxFontSize = 11.5;
      doc.addField(medicaidID);

      doc.text('Employee last four SSN:', 110, 70);
      var ssa = new AcroForm.TextField();
      ssa.Rect = [150, 66, 45, 6];
      doc.rect(150, 66, 45, 6);
      ssa.multiline = false;
      ssa.value = inputValue.lastFourSSN || '';
      ssa.fieldName = "SSN";
      ssa.maxFontSize = 11.5;
      doc.addField(ssa);

      doc.text('Service Location:', 15, 78);
      var location = new AcroForm.TextField();
      location.Rect = [45, 74, 55, 6];
      doc.rect(45, 74, 55, 6);
      location.multiline = false;
      location.value = inputValue.serviceLocation || '';
      location.maxFontSize = 11.5;
      location.fieldName = "ServiceLocation";
      doc.addField(location);

      doc.text('Date of Service:', 110, 78);
      var missedDate = new AcroForm.TextField();
      missedDate.Rect = [140, 74, 55, 6];
      doc.rect(140, 74, 55, 6);
      missedDate.multiline = false;
      missedDate.value = inputValue.dateOfService || '';
      missedDate.maxFontSize = 11.5;
      missedDate.fieldName = "DateOfService";
      doc.addField(missedDate);

      doc.text('City:', 15, 86);
      var city = new AcroForm.TextField();
      city.Rect = [45, 82, 55, 6];
      doc.rect(45, 82, 55, 6);
      city.value = inputValue.city || '';
      city.multiline = false;
      city.fieldName = "City";
      city.maxFontSize = 11.5;
      doc.addField(city);

      doc.text('Missed In Time:', 110, 86);
      var missedInTime = new AcroForm.TextField();
      missedInTime.Rect = [140, 82, 55, 6];
      doc.rect(140, 82, 55, 6);
      missedInTime.multiline = false;
      missedInTime.value = inputValue.missedInTime || '';
      missedInTime.maxFontSize = 11.5;
      missedInTime.fieldName = "MissedInTime";
      doc.addField(missedInTime);

      doc.text('State:', 15, 94);
      var state = new AcroForm.TextField();
      state.Rect = [45, 90, 55, 6];
      doc.rect(45, 90, 55, 6);
      state.value = inputValue.state || '';
      state.maxFontSize = 11.5;
      state.multiline = false;
      state.fieldName = "State";
      doc.addField(state);

      doc.text('Missed Out Time:', 110, 94);
      var missedOutTime = new AcroForm.TextField();
      missedOutTime.Rect = [140, 90, 55, 6];
      doc.rect(140, 90, 55, 6);
      missedOutTime.value = inputValue.missedOutTime || '';
      missedOutTime.maxFontSize = 11.5;
      missedOutTime.multiline = false;
      missedOutTime.fieldName = "MissedOutTime";
      doc.addField(missedOutTime);

      doc.text('Zip:', 15, 102);
      var zip = new AcroForm.TextField();
      zip.Rect = [45, 98, 55, 6];
      doc.rect(45, 98, 55, 6);
      zip.multiline = false;
      zip.maxFontSize = 11.5;
      zip.value = inputValue.zip || '';
      zip.fieldName = "Zip";
      doc.addField(zip);

      // FIXED: Total Hours Worked - adjusted label and made field smaller
      doc.text('Total Hours Worked:', 110, 102);
      var totalHour = new AcroForm.TextField();
      totalHour.Rect = [152, 98, 43, 6];
      doc.rect(152, 98, 43, 6);
      totalHour.multiline = false;
      totalHour.maxFontSize = 11.5;
      totalHour.value = inputValue.totalHoursWorked || '';
      totalHour.fieldName = "TotalHoursWorked";
      doc.addField(totalHour);

      doc.setLineWidth(0.01);
      doc.line(15, 108, 195, 108);

      doc.setFontSize(6);
      doc.text('*By signing this form, I hereby certify that I received these documented services on the date and time listed above.', 15, 112);

      // CONSUMER SIGNATURE SECTION - Made signature smaller
      doc.setFontSize(10);
      doc.text('Consumer Signature:', 15, 120);
      doc.rect(50, 116, 45, 16);
      if (consumerSignatureBase64) doc.addImage(consumerSignatureBase64, 'PNG', 50, 116, 45, 16);

      // Consumer Signed Date
      doc.text('Consumer Signed Date:', 110, 120);
      var consumerSignedDate = new AcroForm.TextField();
      consumerSignedDate.Rect = [155, 116, 40, 6];
      doc.rect(155, 116, 40, 6);
      consumerSignedDate.multiline = false;
      consumerSignedDate.value = currentDate;
      consumerSignedDate.fieldName = "ConsumerSignedDate";
      consumerSignedDate.maxFontSize = 11.5;
      doc.addField(consumerSignedDate);

      // NEW: Consumer Email - below date (moved down)
      doc.text('Consumer Email:', 15, 137);
      var consumerEmail = new AcroForm.TextField();
      consumerEmail.Rect = [50, 133, 80, 6];
      doc.rect(50, 133, 80, 6);
      consumerEmail.multiline = false;
      consumerEmail.value = inputValue.consumerEmail || '';
      consumerEmail.fieldName = "ConsumerEmail";
      consumerEmail.maxFontSize = 11.5;
      doc.addField(consumerEmail);

      // NEW: Consumer PIN - next to email
      doc.text('Consumer PIN:', 135, 137);
      var consumerPIN = new AcroForm.TextField();
      consumerPIN.Rect = [165, 133, 20, 6];
      doc.rect(165, 133, 20, 6);
      consumerPIN.value = inputValue.consumerPIN || '';
      consumerPIN.fieldName = "ConsumerPIN";
      consumerPIN.maxFontSize = 11.5;
      doc.addField(consumerPIN);

      // Reason for Missed - adjusted position
      doc.text('Reason for Missed:', 15, 148);
      var missedReason = new AcroForm.TextField();
      missedReason.Rect = [15, 151, 180, 20];
      doc.rect(15, 151, 180, 20);
      missedReason.multiline = true;
      missedReason.value = inputValue.reasonDetail || '';
      missedReason.maxFontSize = 11.5;
      missedReason.fieldName = "ReasonForMissed";
      doc.addField(missedReason);

      doc.setFontSize(8);
      doc.text('Duties performed: (task completed per service plan - check all that apply)', 15, 178);
      doc.line(15, 179, 107, 179);

      // Duties checkboxes using TextField for 'X' (adjust y positions)
      doc.text("115 - Meal Preparation", 22, 184.5);
      var check1 = new AcroForm.TextField();
      check1.Rect = [15.5, 181, 4.5, 5];
      doc.rect(15, 181, 5, 5);
      check1.multiline = false;
      check1.fieldName = "check115";
      check1.maxFontSize = 10;
      doc.addField(check1);
      if (dutiesPerformed.includes('115')) { check1.value = "X" }

      doc.text("122 - Hygiene", 22 + 45, 184.5);
      var check2 = new AcroForm.TextField();
      check2.Rect = [15.5 + 45, 181, 4.5, 5];
      doc.rect(15 + 45, 181, 5, 5);
      check2.multiline = false;
      check2.fieldName = "check122";
      check2.maxFontSize = 10;
      doc.addField(check2);
      if (dutiesPerformed.includes('122')) { check2.value = "X" }

      doc.text("127 - Toilet Use", 22 + 90, 184.5);
      var check3 = new AcroForm.TextField();
      check3.Rect = [15.5 + 90, 181, 4.5, 5];
      doc.rect(15 + 90, 181, 5, 5);
      check3.multiline = false;
      check3.fieldName = "check127";
      check3.maxFontSize = 10;
      doc.addField(check3);
      if (dutiesPerformed.includes('127')) { check3.value = "X" }

      doc.text("138 - Laundry", 22 + 135, 184.5);
      var check4 = new AcroForm.TextField();
      check4.Rect = [15.5 + 135, 181, 4.5, 5];
      doc.rect(15 + 135, 181, 5, 5);
      check4.multiline = false;
      check4.fieldName = "check138";
      check4.maxFontSize = 10;
      doc.addField(check4);
      if (dutiesPerformed.includes('138')) { check4.value = "X" }

      doc.text("116 - Housework/Chore", 22, 184.5 + 5);
      var check5 = new AcroForm.TextField();
      check5.Rect = [15.5, 181 + 5, 4.5, 5];
      doc.rect(15, 181 + 5, 5, 5);
      check5.multiline = false;
      check5.fieldName = "check116";
      check5.maxFontSize = 10;
      doc.addField(check5);
      if (dutiesPerformed.includes('116')) { check5.value = "X" }

      doc.text("123 - Dressing Upper", 22 + 45, 184.5 + 5);
      var check6 = new AcroForm.TextField();
      check6.Rect = [15.5 + 45, 181 + 5, 4.5, 5];
      doc.rect(15 + 45, 181 + 5, 5, 5);
      check6.multiline = false;
      check6.fieldName = "check123";
      check6.maxFontSize = 10;
      doc.addField(check6);
      if (dutiesPerformed.includes('123')) { check6.value = "X" }

      doc.text("128 - Bed Mobility", 22 + 90, 184.5 + 5);
      var check7 = new AcroForm.TextField();
      check7.Rect = [15.5 + 90, 181 + 5, 4.5, 5];
      doc.rect(15 + 90, 181 + 5, 5, 5);
      check7.multiline = false;
      check7.fieldName = "check128";
      check7.maxFontSize = 10;
      doc.addField(check7);
      if (dutiesPerformed.includes('128')) { check7.value = "X" }

      doc.text("140 - Supervision/Coaching", 22 + 135, 184.5 + 5);
      var check8 = new AcroForm.TextField();
      check8.Rect = [15.5 + 135, 181 + 5, 4.5, 5];
      doc.rect(15 + 135, 181 + 5, 5, 5);
      check8.multiline = false;
      check8.fieldName = "check140";
      check8.maxFontSize = 10;
      doc.addField(check8);
      if (dutiesPerformed.includes('140')) { check8.value = "X" }

      doc.text("117 - Managing Finances", 22, 184.5 + 10);
      var check9 = new AcroForm.TextField();
      check9.Rect = [15.5, 181 + 10, 4.5, 5];
      doc.rect(15, 181 + 10, 5, 5);
      check9.multiline = false;
      check9.fieldName = "check117";
      check9.maxFontSize = 10;
      doc.addField(check9);
      if (dutiesPerformed.includes('117')) { check9.value = "X" }

      doc.text("124 - Dressing Lower", 22 + 45, 184.5 + 10);
      var check10 = new AcroForm.TextField();
      check10.Rect = [15.5 + 45, 181 + 10, 4.5, 5];
      doc.rect(15 + 45, 181 + 10, 5, 5);
      check10.multiline = false;
      check10.fieldName = "check124";
      check10.maxFontSize = 10;
      doc.addField(check10);
      if (dutiesPerformed.includes('124')) { check10.value = "X" }

      doc.text("129 - Eating", 22 + 90, 184.5 + 10);
      var check11 = new AcroForm.TextField();
      check11.Rect = [15.5 + 90, 181 + 10, 4.5, 5];
      doc.rect(15 + 90, 181 + 10, 5, 5);
      check11.multiline = false;
      check11.fieldName = "check129";
      check11.maxFontSize = 10;
      doc.addField(check11);
      if (dutiesPerformed.includes('129')) { check11.value = "X" }

      doc.text("141 - Incontinence Care", 22 + 135, 184.5 + 10);
      var check12 = new AcroForm.TextField();
      check12.Rect = [15.5 + 135, 181 + 10, 4.5, 5];
      doc.rect(15 + 135, 181 + 10, 5, 5);
      check12.multiline = false;
      check12.fieldName = "check141";
      check12.maxFontSize = 10;
      doc.addField(check12);
      if (dutiesPerformed.includes('141')) { check12.value = "X" }

      doc.text("119 - Shopping", 22, 184.5 + 15);
      var check13 = new AcroForm.TextField();
      check13.Rect = [15.5, 181 + 15, 4.5, 5];
      doc.rect(15, 181 + 15, 5, 5);
      check13.multiline = false;
      check13.fieldName = "check119";
      check13.maxFontSize = 10;
      doc.addField(check13);
      if (dutiesPerformed.includes('119')) { check13.value = "X" }

      doc.text("125 - Locomotion", 22 + 45, 184.5 + 15);
      var check14 = new AcroForm.TextField();
      check14.Rect = [15.5 + 45, 181 + 15, 4.5, 5];
      doc.rect(15 + 45, 181 + 15, 5, 5);
      check14.multiline = false;
      check14.fieldName = "check125";
      check14.maxFontSize = 10;
      doc.addField(check14);
      if (dutiesPerformed.includes('125')) { check14.value = "X" }

      doc.text("134 - Bathing", 22 + 90, 184.5 + 15);
      var check15 = new AcroForm.TextField();
      check15.Rect = [15.5 + 90, 181 + 15, 4.5, 5];
      doc.rect(15 + 90, 181 + 15, 5, 5);
      check15.multiline = false;
      check15.fieldName = "check134";
      check15.maxFontSize = 10;
      doc.addField(check15);
      if (dutiesPerformed.includes('134')) { check15.value = "X" }

      doc.text("203 - Other", 22 + 135, 184.5 + 15);
      var check16 = new AcroForm.TextField();
      check16.Rect = [15.5 + 135, 181 + 15, 4.5, 5];
      doc.rect(15 + 135, 181 + 15, 5, 5);
      check16.multiline = false;
      check16.fieldName = "check203";
      check16.maxFontSize = 10;
      doc.addField(check16);
      if (dutiesPerformed.includes('203')) { check16.value = "X" }

      doc.text("120 - Transportation", 22, 184.5 + 20);
      var check17 = new AcroForm.TextField();
      check17.Rect = [15.5, 181 + 20, 4.5, 5];
      doc.rect(15, 181 + 20, 5, 5);
      check17.multiline = false;
      check17.fieldName = "check120";
      check17.maxFontSize = 10;
      doc.addField(check17);
      if (dutiesPerformed.includes('120')) { check17.value = "X" }

      doc.text("126 - Transfer", 22 + 45, 184.5 + 20);
      var check18 = new AcroForm.TextField();
      check18.Rect = [15.5 + 45, 181 + 20, 4.5, 5];
      doc.rect(15 + 45, 181 + 20, 5, 5);
      check18.multiline = false;
      check18.fieldName = "check126";
      check18.maxFontSize = 10;
      doc.addField(check18);
      if (dutiesPerformed.includes('126')) { check18.value = "X" }

      doc.text("137 - Lotion/Ointment", 22 + 90, 184.5 + 20);
      var check19 = new AcroForm.TextField();
      check19.Rect = [15.5 + 90, 181 + 20, 4.5, 5];
      doc.rect(15 + 90, 181 + 20, 5, 5);
      check19.multiline = false;
      check19.fieldName = "check137";
      check19.maxFontSize = 10;
      doc.addField(check19);
      if (dutiesPerformed.includes('137')) { check19.value = "X" }

      doc.text("118 - Managing Medications", 22 + 135, 184.5 + 20);
      var check20 = new AcroForm.TextField();
      check20.Rect = [15.5 + 135, 181 + 20, 4.5, 5];
      doc.rect(15 + 135, 181 + 20, 5, 5);
      check20.multiline = false;
      check20.fieldName = "check118";
      check20.maxFontSize = 10;
      doc.addField(check20);
      if (dutiesPerformed.includes('118')) { check20.value = "X" }

      doc.setLineWidth(0.01);
      doc.line(15, 208, 195, 208);

      doc.setFontSize(6);
      doc.text('*I certify that the above information is true and correct to the best of my knowledge', 15, 212);

      doc.line(15, 213, 92, 213);

      // EMPLOYEE SIGNATURE SECTION - Made signature smaller
      doc.setFontSize(10);
      doc.text('Employee Signature:', 15, 224);
      doc.rect(50, 220, 45, 16);
      if (employeeSignatureBase64) doc.addImage(employeeSignatureBase64, 'PNG', 50, 220, 45, 16);

      // Employee Signed Date
      doc.text('Employee Signed Date:', 110, 224);
      var empSignedDate = new AcroForm.TextField();
      empSignedDate.Rect = [155, 220, 40, 6];
      doc.rect(155, 220, 40, 6);
      empSignedDate.multiline = false;
      empSignedDate.value = currentDate;
      empSignedDate.fieldName = "EmployeeDate";
      empSignedDate.maxFontSize = 11.5;
      doc.addField(empSignedDate);

      // NEW: Employee Email - below date (moved down)
      doc.text('Employee Email:', 15, 241);
      var employeeEmail = new AcroForm.TextField();
      employeeEmail.Rect = [50, 237, 80, 6];
      doc.rect(50, 237, 80, 6);
      employeeEmail.multiline = false;
      employeeEmail.value = inputValue.employeeEmail || '';
      employeeEmail.fieldName = "EmployeeEmail";
      employeeEmail.maxFontSize = 11.5;
      doc.addField(employeeEmail);

      // NEW: Employee PIN - next to email
      doc.text('Employee PIN:', 135, 241);
      var employeePIN = new AcroForm.TextField();
      employeePIN.Rect = [165, 237, 20, 6];
      doc.rect(165, 237, 20, 6);
      employeePIN.value = inputValue.employeePIN || '';
      employeePIN.fieldName = "EmployeePIN";
      employeePIN.maxFontSize = 11.5;
      doc.addField(employeePIN);

      // Office Use Only (adjusted y position to accommodate new fields)
      doc.setDrawColor(0);
      doc.setFillColor(160, 160, 160);
      doc.rect(15, 250, 180, 31, "F");
      doc.setFontSize(7);
      doc.setTextColor(227, 0, 0);
      doc.text('OFFICE-USE-ONLY', 105, 254, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      doc.text('Issues:', 17, 254);
      doc.setLineWidth(0.2);
      doc.setDrawColor(255, 255, 255);
      doc.line(15, 256, 195, 256);

      const issues = [
        ["Pending Clock In:", "Pending Clock Out:", "Time Exceeds Authorized Hours:"],
        ["Time Overlap:", "Missing Time (EVV not used):", "Other:"],
        ["Payor:", "Pay Period:"],
        ["Agency Role:", "Approved By:", "Date:"]
      ];

      issues.forEach((issue, index) => {
        doc.text(issue[0], 17, 260 + index * 6);
        doc.text(issue[1], 67, 260 + index * 6);
        if (issue[2]) doc.text(issue[2], 127, 260 + index * 6);
      });

      doc.line(15, 262, 195, 262);
      doc.line(15, 268, 195, 268);
      doc.line(15, 274, 195, 274);
      doc.line(65, 256, 65, 282);
      doc.line(125, 256, 125, 268);

      // Generate blob
      const pdfBlob = doc.output('blob');

      // Prepare form data for backend
      const formData = new FormData();
      formData.append('pdf', pdfBlob, `MissedEVV_${currentDate}.pdf`);
      formData.append('consumerName', inputValue.consumerName || '');
      formData.append('employeeName', inputValue.employeeName || '');
      formData.append('dateOfService', inputValue.dateOfService || '');
      formData.append('issueType', inputValue.issueType || '');

      // Submit to backend for email
      const response = await fetch('https://www.everesthealth.somee.com/api/EvvDocument/submit-evv', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`Success! Form submitted for ${result.consumerName}. An editable PDF has been sent to the company email.`);
        
        // Reset form
        setInputValue({});
        setCheckboxValues({});
        if (consumerSigRef.current) consumerSigRef.current.clear();
        if (employeeSigRef.current) employeeSigRef.current.clear();
        
        // Optionally navigate to home or success page
        navigate('/');
      } else {
        alert(`Error: ${result.message || 'Failed to submit form'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dutyPerformedOptions = [
    { code: "115", label: "Meal Preparation" },
    { code: "116", label: "Housework/Chore" },
    { code: "117", label: "Managing Finances" },
    { code: "118", label: "Managing Medications" },
    { code: "119", label: "Shopping" },
    { code: "120", label: "Transportation" },
    { code: "122", label: "Hygiene" },
    { code: "123", label: "Dressing Upper" },
    { code: "124", label: "Dressing Lower" },
    { code: "125", label: "Locomotion" },
    { code: "126", label: "Transfer" },
    { code: "127", label: "Toilet Use" },
    { code: "128", label: "Bed Mobility" },
    { code: "129", label: "Eating" },
    { code: "134", label: "Bathing" },
    { code: "137", label: "Lotion/Ointment" },
    { code: "138", label: "Laundry" },
    { code: "140", label: "Supervision/Coaching" },
    { code: "141", label: "Incontinence Care" },
    { code: "203", label: "Other" }
  ];

  return (
    <>
    <Navbar />
    <div className='bg-light min-vh-100 py-4'>
      <div className='container' style={{ maxWidth: '950px' }}>
        <form id='missed-evv-form' className='bg-white shadow-sm rounded p-4' onSubmit={handleSubmit}>
          
          {/* Header */}
          <div className='text-center mb-4'>
            <h2 className='fw-bold mb-2' style={{ color: '#00bcd4', fontSize: '28px' }}>MISSED EVV FORM</h2>
           
          </div>

          {/* Issue Type */}
          <div className='mb-3'>
            <label className='fw-bold mb-2' style={{ color: '#00bcd4', fontSize: '16px' }}>Issue Type:</label>
            <div className='d-flex gap-4 flex-wrap'>
              <div className='form-check'>
                <input 
                  className='form-check-input' 
                  type='radio' 
                  name='issueType' 
                  id='missedIn'
                  value='Missed In'
                  checked={inputValue.issueType === 'Missed In'}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='missedIn'>Missed In</label>
              </div>
              <div className='form-check'>
                <input 
                  className='form-check-input' 
                  type='radio' 
                  name='issueType' 
                  id='missedOut'
                  value='Missed Out'
                  checked={inputValue.issueType === 'Missed Out'}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='missedOut'>Missed Out</label>
              </div>
              <div className='form-check'>
                <input 
                  className='form-check-input' 
                  type='radio' 
                  name='issueType' 
                  id='missedInAndOut'
                  value='Missed In and Out'
                  checked={inputValue.issueType === 'Missed In and Out'}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='missedInAndOut'>Missed In and Out</label>
              </div>
              <div className='form-check'>
                <input 
                  className='form-check-input' 
                  type='radio' 
                  name='issueType' 
                  id='otherIssue'
                  value='Other Issue'
                  checked={inputValue.issueType === 'Other Issue'}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='otherIssue'>Other Issue</label>
              </div>
            </div>
          </div>

          {/* Consumer Info */}
          <div className='row mb-3'>
            <div className='col-md-8 mb-3'>
              <label className='form-label fw-bold'>Consumer Name <span className='text-danger'>*</span></label>
              <input 
                type='text' 
                className='form-control' 
                name='consumerName' 
                value={inputValue.consumerName || ''} 
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-4 mb-3'>
              <label className='form-label fw-bold'>Medicaid ID</label>
              <input 
                type='text' 
                className='form-control' 
                name='medicaidId' 
                value={inputValue.medicaidId || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Service Location, City, State, ZIP in one row */}
          <div className='row mb-3'>
            <div className='col-md-5 mb-3'>
              <label className='form-label fw-bold'>Service Location</label>
              <input 
                type='text' 
                className='form-control' 
                name='serviceLocation' 
                value={inputValue.serviceLocation || ''} 
                onChange={handleChange}
              />
            </div>
            <div className='col-md-3 mb-3'>
              <label className='form-label fw-bold'>City</label>
              <input 
                type='text' 
                className='form-control' 
                name='city'
                value={inputValue.city || ''}
                onChange={handleChange} 
              />
            </div>
            <div className='col-md-2 mb-3'>
              <label className='form-label fw-bold'>State</label>
              <input 
                type='text' 
                className='form-control' 
                name='state' 
                value={inputValue.state || ''} 
                onChange={handleChange}
              />
            </div>
            <div className='col-md-2 mb-3'>
              <label className='form-label fw-bold'>ZIP</label>
              <input 
                type='text' 
                className='form-control' 
                name='zip' 
                value={inputValue.zip || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Employee Info & Times */}
          <div className='row mb-3'>
            <div className='col-md-6 mb-3'>
              <label className='form-label fw-bold'>Employee Name (PRINT) <span className='text-danger'>*</span></label>
              <input 
                type='text' 
                className='form-control' 
                name='employeeName' 
                value={inputValue.employeeName || ''} 
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-6 mb-3'>
              <label className='form-label fw-bold'>Last Four SSN</label>
              <input 
                type='text' 
                className='form-control' 
                name='lastFourSSN' 
                maxLength='4'
                value={inputValue.lastFourSSN || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-4 mb-3'>
              <label className='form-label fw-bold'>Date of Service <span className='text-danger'>*</span></label>
              <input 
                type='date' 
                className='form-control' 
                name='dateOfService' 
                value={inputValue.dateOfService || ''} 
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-4 mb-3'>
              <label className='form-label fw-bold'>Missed In Time</label>
              <input 
                type='time' 
                className='form-control' 
                name='missedInTime' 
                value={inputValue.missedInTime || ''} 
                onChange={handleChange}
              />
            </div>
            <div className='col-md-4 mb-3'>
              <label className='form-label fw-bold'>Missed Out Time</label>
              <input 
                type='time' 
                className='form-control' 
                name='missedOutTime' 
                value={inputValue.missedOutTime || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Total Hours */}
          <div className='row mb-3'>
            <div className='col-md-4 mb-3'>
              <label className='form-label fw-bold'>Total Hours Worked</label>
              <input 
                type='text' 
                className='form-control' 
                name='totalHoursWorked' 
                value={inputValue.totalHoursWorked || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Reason */}
          <div className='mb-3'>
            <label className='form-label fw-bold'>Describe the reason in detail:</label>
            <textarea 
              className='form-control' 
              name='reasonDetail' 
              rows='4'
              value={inputValue.reasonDetail || ''} 
              onChange={handleChange}
            />
          </div>

          {/* Duties Performed */}
          <div className='mb-4'>
            <label className='fw-bold mb-2' style={{ fontSize: '16px' }}>Duties Performed:</label>
            <div className='border rounded p-3' style={{ backgroundColor: '#f8f9fa' }}>
              <div className='row'>
                {dutyPerformedOptions.map((duty, index) => (
                  <div key={index} className='col-md-3 mb-2'>
                    <div className='form-check'>
                      <input 
                        className='form-check-input' 
                        type='checkbox' 
                        name={`duty_${duty.code}`} 
                        id={`duty_${duty.code}`}
                        checked={checkboxValues[`duty_${duty.code}`] || false}
                        onChange={handleChange}
                      />
                      <label className='form-check-label' htmlFor={`duty_${duty.code}`} style={{ fontSize: '13px' }}>
                        {duty.code} - {duty.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Signatures Row - Both Side by Side */}
          <div className='row mb-4'>
            {/* Consumer Signature */}
            <div className='col-md-6 mb-3'>
              <h6 className='fw-bold mb-3'>Consumer Signature:</h6>
              
              <div className='border rounded p-2 mb-3' style={{ backgroundColor: '#fff' }}>
                <SignatureCanvas 
                  ref={consumerSigRef}
                  canvasProps={{
                    className: 'signature-canvas',
                    style: { width: '100%', height: '120px', border: '1px solid #ccc' }
                  }}
                />
                <button 
                  type='button'
                  onClick={clearConsumerSignature}
                  className='btn btn-sm btn-outline-danger mt-2'
                >
                  Clear Signature
                </button>
              </div>

              <div className='mb-3'>
                <label className='form-label fw-bold'>Consumer PIN:</label>
                <input 
                  type='text' 
                  className='form-control' 
                  name='consumerPIN' 
                  value={inputValue.consumerPIN || ''} 
                  onChange={handleChange}
                />
              </div>

              <div className='mb-3'>
                <label className='form-label fw-bold'>Consumer Email:</label>
                <input 
                  type='email' 
                  className='form-control' 
                  name='consumerEmail' 
                  value={inputValue.consumerEmail || ''} 
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Employee Signature */}
            <div className='col-md-6 mb-3'>
              <h6 className='fw-bold mb-3'>Employee Signature:</h6>
              
              <div className='border rounded p-2 mb-3' style={{ backgroundColor: '#fff' }}>
                <SignatureCanvas 
                  ref={employeeSigRef}
                  canvasProps={{
                    className: 'signature-canvas',
                    style: { width: '100%', height: '120px', border: '1px solid #ccc' }
                  }}
                />
                <button 
                  type='button'
                  onClick={clearEmployeeSignature}
                  className='btn btn-sm btn-outline-danger mt-2'
                >
                  Clear Signature
                </button>
              </div>

              <div className='mb-3'>
                <label className='form-label fw-bold'>Employee PIN:</label>
                <input 
                  type='text' 
                  className='form-control' 
                  name='employeePIN' 
                  value={inputValue.employeePIN || ''} 
                  onChange={handleChange}
                />
              </div>

              <div className='mb-3'>
                <label className='form-label fw-bold'>Employee Email:</label>
                <input 
                  type='email' 
                  className='form-control' 
                  name='employeeEmail' 
                  value={inputValue.employeeEmail || ''} 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Office Use Only - Static/Read-Only Section */}
          <div className='p-4 rounded' style={{ backgroundColor: '#f8f9fa', border: '3px solid #6c757d' }}>
            <h4 className='fw-bold mb-4 text-center' style={{ color: '#6c757d', fontSize: '24px' }}>
              OFFICE USE ONLY
            </h4>
            
            <div className='row'>
              {/* Issue Category */}
              <div className='col-md-4 mb-3'>
                <h6 className='fw-bold mb-3' style={{ fontSize: '14px' }}>Issue Category</h6>
                <div className='mb-2'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Pending Clock-In</label>
                  </div>
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Time Overlap</label>
                  </div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Payor:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Agency Role:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
              </div>

              {/* Details */}
              <div className='col-md-4 mb-3'>
                <h6 className='fw-bold mb-3' style={{ fontSize: '14px' }}>Details</h6>
                <div className='mb-2'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Pending Clock-Out</label>
                  </div>
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Missing Time (EVV not used)</label>
                  </div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Pay Period:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Approved by:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Date:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
              </div>

              {/* Approval */}
              <div className='col-md-4 mb-3'>
                <h6 className='fw-bold mb-3' style={{ fontSize: '14px' }}>Approval</h6>
                <div className='mb-2'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Time Exceeds Authorized Hours</label>
                  </div>
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' disabled />
                    <label className='form-check-label'>Other</label>
                  </div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Pay Period:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Approved by:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
                <div className='mb-2'>
                  <label className='form-label fw-bold small'>Date:</label>
                  <div className='p-2 bg-white border rounded' style={{ minHeight: '38px' }}></div>
                </div>
              </div>
            </div>

            <div className='text-center mt-3'>
              <p className='text-muted small fst-italic mb-0'>
                This section will be completed by office staff after form submission
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className='d-flex gap-3 justify-content-center my-4'>
            <button 
              type='submit'
              className='btn btn-success px-5 py-3'
              disabled={isSubmitting}
              style={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                'Submit Form'
              )}
            </button>
          </div>

          <div className='text-center text-muted small mb-3'>
            <p className='mb-0'>* Required fields</p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default MissedEvv;