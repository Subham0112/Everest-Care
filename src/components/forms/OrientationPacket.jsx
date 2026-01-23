import React from 'react'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InputFields from './formElements/InputFields'
import InputDate from './formElements/InputDate'
import InputCheckboxes from './formElements/InputCheckboxes'
import Navbar from '../Navbar';
import TextAreaFields from './formElements/TextAreaFields'
import SignatureCanvas from './formElements/SignatureCanvas'

const OrientationPacket = () => {
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

    const targetPath = `home/preview/${formType}`;
    console.log("Attempting to navigate to:", targetPath);
    console.log("formType value is:", formType);

    navigate(targetPath, { state: { previewHtml: previewHtml } });
  };

  const tableData=[
    {tableName:"ODP Mission & Core Values"},
    {tableName:"Person-Centered Practices"},
    {tableName:"Individual Rights"},
    {tableName:"Abuse, Neglect and Mandated Reporting"},
    {tableName:"Emergency Preparedness"},
    {tableName:"Incident Management (IM) System"},
    {tableName:"ODP Regulations & ISP Process"},
    
    {tableName:"Health & Safety (including recognizing medical emergencies)"},
    {tableName:"CPR & First Aid Certification (valid and current)"},
    {tableName:"Medication Administration (if applicable)"},
    {tableName:"Fire Safety & Emergency Drills"},
    {tableName:"HIPAA & Confidentiality"},
    {tableName:"Cultural Competency & Disability Awareness"},
    {tableName:"De-escalation & Behavioral Support Techniques"},
    {tableName:"Positive Approaches / Positive Behavioural Support"},
    {tableName:"Documentation Standards & Daily Progress Notes"},
    {tableName:"Infection Controll & Universal Precausion"},
    {tableName:"Recognition & Prevention of Exploitaition"},
    {tableName:"Transportation & Community Safety(if Transporting Individuals)"},
    {tableName:"Provider Specific Policy & Procedures"},
    {tableName:"Job Duties and Roles Expectations"},
  
  ]
  return (
    <div className='bg-light  min-vh-100'>
      <div className='container-fluid full-form py-3'>
        <form id='habPacket-pdf' className='bg-white habpacketPdf shadow-sm rounded-3 p-4 py-2'>
          <section style={{backgroundColor:"#C4E1E6"}} className='my-4 rounded-3 shadow-sm p-3 p-md-5 bg-'>
            <p className="text-secondary">Dear New Team Member,</p>
            <p className="text-secondary">Welcome to our Habilitaton Services team! We are thrilled to have you join us in supportng individuals with intellectual and developmental disabilites to live meaningful, empowered lives. Your role as a HAB Aide is essental in creatng a safe, respectul, and person-centered environment where individuals can thrive. </p>

            <p className="text-secondary">As part of our team, you are not just performing tasks—you are building relatonships, promotng independence, and protectng the rights and dignity of every individual you support. We value your compassion, your dedicaton, and your commitment to excellence. </p>

            <p className="text-secondary">This orientaton will guide you through our mission, core values, policies, and the training necessary to perform your dutes conﬁdently and competently. We encourage you to ask questons, share your ideas, and embrace the opportunity to grow within this ﬁeld. </p>

            <p className="text-secondary">Together, we make a diﬀerence—one person, one moment at a tme. </p>
            <p className="text-secondary">With appreciaton, </p>
            <p className="text-secondary">The Leadership Team </p>
          </section>
          <section className='my-4 pdf-page-break'>
            <h3 className='text-info'>Program Overview</h3>
            <p >Our Habilitation Program is designed to support individuals in achieving greater independence, community inclusion, and personal fulfillment. Services are delivered in-home and in the community and are based on each person’s unique strengths, preferences, and goals as outlined in their Individual Support Plan (ISP). </p>

            <p>Key Program Features:</p>
            <ul className='list-disc'>
              <li><b>Person-Centered Planning:</b> Services are based on what is important TO and FOR the individual.</li>
              <li><b>Skill Building:</b> We support individuals in learning life skills such as cooking, budgeting, hygiene, communication, and more</li>
              <li><b>Health & Safety:</b> Staff ensure a safe environment and support individuals in accessing healthcare and following medical protocols</li>
              <li><b>Community Participation:</b> We promote inclusion through volunteering, recreation, and social activities.</li>
              <li><b>Documentation:</b> Staff record daily activities, progress toward outcomes, and any incidents or health concerns.</li>
            </ul>
            <p>All services follow Pennsylvania’s Office of Developmental Programs (ODP) guidelines andalign with the principles of Everyday Lives, Positive Approaches, and Trauma-Informed Care.</p>
          </section>
          <section className='my-4  pdf-page-break'>
            <h3 className='text-info'>Program Overview – Habilitation Services</h3>
            <p>Our Habilitation Services program, operating under the Pennsylvania Office of Developmental Programs (ODP), is designed to support individuals with intellectual and developmental disabilities in achieving greater independence, autonomy, and community engagement. Services are built around the principles of person-centered planning, Everyday Lives, and trauma-informed care </p>
            <ol>
              <li className='fw-bold'> PURPOSE:</li>
              <p>The primary purpose of Habilitation Services is to teach, support, and empower individuals in developing skills that promote self-determination, meaningful relationships, personal fulfillment, and active participation in their communities. Services are individualized, goal-oriented, and culturally respectful.</p>
              <li className='fw-bold'>CORE SERVICE PRINCIPLES:</li>
              <ul className='list-disc'>
                <li><b>Person-Centeredness:</b>Services reflect the goals, strengths, and preferences of the individual.</li>
                <li><b>Person-Centeredness:</b>Services reflect the goals, strengths, and preferences of the individual.</li>
                <li><b>Dignity and Respect:</b>All interactions promote the inherent value and rights of each person.</li>
                <li><b>Least Restrictive Environment:</b>Support is delivered in the most integrated, inclusive setting possible.</li>
                <li><b>Choice and Control:</b> Individuals are supported to make decisions about their lives and services.</li>
                <li><b>Collaboration:</b> Families, caregivers, and support teams work together to achieve shared outcomes.</li>
                <li><b>Accountability:</b> Providers and staff are held to high standards of care, documentation, and ethical practice.</li>
              </ul>
              <li className='fw-bold mt-3'>SERVICE SETTINGS:</li>
              <p>Habilitation services may be provided in the person’s home, family home, or community settings such as libraries, gyms, stores, or volunteer sites. Services are flexible and designed to reflect the individual’s preferred lifestyle and routines.</p>
              <li className='fw-bold'>TYPICAL SERVICE DOMAINS:</li>
              <ul>
                <li>Personal care skills (hygiene, grooming, dressing)</li>
                <li>Health maintenance and wellness (nutrition, appointments, exercise)</li>
                <li>Household skills (cooking, cleaning, laundry, budgeting)</li>
                <li>Community navigation (transportation, safety, communication)</li>
                <li>Social and emotional development (boundaries, relationships, self-regulation)</li>
                <li>Pre-vocational skills (time management, goal setting, team participation)</li>
              </ul>
               </ol>
          </section>
          <section className='mt-3 pdf-page-break'>
            <ol type="none">
              <li className='fw-bold'>5. STAFF RESPONSIBILITIES:</li>
              <ul>
                <li>Build supportive relationships and promote skill development through daily interactions.</li>
                <li>Observe and respect personal preferences, cultural needs, and behavioral cues.</li>
                <li> Follow the Individual Support Plan (ISP) and document progress accurately and promptly. </li>
                <li>Support health and safety at all times, including in emergency situations</li>
                <li>Communicate proactively with team members, families, and supervisors.</li>
                <li>Participate in required training and ongoing professional development.</li>
                
              </ul>
              <li className='fw-bold mt-3'>6. DOCUMENTATION:</li>
              <p>Direct Support Professionals are required to maintain accurate, timely records that reflect the services provided, progress made toward outcomes, any incidents or changes, and daily participation logs. Documentation is a legal requirement and an essential part of quality support.</p>
              <li className='fw-bold mt-3'>7. ALIGNMENT WITH ODP & DHS:</li>
              <p>Our program aligns with the values of Pennsylvania’s Office of Developmental Programs and the Department of Human Services (DHS). We operate in accordance with 55 Pa. Code regulations, ODP bulletins and communications, and Medicaid waiver requirements.</p>
              </ol>

              <p>By embracing inclusion, honoring individuality, and committing to best practices, we support each person in leading a life that is meaningful to them. Your role in this process is invaluable.</p>
            </section>

            <section className='my-4  pdf-page-break'>
              <h4 className='text-info'>Habilitation Staff – Job Description & Role Expectations</h4>
              <h5>Job Title: Habilitation Aide (Habilitation Services)</h5>
              <p>
                The Habilitation Aide provides person-centered Habilitation services to individuals with intellectual and developmental disabilities. Habilitation Aides assist individuals in achieving their goals by teaching daily living skills, promoting independence, and supporting participation in community and home-based activities. All services are delivered under the guidance of the Individual Support Plan (ISP) and in compliance with the Pennsylvania Office of Developmental Programs (ODP) regulations.
              </p>
              <p className='fw-bold'>Key Responsibilities:</p>
              <ul>
                <li>Provide direct support in skill-building activities (cooking, cleaning, grooming, budgeting, etc.)</li>
                <li>Encourage and facilitate community participation, inclusion, and relationship-building</li>
                <li>Support individuals in making informed decisions and exercising choice</li>
                <li>Follow and implement goals and outcomes identified in each person’s ISP </li>
                <li>Maintain accurate and timely documentation of services provided and progress toward goals</li>
                <li>Ensure the health, safety, and well-being of individuals during all activities.</li>
                <li>Respond appropriately to emergencies and follow safety protocols</li>
                <li>Report all incidents, concerns, or changes in condition immediately</li>
                <li>Protect individual rights, privacy, and confidentiality at all times</li>
                <li>Communicate effectively with supervisors, team members, and families</li>
                <li>Attend required trainings and participate in ongoing professional development</li>
              </ul>
            <p className='fw-bold'>Qualifications:</p>
              <ul>
                <li>High school diploma or GED (required)</li>
                <li>At least 18 years of ageerience</li>
                <li>Valid driver’s license (if transporting individuals)</li>
                <li>Ability to pass background checks and health screenings </li>
                <li>Strong interpersonal and communication skills</li>
                <li>Compassionate, reliable, and adaptable to various needs</li>
                <li>Ability to lift, transfer, and physically support individuals when needed</li>
                </ul>
            </section>
            <section className='my-4 pdf-page-break'>
              <h5>Work Environment & Schedule:</h5>
              <p>Services may be delivered in the individual’s home, family home, or in community settings. Schedules may include weekdays, weekends, evenings, or holidays depending on individual needs. Work may involve physical activity, travel, and exposure to varying environments.
              </p>

              <div className='mb-3' >
                <div className='col-md-3'>
              <SignatureCanvas label="Staff Signature" name="staffSignature"/>
              </div>
                <div className='col-md-3'>
              <SignatureCanvas label="Supervisor Signature" name="supervisorSignature"/>
              </div>
              </div>
            </section>

            <section className='my-4  pdf-page-break'>
              <h4 className='text-info'>HAB Aide – Mandatory Trainings & Completion Record</h4>
              <p>This form must be completed for all Habilitation Aides employed under the Office of Developmental Programs (ODP). All listed trainings are required to be completed before unsupervised service delivery and must be refreshed according to regulation and agency policy</p>
              <div className='table-responsive'>
                <table className='table table-striped table-bordered'>
                  <thead>
                    <tr className='table-info text-center fw-bold'>
                      <td>Training Topics</td>
                      <td>Date</td>
                      <td>Trainer Initials</td>
                      <td>Staff Initials</td>
                    </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr style={{fontSize:"14px"}} key={index}>
                          <td>{ item.tableName }</td>
                          <td><input type='date' className='form-control' id={`dateComplete_${index}`} name={`dateComplete_${index}`} value={inputValue[`dateComplete_${index}`]} onChange={handleChange}/></td>
                          <td><input style={{minWidth:"150px"}} type='text' className='form-control' id={`trainerInitials_${index}`} name={`trainerInitials_${index}`} value={inputValue[`trainerInitials_${index}`]} onChange={handleChange}/></td>
                          <td><input style={{minWidth:"150px"}} type='text' id={`staffInitials_${index}`} className='form-control' name={`staffInitials_${index}`} value={inputValue[`staffInitials_${index}`]} onChange={handleChange}/></td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
              </div>
            </section>
            <section className='my-4  pdf-page-break'>
              <p>I acknowledge that I have completed or will complete all mandatory trainings required for my role and understand the importance of maintaining current certifications and compliance with ODP regulations.</p>
              <div className='mb-4'>
                <div className='col-md-3'>
              <SignatureCanvas label="Staff Signature" name="staffSignature2"/>
              </div>
                <div className='col-md-3'>
              <SignatureCanvas label="Supervisor Signature" name="supervisorSignature2"/>
              </div>
              </div>
              <div className='my-3'>
                <h5 className='text-info'>Emergency Contacts & Phone List</h5>
              <p>This template is to be completed and maintained in the orientation and service records for all individuals providing and receiving Habilitation Services. It includes emergency and non-emergency contacts such as family, guardians, providers, and medical personnel. This form must be updated regularly and stored securely.</p>
              </div>
              <div className='d-flex flex-column gap-3'>
                <InputFields inputName="ConsumerName" label="Individual's Full Name" inputId="consumerName" value={inputValue.ConsumerName} onChange={handleChange}   />
                <InputDate dateName="dateOfBirth" dateLabel="Date of Birth" inputId="dateOfBirth" value={inputValue.dateOfBirth} onChange={handleChange}   />
                <InputFields inputName="addressOfResidence" label="Address of Residence" inputId="addressOfResidence" value={inputValue.addressOfResidence} onChange={handleChange}   />
                <InputFields inputName="phoneNumber" label="Phone Number" inputId="phoneNumber" value={inputValue.phoneNumber} onChange={handleChange}   />
                <InputFields inputName="preferredLanguage" label="Preferred Language or Communication Method" inputId="preferredLanguage" value={inputValue.preferredLanguage} onChange={handleChange}   />
              </div>
            </section>
            <section className='my-4  pdf-page-break'>
              <h5>Emergency Contacts</h5>
              <div className='d-flex flex-column gap-3'>
                <InputFields inputName="PrimaryEmergencyContact" label="Primary Emergency Contact (eg. Parent, Guardian, or Caregiver)" inputId="PrimaryEmergencyContact" value={inputValue.PrimaryEmergencyContact} onChange={handleChange}   />
                <InputFields inputName="relationshipToIndividual" label="Relationship to Individual" inputId="relationshipToIndividual" value={inputValue.relationshipToIndividual} onChange={handleChange}   />
                <InputFields inputName="phoneNumberEmergency" label="Phone Number" inputId="phoneNumberEmergency" value={inputValue.phoneNumberEmergency} onChange={handleChange}   />
                <InputFields inputName="emailAddress" label="Email Address" inputId="emailAddress" value={inputValue.emailAddress} onChange={handleChange}   />
                <InputFields inputName="energencyAddress" label="Address" inputId="energencyAddress" value={inputValue.energencyAddress} onChange={handleChange}   />
                <InputFields inputName="secondaryEmergencyContact" label="Secondary Emergency Contact" inputId="secondaryEmergencyContact" value={inputValue.secondaryEmergencyContact} onChange={handleChange}   />
                <InputFields inputName="relationshipToSecondaryContact" label="Relationship to Individual" inputId="relationshipToSecondaryContact" value={inputValue.relationshipToSecondaryContact} onChange={handleChange}   />
                <InputFields inputName="phoneNumberSecondaryContact" label="Phone Number" inputId="phoneNumberSecondaryContact" value={inputValue.phoneNumberSecondaryContact} onChange={handleChange}   />
                <InputFields inputName="emailAddressSecondaryContact" label="Email Address" inputId="emailAddressSecondaryContact" value={inputValue.emailAddressSecondaryContact} onChange={handleChange}   />
                <InputFields inputName="secondaryEnergencyAddress" label="Address" inputId="secondaryEnergencyAddress" value={inputValue.secondaryEnergencyAddress} onChange={handleChange}   />
              </div>

              <h5 className=' mb-3 mt-4'>Support Coordinator (SC) Contact</h5>
              <div className='d-flex flex-column gap-3 mb-4'>
                <InputFields inputName="SCName" label="Name of Support COordinator" inputId="SCName" value={inputValue.SCName} onChange={handleChange}   />
                <InputFields inputName="SCPhoneNumber" label="Phone Number" inputId="SCPhoneNumber" value={inputValue.SCPhoneNumber} onChange={handleChange}   />
                <InputFields inputName="SCEmailAddress" label="Email Address" inputId="SCEmailAddress" value={inputValue.SCEmailAddress} onChange={handleChange}   />
                <InputFields inputName="SCOrganization" label="SC Organization/Agency name" inputId="SCOrganization" value={inputValue.SCOrganization} onChange={handleChange}   />
                <InputFields inputName="SCSupervisorContact" label="SC Supervisor Contact (if applicable)" inputId="SCSupervisorContact" value={inputValue.SCSupervisorContact} onChange={handleChange}   />
              </div>
                <h5 className=' mt-5'>Primary Care Physician & Healthcare Providers</h5>
              <div className='d-flex flex-column gap-3 mb-4'>
                <InputFields label="Primary Care Physician (PCP) Name:" inputId="PCPName" inputName="PCPName" value={inputValue.PCPName} onChange={handleChange}
                />
                <InputFields label="Phone Number:" inputId="PCPPhoneNumber" inputName="PCPPhoneNumber" value={inputValue.PCPPhoneNumber} onChange={handleChange}
                />
                <InputFields label="Fax Number:" inputId="PCPFaxNumber" inputName="PCPFaxNumber" value={inputValue.PCPFaxNumber} onChange={handleChange}
                />
                <InputFields label="Office Address:" inputId="PCPOfficeAddress" inputName="PCPOfficeAddress" value={inputValue.PCPOfficeAddress} onChange={handleChange}
                />
               </div>
              </section>

               {/* paggeBreak */}
               
               <section className='my-4  pdf-page-break'>
                <div className='d-flex flex-column gap-3 mb-4'>
                <InputFields label="Psychiatrist or Behavioral Health Provider:" inputId="PCPHealthProvider" inputName="PCPHealthProvider" value={inputValue.PCPHealthProvider} onChange={handleChange}
                />
                 <InputFields label="Phone Number:" inputId="PCPHealthProviderPhoneNumber" inputName="PCPHealthProviderPhoneNumber" value={inputValue.PCPHealthProviderPhoneNumber} onChange={handleChange}
                />
                <InputFields label="Email Address:" inputId="PCPHealthProviderEmailAddress" inputName="PCPHealthProviderEmailAddress" value={inputValue.PCPHealthProviderEmailAddress} onChange={handleChange}
                />
                <InputFields label="Dentist Name:" inputId="PCPDentistName" inputName="PCPDentistName" value={inputValue.PCPDentistName} onChange={handleChange}
                />
                <InputFields label="Phone Number:" inputId="PCPDentistPhoneNumber" inputName="PCPDentistPhoneNumber" value={inputValue.PCPDentistPhoneNumber} onChange={handleChange}
                />
                <InputFields label="Address:" inputId="PCPDentistAddress" inputName="PCPDentistAddress" value={inputValue.PCPDentistAddress} onChange={handleChange}
                />
                <InputFields label="Specialist Name:" inputId="PCPSpecialistName" inputName="PCPSpecialistName" value={inputValue.PCPSpecialistName} onChange={handleChange}
                />
                <InputFields label="Phone Number:" inputId="PCPSpecialistPhoneNumber" inputName="PCPSpecialistPhoneNumber" value={inputValue.PCPSpecialistPhoneNumber} onChange={handleChange}
                />
                <InputFields label="Office Address:" inputId="PCPSpecialistOfficeAddress" inputName="PCPSpecialistOfficeAddress" value={inputValue.PCPSpecialistOfficeAddress} onChange={handleChange}
                />
                </div>
                <h5 className=' mt-5'>Provider Agency Emergency Contact Information</h5>
                <div className='d-flex flex-column gap-3 mb-4'>
                  <InputFields label="Program Supervisor/Manager:" inputId="ProviderSupervisorName" inputName="ProviderSupervisorName" value={inputValue.ProviderSupervisorName} onChange={handleChange}
                  />
                  <InputFields label="Phone Number:" inputId="ProviderSupervisorPhoneNumber" inputName="ProviderSupervisorPhoneNumber" value={inputValue.ProviderSupervisorPhoneNumber} onChange={handleChange}
                  />
                  <InputFields label="Email Address:" inputId="ProviderSupervisorEmailAddress" inputName="ProviderSupervisorEmailAddress" value={inputValue.ProviderSupervisorEmailAddress} onChange={handleChange}
                  />
                  <InputFields label="After-Hours Emergency Line (On-Call):" inputId="ProviderAfterHoursEmergencyLine" inputName="ProviderAfterHoursEmergencyLine" value={inputValue.ProviderAfterHoursEmergencyLine} onChange={handleChange}
                  />
                  <InputFields label="Medication Administration Certified Staff (if applicable):" inputId="ProviderMedicationAdministrationStaff" inputName="ProviderMedicationAdministrationStaff" value={inputValue.ProviderMedicationAdministrationStaff} onChange={handleChange}
                  />
                  <InputFields label="Name:" inputId="ProviderName" inputName="ProviderName" value={inputValue.ProviderName} onChange={handleChange}
                  />
                  <InputFields label="Phone Number:" inputId="ProviderPhoneNumber" inputName="ProviderPhoneNumber" value={inputValue.ProviderPhoneNumber} onChange={handleChange}
                  />
                </div>
                <h5 className=' mt-5'>Additional Contacts</h5>
                <div className='d-flex flex-column gap-3 mb-4'>
                  <InputFields label="Preferred Pharmacy Name" inputId="PreferredPharmacyName" inputName="PreferredPharmacyName" value={inputValue.PreferredPharmacyName} onChange={handleChange}
                  />
                  <InputFields label="Phone Number" inputId="PreferredPharmacyPhoneNumber" inputName="PreferredPharmacyPhoneNumber" value={inputValue.PreferredPharmacyPhoneNumber} onChange={handleChange}
                  />
                  <InputFields label="Transportation Provider Name & Contact:" inputId="TransportationProviderName" inputName="TransportationProviderName" value={inputValue.TransportationProviderName} onChange={handleChange}
                  />
                  <InputFields label="Emergency Medical Consent on File: (Yes / No)" inputId="EmergencyMedicalConsentOnFile" inputName="EmergencyMedicalConsentOnFile" value={inputValue.EmergencyMedicalConsentOnFile} onChange={handleChange}
                  />
                  <InputFields label="Advance Directives or DNR Orders (if applicable):" inputId="AdvanceDirectivesOrDNROrders" inputName="AdvanceDirectivesOrDNROrders" value={inputValue.AdvanceDirectivesOrDNROrders} onChange={handleChange}
                  />
                  <InputFields label="Notes or Special Medical Instructions:" inputId="NotesOrSpecialMedicalInstructions" inputName="NotesOrSpecialMedicalInstructions" value={inputValue.NotesOrSpecialMedicalInstructions} onChange={handleChange}
                  />
                </div>
              </section>
              <section className='my-4 pdf-page-break'>
                <h3 className='text-info'>ODP Mission, Vision, and Core Values</h3>
                <div className='my-4'>
                <h5>Missions</h5>
                <p>The mission of the Pennsylvania Office of Developmental Programs (ODP) is to support Pennsylvanians with developmental disabilities to achieve greater independence, choice, and opportunities in their lives. ODP works to ensure that individuals have access to high-quality, person-centered services that are delivered in the most inclusive and respectful manner possible.</p>
                </div>
                <div className='my-4'>
                <h5>Vision</h5>
                <p>ODP envisions a service system where all individuals with intellectual and developmental disabilities live everyday lives—lives that are no different than those without disabilities. This includes full participation in community life, meaningful relationships, employment, lifelong learning, and self-determination in every aspect of life.</p>
                </div>
                <div className='my-4'>
                <h5>Core Values</h5>
                <p>The core values of the Pennsylvania Office of Developmental Programs (ODP) are:</p>
                <ul>
                  <li><b>Person-Centeredness:</b>Services are driven by the individual’s goals, preferences, and strengths.</li>
                  <li><b>Dignity and Respect :</b>All people have the right to be treated with dignity and respect.</li>
                  <li><b>Inclusion:</b>Individuals have the right to participate fully in their communities.</li>
                  <li><b>Self-Determination:</b> People should be empowered to make their own choices and decisions.</li>
                  <li><b>Collaboration:</b>Families, providers, and individuals work together as equal partners</li>
                  <li><b>Accountability:</b>Providers and professionals are held to high standards of quality and ethical responsibility.</li>
                  <li><b>Innovation:</b>The system embraces new ideas, technologies, and practices that improve outcomes.</li>
                  <li><b>Safety and Well-Being:</b>Physical, emotional, and psychological safety are priorities in all services.</li>
                 
                </ul>
                </div>
              </section>
              <section className='my-4 pdf-page-break'>
                <h3 className='text-info'>Individual Rights & Person-Centered Support – Habilitation Services (ODP)</h3>
                <div className='my-4'>
                  <p>This policy outlines the rights of individuals receiving Habilitation Services and the expectations for person-centered support. It is based on the Pennsylvania Office of Developmental Programs (ODP) regulations, including 55 Pa. Code Chapter 6100, and reflects our agency's commitment to dignity, choice, and self-determination. All staff must uphold these rights and implement services consistent with person-centered values.</p>
                </div>
                <h5>Rights of Individuals Receiving Services</h5>
                <div className='my-4'>
                  <ul>
                    <li>To be treated with dignity, fairness, and respect</li>
                    <li>To receive services free from abuse, neglect, exploitation, and discrimination</li>
                    <li>To make choices, including where and with whom they live and work</li>
                    <li>To privacy, including in communication, personal care, and information</li>
                    <li>To participate in the development and revision of their Individual Support Plan (ISP)</li>
                    <li>To access and review their service records</li>
                    <li>To voice grievances and file complaints without fear of retaliation</li>
                    <li>To refuse services or supports unless mandated by law</li>
                    <li>To associate with others and participate in community life</li>
                    <li>To access medical, legal, and spiritual services of their choosing</li>
                  </ul>
                  </div>
                  <h5>Staff Responsibilities to Uphold Rights</h5>
                  <div className='my-4'>
                    <p>Habilitation Aides must:</p>
                    <ul>
                      <li>Be familiar with and respect the rights of all individuals they support</li>
                      <li>Interact in ways that promote dignity, choice, and independence</li>
                      <li>Avoid any action that may restrict or violate a person’s rights</li>
                      <li>Support individuals in understanding and exercising their rights</li>
                      <li>Document rights-related issues and report concerns to supervisors</li>
                      <li>Follow ODP’s due process procedures before implementing any rights restrictions</li>
                    </ul>
                  </div>
                  <h5>Person-Centered Support</h5>
                  <div className='my-4'>
                    <p>Person-centered support is grounded in the belief that individuals are the experts in their own lives. Services must be tailored to their preferences, culture, and goals. Staff must:</p>
                    <ul>
                      <li>Learn about what is important TO and FOR the individual</li>
                      <li>Respect cultural, spiritual, and personal preferences</li>
                      <li>Encourage and support informed choice and risk-taking</li>
                      <li>Provide support in ways that promote self-direction and capability</li>
                      <li>Use positive communication, visual supports, and technology when helpful</li>
                    </ul>
                  </div>
              </section>
              <section className='my-4 pdf-page-break'>
                <h5>Supporting Self-Determination and Decision-Making</h5>
                <div className='my-4'>
                  <p>Staff must presume competence and support individuals in making decisions about their lives. This includes explaining options clearly, respecting choices (even when different from staff preferences), and involving trusted supporters. Use of Supported Decision-Making (SDM) principles is encouraged.</p>
                </div>
                <h5>Rights Restrictions</h5>
                <div className='my-4'>
                  <p>Any restriction of rights (e.g., locked doors, denied communication, behavior-based consequences) must:</p>
                  <ul>
                    <li>Be reviewed and approved through the ISP team</li>
                    <li>Include a positive behavior support plan</li>
                    <li>Be time-limited and reviewed regularly</li>
                    <li>Be reported in HCSIS as a rights restriction</li>
                    <li>Never be used as punishment or for staff convenience</li>
                  </ul>
                </div>
                <h5>Acknowledgment of Individual Rights & Person-Centered Support</h5>
                <div className='my-4'>
                  <p>I acknowledge that I have read, understand, and agree to uphold the rights of individuals and provide services that are person-centered and respectful. I understand that failure to do so may result in disciplinary action and/or state compliance issues.</p>
                </div>
                <div className='mb-3'>
                  <InputFields label="Staff Name (print):" inputId="staffName_rights" inputName="staffName_rights" value={inputValue.staffName_rights} onChange={handleChange}
                  />
                <div className='col-md-3'>
                  <SignatureCanvas label="Staff Signature" name="staffSignature_rights"/>
                  <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_rights"/>
                  </div>
                  </div>
              </section>

              <section className='my-4  pdf-page-break'>
                <h3 className='text-info'>
                  Agency Policies & Procedures – Habilitation Services (ODP)
                </h3>
                <div className='my-4'>
                  <p>This document outlines the comprehensive agency policies and procedures that guide the delivery of Habilitation Services under Pennsylvania’s Office of Developmental Programs (ODP). These policies are grounded in federal and state regulations and reflect our commitment to quality, safety, person-centered practices, and ethical responsibility. All Habilitation Aides must review, understand, and comply with these policies before providing services.</p>
                </div>
                <h5>1. Person Centered Practices</h5>
                <div className='my-4'>
                  <p>All services must prioritize the individual’s preferences, values, needs, and goals as identified in their Individual Support Plan (ISP). Person-centered planning is an ongoing process that must be reflected in all supports, documentation, and staff interactions. Habilitation Aides are required to:</p>
                </div>
                <ul>
                  <li>Empower individuals to make choices about their daily lives and routines</li>
                  <li>Involve individuals in decision-making regarding their services</li>
                  <li>Respect personal routines, cultural preferences, and communication styles</li>
                  <li>Use active listening and offer meaningful opportunities for engagement</li>
                </ul>
                <h5>2. Rights of Individuals</h5>
                <div className='my-4'>
                  <p>Individuals with disabilities have the same legal rights as all citizens, including the right to privacy, dignity, freedom of expression, and protection from abuse or discrimination. All staff must:</p>
                  <ul>
                    <li>Review and understand the Individual Rights described by ODP</li>
                    <li>Avoid any action that could be perceived as restrictive or punitive</li>
                    <li>Support individuals in exercising self-determination and informed consent</li>
                    <li>Report any suspected rights violations immediately</li>
                   
                  </ul>
                </div>
                <h5>3. Confidentiality and HIPAA</h5>
                <div className='my-4'>
                  <p>Staff are legally and ethically obligated to protect all Protected Health Information (PHI) in compliance with the Health Insurance Portability and Accountability Act (HIPAA). This includes written, spoken, and electronic communications. Staff must:</p>
                  <ul>
                    <li>Keep all documentation secure and locked when not in use</li>
                    <li>Never share personal information about individuals outside of the care team</li>
                    <li>Use password-protected systems for all digital documentation</li>
                    <li>Avoid discussing client information in public areas or on personal devices</li> 
                  </ul>
                </div>
                </section>
                <section className='my-4  pdf-page-break'>
                  <h5>4. Mandated Reporting</h5>
                  <p>All Habilitation Aides are mandated reporters under Pennsylvania law. If staff witness, suspect, or are informed of abuse, neglect, exploitation, or abandonment, they must:</p>
                  <ul>
                    <li>Immediately report to ChildLine (if under 18), Adult Protective Services, or appropriate hotline</li>
                    <li>Notify a supervisor within the agency</li>
                    <li>Complete an Incident Report in accordance with ODP’s Incident Management system Failure to report may result in legal consequences and termination.</li>
                  </ul>
                  <div className='my-4'>
                    <h5>5. . Emergency Preparedness</h5>
                    <p>Staff must be familiar with emergency procedures for fire, severe weather, medical emergencies, and behavioral crises. All staff are required to</p>
                    <ul>
                      <li>Complete fire and emergency drills on schedule and document participation</li>
                      <li>Follow the agency Emergency Preparedness Plan and evacuation procedures</li>
                      <li>Know the location of first aid kits, AEDs, and emergency exits</li>
                      <li>Contact 911 when necessary and notify supervisors immediately</li> 
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>6. Health and Safety</h5>
                    <p>The physical and emotional well-being of individuals is a top priority. Staff are required to:</p>
                    <ul>
                      <li>Provide supervision according to the ISP</li>
                      <li>Use safe lifting, transferring, and positioning techniques</li>
                      <li>Monitor for illness, injury, or changes in condition and report immediately</li>
                      <li>Adhere to safety protocols in the home and community settings</li>
                      <li>Complete incident reports for accidents, injuries, or unsafe conditions</li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>7. Incident Management</h5>
                    <p>All reportable incidents must be documented through the HCSIS/ODP Incident Management (IM) system. Staff must:</p>
                    <ul>
                      <li>Identify and report incidents within 24 hours or sooner if urgent</li>
                      <li>Complete detailed and objective documentation </li>
                      <li> Participate in investigations and follow-up reviews</li>
                      <li>Avoid tampering with evidence, discussing ongoing investigations, or retaliating against reporters</li>
                    </ul>
                  </div>
              </section>
              <section className='my-4  pdf-page-break'>
                  {/* page break */}
                  <div className='my-4'>
                    <h5>8. Documentation and Progress Notes</h5>
                    <p>Timely, accurate documentation is required to maintain funding, monitor outcomes, and ensure continuity of care. Notes must:</p>
                    <ul>
                      <li>Be completed daily using the agency's approved format </li>
                      <li>Reﬂect services provided, goals addressed, partcipaton level, and progress</li>
                      <li>Use objectve, factual language and include date/tme of service </li>
                      <li>Be stored securely and submited according to agency tmelines</li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>9. Medicaton Administraton </h5>
                    <p>Only staﬀ who have successfully completed ODP-approved Medicaton Administraton Training may administer medicatons. Procedures include: </p>
                    <ul>
                      <li>Verifying the 6 Rights of Medicaton Administraton </li>
                      <li>Logging all medicaton administraton on MARs (Medicaton Administraton Records) </li>
                      <li> Reportng any missed, refused, or incorrect doses immediately </li>
                      <li> Safely storing all medicatons in a locked area and following disposal protocols </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>10. Cultural Competency & Disability Awareness </h5>
                    <p>Our agency is commited to equity and inclusion. Staﬀ must: </p>
                    <ul>
                      <li>Respect all cultural, racial, gender, and religious identtes </li>
                      <li> Avoid stereotypes, assumptons, or discriminatory language </li>
                      <li>Use inclusive communicaton techniques and visual supports when appropriate </li>
                      <li>Understand disability not only as a medical issue, but also as a cultural identty </li>
                    </ul>
                    </div>
                    <div className='my-4'>
                      <h5>11. De-escalation & Behavioral Support Techniques </h5>
                      <p>Challenging behavior is a form of communicaton. Staﬀ must: </p>
                      <ul>
                        <li>Apply Positve Approaches principles </li>
                        <li>Recognize early warning signs of escalaton and respond calmly</li>
                        <li>Use non-physical de-escalaton methods such as redirecton, choice oﬀering, and providing space </li>
                        <li> Follow any behavior support plans and ensure documentaton of behavioral incidents </li>
                      </ul>
                    </div>
                    <div className='my-4'>
                      <h5>12. Training & Professional Development  </h5>
                      <p>All staﬀ must complete mandatory training prior to service delivery and maintain annual training hours. This includes: </p>
                      <ul>
                        <li> Inital orientaton and annual refresher trainings </li>
                        <li>CPR/First Aid, Incident Management, HIPAA, and Abuse Reportng </li>  
                        <li>Agency-speciﬁc training and any ISP-required training </li>
                        <li>Documentng training partcipaton and completng knowledge assessments  </li>
                      </ul>
                    </div>
                    </section>
                    <section className='my-4  pdf-page-break'>
                    <div className='my-4'>  
                    <h5>13. Transportaton & Community Safety   </h5>
                      <p>If transportng individuals, staﬀ must: </p>
                      <ul>
                      <li>Maintain a valid driver's license and insurance  </li>
                      <li>Ensure all passengers use seat belts </li>
                      <li> Follow approved community access plans </li>
                      <li>Never leave individuals unatended in a vehicle  </li>
                      <li>Report accidents immediately and complete all required forms  </li>
                    </ul>
                </div>
                <div className='my-4'>
                <h5>14. Use of Technology and Social Media</h5>
                <p>Staff may not: </p>
                <ul>
                  <li> Share photos, videos, or stories about individuals on personal devices or social media </li>
                  <li>Use work devices for personal purposes  </li>  
                  <li>Communicate about individuals through unapproved channels </li>
                  <li> Violate privacy policies in any digital form </li>
                </ul>
              </div>
              <div className='my-4'>  
              <h5>Acknowledgment of Policies & Procedures </h5>
                <p>I acknowledge that I have read, understood, and agree to follow the agency's policies and procedures for Habilitaton Services. I understand that failure to adhere to these policies may result in disciplinary acton, up to and including terminaton of employment.  </p>
                <div className='mb-3'>
                  <InputFields label="Staff Name (print):" inputId="staffName_policies" inputName="staffName_policies" value={inputValue.staffName_policies} onChange={handleChange}
                  />
                <div className='col-md-3'>
                  <SignatureCanvas label="Staff Signature" name="staffSignature_policies"/>
                  <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_policies"/>
                  </div>
              </div>
              </div>
                </section>

                <section className='my-4  pdf-page-break'>
                  <h3 className='text-info'>
                    Cultural Competency Resources 
                  </h3>
                  <p>This guide provides resources and expectatons for promotng cultural competency within Habilitaton Services. Aligned with the Pennsylvania Oﬃce of Developmental Programs (ODP) regulatons and the values of person-centered planning, cultural competency is essental to providing respectul, inclusive, and eﬀectve support. </p>

                  <div className='my-4'>
                    <h5>What is Cultural Competency? </h5>
                    <p>Cultural competency is the ability to understand, appreciate, and interact respectully with people from cultures or belief systems diﬀerent from one's own. It involves ongoing self-reﬂecton, educaton, and commitment to equity in service delivery.</p>
                  </div>
                  <div className='my-4'>
                    <h5>  Staﬀ Responsibilites </h5>
                    <p>Habilitaton Aides must: </p>
                    <ul>
                      <li>Respect the customs, language, values, and preferences of each individual </li>
                      <li>Avoid assumptons or stereotypes based on race, ethnicity, gender, religion age, or disability  </li>
                      <li>Use person-ﬁrst, inclusive language unless otherwise requested  </li>
                      <li>Ask respectul questons and oﬀer culturally relevant choices </li>
                      <li>Partcipate in annual cultural competency training </li>
                      <li> Document services that reﬂect individual cultural needs and supports  </li>
                    </ul>
                   </div>
                   <div className='my-4'>
                    <h5>Understanding Disability as a Cultural Identty </h5>
                    <p>Some individuals identfy strongly with the disability community as part of their cultural identty. Staﬀ must: </p>
                    <ul>
                      <li>Recognize disability pride and self-advocacy movements </li>
                      <li>Avoid portraying disability as something to be ‘ﬁxed’ </li>
                      <li>Support communicaton preferences, assistve technologies, and adaptve behaviors </li>
                      <li>Validate the individual’s experiences and identty </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5> Inclusive Communicaton Tips </h5>
                    <p>All staﬀ must complete mandatory training prior to service delivery and maintain annual training hours. This includes: </p>
                    <ul>
                      <li> Use plain language and visual supports when needed </li>
                      <li>Ask about preferred pronouns and names </li>  
                      <li> Oﬀer interpretaton or translaton services if appropriate</li>
                      <li>Be aware of cultural norms regarding eye contact, touch, and space </li>
                      <li> Avoid slang, jargon, or idioms that may not be universally understood </li>
                    </ul>
                  </div>
                  </section>

                  <section className='my-4  pdf-page-break'>
                    <h5>Supportng Cultural Identty in the ISP </h5>
                    <p>The Individual Support Plan (ISP) should reﬂect the individual’s cultural background and support needs. This may include:  </p>
                    <ul>
                      <li>Religious observances or dietary restrictons </li>
                      <li>Language preferences and interpreter services </li>
                      <li>Family roles or cultural traditons </li>
                      <li>Holidays and celebratons that are meaningful to the individual </li>
                    </ul>

                    <div className='my-4'>
                      <h5>  ODP Regulatory Alignment </h5>
                      <p>ODP regulatons (55 Pa. Code §6100.181-6100.184) require providers to promote dignity, respect, and culturally appropriate service delivery. Our agency adheres to these regulatons and supports staﬀ in maintaining cultural awareness through training and supervision. </p>
                    
                    </div>
                    <div className='my-4'>
                      <h5>Ongoing Learning & Training Resources</h5>
                      <p>ODP provides a variety of resources to support staﬀ in maintaining cultural awareness and promoting inclusive service delivery. These resources include: </p>
                      <ul>
                        <li>Annual cultural competency training (mandatory) </li>
                        <li>Self-directed learning modules on disability justce, intersectonality, and inclusion </li>
                        <li> Opportunites to engage with diverse communites and cultural celebratons  </li>
                        <li> Reﬂecton exercises, journaling, and case reviews to identfy and address bias </li>
                        </ul>
                    </div>

                    <div className='my-4'>
                      <h5>Acknowledgment of Cultural Competency Policy </h5>
                      <p>I acknowledge that I have read, understand, and agree to support culturally competent service delivery. I will actvely respect the identtes, traditons, and voices of the individuals I support and will seek training or guidance as needed.  </p>
                      <div className='mb-3'>
                        <InputFields label="Staff Name (print):" inputId="staffName_culture" inputName="staffName_culture" value={inputValue.staffName_culture} onChange={handleChange}
                        />
                      <div className='col-md-3'>
                        <SignatureCanvas label="Staff Signature" name="staffSignature_culture"/>
                        <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_culture"/>
                        </div>
                      </div>
                    </div>
                </section>
                <section className='my-4  pdf-page-break'>
                  <h3 className='text-info'>
                    Incident Management & Reportng Procedures – Habilitaton Services (ODP) 
                  </h3>
                  <p>This document outlines the policies and procedures for Incident Management and Reportng, speciﬁc to our agency and compliant with the Pennsylvania Oﬃce of Developmental Programs (ODP) requirements. All staﬀ are responsible for recognizing, responding to, reportng, and documentng incidents involving individuals receiving Habilitaton Services. Failure to follow these procedures may result in disciplinary acton and state non-compliance citatons.</p>
                  <div className='my-4'>
                    <h5> What is an Incident? </h5>
                    <p>An incident is any event or situaton that could potentally or actually compromise the health, safety, rights, or welfare of an individual. Incidents may also include any violaton of ODP regulatons or agency policy.  </p>
                  </div>
                  <div className='my-4'>
                    <h5>Types of Reportable Incidents </h5>
                    <ul>
                      <li>Abuse (physical, sexual, verbal, emotonal, or psychological) </li>
                      <li>Neglect (failure to provide necessary support or supervision)  </li>
                      <li> Misuse of restraints </li>
                      <li>Death (expected or unexpected) </li>
                      <li> Hospitalizaton (unplanned or psychiatric)  </li>
                      <li>Emergency room visits </li>
                      <li> Psychiatric crisis or emergency </li>
                      <li>  Law enforcement involvement  </li>
                      <li> Medicaton errors (missed, wrong dose, etc.)  </li>
                      <li>  Rights violatons or exploitaton  </li>
                      <li>  Serious injury </li>
                      <li>  Fire requiring response </li>
                      <li> Any situaton that results in risk of harm or harm to the individual </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>Staﬀ Responsibilites </h5>
                    <p>Habilitaton Aides must: </p>
                    <ul>
                      <li>Immediately respond to protect the individual’s safety </li>
                      <li>Notfy emergency responders (911) if necessary </li>
                      <li> Contact a supervisor immediately upon discovering or being informed of the incident  </li>
                      <li>Complete a writen incident report before the end of the shift  </li>
                      <li>Partcipate in incident review, investgaton, or retraining if requested  </li>
                      <li>Cooperate fully with internal and external investgatons  </li>
                    </ul>
                  </div>
                </section>
                <section className='my-4  pdf-page-break'>
                  <h5>  Internal Reportng Protocol </h5>
                  <ol>
                    <li> Ensure the individual is safe and provide immediate support. </li>
                    <li> Contact your immediate supervisor or the on-call manager. </li>
                    <li> Complete the agency’s Incident Report Form (paper or electronic). </li>
                    <li> Submit the report to the designated Incident Management Coordinator. </li>
                    <li> Follow up as directed for additonal documentaton or statements.  </li>
                  </ol>
                  <div className='my-4'>
                    <h5>Documentaton Requirements </h5>
                    <p>All incident documentaton must be: </p>
                    <ul>
                      <li>Objectve and factual (no opinions or assumptons)  </li>
                      <li>Detailed, including tme, date, people involved, locaton, and actons taken </li>
                      <li>Submited within 24 hours of the incident (or immediately if urgent) </li>
                      <li> Completed using the agency’s approved forms and procedures  </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5> ODP Compliance & Incident Management System (EIM) </h5>
                    <p>Our agency utlizes the Enterprise Incident Management (EIM) system in accordance with ODP regulatons. All reportable incidents must be entered into EIM within required tmeframes and will undergo state-level review. Staﬀ may be asked to assist in investgatons, root cause analysis, or preventon planning. </p>
                  </div>

                  <div className='my-4'>
                    <h5>Conﬁdentality & Non-Retaliaton </h5>
                    <p>All incidents and investgatons are conﬁdental. Staﬀ may not discuss incidents with unauthorized individuals. Any form of retaliaton against someone who reports or is involved in an incident is strictly prohibited and will result in disciplinary acton. </p>
                  </div>
                  <div className='my-4'>
                    <h5>Acknowledgment of Incident Management Policy </h5>
                    <p>I acknowledge that I have read, understand, and agree to follow the Incident Management & Reportng Procedures of the agency, including my responsibilites under Pennsylvania’s ODP regulatons. I understand that failure to comply with these procedures may result in disciplinary acton.  </p>
                    <div className='mb-3'>
                      <InputFields label="Staff Name (print):" inputId="staffName_incidents" inputName="staffName_incidents" value={inputValue.staffName_incidents} onChange={handleChange}
                      />
                    <div className='col-md-3'>
                      <SignatureCanvas label="Staff Signature" name="staffSignature_incidents"/>
                      <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_incidents"/>
                      </div>
                    </div>  
                    </div>
                </section>

                <section className='my-4  pdf-page-break'>
                  <h3 className='text-info'>
                   Documentaton Standards & Progress Notes – Habilitaton Services (ODP)  
                  </h3>
                  <p>This policy outlines the documentaton requirements for staﬀ providing Habilitaton Services, in compliance with the Pennsylvania Oﬃce of Developmental Programs (ODP) regulatons and agency protocols. Accurate, tmely, and professional documentaton is essental for demonstratng service delivery, tracking progress, maintaining funding, and ensuring the safety and well-being of individuals. </p>

                  <div className='my-4'>
                    <h5>  General Documentaton Requirements</h5>
                    <p>Habilitaton Aides must: </p>
                    <ul>
                      <li>Complete documentaton daily for every shif where services are provided </li>
                      <li> Record informaton in a clear, objectve, and professional manner  </li>
                      <li>Use black or blue ink for handwriten notes (if applicable); no pencil  </li>
                      <li> Correct mistakes with a single line, inital, and date; do not use white-out </li>
                      <li> Submit documentaton by the end of each shif or within the tmeline speciﬁed by the agency </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>  Required Elements of a Progress Note  </h5>
                    
                    <ul>
                      <li>Full name of the individual receiving services </li>
                      <li> Date and tme services were provided </li>
                      <li>Total tme (units/hours) documented  </li>
                      <li>Actvites performed that align with ISP outcomes </li>
                      <li> Locaton of service (home, community, etc.)  </li>
                      <li> Level of partcipaton and engagement </li>
                      <li> Any signiﬁcant events, changes, or concerns observed  </li>
                      <li>Signature and printed name of the staﬀ completng the note  </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>   Use of Objectve, Factual Language </h5>
                    <p>All documentaton must reﬂect facts rather than opinions or assumptons. Use observable and measurable terms. Examples: </p>
                    <ul>
                      <li>Write: “John completed a load of laundry with verbal prompts.”  </li>
                      <li> Avoid: “John was lazy today.” </li>
                      <li>Write: “Maria refused to atend the actvity afer being oﬀered two alternatves.” </li>
                      <li>  Avoid: “Maria had an attude.”  </li>
                    </ul>
                  </div>
                </section>
                <section className='my-4  pdf-page-break'>
                  <h5> Example of a Quality Progress Note </h5>
                  <p>Example:  </p>
                  <p>“Staﬀ arrived at 2:00 PM. Provided support to Jason with cooking lunch and completng kitchen cleanup per ISP goal. Jason selected grilled cheese and used a visual recipe. Staﬀ provided verbal prompts for stovetop safety. Jason independently cleaned his dishes. He declined the planned community walk due to rain. Discussed alternatves; Jason chose to complete a puzzle. No incidents or medical concerns reported. Services ended at 6:00 PM. - Jane Doe” </p>
                  <div className='my-4'>
                    <h5>Electronic Documentaton Systems </h5>
                    <ul>
                      <li>If using an Electronic Health Record (EHR) or agency-approved platorm, staﬀ must log in securely and log out when not in use </li>
                      <li> Passwords must not be shared or stored in accessible locatons  </li>
                      <li>All entries must meet the same standards of accuracy and tmeliness as paper documentaton </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>  Common Documentaton Errors to Avoid </h5>
                    <ul>
                      <li>Omitng the date or service tme  </li>
                      <li> Using vague or unclear language (e.g., “Did some stuﬀ with client”)  </li>
                      <li>Subjectve judgments (e.g., “He was annoying today”) </li>
                      <li>Failing to relate actvites to ISP goals</li>
                      <li> Late or backdated entries without explanaton </li>
                    </ul>
                  </div>
                  <div className='my-4'>
                    <h5>Acknowledgment of Documentaton Policy </h5>
                    <p>I acknowledge that I have read, understand, and agree to follow the documentaton standards for Habilitaton Services. I understand that proper documentaton is a requirement of my role and a critcal component of compliance with ODP regulatons. </p>
                    <div className='mb-3'>
                      <InputFields label="Staff Name (print):" inputId="staffName_documentation" inputName="staffName_documentation" value={inputValue.staffName_documentation} onChange={handleChange}
                      />
                    <div className='col-md-3'>
                      <SignatureCanvas label="Staff Signature" name="staffSignature_documentation"/>
                      <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_documentation"/>
                      </div>
                    </div>
                    </div>
                  </section>
                  <section className='my-4  pdf-page-break'>
                    <h3 className='text-info'>
                     Fire Safety & Emergency Protocols – Habilitation Services (ODP)
                    </h3>
                    <p>This document outlines agency-specific fire safety and emergency response procedures in alignment with Pennsylvania’s Office of Developmental Programs (ODP) requirements. All Habilitation Aides are required to follow these procedures to ensure the safety and wellbeing of individuals receiving services. Fire safety training and emergency preparedness drills must be completed as part of orientation and on a recurring basis. </p>

                    <div className='my-4'>
                      <h5>Fire Safety Policies </h5>
                      <p>Habilitation Aides must:</p>
                      <ul>
                        <li>Ensure smoke detectors are functional and tested monthly </li>
                        <li>Keep hallways, doorways, and exits free of clutter</li>
                        <li>Know the location of fire extinguishers and how to use the PASS method: </li>
                        <ul>
                          <li>P – Pull the pin </li>
                          <li>A - Aim at the base of the fire</li>
                          <li>S - Squeeze the Handle</li>
                          <li>S - Sweep side to side</li>
                          </ul>
                        <li>Never leave stoves, candles, or space heaters unattended </li>
                        <li>Immediately report any fire hazard to a supervisor</li>
                        
                      </ul>
                      </div>
                      <div className='my-4'>
                        <h5>Fire Drill Requirements </h5>
                        <ul>
                          <li>Fire drills must be completed and documented at least once every 60 days (or as required by site license)</li>
                          <li>Drills must include use of all available exits (over time), proper evacuation procedures, and support for individuals needing assistance</li>
                          <li>Document the date, time, names of individuals/staff, total evacuation time, and any challenges</li> 
                          <li>Review each drill with staff and individuals to improve future responses</li> 
                        </ul>
                      </div>
                      <div className='my-4'>
                        <h5>Emergency Evacuation Protocol</h5>
                        <p>In the event of a fire:</p>
                        <ul>
                          <li>Remain calm and activate the fire alarm (if not already triggered)</li>
                          <li>Verbally instruct individuals to evacuate or provide prompts/support as needed</li>
                          <li>Use the nearest and safest exit (never use elevators)</li> 
                          <li>Support individuals to evacuate using mobility devices or carry techniques if required (and trained to do so)</li>
                          <li>Escort individuals to the designated safe meeting area</li>
                          <li>Take attendance and confirm all individuals are accounted for</li>
                          <li>Call 911 if not already done and report the fire</li>
                          <li>Wait for emergency personnel instructions before re-entering the building</li>
                        </ul>
                      </div>
                  </section>
                  {/* Page break */}
                  <section className="my-4  pdf-page-break">
                    <h5>
                      Additional Emergency Situations
                    </h5>
                    <ul>
                      <li><b>Medical Emergencies –</b> Call 911 and follow First Aid/CPR procedures; document the event and notify a supervisor.</li>

                      <li><b>Natural Disasters (e.g., flood, snowstorm) –</b>Follow the site-specific disaster plan; ensure all individuals are safe, and maintain communication with agency leads.</li>

                      <li><b>Power Outages – </b>Ensure safety lighting, maintain temperature control, use flashlights, and call the on-call supervisor.</li>

                      <li><b>Missing Individual – </b> Begin immediate search, contact supervisor and 911 if not found within 10 minutes, complete incident report.</li>

                      <li><b>Behavioral Crisis – </b> Use de-escalation strategies and protect all parties; evacuate others if needed and seek support per behavior plan.</li>
                    </ul>
                    <div className="my-4">
                      <h5>Documentation & Reporting </h5>
                      <p>All fire drills and emergency events must be documented using agency-approved forms. Documentation should include:</p>
                      <ul>
                        <li>Description of the incident or drill</li>
                        <li>Response actions taken</li>
                        <li>Staff and individuals involved </li>
                        <li>Observations and outcomes </li>
                        <li>Recommendations for improvement (if applicable) </li>
                      </ul>
                    </div>
                    <div className="my-4">
                      <h5>Acknowledgment of Fire Safety & Emergency Protocols  </h5>
                      <p>I acknowledge that I have read, understand, and agree to follow the agency’s fire safety and emergency response procedures. I understand that my role is critical in ensuring the safety of individuals during drills and emergencies, and failure to comply with procedures may result in disciplinary action. </p>
                      <div className="mb-3">
                        <InputFields label="Staff Name (print):" inputId="staffName_emergency" inputName="staffName_emergency" value={inputValue.staffName_emergency} onChange={handleChange}
                        />
                        <div className="col-md-3">
                          <SignatureCanvas label="Staff Signature" name="staffSignature_emergency"/>
                          <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_emergency"/>
                        </div>
                      </div>
                      </div>
                    </section>

                      {/* Page break */}
                <section className="my-4  pdf-page-break">
                  <h3 className="text-info">
                    HIPAA & Conﬁdentality Policies – Habilitaton Services (ODP) 
                  </h3>
                  <p>This policy outlines the legal and ethical responsibilites of staﬀ to protect the privacy and conﬁdentality of individuals receiving Habilitaton Services. It is based on the Health Insurance Portability and Accountability Act (HIPAA), the Pennsylvania Oﬃce of Developmental Programs (ODP) regulatons, and the agency’s internal standards for conﬁdentality and informaton protecton.  </p>

                  <div className="my-4">
                    <h5>What is HIPAA?  </h5>
                    <p>The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that protects individuals’ Protected Health Informaton (PHI). PHI includes any informaton related to an individual’s health, healthcare services, or payment for services that can identfy the person.  </p>
                  </div>
                  <div className="my-4">
                    <h5> Examples of Protected Health Informaton (PHI) </h5>
                    <ul>
                      <li> Names, addresses, phone numbers, and email addresses </li>
                      <li> Social Security numbers or Medicaid IDs </li>
                      <li>Medical diagnoses, medicatons, and treatment informaton </li>
                      <li> Behavioral health notes or support plans </li>
                      <li>Progress notes or incident reports </li>
                      <li> Conversatons between staﬀ about a person’s care  </li>
                      <li>Photos or videos of the individual (even without names) </li>
                    </ul>
                  </div>
                  <div className="my-4">
                    <h5>Staﬀ Responsibilites </h5>
                    <p>Habilitaton Aides must:</p>
                    <ul>
                      <li>Keep all documentaton in locked, secure locatons when not in use </li>
                      <li>Use agency-approved systems and devices for electronic communicaton and documentaton</li>
                      <li>Avoid discussing PHI in public areas, on personal devices, or with unauthorized individuals </li>
                      <li>Never post or share any informaton about individuals on social media  </li>
                      <li>Report any suspected breach of conﬁdentality immediately to a supervisor </li>
                    </ul>
                  </div>
                </section>
                <section className="my-4  pdf-page-break">
                  <h5>Electronic Communicaton & Conﬁdentality  </h5>
                  <ul>
                    <li>Use password-protected systems for documentaton (e.g., EHR or agency platorm) </li>
                    <li> Do not email or text PHI without proper encrypton and authorizaton  </li>
                    <li>Do not save or transfer individual informaton to personal devices or USBs </li>
                    <li>Avoid using personal email or messaging platorms to discuss services  </li>
                  </ul>
                  <div className="my-4">
                    <h5>Breach of Conﬁdentality  </h5>
                  <p>A breach is any unauthorized access, use, or disclosure of PHI. If a breach occurs, staﬀ must: </p>
                  <ul>
                    <li>Report the breach to their supervisor or HIPAA compliance oﬃcer immediately  </li>
                    <li>Complete an incident report </li>
                    <li> Cooperate with internal review and correctve acton as needed </li>
                    <li>Breaches may result in retraining, disciplinary acton, or legal consequences depending on severity.  </li>
                  </ul>
                  </div>
                  <div className="my-4">
                    <h5>Individual Rights Under HIPAA </h5>
                    <p>Individuals receiving services have the right to:  </p>
                    <ul>
                      <li> Receive a copy of their records upon request</li>
                      <li>Request correctons to their records </li>
                      <li>Receive a list of disclosures made </li>
                      <li> File complaints without fear of retaliaton </li>
                      <li> Be informed of their privacy rights during intake and service delivery   </li>
                    </ul>
                  </div>
                </section>
                <section className="my-4  pdf-page-break">
                  <h5>Acknowledgment of HIPAA & Conﬁdentiality Policies  </h5>
                  <p>I acknowledge that I have read, understand, and agree to follow the HIPAA & Conﬁdentality Policies outlined above. I understand that protectng the privacy of the individuals I support is a legal and ethical requirement and that any violaton may result in disciplinary or legal acton.  </p>
                  <div className="mb-3">
                    <InputFields label="Staff Name (print):" inputId="staffName_HIPAA" inputName="staffName_HIPAA" value={inputValue.staffName_HIPAA} onChange={handleChange}
                    />
                    <div className="col-md-3">
                      <SignatureCanvas label="Staff Signature" name="staffSignature_HIPAA"/>
                      <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_HIPAA"/>
                    </div>
                  </div>
              </section>
              <section className="my-4  pdf-page-break">
              <h3 className="text-info">Infecton Control & Universal Precautons – Habilitaton Services (ODP) </h3>
              <p>This policy outlines infection control and universal precautions procedures required by our agency and the Pennsylvania Office of Developmental Programs (ODP). All Habilitation Aides must follow these guidelines to prevent the spread of illness and maintain a safe, healthy environment for individuals and staff. </p>

              <div className="my-4">
                <h5>Key Deﬁnitons </h5>
                <ul>
                  <li>Infection Control – A set of practices used to prevent the transmission of infectious agents. </li>
                  <li> Universal Precautions – The assumption that all human blood and body fluids are potentially infectious, requiring protective measures at all times. </li>
                </ul>
              </div>
              <div className="my-4">
                <h5>Staﬀ Responsibilites </h5>
                <ul>
                  <li>Wash hands thoroughly before and after providing care, handling food, or using the restroom  </li>
                  <li>Use gloves when in contact with bodily fluids, open wounds, or soiled surfaces </li>
                  <li>Clean and disinfect surfaces, equipment, and frequently touched items regularly  </li>
                  <li>Follow respiratory hygiene (e.g., cover coughs/sneezes, dispose of tissues) </li>
                  <li>Stay home and notify a supervisor when experiencing contagious symptoms</li>
                </ul>
              </div>
              <div className="my-4">
                <h5> Proper Handwashing Technique </h5>
                <ul>
                  <li>Wet hands with clean, running water </li>
                  <li> Apply soap and lather for at least 20 seconds  </li>
                  <li>Scrub all surfaces, including back of hands, between fingers, and under nails </li>
                  <li>Rinse thoroughly under running water </li>
                  <li> Dry hands using a clean towel or air dry  </li>
                </ul>
              </div>
              <div className="my-4">
                <h5>Personal Protectve Equipment (PPE)  </h5>
               
                <ul>
                  <li>Use disposable gloves when there is potential contact with blood, body fluids, or soiled materials </li>
                  <li>Wear face masks and gowns when required due to illness outbreaks or specific ISP instructions  </li>
                  <li> Dispose of PPE properly in lined, covered trash containers </li>
                  <li>Wash hands immediately after removing gloves or any PPE  </li>
                </ul>
              </div>
              <div className="my-4">
                <h5> Cleaning & Disinfecton </h5>
                <ul>
                  <li>Use agency-approved disinfectants for cleaning surfaces and equipment </li>
                  <li> Disinfect shared items (e.g., phones, remote controls) between uses </li>
                  <li>Clean bathrooms and kitchens daily and after soiling  </li>
                  <li>Follow any enhanced cleaning protocols during illness outbreaks </li>
                </ul>
              </div>

              </section>

              {/* Page break */}
              <section className="my-4  pdf-page-break">
                <h5 >
                   Exposure to Blood or Bodily Fluids 
                </h5>
                <p>If exposed to blood or body fluids:</p>
                <ul>
                  <li>Wash the affected area immediately with soap and water </li>
                  <li>Flush mucous membranes with clean water </li>
                  <li>Report exposure to a supervisor immediately  </li>
                  <li> Complete an incident report and seek medical evaluation if necessary </li>
                </ul>
                <div className="my-4">
                  <h5> Handling Soiled Laundry or Waste </h5>
                  <ul>
                    <li> Wear gloves when handling soiled items </li>
                    <li>Place contaminated laundry in designated bags and clean promptly </li>
                    <li>Dispose of bodily waste or incontinence products in sealed trash bags </li>
                    <li>Wash hands immediately after handling waste </li>
                  </ul>
                </div>
                <div className="my-4">
                  <h5> Illness Preventon & Reportng </h5>
                  <ul>
                    <li> Monitor individuals for symptoms of illness and report concerns immediately </li>
                    <li>Do not report to work if experiencing fever, vomiting, diarrhea, or other infectious symptoms </li>
                    <li> Follow agency guidance on return-to-work and quarantine procedures </li>
                    <li>Cooperate with health department guidance during outbreaks (e.g., Flu, COVID-19) </li>
                  </ul>
                </div>
                </section>
                <section className="my-4  pdf-page-break">
                  <h5>Acknowledgment of Infecton Control & Universal Precautons </h5>
                  <p>I acknowledge that I have read, understand, and agree to follow the agency’s policies on infection control and universal precautions. I understand that these procedures are essential to protecting the health of individuals and coworkers, and failure to comply may result in disciplinary action.  </p>
                  <div className="mb-3">
                    <InputFields label="Staff Name (print):" inputId="staffName_infection" inputName="staffName_infection" value={inputValue.staffName_infection} onChange={handleChange}
                    />
                    <div className="col-md-3">
                      <SignatureCanvas label="Staff Signature" name="staffSignature_infection"/>
                      <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_infection"/>
                    </div>
                  </div>
                </section>
                <section className="my-4  pdf-page-break">
                  <h3 className="text-info">
                    De-escalaton & Behavioral Support Tools – Habilitaton Services (ODP) 
                  </h3>
                  <p>This document outlines agency-approved tools and procedures for de-escalation and behavioral support, consistent with the Pennsylvania Office of Developmental Programs (ODP) regulations and trauma-informed, person-centered care principles. All Habilitation Aides must use proactive, respectful, and non-restrictive strategies to prevent and respond to challenging behaviors.  </p>

                  <div className="my-4">
                    <h5>   Understanding Behavior as Communicaton</h5>
                    <p>All behavior serves a purpose and communicates a need, want, or emotion. Behavior may be influenced by: </p>
                    <ul>
                      <li> Environmental stressors  </li>
                      <li>  Unmet needs or pain  </li>
                      <li>Communication barriers  </li>
                      <li> Sensory processing difficulties </li>
                      <li> Past trauma or adverse experiences </li>
                    </ul>
                    <p>Staff must seek to understand the root cause of behaviors rather than simply trying to stop them.  </p>
                    </div>
                    <div className="my-4">
                      <h5>  Proactve Strategies  </h5>
                     
                      <ul>
                        <li> Establish predictable routines and clear expectations </li>
                        <li> Offer choices throughout the day to support autonomy </li>
                        <li>Use visual supports and communication tools </li>
                        <li>Recognize early warning signs of distress (e.g., pacing, withdrawal) </li>
                        <li>Reinforce positive behaviors with encouragement and praise </li>
                        <li>Create calm, sensory-friendly environments  </li>
                      </ul>
                    </div>
                    <div className="my-4">
                      <h5>De-escalaton Techniques  </h5>
                      <p>When early signs of escalation appear, staff should:  </p>
                      <ul>
                        <li>Remain calm and speak in a soft, steady tone  </li>
                        <li>Offer a break, alternate activity, or preferred coping tool  </li>
                        <li>Use redirection and distraction techniques </li>
                        <li> Avoid power struggles and unnecessary demands  </li>
                        <li>Respect personal space and use non-threatening body language  </li>
                        <li> Acknowledge the person’s feelings without judgment  </li>
                      </ul>
                      </div>
                    </section>
                    <section className="my-4  pdf-page-break">
                      <h5>Responding to Behavioral Crisis </h5>
                      <p>In the event of a behavioral crisis:  </p>
                      <ul>
                        <li>Prioritize the safety of the individual and others </li>
                        <li>Do not use physical restraint unless explicitly trained and authorized in the ISP (and only as a last resort)  </li>
                        <li>Use redirection and distraction techniques </li>
                        <li> Remove bystanders and reduce sensory input if possible  </li>
                        <li>Call for assistance and contact emergency services if necessary  </li>
                        <li> Report and document the incident per ODP regulations  </li>
                      </ul>

                      <div className="my-4">
                        <h5>Positve Behavior Support Plans (PBSP) </h5>
                        <p>If an individual has a PBSP in their ISP, staff must: </p>
                        <ul>
                          <li>Be trained on the PBSP and understand the outlined strategies  </li>
                          <li>Implement the plan consistently and document progress </li>
                          <li> Never apply restrictive interventions not approved in the plan </li>
                          <li> Collaborate with the behavior specialist and team as needed  </li>
                        </ul>
                      </div>
                      <div className="my-4">
                        <h5>Trauma-Informed Behavioral Support </h5>
                        <p>Our agency follows trauma-informed care principles by: </p>
                        <ul>
                          <li>Recognizing the impact of trauma on behavior and communication </li>
                          <li>Avoiding triggers that may re-traumatize individuals </li>
                          <li> Empowering individuals to use their voice and self-regulation tools </li>
                          <li>Building trust through consistency, respect, and transparency  </li>
                        </ul>
                      </div>
                      <div className="my-4">
                        <h5>Documentaton of Behavioral Incidents  </h5>
                        <p>Following any behavioral episode, staff must document:  </p>
                        <ul>
                          <li>What happened before, during, and after the incident  </li>
                          <li> Interventions used and their outcomes </li>
                          <li>The individual’s response and recovery time </li>
                          <li>Any injuries, witnesses, or follow-up needs </li>
                          <li>Complete reports within 24 hours and submit per agency policy </li>
                        </ul>
                       </div>
                    </section>
                    <section className="my-4  pdf-page-break">
                      <h5>Acknowledgment of Behavioral Support Policy  </h5>
                      <p>I acknowledge that I have read, understand, and agree to implement the agency’s de-escalation and behavioral support procedures. I will use trauma-informed, person-centered strategies to prevent and respond to behaviors, and will follow agency and ODP requirements at all times.  </p>
                      <div className="mb-3">
                        <InputFields label="Staff Name (print):" inputId="staffName_deescalation" inputName="staffName_deescalation" value={inputValue.staffName_deescalation} onChange={handleChange}
                        />
                        <div className="col-md-3">
                          <SignatureCanvas label="Staff Signature" name="staffSignature_deescalation"/>
                          <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_deescalation"/>
                        </div>
                      </div>

                    </section>
                    <section className="my-4  pdf-page-break">
                      <h3 className="text-info">
                        Medicaton Administraton Guidelines – Habilitaton Services (ODP)  
                      </h3>
                      <p>These guidelines provide agency-specific procedures for safe, compliant medication administration in accordance with the Pennsylvania Office of Developmental Programs (ODP) Medication Administration Training Program and 55 Pa. Code Chapter 6100 regulations. Only staff who are fully trained and certified may administer medications to individuals receiving Habilitation Services.  </p>
                      <div className="my-4">
                        <h5> Staﬀ Eligibility & Certﬁcaton </h5>
                        <ul>
                          <li>Only staff who have successfully completed ODP’s approved Medication Administration Training (online and practicum components) may administer medications. </li>
                          <li>Certification must be renewed annually and proof of completion maintained in the employee file. </li>  
                          <li>Untrained or uncertified staff may not assist with, administer, or document medications under any circumstances. </li>
                        </ul>
                      </div>
                      <div className="my-4">
                        <h5> Medicaton Administraton Requirements  </h5>
                        <p>When administering medications, certified staff must: </p>
                        <ul>
                          <li>Follow the 6 Rights of Medication Administration: </li>
                          <ol>
                            <li>Right Person </li>
                            <li>Right Medication </li>
                            <li>Right Dose</li>
                            <li>Right Time</li>
                            <li>Right Route </li>
                            <li>Right Documentation </li>
                          </ol>
                          <li>  Always verify medication against the Medication Administration Record (MAR)</li>
                          <li>Use clean technique and wash hands before and after administering  </li>
                          <li> Monitor the individual for side effects or unusual reactions </li>
                          <li> Never crush, split, or mix medication unless specifically indicated </li>
                          <li> Secure medications immediately after use  </li>
                        </ul>
                        </div>
                        <div className="my-4">
                          <h5> Medicaton Storage & Documentaton  </h5>
                        
                          <ul>
                            <li>All medications must be kept in a locked, secure location that is inaccessible to individuals   </li>
                            <li>Refrigerated medications must be stored in a locked container within the refrigerator  </li>
                            <li>Staff must document medication administration immediately after delivery using the MAR, including any refusals or missed doses </li>
                            <li> Errors must be reported immediately following agency protocol and documented thoroughly   </li>
                          </ul>
                          </div>
                      </section>
                      <section className="my-4  pdf-page-break">
                        <h5>Reportng Medicaton Errors  </h5>
                        <p>Medication errors include wrong dose, wrong person, missed dose, wrong time, wrong route, or failure to document. In the event of a medication error:  </p>
                        <ol>
                          <li>Ensure the individual is safe and call 911 if needed  </li>
                          <li>Document the error and any missed doses </li>
                          <li>Follow ODP’s incident management procedures </li>
                          <li>Notify the supervisor or on-call administrator immediately  </li>
                          <li> Document the error using the agency Medication Error Report Form</li>
                          <li>  File an Incident Report per ODP’s Incident Management protocol </li> 
                          <li> Participate in retraining or review, as directed </li> 
                        </ol>

                        <div className="my-4">
                          <h5>PRN (As-Needed) Medicatons   </h5>
                          <ul>
                            <li>PRN medications must be clearly listed in the ISP and on the MAR with specific instructions and physician approval </li>
                            <li>Staff must obtain verbal consent from a supervisor or nurse (if required by policy) before administration </li>
                            <li>The effect of the PRN must be monitored and documented </li>
                          </ul>
                          </div>
                        <div className="my-4">
                          <h5>Medicaton Refusals  </h5>
                          <ul>
                            <li>Individuals have the right to refuse medication unless legally restricted  </li>
                            <li>Staff must not force or coerce medication compliance </li>
                            <li> Document the refusal on the MAR and notify the supervisor </li>
                            <li> Follow up with the nurse or medical provider as directed  </li>
                          </ul>
                          </div>
                          <div className="my-4">
                            <h5>Medicaton Disposal </h5>
                            <ul>
                              <li>Expired, discontinued, or refused medications must be disposed of per agency and pharmacy policy  </li>
                              <li>Disposal must be witnessed and documented </li>
                              <li>Medications may not be flushed unless specifically directed by the pharmacy or manufacturer  </li>
                            </ul>
                          </div>
                      </section>
                      <section className="my-4  pdf-page-break"> 
                        <h5>Acknowledgment of Medication Administration Guidelines  </h5>
                        <p>I acknowledge that I have read, understand, and agree to follow the agency’s Medication Administration Guidelines. I understand that failure to comply with these guidelines may result in disciplinary action and may place individuals at risk. </p>
                        <div className="mb-3">
                          <InputFields label="Staff Name (print):" inputId="staffName_medication" inputName="staffName_medication" value={inputValue.staffName_medication} onChange={handleChange}
                          />
                          <div className="col-md-3">
                            <SignatureCanvas label="Staff Signature" name="staffSignature_medication"/>
                            <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_medication"/>
                          </div>
                        </div>
                      </section>
                      <section className="my-4  pdf-page-break">
                        <h3 className="text-info">Professional Development Plan</h3>
                        <p>This Professional Development Plan is designed to support the ongoing growth, competence, and compliance of Habilitation Aides providing services under the Pennsylvania Office of Developmental Programs (ODP). Our agency is committed to offering training, feedback, and advancement opportunities aligned with ODP regulations and person-centered values</p>

                        <div className="my-4">
                          <h5>Development Goals</h5>
                          <p>The purpose of the Professional Development Plan is to:</p>
                          <ul>
                            <li>Ensure staff maintain compliance with ODP-mandated trainings and certifications</li>
                            <li>Support high-quality, person-centered service delivery</li>
                            <li>Enhance knowledge in specialized areas such as behavior support,trauma-informed care, and cultural competency</li>
                            <li>Provide a path for career advancement and increased responsibility</li>
                            <li>Foster a culture of continuous learning and reflective practice</li>
                          </ul>
                        </div>
                        <div className="my-4">
                          <h5>Mandatory Training Requirements</h5>
                          <ul>
                            <li>Completion of initial orientation training before providing unsupervised services</li>
                            <li>Annual completion of core ODP trainings (e.g., Rights, Abuse Reporting, Fire Safety, HIPAA, etc.)</li>
                            <li>CPR & First Aid certification (renewed per schedule)</li>
                            <li>Medication Administration training (if applicable)</li>
                            <li>Annual performance-based refresher training on person-centered practices</li>
                          </ul>
                        </div>
                        <div className="my-4">
                          <h5>Individualized Development Focus Areas</h5>
                          <p>Staff are encouraged to strengthen their skills in the following areas based on feedback, interest, or role expansion:</p>
                          <ul>
                            <li>Positive Behavior Support / De-escalation Techniques</li>
                            <li>Documentation & Compliance Accuracy</li>
                            <li>Communication with Nonverbal Individuals / Assistive Technology</li>
                            <li>Community Integration & Safety</li>
                            <li>Cultural Responsiveness & Disability Awareness</li>
                          </ul>
                        </div>
                         </section>

                         {/* Page break */}
                         <section className="my-4  pdf-page-break">
                        <div className="my-4">
                          <h5>Coaching, Feedback & Supervision</h5>
                          <p>Supervisors will provide:</p>
                          <ul>
                            <li>Regular feedback through observations and check-ins</li>
                            <li>Performance reviews at 30, 90 days, and annually</li>
                            <li>Access to remedial training or mentorship if needed</li>
                            <li>Recognition of excellence in service through verbal and written praise or advancement opportunities</li>
                          </ul>
                        </div>
                        <div className="my-4">
                          <h5>Documentation of Development Activities</h5>
                         <ul>
                            <li>Staff must sign attendance logs for all agency and external trainings</li>
                            <li>Copies of training certificates are kept in the personnel file</li> 
                            <li>Staff must complete self-reflection or evaluation forms as required</li>
                            <li>Development progress may be reviewed during team meetings or audits</li>


                          
                          </ul>
                          </div>

                          <div className="my-4">
                            <h5>Acknowledgment of Professional Development Plan</h5>
                            <p>I acknowledge that I have read, understand, and agree to participate in ongoing professional development as required by my role and the agency. I will pursue opportunities to grow in my knowledge and skillset, and remain in compliance with ODP regulations.</p>
                            <div className="mb-3">
                              <InputFields label="Staff Name (print):" inputId="staffName_PDP" inputName="staffName_PDP" value={inputValue.staffName_PDP} onChange={handleChange}
                              />
                              <div className="col-md-3">
                                <SignatureCanvas label="Staff Signature" name="staffSignature_PDP"/>
                                <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_PDP"/>
                              </div>
                            </div>
                          </div>
                     </section>

                     {/* Page break */}
                     <section className="my-4  pdf-page-break">
                      <h3 className='text-info'>Professional Development Goal-Setting Worksheet</h3>
                      <p>Instructions: Use this worksheet to set meaningful and achievable professional development goals. Goals should support your growth, improve service quality, and align with ODP regulations and person-centered practices.</p>
                      <div className='my-4'>
                        <p>Professional Development Goals:</p>
                        <ul>
                          <li className='fw-bold mt-3'>Goal 1</li>
                          <div className='d-flex flex-column gap-3 my-3'>
                            <InputFields inputName="goal1" label="Goal 1:" inputId="goal1" value={inputValue.goal1} onChange={handleChange}
                            />
                            <InputFields inputName="stepsToAchieve" label="Steps to Achieve" inputId="stepsToAchieve" value={inputValue.stepsToAchieve} onChange={handleChange}
                            />
                    <InputFields inputName="supportNeeded" label="Resources/Support Needed" inputId="supportNeeded" value={inputValue.supportNeeded} onChange={handleChange}
                     />
                     <InputDate dateName="targetDate" dateLabel="Target Completion Date" inputId="targetDate" value={inputValue.targetDate} onChange={handleChange}
                     />
                     <InputFields inputName="progressNotes" label="Progress Notes" inputId="progressNotes" value={inputValue.progressNotes} onChange={handleChange}
                     />
                          </div>
                          <li className='fw-bold mt-3'>Goal 2</li>
                          <div className='d-flex flex-column gap-3 my-3'>
                            <InputFields inputName="goal2" label="Goal 2:" inputId="goal2" value={inputValue.goal2} onChange={handleChange}
                            />
                            <InputFields inputName="stepsToAchieve2" label="Steps to Achieve" inputId="stepsToAchieve2" value={inputValue.stepsToAchieve2} onChange={handleChange}
                            />
                    <InputFields inputName="supportNeeded2" label="Resources/Support Needed" inputId="supportNeeded2" value={inputValue.supportNeeded2} onChange={handleChange}
                     />
                     <InputDate dateName="targetDate2" dateLabel="Target Completion Date" inputId="targetDate2" value={inputValue.targetDate2} onChange={handleChange}
                     />
                     <InputFields inputName="progressNotes2" label="Progress Notes" inputId="progressNotes2" value={inputValue.progressNotes2} onChange={handleChange}
                     />
                          </div>
                           </ul>
                      </div>
                     </section>
                     <section className='my-4  pdf-page-break'>
                      <ul>
                        <li className='fw-bold mt-3'>Goal 3</li>
                          <div className='d-flex flex-column gap-3 my-3'>
                            <InputFields inputName="goal3" label="Goal 3:" inputId="goal3" value={inputValue.goal3} onChange={handleChange}
                            />
                            <InputFields inputName="stepsToAchieve3" label="Steps to Achieve" inputId="stepsToAchieve3" value={inputValue.stepsToAchieve3} onChange={handleChange}
                            />
                    <InputFields inputName="supportNeeded3" label="Resources/Support Needed" inputId="supportNeeded3" value={inputValue.supportNeeded3} onChange={handleChange}
                     />
                     <InputDate dateName="targetDate3" dateLabel="Target Completion Date" inputId="targetDate3" value={inputValue.targetDate3} onChange={handleChange}
                     />
                     <InputFields inputName="progressNotes3" label="Progress Notes" inputId="progressNotes3" value={inputValue.progressNotes3} onChange={handleChange}
                     />
                          </div>
                      </ul>
                          </section>
                    <section className="my-4  pdf-page-break">
                      <h3 className='text-info'>Supervisor Evaluation Form – Professional Development Review</h3>
                      <p>Instructions: Supervisors should complete this form during periodic staff reviews (e.g., 30/90 day, annual). Use this to document strengths, areas for growth, and recommended development activities.</p>

                      <div className="my-4">
                        <h5>1. Compliance with ODP-mandated trainings and agency policies </h5>
                        <div className="d-flex flex-column gap-3 my-3">
                          <InputFields inputName="complianceRating" label="Rating (1-5)" inputId="complianceRating" value={inputValue.complianceRating} onChange={handleChange}
                          />
                          <InputFields inputName="complianceComments" inputId="complianceComments" label="Comments" value={inputValue.complianceComments} onChange={handleChange}
                          />
                        
                        </div>
                      </div>
                      <div className="my-4">
                        <h5>2.Use of person-centered practices and support strategies </h5>
                        <div className="d-flex flex-column gap-3 my-3">
                          <InputFields inputName="personCenteredRating" label="Rating (1-5)" inputId="personCenteredRating" value={inputValue.personCenteredRating} onChange={handleChange}
                          />
                          <InputFields inputName="personCenteredComments" inputId="personCenteredComments" label="Comments" value={inputValue.personCenteredComments} onChange={handleChange}
                          />
                        </div>
                        </div>
                        <div className="my-4">
                          <h5>3. Communication with individuals, families, and team members </h5>
                          <div className="d-flex flex-column gap-3 my-3">
                            <InputFields inputName="communicationRating" label="Rating (1-5)" inputId="communicationRating" value={inputValue.communicationRating} onChange={handleChange}
                            />
                            <InputFields inputName="communicationComments" inputId="communicationComments" label="Comments" value={inputValue.communicationComments} onChange={handleChange}
                            />
                          </div>
                          </div>
                          <div className="my-4">
                            <h5>4. Documentation accuracy and timeliness  </h5>
                            <div className="d-flex flex-column gap-3 my-3">
                              <InputFields inputName="documentationRating" label="Rating (1-5)" inputId="documentationRating" value={inputValue.documentationRating} onChange={handleChange}
                              />
                              <InputFields inputName="documentationComments" inputId="documentationComments" label="Comments" value={inputValue.documentationComments} onChange={handleChange}
                              />
                            </div>
                            </div>
                            <div className="my-4">
                              <h5>5.Professionalism and ethical conduct </h5>
                              <div className="d-flex flex-column gap-3 my-3">
                                <InputFields inputName="professionalismRating" label="Rating (1-5)" inputId="professionalismRating" value={inputValue.professionalismRating} onChange={handleChange}
                                />
                                <InputFields inputName="professionalismComments" inputId="professionalismComments" label="Comments" value={inputValue.professionalismComments} onChange={handleChange}
                                />
                            
                              </div>
                              </div>
                              <div className="my-4">
                                <h5>6.Ability to manage challenging behavior and follow support plans </h5>
                                <div className="d-flex flex-column gap-3 my-3">
                                  <InputFields inputName="manageChallengingBehaviorRating" label="Rating (1-5)" inputId="manageChallengingBehaviorRating" value={inputValue.manageChallengingBehaviorRating} onChange={handleChange}
                                  />
                                  <InputFields inputName="manageChallengingBehaviorComments" inputId="manageChallengingBehaviorComments" label="Comments" value={inputValue.manageChallengingBehaviorComments} onChange={handleChange}
                                  />
                                </div>
                                </div>
                                <div className="my-4">
                                  <h5>7. Engagement in ongoing training or skill-building </h5>
                                  <div className="d-flex flex-column gap-3 my-3">
                                    <InputFields inputName="engagementRating" label="Rating (1-5)" inputId="engagementRating" value={inputValue.engagementRating} onChange={handleChange}
                                    />
                                    <InputFields inputName="engagementComments" inputId="engagementComments" label="Comments" value={inputValue.engagementComments} onChange={handleChange}
                                    />
                                  </div>
                                  </div>
                                  <div className="my-4">
                                    <h5>8. Supervisor comments and recomendations </h5>
                                    <TextAreaFields inputName="supervisorRecommendations" label="Recommendations and Comments" inputId="supervisorRecommendations" value={inputValue.supervisorRecommendations} onChange={handleChange}
                                    />
                                 
                                    </div>
                    </section>
                    <section className="my-4  pdf-page-break">
                      <div className="mb-3 col-md-3">
                        <SignatureCanvas label="Staff Signature" name="staffSignature_PDPReview"/>
                        <SignatureCanvas label="Supervisor Signature" name="supervisorSignature_PDPReview"/>
                        </div>
                    </section>
                    <section className="my-4  pdf-page-break">
                      <div className="my-4">
                        <h3 className='text-info'>Notes & Questons – Orientaton Binder </h3>
                        <p>This section provides space for staff to take notes, record important information, or write down questions during their orientation process. Supervisors are encouraged to review and address any questions or concerns with the staff member as part of reflective supervision. </p> 
                       <TextAreaFields inputName="orientationNotes"
                       rows="15"
                      label="Notes & Questions:" inputId="orientationNotes" value={inputValue.orientationNotes} onChange={handleChange}
                       />
                        </div>
                        </section>
                        <section className="my-4  pdf-page-break">
                          <h5>Reflection Prompt: </h5>
                          <p>What are two things I learned during orientation that will help me support individuals effectively? </p>
                          <div className="d-flex flex-column gap-3 my-3">
                            <input type='text' 
                            className="form-control" name="reflectionPrompt1" id="reflectionPrompt1" value={inputValue.reflectionPrompt1} onChange={handleChange}
                            />
                            <input type="text" name="reflectionPrompt2" 
                            className="form-control"  id="reflectionPrompt2" value={inputValue.reflectionPrompt2} onChange={handleChange}
                            />
                          </div>

                          <h5>Questions I Still Have: </h5>
                          <ol className="d-flex flex-column gap-3 my-3">
                            <li><input type='text' className="form-control" name="questionsStillHave1" id="questionsStillHave1" value={inputValue.questionsStillHave1} onChange={handleChange}
                            /></li>
                            <li><input type='text' className="form-control" name="questionsStillHave2" id="questionsStillHave2" value={inputValue.questionsStillHave2} onChange={handleChange}
                            /></li>
                            <li><input type='text' className="form-control" name="questionsStillHave3" id="questionsStillHave3" value={inputValue.questionsStillHave3} onChange={handleChange}  /></li>
                            <li><input type='text' className="form-control" name="questionsStillHave4" id="questionsStillHave4" value={inputValue.questionsStillHave4} onChange={handleChange}  /></li>
                            <li><input type='text' className="form-control" name="questionsStillHave5" id="questionsStillHave5" value={inputValue.questionsStillHave5} onChange={handleChange}  /></li>

                          </ol>

                        </section>
                  <div className='d-flex gap-2 w-100 justify-content-center my-5'>
            <button 
              type="button"
              onClick={handleDone} 
              className="btn btn-success px-3"
            >
              Done
            </button>
            {/* <button 
              type="button"
              onClick={handlePreview} 
              className="btn btn-info px-3" 
              disabled={!isPreviewEnabled}
            >
              See Preview
            </button> */}
          </div>
          </form>
          </div>
          </div>
  )
}

export default OrientationPacket
