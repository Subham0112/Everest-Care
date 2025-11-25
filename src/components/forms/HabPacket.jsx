
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/signatureCanvas.css";

const InputFields=({label, inputId, inputName, value, onChange}) => {
  return (
      <div className='col-md-4'>
      <label htmlFor={inputId} className="form-label fw-semibold">
                   {label}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={inputId}
                    name={inputName}
                    value={value || ""}
                    onChange={onChange}
                  />
                  </div>
  )
}

const TextAreaFields=({label, inputId, inputName, value, onChange}) => {
  return (
      <div className='col-md-9'>
      <label htmlFor={inputId} className="form-label fw-semibold">
                   {label}
                  </label>
                  <textarea
                    type="text"
                    rows="5"
                    className="form-control"
                    id={inputId}
                    name={inputName}
                    value={value || ""}
                    onChange={onChange}
                  />
                  </div>
  )
}

const InputDate=({dateId, dateName, dateLabel, value, onChange})=>{
  return(
    <div className='col-md-4'>
      <label htmlFor={dateId} className="form-label fw-semibold">
                     {dateLabel}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id={dateId}
                      name={dateName}
                      value={value || ""}
                      onChange={onChange}
                    />
        </div>
  )
}

const InputCheckboxes=({checkId, checkName, checkLabel, className, checked, onChange})=>{
    return(
      <div className={`d-flex gap-2 `}>
                  <input
                    type="checkbox"
                    id={checkId}
                    name={checkName}
                    checked={checked}
                    onChange={onChange}
                  />
                  <label htmlFor={checkId} className={`form-check-label ${className}`}>
                  {checkLabel}
                  </label>
                </div>
    )
}

const SignatureCanvas = ({ label, name }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDate, setSignatureDate] = useState("");
  const [hasSignature, setHasSignature] = useState(false);
  const savedDrawingRef = useRef(null); // Store the drawing data

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const resizeCanvas = () => {
      // Save current drawing before resize
      const tempData = savedDrawingRef.current || (hasSignature ? canvas.toDataURL() : null);
      
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.imageSmoothingEnabled = true;
      
      // Restore drawing after resize
      if (tempData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = tempData;
      }
    };

    setTimeout(resizeCanvas, 50);
    
    // Only resize on actual window resize, not on every render
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []); // Remove hasSignature from dependencies

  // Save drawing data periodically
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      savedDrawingRef.current = canvas.toDataURL();
    }
  };

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Prevent default to stop scrolling on mobile
    if (e.touches) {
      e.preventDefault();
      return {
        x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    return { 
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent scrolling on mobile
    setIsDrawing(true);
    setHasSignature(true);
    
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault(); // Prevent scrolling on mobile
    if (!isDrawing) return;
    
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (e) e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    saveDrawing(); // Save when user stops drawing
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDate("");
    setHasSignature(false);
    savedDrawingRef.current = null;
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSignatureDate(date);
  };

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold mb-2">{label}</label>
      <div
        className="position-relative mb-3 signature-canvas-wrapper"
        data-name={name}
      >
        <canvas
          ref={canvasRef}
          height={100}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          className="border rounded bg-white w-100"
          style={{ 
            height: "100px", 
            touchAction: "none", 
            cursor: "crosshair",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none"
          }}
        />
        <button
          type="button"
          onClick={clearSignature}
          className="signatureClear btn btn-sm btn-outline-danger position-absolute"
          style={{ top: "5px", right: "5px", zIndex: 10 }}
        >
          Clear
        </button>
      </div>

      <div>
        <label htmlFor={`${name}Date`} className="form-label fw-semibold">
          Date
        </label>
        {signatureDate ? (
          <p className="signature-date-text">{signatureDate}</p>
        ) : (
          <input
            type="date"
            className="form-control signature-date-input"
            id={`${name}Date`}
            name={`${name}Date`}
            value={signatureDate}
            onChange={handleDateChange}
          />
        )}
      </div>
    </div>
  );
};

const HabPacket = () => {
  const navigate = useNavigate();
  const { formType } = useParams();
  const [inputValue, setInputValue] = useState({});
  const [checkboxValues, setCheckboxValues] = useState({});
  const [previewHtml, setPreviewHtml] = useState(null);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);

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

  const tableFields = [
    {tableName:"Consumer Face Sheet (Demographics)"},
    {tableName:"Copy of ISP (Individual Support Plan)"},
    {tableName:"Habilitation Goals and Outcomes (from ISP)"},
    {tableName:"Habilitation Daily/Monthly Progress Notes Template"},
    {tableName:"Service Note Log Sheet"},
    {tableName:"Consent for Services"},
    {tableName:"HIPAA Acknowledgment & Consent Form"},
    {tableName:"Emergency Contact Information Form"},
    {tableName:"Emergency Medical Plan"},
    {tableName:"Medication Administration Record (if applicable)"},
    {tableName:"Doctor's Orders (if required for services)"},
    {tableName:"Behavior Support Plan (if applicable)"},
    {tableName:"Incident Management Acknowledgment"},
    {tableName:"Rights of Individuals Receiving Services"},
    {tableName:"Grievance Policy Acknowledgment"},
    {tableName:"Orientation Acknowledgment"},
    {tableName:"Staff Signature Sheet (who provides services)"},
    {tableName:"Training Verification for Staff Assigned to Consumer"},
    {tableName:"Photo Consent/Refusal Form"},
    {tableName:"Copy of Insurance Card and State ID"},
    {tableName:"Copy of Social Security Card"},
    {tableName:"Emergency Evacuation Plan (home specific)"}
  ];
  const tableFields2=[
    {tableName:"Backup Plan / Contingency Plan"},
    {tableName:"ODP Required Assessments (like SIS, if available)"},
    {tableName:"Service Location & Community Integration Preferences"},
    {tableName:"Most Recent ISP Signature Page"},
    {tableName:"Team Contact List"},
  ]



  const handleDone = () => {
    const originalForm = document.getElementById("habPacket-pdf");
    const clonedForm = originalForm.cloneNode(true);

    // Remove all buttons and interactive elements
    clonedForm.querySelectorAll("button, .btn, .signatureClear").forEach((el) => el.remove());

    // Replace inputs with simple text
    clonedForm.querySelectorAll("input[type='text'], input[type='tel'], input[type='date'], input[type='number'], input[type='time']").forEach((input) => {
      const span = document.createElement("span");
      span.textContent = input.value || "_____";
      input.replaceWith(span);
    });

    // Replace textareas
    clonedForm.querySelectorAll("textarea").forEach((textarea) => {
      const div = document.createElement("div");
      div.textContent = textarea.value || "[No data provided]";
      div.style.cssText = "margin: 0 0 8px 0; white-space: pre-wrap; border: 1px solid #ced4da; background: #ffffff;";
      textarea.replaceWith(div);
    });

    // Replace file inputs
    clonedForm.querySelectorAll("input[type='file']").forEach((fileInput) => {
      const span = document.createElement("span");
      span.textContent = fileInput.files.length > 0 ? `${fileInput.files.length} file(s) attached` : "[No file attached]";
      fileInput.replaceWith(span);
    });

    // Replace checkboxes with symbols
    clonedForm.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      const span = document.createElement("span");
      span.textContent = checkbox.checked ? "☑ " : "☐ ";
      span.style.cssText = "font-size: 14pt; margin-right: 5px; display: inline;";
      
      const label = checkbox.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.insertBefore(span, label.firstChild);
        checkbox.remove();
      } else {
        checkbox.replaceWith(span);
      }
    });

    // Replace radio buttons with symbols
    clonedForm.querySelectorAll("input[type='radio']").forEach((radio) => {
      const span = document.createElement("span");
      span.textContent = radio.checked ? "◉ " : "○ ";
      span.style.cssText = "font-size: 14pt; margin-right: 5px; display: inline;";
      
      const label = radio.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.insertBefore(span, label.firstChild);
        radio.remove();
      } else {
        radio.replaceWith(span);
      }
    });

    // Replace signature canvases
    const canvases = clonedForm.querySelectorAll("canvas");
    const originalCanvases = originalForm.querySelectorAll("canvas");
    
    canvases.forEach((canvas, index) => {
      const originalCanvas = originalCanvases[index];
      
      if (originalCanvas) {
        const img = document.createElement("img");
        img.src = originalCanvas.toDataURL("image/png");
        img.style.cssText = "width: 200px; height: 80px; border: 1px solid #000; display: block; margin: 5px 0;";
        canvas.replaceWith(img);
      }
    });

    // Replace signature dates
    clonedForm.querySelectorAll(".signature-date-text").forEach((dateText) => {
      const span = document.createElement("span");
      span.textContent = dateText.textContent;
      dateText.replaceWith(span);
    });

    // Remove date inputs
    clonedForm.querySelectorAll(".signature-date-input").forEach((el) => el.remove());

    setPreviewHtml(clonedForm.innerHTML);
    setIsPreviewEnabled(true);
    alert('Preview has been generated! Click "See Preview" to view it.');
  };

  const handlePreview = () => {
    if (!previewHtml) {
      alert('Please click "Done" first to generate the preview.');
      return;
    }

    const targetPath = `/preview/${formType}`;
    console.log("Attempting to navigate to:", targetPath);
    console.log("formType value is:", formType);

    navigate(targetPath, { state: { previewHtml: previewHtml } });
  };

  return (
    <div className='bg-light  min-vh-100'>
      <div className='container-fluid full-form'>
        <form id='habPacket-pdf' className='bg-white habpacketPdf shadow-sm rounded-3 p-4 py-2'>
 
{/* HAB Consumer Packet – Checklist of Required Documents: */}
<section className='my-4'>
  <h4 className='text-info'>HAB Consumer Packet – Checklist of Required Documents:</h4>
  <div className='table-responsive'>
    <table className='table table-striped table-bordered'>
      <thead>
        <tr className='table-info text-center fw-bold'>
          <td>S.no</td>
          <td>Documents/Assesments</td>
          <td>Completed</td>
        </tr>
      </thead>
      <tbody>
        {tableFields.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.tableName}</td>
            <td className='text-center'><input type='checkbox'
                id={`tableCheckbox-${index}`}
            name={`tableCheckbox_${index}`}
            checked={checkboxValues[`tableCheckbox_${index}`]}
             onChange={handleChange}
            /></td>
          </tr>
        ))}
      </tbody>
      <tbody className='pdf-page-break'>
        {tableFields2.map((item, index) => (
          <tr key={index}>
            <td>{index + 23}</td>
            <td>{item.tableName}</td>
            <td className='text-center'><input type='checkbox'
                id={`tableCheckbox2-${index}`}
            name={`tableCheckbox2_${index}`}
            checked={checkboxValues[`tableCheckbox2_${index}`]}
             onChange={handleChange}
            /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


{/* 1. Consumer Face Sheet (Demographics) */}
<div className='pdf-page-break'>
<section className='my-4'>
  <h3 className='text-info'>1. Consumer Face Sheet (Demographics)</h3>
  <div className='row row-cols-2 g-3'>
    <InputFields label='Consumer Name' inputId='ConsumerName' inputName='ConsumerName' value={inputValue.ConsumerName} onChange={handleChange}/>
    <InputDate dateLabel='DOB' dateId='dateOfBirth' dateName='dateOfBirth' value={inputValue.dateOfBirth} onChange={handleChange}/>
    <InputFields label='MA#' inputId='maNumber' inputName='maNumber' value={inputValue.maNumber} onChange={handleChange}/>
    <InputFields label='Phone' inputId='phoneNo' inputName='phoneNo' value={inputValue.phoneNo} onChange={handleChange}/>
    <InputFields label='Address' inputId='address' inputName='address' value={inputValue.address} onChange={handleChange}/>
    <InputFields label='Primary Contact ' inputId='primaryContact' inputName='primaryContact' value={inputValue.primaryContact} onChange={handleChange}/>
    <InputFields label='Emergency Contact (Name/Phone/Relationship):' inputId='emergencyContact' inputName='emergencyContact' value={inputValue.emergencyContact} onChange={handleChange}/>
    <InputFields label='Support Coordinator' inputId='supportCoordinator' inputName='supportCoordinator' value={inputValue.supportCoordinator} onChange={handleChange}/>
    <InputFields label='Daignosis' inputId='daignosis' inputName='daignosis' value={inputValue.daignosis} onChange={handleChange}/>
  </div>
  </section>
<hr />

{/* 2.ISP (Individual Support Plan) */}
    <section>
      <div className='mb-4'>
        <h3 className='text-info'>2.ISP (Individual Support Plan)</h3>
      </div>
    </section>
    <hr />

    {/* 3.Habilitation Goals and Outcomes (from ISP) */}
    <section>
        <div className='mb-4'>
          <h3 className='text-info'>3.Habilitation Goals and Outcomes (from ISP)</h3>
          <div className='mb-3 '>
            <TextAreaFields label="Goals" inputId="goals" inputName="goals" value={inputValue.goals} onChange={handleChange}/>
            <TextAreaFields label="Objectives" inputId="objectives" inputName="objectives" value={inputValue.objectives} onChange={handleChange}/>
            <InputFields label="Staff Support Instructions:" inputId="staffSupportInstructions" inputName="staffSupportInstructions"
            value={inputValue.staffSupportInstructions} onChange={handleChange}
            />
            <InputFields label="Frequency" inputId="frequency" inputName="frequency"
            value={inputValue.frequency} onChange={handleChange}
            />
            <InputFields label="Measurement Method:" inputId="measurementMethod" inputName="measurementMethod" value={inputValue.measurementMethod} onChange={handleChange}
            />
          </div>
          <span className='text-secondary mt-5'>(Repeat for each goal)</span>

        </div>
    </section>
    
        <hr  />

        {/* 4.Habilitation Daily/Monthly Progress Notes Template */}
       
        <section>
            <div className='mb-4'>
              <h3 className='text-info'>4.Habilitation Daily/Monthly Progress Notes Template</h3>
              <div className='mb-3 '>
              <InputDate dateLabel="Date" dateId="date_hab" dateName="date_hab" value={inputValue.date_hab} onChange={handleChange}/>
              <InputFields label="Time Out" inputId="timeOut_hab" inputName="timeOut_hab" value={inputValue.timeOut_hab} onChange={handleChange}
              />
              <InputFields label="Time In" inputId="timeIn_hab" inputName="timeIn_hab" value={inputValue.timeIn_hab} onChange={handleChange}
              />
                </div>
            </div>
            </section>
          </div>
           <div className="pdf-page-break">
            <div>
              <TextAreaFields label="Summary of Activities" inputId="summaryOfActivities_hab" inputName="summaryOfActivities_hab" value={inputValue.summaryOfActivities_hab} onChange={handleChange}/>
              <TextAreaFields label="Progress Toward Goals:" inputId="progressTowardGoals_hab" inputName="progressTowardGoals_hab" value={inputValue.progressTowardGoals_hab} onChange={handleChange}/>
              <InputFields label="Staff Initials:" inputId="staffInitials_hab" inputName="staffInitials_hab" value={inputValue.staffInitials_hab} onChange={handleChange}
              />
              </div>
            
            <hr  />

            {/* 5. Service Note Log Sheet */}

            <section>
              <div className='mb-4'>
                <h3 className='text-info'>5. Service Note Log Sheet</h3>
                <div className='mb-3 '>
                <InputDate dateLabel="Date" dateId="date_service" dateName="date_service" value={inputValue.date_service} onChange={handleChange}/>
                <InputFields label="Time In" inputId="timeIn_service" inputName="timeIn_service" value={inputValue.timeIn_service} onChange={handleChange}
                />
                <InputFields label="Time Out" inputId="timeOut_service" inputName="timeOut_service" value={inputValue.timeOut_service} onChange={handleChange}
                />
                <TextAreaFields label="Service Provided" inputId="serviceProvided" inputName="serviceProvided" value={inputValue.serviceProvided} onChange={handleChange}/>
                <div className='col-md-3'>
                <SignatureCanvas label="Staff Signature" name="staffSignature"/>
                </div>
                </div>
              </div>
                
            </section>
          <hr  /> 
       
            {/* 6. Consent for Services Agreement */}

            <section >
              <div>
                <h3 className='text-info'>6. Consent for Services Agreement</h3>
                <p className='text-secondary'>
                  This Consent for Services ("Agreement") is entered into between the Provider and the Consumer as part of the Service Agreement (ISP) and is applicable to the outlined in the Individual Support Plan (ISP) authorized by the Office of Developmental Programs (ODP).
                </p>
                <div className='mb-3'>
                  <h5 className='fw-bolder'>Consumer Information</h5>
                  <div className='row row-cols-2 g-2'>
                <InputFields label="Full Name of Consumer:" inputId="fullNameOfConsumer" inputName="fullNameOfConsumer" value={inputValue.fullNameOfConsumer} onChange={handleChange}
                />
                <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_consent" dateName="dateOfBirth_consent" value={inputValue.dateOfBirth_consent} onChange={handleChange}/>
                <InputFields label="MA Number:" inputId="maNumber_consent" inputName="maNumber_consent" value={inputValue.maNumber_consent} onChange={handleChange}
                />
                </div>
                </div>
                <div className='mb-3'>
                  <h6 className='fw-bolder'>Provider Information</h6>
                  <div className='row row-cols-2 g-2'>
                <InputFields label="Provider Name:" inputId="providerName" inputName="providerName" value={inputValue.providerName} onChange={handleChange}/>
                <InputFields label="Contact Number:" inputId="contactNumber" inputName="contactNumber" value={inputValue.contactNumber} onChange={handleChange}/>
                <InputFields label="Address:" inputId="providerAddress" inputName="providerAddress" value={inputValue.providerAddress} onChange={handleChange}/>
                </div>
                </div>
              </div>
            </section>
             </div>
                {/*page break  */}
                <div className='pdf-page-break'>
                <div className='mb-3'>
                  <h6 className='fw-bolder'>1. Purpose of the Service</h6>
                  <p className='text-secondary'>
                    The Provider agrees to deliver habilitation services that promote independence, skill-building, and inclusion in accordance with the Consumer’s ISP. These services are person-centered and will be implemented in accordance with the policies and procedures outlined by ODP.
                  </p>
                </div>
          
                <div className='mb-3'>
                  <h6 className='fw-bolder'>2.Nature of Services</h6>
                  <p className='text-secondary'>
                    Habilitation services may include, but are not limited to:
                  </p>
                   <ul className="text-secondary">
                  <li className="mb-2">
                    Skill acquisition and support
                  </li>
                  <li className="mb-2">
                    Community integration
                  </li>
                  <li className="mb-2">
                   Self-help and adaptive skills training
                  </li>
                  <li className="mb-2">
                  Communication and socialization supports
                  </li>
                  <li className="mb-2">
                    Health and safety education
                  </li>
                  </ul>
                </div>
                <div className='mb-3'>
                  <h6 className='fw-bolder'>3. Consumer Rights</h6>
                  <p className='text-secondary'>
                   The Consumer has the right to:
                  </p>
                   <ul className="text-secondary">
                  <li className="mb-2">
                    Be treated with dignity and respect
                  </li>
                  <li className="mb-2">
                   Refuse services at any time
                  </li>
                  <li className="mb-2">
                   Receive services in the least restrictive environment
                  </li>
                  <li className="mb-2">
                  File grievances or complaints without retaliation
                  </li>
                  <li className="mb-2">
                    Confidentiality of records and information
                  </li>
                  </ul>
                </div>
                <div className='mb-3'>
                  <h6 className='fw-bolder'>4. Risks and Responsibilities</h6>
                  <p className='text-secondary'>
                  The Consumer understands:
                  </p>
                   <ul className="text-secondary">
                  <li className="mb-2">
                    Participation in services is voluntary.
                  </li>
                  <li className="mb-2">
                  The Provider will take reasonable precautions to ensure safety during services.
                  </li>
                  <li className="mb-2">
                  The Consumer and/or legal guardian is responsible for providing accurate and updated medical and emergency information.
                  </li>
                  </ul>
                </div>
                <div className='mb-3'>
                <h6 className='fw-bolder'>5. Confidentiality</h6>
                <p className='text-secondary'>
                  All personal and medical information will be kept confidential in accordance with the Health Insurance Portability and Accountability Act (HIPAA) and ODP requirements.
                </p>
                </div>
                <div className='mb-3'>
                <h6 className='fw-bolder'>6. Consent to Treatment and Services</h6>
                <p className='text-secondary'>
                  By signing this document, the Consumer (or their legal guardian) acknowledges and consents to:
                </p>
                <ul className='text-secondary'>
                  <li>Participation in services as outlined in the ISP</li>
                  <li>Communication between the Provider, Support Coordinator, and other ISP team members</li>
                  <li>Documentation of services and progress by the Provider</li>
                  </ul>
                </div>
                <div className='mb-3'>
                <h6 className='fw-bolder'>7. Duration and Termination of Consent</h6>
                <p className='text-secondary'>
                  This consent remains in effect until:
                </p>
                <ul className='text-secondary'>
                  <li>Services are discontinued or terminated by either party</li>
                  <li>The Consumer or legal guardian withdraws consent in writing</li>
                  <li>The ISP changes significantly, requiring updated consent</li>
                  </ul>
                </div>
                </div>

                {/* page break */}
                <div className="pdf-page-break">
                <div >
              <div className='mb-3'>
                <h6 className='fw-bolder'>8.Acknowledgment and Agreement</h6>
                <p className='text-secondary'>
                  I, the Consumer (or legal guardian), acknowledge that I have read and understand the information above. I have had the opportunity to ask questions, and all questions have been answered to my satisfaction. I voluntarily give consent for the provision of habilitation services by the Provider.
                </p>
                </div>

                <div className='mb-3'>
                  <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName" inputName="consumer_guardianName" value={inputValue.consumer_guardianName} onChange={handleChange} 
                  />
                  <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="signature_consent"/>
                  </div>
                </div>
                <div className='mb-3'>
                  <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName" inputName="providerRepresentativeName"
                  value={inputValue.providerRepresentativeName} onChange={handleChange}
                  />
                  <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="providerSignature_consent"/>
                  </div>
                </div>
                </div>
                
            
          <hr />

          {/* HIPAA Acknowledgment & Consent Form */}
          <section>
            <div className='mb-4'>
              <h5 className='text-info'>7. HIPAA Acknowledgment & Consent Form</h5>
              <p className='text-secondary'>(Health Insurance Portability and Accountability Act of 1996)</p>
              <div className='mb-3 '>
                <h6 className='fw-bolder'> Consumer Information</h6>
              <InputFields label="Consumer Name:" inputId="consumerName_hippa" inputName="consumerName_hippa" value={inputValue.consumerName_hippa} onChange={handleChange}
              />
              <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_hippa" dateName="dateOfBirth_hippa" value={inputValue.dateOfBirth_hippa} onChange={handleChange}/>
              <InputFields label="MA Number:" inputId="maNumber_hippa" inputName="maNumber_hippa" value={inputValue.maNumber_hippa} onChange={handleChange}
              />
              </div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'> Provider Information</h6>
              <InputFields label="Provider Name:" inputId="providerName_hippa" inputName="providerName_hippa" value={inputValue.providerName_hippa} onChange={handleChange}
              />
              <InputFields label="Contact Number:" inputId="contactNumber_hippa" inputName="contactNumber_hippa" value={inputValue.contactNumber_hippa} onChange={handleChange}
              />
              <InputFields label="Address:" inputId="providerAddress_hippa" inputName="providerAddress_hippa" value={inputValue.providerAddress_hippa} onChange={handleChange}
              />
              </div>
              <div className='mb-3 '>
              <h6 className='fw-bolder'>1. Purpose of this Form</h6>
              <p className='text-secondary'>
                This form serves as an acknowledgment that the Consumer (or legal guardian) has received, reviewed, and understands the Notice of Privacy Practices from the Provider in compliance with the Health Insurance Portability and Accountability Act (HIPAA). This form also provides consent for the Provider to use and disclose protected health information (PHI) for purposes related to treatment, payment, and healthcare operations.
              </p>
              </div>
               </div>
            </section>
              </div>

              {/* page break */}
              <div className='pdf-page-break'>
              <div className='mb-3 '>
              <h6 className='fw-bolder'>2. Acknowledgment of Receipt of Notice of Privacy Practices</h6>
              <p className='text-secondary'>
               By signing below, I acknowledge that I have received and reviewed a copy of the Provider's Notice of Privacy Practices which describes how my personal health information may be used and disclosed, and how I may access this information.
              </p>
              </div>
              <div className='mb-3 '>
              <h6 className='fw-bolder'>3. Consent to Use and Disclosure of Health Information</h6>
              <p className='text-secondary'>
              I understand and consent that the Provider may use and disclose my PHI:
              </p>
              <ul className='text-secondary'>
                <li>To provide treatment and coordinate care</li>
                <li>To obtain payment for services rendered</li>
                <li>To carry out administrative and healthcare operations</li>
                <li>To communicate with other members of my ISP team including doctors, support coordinators, therapists, and other providers</li>
                <li>As required or permitted by law (e.g., for mandated reporting, audits, or court orders)</li>
              </ul>
              </div>
 
         
              {/* page break */}
              <section className='pdf-page-break'>
                 <div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>4. Consumer Rights Under HIPAA </h6>
                <p className='text-secondary'>
                  I understand that I have the right to:
                </p>
                 <ul className='text-secondary'>
                  <li>Request restrictions on how my PHI is used or shared.</li>
                  <li>Request confidential communications</li>
                  <li>Inspect and obtain a copy of my PHI.</li>
                  <li>Request corrections to my PHI.</li>
                  <li>Receive a record of disclosures made.</li>
                  <li>File a complaint with the Provider or the U.S. Department of Health and Human Services (HHS) if I believe my privacy rights have been violated</li>
                  </ul>
            
              </div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>5. Revocation of Consent </h6>
                <p className='text-secondary'>
                 I understand that I have the right to revoke this consent at any time by submitting a written request to the Provider. I understand that revocation will not apply to actions already taken in reliance on this consent
                </p>
              </div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>6. Duration of Consent</h6>
                <p className='text-secondary'>
                 This consent will remain in effect for the duration of services unless revoked in writing or otherwise required by law.
                </p>
              </div>
         
              <div className='mb-3 '>
                <h6 className='fw-bolder'>7. Additional Disclosure Authorizations</h6>
                <p className='text-secondary'>
                 (Optional. Check any that apply)
                </p>
                <div>
                  <InputCheckboxes checkId="disclosueAuthorization1" checkName="disclosueAuthorization1" checkLabel="I authorize the Provider to communicate with my emergency contact in the event of a health or safety concern." checked={checkboxValues.disclosueAuthorization1} onChange={handleChange}/>
                  <InputCheckboxes checkId="disclosueAuthorization2" checkName="disclosueAuthorization2" checkLabel="I authorize the Provider to share relevant health information with other providers for care coordination." checked={checkboxValues.disclosueAuthorization2} onChange={handleChange}/>
                  <InputCheckboxes checkId="disclosueAuthorization3" checkName="disclosueAuthorization3" checkLabel="I do not authorize any additional disclosures beyond those required for treatment, payment, and healthcare operations." checked={checkboxValues.disclosueAuthorization3} onChange={handleChange}/>
                </div>
              </div>
                   </div>
          </section>
          </div>

          {/* page break */}
          <div className="pdf-page-break">
              <div className='mb-3 '>
                <h6 className='fw-bolder'>Acknowledgment and Consent</h6>
                <p className='text-secondary'>I, the Consumer (or legal guardian), certify that I have read and understood this document, and that I voluntarily consent to the use and disclosure of my health information as outlined above.</p>
              </div>
              <div className='mb-3 '>
                <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_hippa" inputName="consumer_guardianName_hippa" value={inputValue.consumer_guardianName_hippa} onChange={handleChange}
                />
                <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="consumerSignature_hippa"/>
                  </div>
              </div>
            
              <div className='mb-3'>
                <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_hippa" inputName="providerRepresentativeName_hippa" value={inputValue.providerRepresentativeName_hippa} onChange={handleChange}
                />
                <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="providerSignature_hippa"/>
                  </div>
              </div>
          <hr/>

        {/* Emergency Contact Information Form */}
       
        <section>
          <div className='mb-4'>
            <h5 className='text-info'>8. Emergency Contact Information Form</h5>
            <div className='mb-3 d-flex flex-wrap gap-3'>
              <InputFields label="Consumer Name:" inputId="consumerName_emergency" inputName="consumerName_emergency" value={inputValue.consumerName_emergency} onChange={handleChange}
              />
              <InputFields label="Relationship" inputId="relationship_emergency" inputName="relationship_emergency" value={inputValue.relationship_emergency} onChange={handleChange}
              />
              <InputFields label="Phone Number:" inputId="phoneNumber_emergency" inputName="phoneNumber_emergency" value={inputValue.phoneNumber_emergency} onChange={handleChange}
              />
              <InputFields label="Secondary Contact:" inputId="secondaryContact_emergency" inputName="secondaryContact_emergency" value={inputValue.secondaryContact_emergency} onChange={handleChange}
              />
              <InputFields label="Preferred Hospital:" inputId="preferredHospital_emergency" inputName="preferredHospital_emergency" value={inputValue.preferredHospital_emergency} onChange={handleChange}
              />
              </div>
              </div>
              </section>
              <hr />

              {/* Emergency Medical Plan */}
              <section>
                <div className='mb-4'>
                  <h5 className='text-info'>9. Emergency Medical Plan</h5>
                  <div className='mb-3'>
                
                    <InputFields label="Allergies:" inputId="allergies_emergencyMedical" inputName="allergies_emergencyMedical" value={inputValue.allergies_emergencyMedical} onChange={handleChange}
                    />
                    <TextAreaFields label="Medical Conditions:" inputId="medicalConditions_emergencyMedical" inputName="medicalConditions_emergencyMedical"
                    value={inputValue.medicalConditions_emergencyMedical}
                     onChange={handleChange}
                    />
                    <TextAreaFields label="Medications:" inputId="medications_emergencyMedical" inputName="medications_emergencyMedical"
                    value={inputValue.medications_emergencyMedical}
                    onChange={handleChange}
                    />
                    <TextAreaFields label="Emergency Instructions:" inputId="emergencyInstructions_emergencyMedical" inputName="emergencyInstructions_emergencyMedical"
                    value={inputValue.emergencyInstructions_emergencyMedical}
                    onChange={handleChange}
                    />
                    <InputFields label="Hospital Preference" inputId="preferredHospital_emergencyMedical" inputName="preferredHospital_emergencyMedical" value={inputValue.preferredHospital_emergencyMedical} onChange={handleChange}
                    />
                    </div>
                    </div>
                    </section>
                    </div>
                    <hr />
                
                    {/* Medication Administration Record (if applicable) */}
                     <div className='pdf-page-break'>
                    <section>
                      <div className='mb-4'>
                        <h5 className='text-info'>10. Medication Administration Record (if applicable)</h5>
                        <div className='table-responsive'>
                          <table className='table table-striped table-bordered'>
                            <thead>
                              <tr className='table-info text-center fw-bold'>
                                <td width="100">Date</td>
                                <td width="120">Medication Dose</td>
                                <td width="100">Time</td>
                                <td width="150">Administered by</td>
                                <td width="300">Notes</td>
                               
                              </tr>

                            </thead>
                            <tbody>
                              <tr>
                                <td><input type='date' className='form-control' id='date_medication1' name='date_medication1' value={inputValue.date_medication1} onChange={handleChange}/></td>
                                <td><input type='text' className='form-control' id='medication_dose1' name='medication_dose1' value={inputValue.medication_dose1} onChange={handleChange}/></td>
                                <td><input type='time' className='form-control' id='time_medication1' name='time_medication1' value={inputValue.time_medication1} onChange={handleChange}/></td>
                                <td><input type='text' className='form-control' id='administered_by1' name='administered_by1' value={inputValue.administered_by1} onChange={handleChange}/></td>
                                <td style={{minWidth:'250px'}} ><input type='text'className='form-control' id='notes_medication1' name='notes_medication1' value={inputValue.notes_medication1} onChange={handleChange}/></td>
                              </tr>
                              <tr>
                                <td><input type='date' className='form-control' id='date_medication2' name='date_medication2' value={inputValue.date_medication2} onChange={handleChange}
                                /></td>
                                <td><input type='text' className='form-control' id='medication_dose2' name='medication_dose2' value={inputValue.medication_dose2} onChange={handleChange}/></td>
                                <td><input type='time' className='form-control' id='time_medication2' name='time_medication2' value={inputValue.time_medication2} onChange={handleChange}/></td>
                                <td><input type='text' className='form-control' id='administered_by2' name='administered_by2' value={inputValue.administered_by2} onChange={handleChange}/></td>
                                <td style={{minWidth:'250px'}} ><input type='text'className='form-control' id='notes_medication2' name='notes_medication2' value={inputValue.notes_medication2} onChange={handleChange}/></td>
                              </tr>
                              <tr>
                                <td><input type='date' className='form-control' id='date_medication3' name='date_medication3' value={inputValue.date_medication3} onChange={handleChange}/></td>
                                <td><input type='text' className='form-control' id='medication_dose3' name='medication_dose3' value={inputValue.medication_dose3} onChange={handleChange}/></td>
                                <td><input type='time' className='form-control' id='time_medication3' name='time_medication3' value={inputValue.time_medication3} onChange={handleChange}/></td>
                                <td><input type='text' className='form-control' id='administered_by3' name='administered_by3' value={inputValue.administered_by3} onChange={handleChange}/></td>
                                <td style={{minWidth:'250px'}}><input type='text'className='form-control' id='notes_medication3' name='notes_medication3' value={inputValue.notes_medication3} onChange={handleChange}/></td>
                              </tr>
                            </tbody>
                           </table>
                        
                        </div>
                      </div>
                    </section>
                 

                  {/* Doctor’s Orders (if required for services) */}
                  <section>
                    <div className='mb-4'>
                      <h5 className='text-info'>11. Doctor’s Orders (if required for services)</h5>
                      <p className='fst-italic text-secondary fw-semibold'>Attach latest doctor's orders (if applicable)</p>
                    {/* <div class="mb-3">
                    <label for="signedPhysicianOrder" class="form-label">(Attach signed physician orders if applicable)</label>
                    <input class="form-control" type="file" id="signedPhysicianOrder" name='signedPhysicianOrder' multiple />
                   
                    </div> */}
                    </div>
                    </section>
                  <hr />

                {/*  Behavior Support Plan (if applicable) */}
      <section>
        <div className='mb-4'>
          <h5 className='text-info'>12. Behavior Support Plan (if applicable)</h5>
          <p className='fst-italic text-secondary fw-semibold'>Attach latest plan with review dates and signatures</p>
        {/* <div class="mb-3">
        <label for="behaviourSupportPlan_attach" class="form-label">(Attach latest plan with review dates and signatures)</label>
         <input class="form-control" type="file" name='behaviourSupportPlan_attach' id="behaviourSupportPlan_attach" multiple />
         </div> */}
         </div>
    </section>
      
    <hr />
    {/*  Incident Management Acknowledgment */}
    
    <section className='pdf-page-break'>
      <div className='mb-4'>
        <h5 className='text-info'>13. Incident Management Acknowledgment Form</h5>
        <div className='mb-3 '>
        <p className='text-secondary'>For Habilitation Services under the Office of Developmental Programs (ODP)</p>
          <div>
          <h6 className='fw-bolder'> Consumer Information</h6>
            <div className='mb-3 row row-cols-2 g-2'>
              <InputFields label="Full Name of Consumer:" inputId="consumerName_incident" inputName="consumerName_incident" value={inputValue.consumerName_incident} onChange={handleChange}
              />
              <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_incident" dateName="dateOfBirth_incident" value={inputValue.dateOfBirth_incident} onChange={handleChange}/>
              <InputFields label="MA Number:" inputId="maNumber_incident" inputName="maNumber_incident" value={inputValue.maNumber_incident} onChange={handleChange}
              />
            </div>
            <h6 className='fw-bolder'> Provider Information</h6>
            <div className='mb-3'>
              <InputFields label="Provider Name:" inputId="providerName_incident" inputName="providerName_incident" 
              value={inputValue.providerName_incident} onChange={handleChange}
              />
              <InputFields label="Provider Representative:" inputId="providerRepresentName_incident" inputName="providerRepresentName_incident" 
              value={inputValue.providerRepresentName_incident} onChange={handleChange}
              />
            
            </div>
          </div> 
          <div className='mb-3 '>
          <h6 className='fw-bolder'>1. Purpose of this form</h6>
           <p className='text-secondary'>
             This form serves as documentation that the Consumer (or legal guardian) has been informed about the Incident Management Policy and Procedures of the Provider, as required by the Pennsylvania Office of Developmental Programs (ODP). The Consumer acknowledges understanding their rights, protections, and the responsibilities of the Provider regarding incident identification, reporting, and response.
           </p>
         </div>
         <div className='mb-3 '>
           <h6 className='fw-bolder'>2. What is Incident?</h6>
           <p className='text-secondary'>
            According to ODP regulations, an incident is any suspected or actual event that:
           </p>
            <ul className="text-secondary">
             <li className="mb-2">
               Puts the health or safety of the Consumer at risk
             </li>
             <li className="mb-2">
              Results in or has the potential to result in abuse, neglect, injury, or violation of rights
             </li>
             <li className="mb-2">
                Requires immediate response, investigation, and documentation in HCSIS (Home and Community Services Information System)
             </li>
             </ul>
              </div>
                  </div>
        </div>
        </section>
         </div>

          {/* page break */}
         <div className='pdf-page-break'>
         <div className="mb-4">
             <p className='text-secondary fw-bold'>Examples of reportable incidents include (but are not limited to):</p>
             <ul className='text-secondary'>
             <li className="mb-2">
               Abuse (physical, sexual, verbal, emotional)
             </li>
             <li className="mb-2">
                 Neglect
               </li>
             <li className="mb-2">
                Misuse of funds
               </li>
             <li className="mb-2">
                Death or serious injury
               </li>
             <li className="mb-2">
            Missing person
               </li>
             <li className="mb-2">
               Rights violations
               </li>
             <li className="mb-2">
              Restraints or restrictive procedures
               </li>
             </ul>
       </div>
        <div className='mb-3 '>
          <h6 className='fw-bolder'>3. Incident Reporting Responsibilities</h6>
          <p className='text-secondary'>The Provider is responsible for:</p>
          <ul className='text-secondary'>
            <li className="mb-2">
              Recognizing and identifying reportable incidents
            </li>
            <li className="mb-2">
              Reporting incidents to ODP via HCSIS within 24 hours of discovery
            </li>
            <li className="mb-2">
              Notifying the Consumer and their team (including guardians and support coordinators as appropriate)
            </li>
            <li className="mb-2">
           Taking immediate actions to ensure the safety of the Consumer
            </li>
            <li className="mb-2">
           Conducting a thorough investigation and resolution process
            </li>
            <li className="mb-2">
          Maintaining confidentiality throughout the process
            </li>      
          </ul>

        </div>
      
        {/* page-break */}
        
        <div className='mb-3 '>
          <h6 className='fw-bolder'>4. Consumer Rights Regarding Incidents</h6>
          <p className='text-secondary'>  The Consumer has the right to:</p>
           <ul className='text-secondary'>
            <li className="mb-2">
              Be informed of any incident involving them
            </li>
            <li className="mb-2">
              Be protected from retaliation if they report or are involved in a report
            </li>
            <li className="mb-2">
              Receive support services during and after the incident
            </li>
            <li className="mb-2">
             Request a meeting to review the incident and next steps
            </li>
            <li className="mb-2">
           File complaints or grievances about how the incident was handled
            </li>      
            <li className="mb-2">
              Have incidents reviewed by the Provider’s Incident Management Committee and/or Human Rights Committee, if applicable
            </li>      
          </ul>
        </div>
        <div className="mb-3">
          <h6 className="fw-bolder">5. Reporting Channels</h6>
          <p className="text-secondary">The Consumer (or guardian) can report incidents to:</p>
          <ul className="text-secondary">
            <li className="mb-2">
              Provider Staff or Management
            </li>
            <li className="mb-2">
              ODP Regional Office
            </li>
            <li className="mb-2">
              Support Coordinator or Service Coordination Entity
            </li>
            <li className="mb-2">
             Protective Services or Law Enforcement, as needed
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <InputFields label="Emergency Contact (Provider)" inputId="emergencyContact_incident" inputName="emergencyContact_incident" value={inputValue.emergencyContact_incident} onChange={handleChange}

          />
          <p className="text-secondary fw-bold mt-2">ODP Complaint Hotline: 1-888-565-9435</p>
        </div>
</div>

        {/* page break */}
           <section className='pdf-page-break'>
        <div >
        <div className="mb-3">
          <h6 className="fw-bolder">6. Training and Policy Review</h6>
          <p className="text-secondary">I acknowledge that:</p>
          <ul className="text-secondary">
            <li className="mb-2">
              I have been provided a copy and/or explanation of the Provider’s Incident Management Policy
            </li>
            <li className="mb-2">
              I understand the procedures that will be followed in the event of an incident.
            </li>
            <li className="mb-2">
              I know how and where to report concerns, suspicions, or known incidents.
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <h6 className="fw-bolder">Acknowledgment and Consent</h6>
          <p className="text-secondary">I, the Consumer (or legal guardian), confirm that I have received and understand information about Incident Management procedures. I have had the opportunity to ask questions, and I understand that I have the right to be protected and informed if any incident occurs.</p>
        </div>
        <div className="mb-3">
          <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_incident" inputName="consumer_guardianName_incident" value={inputValue.consumer_guardianName_incident} onChange={handleChange}
          />
          <div className='col-md-3'>
          <SignatureCanvas label="Signature" name="signature_incident"/>
          </div>
        </div>
        <div className="mb-3">
          <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_incident" inputName="providerRepresentativeName_incident" value={inputValue.providerRepresentativeName_incident} onChange={handleChange}
          />
          <div className='col-md-3'>
          <SignatureCanvas label="Signature" name="providerSignature_incident"/>  

          </div>
        </div>
       </div>
          <hr />

          {/* Rights of Individuals Receiving Services */}
       
              <h5 className='text-info'>14. Rights of Individuals Receiving Services</h5>
              <div className='mb-3 '>
                <p className='text-secondary m-0'>Acknowledgment Form</p>
                <p className='text-secondary fst-italic mt-0'>(Office of Developmental Programs (ODP) – Habilitation Services)</p>
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'> Consumer Information</h6>
                  <div className='mb-3'>
                  <InputFields label="Consumer Name:" inputId="consumerName_rights" inputName="consumerName_rights" value={inputValue.consumerName_rights} onChange={handleChange}
                  />
                  <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_rights" dateName="dateOfBirth_rights" value={inputValue.dateOfBirth_rights} onChange={handleChange}/>
                  <InputFields label="MA Number:" inputId="maNumber_rights" inputName="maNumber_rights" value={inputValue.maNumber_rights} onChange={handleChange}
                  />
                  </div>
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'> Provider Information</h6>
                  <InputFields label="Provider Name:" inputId="providerName_rights" inputName="providerName_rights" value={inputValue.providerName_rights} onChange={handleChange}
                  />
                  <InputFields label="Provider Representative:" inputId="providerRepresentName_rights" inputName="providerRepresentName_rights" value={inputValue.providerRepresentativeName_rights} onChange={handleChange}
                  />
                </div>
                    </section>


                    {/* page break */}
                    <div className="pdf-page-break">
                    <div className='mb-4'>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>1. Purpose of this form</h6>
                  <p className='text-secondary'>
                    This form documents that the Consumer (or legal guardian) has been informed of their rights as an individual receiving Habilitation services under the Pennsylvania Office of Developmental Programs (ODP). These rights are protected under state and federal laws, including the Americans with Disabilities Act (ADA), the HCBS Final Rule, and ODP regulations.
                  </p>
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>2. Rights of Individuals Receiving Services</h6>
                  <p className='text-secondary'>
                    As a Consumer receiving services through ODP, you have the right to:
                  </p>
                  <ul className='text-secondary'>
                    <li className="mb-2 fw-bold">
                      Dignity, Respect, and Privacy
                    </li>
                    <ul className="text-secondary">
                      <li className="mb-2">
                        Be treated with dignity and respect at all times
                      </li>
                      <li className="mb-2">
                        Have your personal values, cultural background, and religious beliefs honored
                      </li>
                      <li className="mb-2">
                        Receive services in a manner that respects your privacy and promotes your independence
                      </li>
                    </ul>
                    <li className="mb-2 fw-bold">
                     Freedom and Choice
                    </li>
                        <ul className="text-secondary">
                          <li className="mb-2">
                             Make decisions about your life, services, and supports
                          </li>
                          <li className="mb-2">
                               Choose who provides your services, where they are delivered, and how they are delivered
                          </li>
                          <li className="mb-2">
                                Participate in creating and updating your Individual Support Plan (ISP)
                          </li>
                        </ul>
                    <li className="mb-2 fw-bold">
                        Informed Consent
                    </li>
                        <ul className="text-secondary">
                          <li className="mb-2">
                            Be fully informed of your rights, the risks and benefits of services, and any changes to your care
                          </li>
                          <li className="mb-2">
                             Consent to or refuse services without fear of retaliation
                          </li>
                        </ul>
                    <li className="mb-2 fw-bold">
                      Freedom from Abuse and Exploitation
                    </li>
                        <ul className="text-secondary">
                          <li className="mb-2">
                           Be free from physical, emotional, verbal, and sexual abuse
                          </li>
                          <li className="mb-2">
                            Be protected from neglect, financial exploitation, and unnecessary restraint
                            </li>
                          <li className="mb-2">
                            Report abuse without fear of retaliation
                            </li>
                        </ul>
                    <li className="mb-2 fw-bold">
                     Access to Services and Supports
                    </li>
                          <ul className="text-secondary">
                              <li className="mb-2">
                                Receive services that help you achieve your personal goals and outcomes
                              </li>
                              <li className="mb-2">
                               Access services in the most inclusive, least restrictive setting appropriate to your needs
                              </li>
                              
                          </ul>
                    <li className="mb-2 fw-bold">
                      Community Integration
                    </li>
                            <ul className="text-secondary">
                                <li className="mb-2">
                                  Participate in your community to the fullest extent possible
                                </li>
                                <li className="mb-2">
                                 Seek employment, education, recreation, and social opportunities in typical community settings
                              </li>
                            </ul>
                    <li className="mb-2 fw-bold">
                    Confidentiality
                    </li>
                            <ul className="text-secondary">
                                <li className="mb-2">
                                  Have your personal and health information kept private in accordance with HIPAA and state regulations
                                </li>
                                <li className="mb-2">
                                   Decide who has access to your records and information
                                </li>  
                        </ul>
                        </ul>
                        </div>  
                        </div>
                        </div>

                {/* page break */}
                <div className='mb-3 pdf-page-break '>
                <ul>
                    <li className="mb-2 fw-bold">
                   Grievance and Complaint Process
                    </li>
                            <ul className="text-secondary">
                                 <li className="mb-2">
                                    File complaints or grievances about services, staff, or provider practices
                                  </li>
                                  <li className="mb-2">
                                     Have complaints reviewed promptly without discrimination or retaliation
                                  </li>
                                  <li className="mb-2">
                                   Request assistance from your Support Coordinator or the ODP Regional Office if needed
                                  </li>
                                 
                            </ul>
                    <li className="mb-2 fw-bold">
                    Rights Regarding Finances and Property
                    </li>
                            <ul className="text-secondary">
                               <li className="mb-2">
                                 Control your own finances or receive assistance from a representative payee if needed
                               </li>
                               <li className="mb-2">
                                  Have your belongings respected and protected
                               </li>
                               <li className="mb-2">
                                Be informed about how your funds are used if the Provider handles them
                              </li>
                              
                            </ul>
                    <li className="mb-2 fw-bold">
                    Due Process
                    </li>
                            <ul className="text-secondary">
                              <li className="mb-2"> 
                                Appeal decisions that affect your eligibility or services
                              </li>
                              <li className="mb-2">
                               Receive assistance in navigating appeals and administrative processes
                             </li>
                            </ul>
                          </ul>
                
                
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>3. Additional Rights in Residential or Shared Living Settings</h6>
                  <p className='text-secondary'>
                    If you live in a residential setting licensed or funded by ODP, you also have the right to:
                  </p>
                  <ol className='text-secondary'>
                    <li className="mb-2">
                      Lock your bedroom door (with exceptions for health/safety)
                    </li>
                    <li className="mb-2">
                      Decorate your space to reflect your personality
                    </li>
                    <li className="mb-2">
                     Have access to food, visitors, and personal communication (phone/internet)
                    </li>
                    <li className="mb-2">
                     Be free from unnecessary restrictions on movement, schedule, or routines
                    </li>
                        </ol>
                  </div>
                  <div className='mb-3 '>
                    <h6 className='fw-bolder'>4. Staff Responsibilities</h6>
                    <p className='text-secondary'>
                      Provider staff are required to:
                    </p>
                    <ol className='text-secondary'>
                      <li className="mb-2">
                        Know and respect each Consumer’s rights
                      </li>
                      <li className="mb-2">
                        Ensure services do not infringe upon these rights
                      </li>
                      <li className="mb-2">
                        Immediately report any observed or suspected violation of rights
                      </li>
                    </ol>
                </div>
               
                
                  <h6 className='fw-bolder'>Acknowledgment of Rights</h6>
                  <p className='text-secondary'>I, the Consumer (or legal guardian), have received a copy of the “Rights of Individuals Receiving Services” and have had the opportunity to ask questions. I understand my rights and know whom to contact if I believe my rights are not being respected.</p>
                  <div>
                    <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_rights" inputName="consumer_guardianName_rights" value={inputValue.consumer_guardianName_rights} onChange={handleChange}
                    />
                    <div className='col-md-3'>
                    <SignatureCanvas label="Signature" name="signature_rights"/>
                    </div>
                  </div>
                  </div>

                  {/* page break */}
                  <section className='pdf-page-break'>
                  <div className='mb-3'>
                    <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_rights" inputName="providerRepresentativeName_rights" value={inputValue.providerRepresentativeName_rights} onChange={handleChange}
                    />
                    <div className='col-md-3'>
                    <SignatureCanvas label="Signature" name="providerSignature_rights"/>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <p className='fw-bold'>I received and understand my rights.</p>
                    <div className='col-md-3'>
                    <SignatureCanvas label="Signature" name="signature_rights"/>
                    </div>
                  </div>
                  <hr />

        {/* Grievance Policy Acknowledgment Form */}

         
            <div className='mb-4'>
              <h5 className='text-info'>15. Grievance Policy Acknowledgment Form</h5>
              <p className='text-secondary'>For Consumers Receiving Habilitation Services under the Office of Developmental Programs (ODP)</p>
            </div>
            <div className='mb-3 '> 
              <h6 className='fw-bolder'> Consumer Information</h6>
              <div className='mb-3'>
                <InputFields label="Consumer Name:" inputId="consumerName_grievance" inputName="consumerName_grievance" value={inputValue.consumerName_grievance} onChange={handleChange}
                />
                <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_grievance" dateName="dateOfBirth_grievance" value={inputValue.dateOfBirth_grievance} onChange={handleChange}/>
                <InputFields label="MA Number:" inputId="maNumber_grievance" inputName="maNumber_grievance" value={inputValue.maNumber_grievance} onChange={handleChange}
                />
              </div>
              <h6 className='fw-bolder'> Provider Information</h6>
              <div className='mb-3'>
                <InputFields label="Provider Name:" inputId="providerName_grievance" inputName="providerName_grievance" value={inputValue.providerName_grievance} onChange={handleChange}
                />
                <InputFields label="Provider Representative:" inputId="providerRepresentName_grievance" inputName="providerRepresentName_grievance" value={inputValue.providerRepresentativeName_grievance} onChange={handleChange}
                />
              </div>
              </div>

              <div className='mb-3 '>
                <h6 className='fw-bolder'>1. Purpose of this form</h6>
                <p className='text-secondary'>
                  This form documents that the Consumer (or their legal guardian) has been informed of the Provider’s Grievance Policy and Procedures and understands how to file a complaint or grievance regarding services received under the Office of Developmental Programs (ODP).
                </p>
              </div>
               </section>

               {/* page break */}
               <div className='pdf-page-break'>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>2. What is a Grievance?</h6>
                <p className='text-secondary'>
                 A grievance is a formal or informal complaint made by the Consumer, their guardian, family member, or advocate regarding dissatisfaction with:
                </p>
                <ul className='text-secondary'>
                  <li className="mb-2">
                    Services provided
                  </li>
                  <li className="mb-2">
                    Staff behavior or professionalism
                  </li>
                  <li className="mb-2">
                   Service quality or frequency
                  </li>
                  <li className="mb-2">
                  Policy violations
                  </li>
                  <li className="mb-2">
                 Rights violations
                  </li>
                  <li className="mb-2">
                  Any action or inaction that affects the Consumer’s well-being
                  </li>
                </ul>
                <p className='text-secondary'>
               Grievances may also include complaints about how the Provider responds to incidents, implements the ISP, or treats the Consumer.
                </p>
              </div>
              


               {/* page break */}
                
              <div className='mb-3 '>
                <h6 className='fw-bolder'>3. Consumer Rights Regarding Grievances</h6>
                <p className='text-secondary'>
                The Consumer has the right to:
                </p>
                <ul className='text-secondary'>
                  <li className="mb-2">
                    File a grievance at any time
                  </li>
                  <li className="mb-2">
                    Receive help in understanding and submitting a grievance
                  </li>
                  <li className="mb-2">
                    Be free from retaliation, punishment, or reduction in services
                  </li>
                  <li className="mb-2">
                    Have the grievance addressed in a timely, respectful, and confidential manner
                  </li>
                  <li className="mb-2">
                    Receive a written or verbal response about the resolution
                  </li>
                  <li className="mb-2">
                    Request further review if unsatisfied with the outcome
                  </li>
                 
              </ul>
              </div>
                

               
              <div className='mb-3 '>
                <h6 className='fw-bolder'>4. How to File a Grievance</h6>
                <p className='text-secondary'>
                Grievances may be submitted:
                </p>
                <ul className='text-secondary'>
                  <li className="mb-2">
                    Verbally or in writing to any Provider staff member
                  </li>
                  <li className="mb-2">
                  Directly to a supervisor, manager, or director
                  </li>
                  <li className="mb-2">
                 Through a Grievance Form (available upon request)
                  </li>
                  <li className="mb-2">
                 To the Support Coordinator or Service Coordination Entity
                  </li>
                   <li className="mb-2">
                    To the ODP Regional Office at any time
                  </li>
                </ul>
                <p className='text-secondary'>
                The Provider will respond to all grievances within 7 business days and maintain a written record of the complaint and actions taken.
                </p>
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>5. Additional Assistance</h6>
                  <p className='text-secondary'>
                   If the Consumer needs help filing or understanding the grievance process, they may request assistance from:
                  </p>
                  <ul className='text-secondary'>
                    <li className="mb-2">
                      Support staf
                    </li>
                    <li className="mb-2">
                      Support Coordinator
                    </li>
                    <li className="mb-2">
                     Independent advocate
                    </li>
                    <li className="mb-2">
                       ODP Representative
                    </li>
                   </ul>
                </div>
                 </div>

                 {/* page break */}
                 <section className='pdf-page-break'>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>6. Policy Availability</h6>
                  <p className='text-secondary'>
                  A copy of the full Grievance Policy is available at the Provider’s office and will be provided upon request. Staff are trained to assist Consumers and guardians with the grievance process.
                  </p>
            </div>
            <div className='mb-3 '>
              <h6 className='fw-bolder'>Acknowledgment</h6>
              <p className='text-secondary'>I, the Consumer (or legal guardian), acknowledge that:</p>
              <ul className='text-secondary'>
                <li className="mb-2">
                I have been informed of my right to file a grievance or complaint
                </li>
                <li className="mb-2">
                I understand the process to submit a grievance
                </li>
                <li className="mb-2">
                I have been provided access to the Provider’s Grievance Policy or had it explained to me
                </li>
                <li className="mb-2">
                I understand that I will not be penalized for making a complaint
                </li>
              </ul>
                </div>
               

                {/* page Break */}

              <div className='mb-3 '>
                <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_grievance" inputName="consumer_guardianName_grievance" value={inputValue.consumer_guardianName_grievance} onChange={handleChange}
                />
                <div className='col-md-3'>
                <SignatureCanvas label="Signature" name="consumerSignature_grievance"/>
                </div>
                <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_grievance" inputName="providerRepresentativeName_grievance2" value={inputValue.providerRepresentativeName_grievance2} onChange={handleChange}
                />
                <div className='col-md-3'>
                <SignatureCanvas label="Signature" name="providerSignature_grievance"/>
                </div>
                </div>

                <div className='my-5'>
                  <p className='text-secondary fw-bolder'>I received and understand the grievance policy</p>
                  <div className='col-md-3'>
                    <SignatureCanvas label="Signature" name="signature_grievance"/>
                  </div>
                </div>
              
          <hr />

          {/* Orientation Acknowledgment Form */}
          
            <div className='mb-4'>
              <h5 className='text-info'>16. Orientation Acknowledgment Form</h5>
              <p className='text-secondary'>For Individuals Receiving Habilitation Services Under ODP</p>
            </div>
            <div> 
              <h6 className='fw-bolder'> Consumer Information</h6>
              <div className='mb-3'>
                <InputFields label="Full Name of Consumer:" inputId="consumerName_orientation" inputName="consumerName_orientation" value={inputValue.consumerName_orientation} onChange={handleChange}
                />
                <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_orientation" dateName="dateOfBirth_orientation" value={inputValue.dateOfBirth_orientation} onChange={handleChange}/>
                </div>
               </div>
          </section>

            {/* page break */}
          <div className='pdf-page-break '>
                <div className='mb-3'>
                <InputFields label="MA Number:" inputId="maNumber_orientation" inputName="maNumber_orientation" value={inputValue.maNumber_orientation} onChange={handleChange}
                />
                </div>
           

        
              <h6 className='fw-bolder'> Provider Information</h6>
              <div className='mb-3'>
                <InputFields label="Provider Name:" inputId="providerName_orientation" inputName="providerName_orientation" value={inputValue.providerName_orientation} onChange={handleChange}
                />
                <InputFields label="Provider Representative:" inputId="providerRepresentName_orientation" inputName="providerRepresentName_orientation" value={inputValue.providerRepresentativeName_orientation} onChange={handleChange}
                />
              </div>
             

              
              <div className='mb-3 '>
                <h6 className='fw-bolder'>1. Purpose of this form</h6>
                <p className='text-secondary'>
                  This form documents that the Consumer (or legal guardian) has completed an orientation session provided by the Provider. Orientation is required by the Office of Developmental Programs (ODP) and is designed to ensure the Consumer is informed, supported, and empowered when beginning or continuing Habilitation services
                </p>
              </div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>2. Orientation Topics Covered</h6>
                <p className='text-secondary'>
                  The Provider has reviewed the following topics with the Consumer (or guardian), either verbally or in writing:
                </p>
                <ul className='text-secondary'>
                  <li className="mb-2">
                   Overview of Habilitation (HAB) Services
                  </li>
                  <li className="mb-2">
                   Individual Support Plan (ISP) roles and responsibilities
                  </li>
                  <li className="mb-2">
                    Consumer Rights (including dignity, privacy, and choice)
                  </li>
                  <li className="mb-2">
                  Grievance and complaint procedures
                  </li>
                  <li className="mb-2">
                Incident reporting policies and protections
                  </li>
                  <li className="mb-2">
                 Health and safety expectations
                  </li>
                  <li className="mb-2">
                 Emergency procedures and evacuation plan
                  </li>
                  <li className="mb-2">
                 Medication management (if applicable)
                  </li>
                  <li className="mb-2">
                 Staff roles and supervision
                  </li>
                  <li className="mb-2">
                 Confidentiality and HIPAA privacy protections
                  </li>
                  <li className="mb-2">
                Community participation and integration
                  </li>
                  <li className="mb-2">
                 Service schedule, location, and documentation
                  </li>
                  <li className="mb-2">
                 Procedures for service interruptions or cancellations
                  </li>
                  <li className="mb-2">
                 Provider policies regarding conduct, communication, and boundaries
                  </li>
                </ul>
              </div>
              <div className='mb-3 '>
                <h6 className='fw-bolder'>3.Opportunity for Questions</h6>
                <p className='text-secondary'>
                  The Consumer (or legal guardian) was given the opportunity to ask questions about services, rights, and provider procedures during orientation. All questions were answered to their satisfaction.
                </p>
              </div>

              <div className='mb-3 '>
                <h6 className='fw-bolder'>4. Acknowledgment </h6>
                <p className='text-secondary'>
                  By signing below, I, the Consumer (or legal guardian), acknowledge that I:
                </p>
                <ul className='text-secondary'>
                  <li className="mb-2">
                    Participated in or received the required orientation
                  </li>
                  <li className="mb-2">
                    Understand the policies, procedures, and expectations of the Provider
                  </li>
                  <li className="mb-2">
                    Know whom to contact with concerns or questions about my services
                  </li>
                  <li className="mb-2">
                    Have received a copy of the Consumer Handbook and/or other orientation materials (if applicable)
                  </li>
                </ul>
                </div>
              </div>

              {/* page break */}
               <section className='pdf-page-break'>
                <div className='mb-3 '>
                  <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_orientation" inputName="consumer_guardianName_orientation" value={inputValue.consumer_guardianName_orientation} onChange={handleChange}
                  />
                  <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="consumerSignature_orientation"/>
                  </div>
                  <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_orientation" inputName="providerRepresentativeName_orientation2" value={inputValue.providerRepresentativeName_orientation2} onChange={handleChange}
                  />
                  <div className='col-md-3'>
                  <SignatureCanvas label="Signature" name="providerSignature_orientation"/>
                  </div>
                  </div>
              

             
              <hr />
              {/* Staff Signature Sheet */} 
              <section>
                <div className='mb-4'>
                  <h5 className='text-info'>17. Staff Signature Sheet</h5>
                </div>
                <div>
                <div className='mb-3 table-responsive'>
                  <table className='table table-striped table-bordered'>
                    <thead>
                      <tr className='table-info text-center fw-bold'>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Staff Name</td>
                      
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type='date' className='form-control' id='date_staff1' name='date_staff1' value={inputValue.date_staff1} onChange={handleChange}/></td>
                        <td><input type='time' className='form-control' id='time_staff1' name='time_staff1' value={inputValue.time_staff1} onChange={handleChange}/></td>
                        <td><input type='text' className='form-control' id='staffName1' name='staffName1' value={inputValue.staffName1} onChange={handleChange}/></td>
                      </tr>
                      </tbody>
                      </table>
                </div>
                <div className='col-md-3'>
                  <SignatureCanvas label="Staff Signature" name="staffSignature1"/>
                  </div>
                  </div>

              </section>
              <hr />
              {/* Training Verification for Staff Assigned to Consumer */}
              <section>
                <div className='mb-4'>
                  <h5 className='text-info'>18. Training Verification for Staff Assigned to Consumer</h5>
                </div>
                <div className='mb-3 table-responsive'>
                  <table className='table table-striped table-bordered'>
                    <thead>
                      <tr className='table-info text-center fw-bold'>
                        <td>Staff Name</td>
                        <td>Training Type</td>
                        <td>Date Completed</td>
                        <td>Verified By</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type='text' className='form-control' id='staffName3' name='staffName3' value={inputValue.staffName3} onChange={handleChange}/></td>
                        <td><input type='text' className='form-control' id='trainingType' name='trainingType' value={inputValue.trainingType} onChange={handleChange}/></td>
                        <td><input type='date' className='form-control' id='dateCompleted' name='dateCompleted' value={inputValue.dateCompleted} onChange={handleChange}/></td>
                        <td><input type='text' className='form-control' id='verifiedBy' name='verifiedBy' value={inputValue.verifiedBy} onChange={handleChange}/></td>
                      </tr>
                      </tbody>
                      </table>
                </div>
              </section>
             

              {/* Photo Consent/Refusal Form */}
             
                <div className='mb-4'>
                  <h5 className='text-info'>19. Photo Consent/Refusal Form</h5>
                  <p className=' fst-italic text-secondary'>For Consumers Receiving Habilitation Services under the Office of Developmental Programs (ODP)</p>
                </div>
                <div className='mb-3'>
                  <h6 className='fw-bolder'> Consumer Information</h6>
                  <div className='mb-3'>
                    <InputFields label="Full Name of Consumer:" inputId="consumerName_photo" inputName="consumerName_photo" value={inputValue.consumerName_photo} onChange={handleChange}
                    />
                    <InputDate dateLabel="Date of Birth:" dateId="dateOfBirth_photo" dateName="dateOfBirth_photo" value={inputValue.dateOfBirth_photo} onChange={handleChange}/>
                    <InputFields label="MA Number:" inputId="maNumber_photo" inputName="maNumber_photo" value={inputValue.maNumber_photo} onChange={handleChange}
                    />
                  </div>
                  <h6 className='fw-bolder'> Provider Information</h6>
                  <div className='mb-3'>
                    <InputFields label="Provider Name:" inputId="providerName_photo" inputName="providerName_photo" value={inputValue.providerName_photo} onChange={handleChange}
                    />
                    <InputFields label="Provider Representative:" inputId="providerRepresentName_photo" inputName="providerRepresentName_photo" value={inputValue.providerRepresentativeName_photo} onChange={handleChange}
                    />
                  </div>
                  </div>
                   </section>

                  {/* page break */}
                      <div className='pdf-page-break'>
                  <div className='mb-3 '>
                    <h6 className='fw-bolder'>1. Purpose of this form</h6>
                    <p className='text-secondary'>
                      This form allows the Consumer (or legal guardian) to indicate whether they give permission for the Provider to take, use, and share photographs, video, or audio recordings of the Consumer. These images may be used for documentation, training, promotional materials, newsletters, events, or social media purposes.
                    </p>
                  
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>2. Use of Photos/Media</h6>
                  <p className='text-secondary'>
                    If consent is granted, photos or video may be used in the following contexts:
                  </p>
                  <ul className='text-secondary'>
                    <li className="mb-2">
                      Documentation of service delivery for recordkeeping
                    </li>
                    <li className="mb-2">
                      Training or professional development of staf
                    </li>
                    <li className="mb-2">
                      Marketing and outreach materials (print or digital)
                    </li>
                    <li className="mb-2">
                     Organization’s website or social media platforms
                    </li>
                    <li className="mb-2">
                   Recognition events, celebrations, or program displays
                  </li>
                </ul>
                <p className='text-secondary'>
                  No photographs or recordings will be sold or used for any commercial gain.
                </p>
                </div>
                <div className='mb-3 '>
                  <h6 className='fw-bolder'>3. Consent Options (Check One)</h6>
                 <div>
                   <InputCheckboxes className="fw-semibold" checkId="consentGiven" checkName="consentGiven" checkLabel="I GIVE CONSENT" checked={checkboxValues.consentGiven} onChange={handleChange}/>
                   <p>I hereby authorize the Provider to take and use photographs, video, or audio recordings of me/my child for the purposes listed above. I understand that these may be shared publicly and that no personal identifying information will be disclosed without further consent.</p>
                   <InputCheckboxes className="fw-semibold" checkId="consentRefused" checkName="consentRefused" checkLabel="I DO NOT GIVE CONSENT " checked={checkboxValues.consentRefused} onChange={handleChange}/>
                   <p>I do not authorize the Provider to take or use any photographs, video, or audio recordings of me/my child. I understand this choice will not affect the quality or delivery of services in any way</p>
                 </div>
                  </div>
                  <div className='mb-3 '>
                    <h6 className='fw-bolder'>4. Right to Withdraw Consent</h6>
                   <p>I understand that I may revoke this consent at any time by submitting a written request to the Provider. Any images already published or used before the withdrawal will not be recalled or destroyed.</p>
                  </div>
                 

                  {/* page break */}
                  
                  <div className='mb-3 '>
                    <h6 className='fw-bolder'>Acknowledgment</h6>
                    <p>By signing below, I confirm that I have read and understood this form. I am aware that participation is voluntary and that refusal to consent will not affect access to services or supports.</p>
                      <InputFields label="Consumer/Legal Guardian Name:" inputId="consumer_guardianName_photo" inputName="consumer_guardianName_photo" value={inputValue.consumer_guardianName_photo} onChange={handleChange}
                      />
                      <div className='col-md-3'>
                      <SignatureCanvas label="Signature" name="consumerSignature_photo"/>
                      </div>
                  </div>
           </div>



                  {/* page break */}
                   <section className='pdf-page-break'>
                      <InputFields label="Provider Representative Name:" inputId="providerRepresentativeName_photo" inputName="providerRepresentativeName_photo2" value={inputValue.providerRepresentativeName_photo2} onChange={handleChange}
                      />
                      <div className='col-md-3'>
                      <SignatureCanvas label="Signature" name="providerSignature_photo"/>
                      </div>
                  
                
                <hr />
                {/* Copy of Insurance Card and State ID*/}
                <section>
                  <div className='mb-4'>
                    <h5 className='text-info'>20. Copy of Insurance Card and State ID</h5>
                    <p className=' fst-italic text-secondary fw-semibold'>(Attach copies front and back)</p>
                  </div>
                  </section>
                  <hr />
                  {/* Copy of Social Security Card */}
                  <section>
                    <div className='mb-4'>
                      <h5 className='text-info'>21. Copy of Social Security Card</h5>
                      <p className=' fst-italic text-secondary fw-semibold'>(Attach copy)</p>
                    </div>
                    </section>
                    <hr />

                    {/* Emergency Evacuation Plan (home specific) */}
                    <section>
                      <div className='mb-4'>
                        <h5 className='text-info'>22. Emergency Evacuation Plan (home specific)</h5>
                       <div className='mb-3 '>
                        <InputFields label="Evacuation Procedures:" inputId="evacuationProcedures" inputName="evacuationProcedures" value={inputValue.evacuationProcedures} onChange={handleChange}
                        />
                        <InputFields label="Meeting Point:" inputId="meetingPoint" inputName="meetingPoint" value={inputValue.meetingPoint} onChange={handleChange}
                        />
                        <InputFields label="Responsible Staff:" inputId="responsibleStaff" inputName="responsibleStaff" value={inputValue.responsibleStaff} onChange={handleChange}
                        />
                        <InputFields label="Transportation Plan:" inputId="transportationPlan" inputName="transportationPlan" value={inputValue.transportationPlan} onChange={handleChange}
                        />
                       </div>
                      </div>
                      </section>
                    
                      <hr />

                      {/* ODP Required Assessments */}
                      <section>
                        <div className='mb-4'>
                          <h5 className='text-info'>23. ODP Required Assessments (like SIS, if available)</h5>
                          <p className=' fst-italic text-secondary fw-semibold'>(Attach latest SIS or other required assessments)</p>
                        </div>
                        </section>
                        <hr />

                  {/* Backup Plan / Contingency Plan */}

                  <section>
                  <div className='mb-4'>
                    <h5 className='text-info'>24. Backup Plan / Contingency Plan</h5>
                    <div className='mb-3 '>
                      <InputFields label="Staff Backup Plan:" inputId="staffBackupPlan" inputName="staffBackupPlan" value={inputValue.staffBackupPlan} onChange={handleChange}
                      />
                      <InputFields label="Emergency Contact Protocal:" inputId="emergencyContactProtocal" inputName="emergencyContactProtocal" value={inputValue.emergencyContactProtocal} onChange={handleChange}
                      />
                      <InputFields label="Service Interruption Plans:" inputId="serviceInterruptionPlans" inputName="serviceInterruptionPlans" value={inputValue.serviceInterruptionPlans} onChange={handleChange}
                      />
                    </div>
                  </div>
                  </section>
                  <hr />
                  
                  {/* Service Location & Community Integration Preferences */}
                 
                    <div className='mb-4'>
                      <h5 className='text-info'>25. Service Location & Community Integration Preferences</h5>
                      <div className='mb-3 '>
                        <InputFields label="Preferred Location:" inputId="preferredLocation" inputName="preferredLocation" value={inputValue.preferredLocation} onChange={handleChange}
                        />
                        <InputFields label="Activities of Interest:" inputId="activitiesOfInterest" inputName="activitiesOfInterest" value={inputValue.activitiesOfInterest} onChange={handleChange}
                        />
                        <InputFields label="Transportation Method:" inputId="transportationMethod" inputName="transportationMethod" value={inputValue.transportationMethod} onChange={handleChange}
                        />
                      </div>
                    </div>
                   </section>
                    
                   <hr />

                   {/* Most Recent ISP Signature Page */}
                   <section className='pdf-page-break'>
                     <div className='mb-4'>
                       <h5 className='text-info'>26. Most Recent ISP Signature Page</h5>
                       <p className='fst-italic text-secondary fw-semibold'>(Attach most recent ISP signature page)</p>
                     </div>
                     </section>
                     <hr />
                     {/* Team Contact List */}
                     <section>
                       <div className='mb-4'>
                         <h5 className='text-info'>27. Team Contact List</h5>
                         <div className='my-3 table-responsive'>
                           <table className='table table-striped table-bordered'>
                             <thead>
                               <tr className='table-info text-center fw-bold'>
                                 <td>Name</td>
                                 <td>Role</td>
                                 <td>Phone</td>
                                 <td>Email</td>
                               </tr>
                             </thead>
                             <tbody>
                               <tr>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactname1' name='teamContactname1' value={inputValue.teamContactname1} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactrole1' name='teamContactrole1' value={inputValue.teamContactrole1} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactphone1' name='teamContactphone1' value={inputValue.teamContactphone1} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactemail1' name='teamContactemail1' value={inputValue.teamContactemail1} onChange={handleChange}/></td>
                               </tr>
                               <tr>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactname2' name='teamContactname2' value={inputValue.teamContactname2} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactrole2' name='teamContactrole2' value={inputValue.teamContactrole2} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactphone2' name='teamContactphone2' value={inputValue.teamContactphone2} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactemail2' name='teamContactemail2' value={inputValue.teamContactemail2} onChange={handleChange}/></td>
                               </tr>
                               <tr>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactname3' name='teamContactname3' value={inputValue.teamContactname3} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactrole3' name='teamContactrole3' value={inputValue.teamContactrole3} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactphone3' name='teamContactphone3' value={inputValue.teamContactphone3} onChange={handleChange}/></td>
                                 <td><input style={{minWidth:"120px"}} type='text' className='form-control' id='teamContactemail3' name='teamContactemail3' value={inputValue.teamContactemail3} onChange={handleChange}/></td>
                               </tr>
                               </tbody>
                            </table>
                            </div>
                       </div>
                       </section>
                       <div className='my-5 text-center'>
                        <p className='text-info fw-bold fst-italic'>Please Double Check All Information Before Submitting</p>
                       </div>

              <div className='d-flex gap-2 w-100 justify-content-center my-5'>
            <button 
              type="button"
              onClick={handleDone} 
              className="btn btn-success px-3"
            >
              Done
            </button>
            <button 
              type="button"
              onClick={handlePreview} 
              className="btn btn-info px-3" 
              disabled={!isPreviewEnabled}
            >
              See Preview
            </button>
          </div>
        </form>

      </div>
   
    </div>
  )
}



export default HabPacket
