import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios"; // To send the file to the backend

import "./css/signatureCanvas.css";



const ConsumerPacket = () => {
  const navigate = useNavigate();
  const [previewHtml, setPreviewHtml] = useState(null);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const {formType} = useParams();

  // --- STATE MANAGEMENT ---
  // This one state object controls every field in the form.
  const [coverSheetData, setCoverSheetData] = useState({
    ConsumerName: "",
    DateOfIntake: "",
    dateofbirth: "",
    diagnosis: "",
    supportCoordinator: "",
    programSpecialist: "",
    ispStartDate: "",
    ispEndDate: "",
    odpId: "",
    waiverType: "",
  });

  const [demographicData, setDemographicData] = useState({
    address: "",
    phone: "",
    socialSecurity: "",
    gender: "",
    ethnicity: "",
    primaryLanguage: "",
    emergencyContactName1: "",
    emergencyContactRelationship1: "",
    emergencyContactPhone1: "",
    emergencyContactName2: "",
    emergencyContactRelationship2: "",
    emergencyContactPhone2: "",
    medicalCondition: "",
    primaryCarePhysician: "",
    physicianContact: "",
    preferredHospital1: "",
  });

  const [assessmentData, setAssessmentData] = useState({
    individualName: "",
    dob: "",
    assessmentDate: "",
    completeAssessment: "",
    title: "",
    summaryOfNeeds: "",
    riskAndMitigationStrategies: "",
    individualSignature: null,
    individualSignatureDate: "",
    guardianSignature: null,
    guardianSignatureDate: "",
    specialistSignature: null,
    specialistSignatureDate: "",
    individualName2: "",
    monthYear: "",
    outcomeAreas: "",
    goals: "",
    FrequencyofReview: "",
    week1: "",
    week2: "",
    week3: "",
    week4: "",
    staffSignature: null,
    staffSignatureDate: "",
  });

  const [behavioralData, setBehavioralData] = useState({
    individualName3: "",
    DateOfBsp: "",
    targetBehaviour: "",
    triggers: "",
    proactiveSupport: "",
    reactiveInterventions: "",
    restrictiveProcedures_bsp: "",
    bspDevelopedBy: "",
    bspReviewedBy: "",
    individualGuardianSignature_bsp: null,
    individualGuardianSignature_bspDate: "",
    staffSignature2: null,
    staffSignature2Date: "",
    individualNameCIP: "",
    DateOfCIP: "",
    knownTriggers: "",
    deEscalationStrategies: "",
    emergencyProcedures: "",
    contactNumber2: "",
    staffSignature3: null,
    staffSignature3Date: "",
    restrictiveProceduresRadio: "",
    procedureDescription: "",
    procedurePurpose: "",
    monitoringDuration: "",
    individualGuardianSignature_consent: null,
    individualGuardianSignature_consentDate: "",
    supportSignature: null,
    supportSignatureDate: "",
    programSpecialistSignature_consent: null,
    programSpecialistSignature_consentDate: "",
  });

  const [consentData, setConsentData] = useState({
    individualGuardianName_consent: "",
    individualGuardianType_consent: "individual",
    agencyName_consent: "",
    individualGuardianSignature_auth1: null,
    individualGuardianSignature_auth1Date: "",
    staffWitnessSignature_auth1: null,
    staffWitnessSignature_auth1Date: "",
    agencyName_release: "",
    medicalProvider: false,
    supportCoordination: false,
    behavioralHealthProviders: false,
    Schools: false,
    other_release: false,
    other_releaseText: "",
    individualGuardianSignature_auth2: null,
    individualGuardianSignature_auth2Date: "",
    staffWitnessSignature_auth2: null,
    staffWitnessSignature_auth2Date: "",
    individualGuardianSignature_auth3: null,
    individualGuardianSignature_auth3Date: "",
    staffWitnessSignature_auth3: null,
    staffWitnessSignature_auth3Date: "",
    individualGuardianSignature_auth4: null,
    individualGuardianSignature_auth4Date: "",
    staffWitnessSignature_auth4: null,
    staffWitnessSignature_auth4Date: "",
    photoMediaRelease: "",
    individualGuardianSignature_auth5: null,
    individualGuardianSignature_auth5Date: "",
    staffWitnessSignature_auth5: null,
    staffWitnessSignature_auth5Date: "",
  });

  const [financialData, setFinancialData] = useState({
    agencyName_money: "",
    moneyManagementAuthorization: "",
    representativePayeeText: "",
    fundUses: {
      foodGroceries: false,
      transportation: false,
      communityActivities: false,
      personalCareItems: false,
      others: false,
    },
    fundUses_others: "",
    staffSignature_fin: null,
    staffSignature_finDate: "",
    individualSignature_fin: null,
    individualSignature_finDate: "",
    individualName_inv: "",
    dateOfInventory: "",
    inventory: [
      {
        itemDescription: "",
        dateAcquired: "",
        estimatedValue: "",
        conditionLocation: "",
      },
      {
        itemDescription: "",
        dateAcquired: "",
        estimatedValue: "",
        conditionLocation: "",
      },
      {
        itemDescription: "",
        dateAcquired: "",
        estimatedValue: "",
        conditionLocation: "",
      },
      {
        itemDescription: "",
        dateAcquired: "",
        estimatedValue: "",
        conditionLocation: "",
      },
    ],
    individualName_ledg: "",
    dateOfLedger: "",
    ledger: [
      { date: "", description: "", amountIn: "", amountOut: "", amountBalance: "" },
      { date: "", description: "", amountIn: "", amountOut: "", amountBalance: "" },
      { date: "", description: "", amountIn: "", amountOut: "", amountBalance: "" },
      { date: "", description: "", amountIn: "", amountOut: "", amountBalance: "" },
    ],
  });

  const [habilitationData, setHabilitationData] = useState({
    individualName_hab: "",
    dob_hab: "",
    planStartDate: "",
    reviewDate_hab: "",
    supportCoordinator_hab: "",
    programSpecialist_hab: "",
    locationofServices: "",
    outcome1: "",
    outcome2: "",
    days_per_week: "",
    hours_per_day: "",
    supportStrategies: "",
    staffResponsibilities1: "",
    staffResponsibilities2: "",
    riskFactors: "",
    individualGuardianSignature_hab: null,
    individualGuardianSignature_habDate: "",
    directSupportStaffSignature: null,
    directSupportStaffSignatureDate: "",
    programSpecialistSignature_hab: null,
    programSpecialistSignature_habDate: "",
  });

  const [healthSafetyData, setHealthSafetyData] = useState({
    agencyName_med: "",
    individualName_med: "",
    physicianName: "",
    physicianPhone: "",
    preferredHospital_med: "",
    medicalCondition_med: "",
    insuranceProvider: "",
    policy: "",
    individualGuardianSignature_med: null,
    individualGuardianSignature_medDate: "",
    staffWitnessSignature_med: null,
    staffWitnessSignature_medDate: "",
    individualName_evac: "",
    site_evac: "",
    mobilityAssistant: "",
    mobilityDescription: "",
    evacuationRole: "",
    meetingPoint: "",
    reviewedOn: "",
    reviewedBy: "",
    siteName: "",
    siteMonth: "",
    drillDate: "",
    drillTime: "",
    evacuationDate: "",
    staffPresent: "",
    issuesNoted: "",
    correctiveActionTaken: "",
    completedBy_fire: null,
    completedBy_fireDate: "",
  });

  const [rightsData, setRightsData] = useState({
    individualSignature_rights: null,
    individualSignature_rightsDate: "",
    guardianSignature_rights: null,
    guardianSignature_rightsDate: "",
    staffSignature_rights: null,
    staffSignature_rightsDate: "",
    individualName_rights: "",
    dateofLog: "",
    explanationMethods: {
      verbalExplanation: false,
      visualAids: false,
      writtenMaterial: false,
      assestiveTechnology: false,
      interpreterUsed: false,
    },
    opportunityToAskQuestions: "",
    understandingOfRights: "",
    staffProvidingEducation: "",
    staffSignature_rights_log: null,
    staffSignature_rights_logDate: "",
  });

  const [preferencesData, setPreferencesData] = useState({
    individualName_cult: "",
    dateCompleted_cult: "",
    preferredName: "",
    preferredLanguage: "",
    preferredMethod: "",
    culturalIdentity: "",
    religiousPractices: "",
    foodPreferences: "",
    holidays: "",
    dailyRoutine: "",
    clothingPreferences: "",
    accessibilityNeeds: "",
    hobbies: "",
    importantPeople: "",
    otherConsiderations: "",
    completedBy_cult: "",
    role_cult: "",
    individualGuardianSignature_cult: null,
    individualGuardianSignature_cultDate: "",
  });

  const [trainingData, setTrainingData] = useState({
    individualName_train: "",
    orientationdateCompleted: "",
    orientationTopics: {
      individualRights: false,
      abuseNeglectExploitation: false,
      incidentManagement: false,
      confidentiality: false,
      providerPolicies: false,
      fireSafety: false,
      individeal_familyHandbook: false,
      understandingTopics: false,
      recieverdCopy: false,
    },
    individualGuardianSignature_train: null,
    individualGuardianSignature_trainDate: "",
    staffWitnessSignature_train: null,
    staffWitnessSignature_trainDate: "",
  });

  const [transportationData, setTransportationData] = useState({
    individualName_trans: "",
    dob_trans: "",
    dateOfTransportation: "",
    reviewDate_trans: "",
    mobilityNeeds: "",
    transportationProvider: "",
    vehicleType: "",
    preferredDestinations: "",
    typicalScheduleFrequency: "",
    supervisionLevel: "",
    medicalConsederation: "",
    individualGuardianName_trans: "",
    agencyName_trans: "",
    individualGuardianSignature_trans: null,
    individualGuardianSignature_transDate: "",
    staffWitnessSignature_trans: null,
    staffWitnessSignature_transDate: "",
  });

  const [verificationData, setVerificationData] = useState({
    verificationChecklist: {
      coverSheet: false,
      demographicContact: false,
      consentToReceiveServices: false,
      releaseOfInformation: false,
      hipaaAcknowledgment: false,
      rightsAcknowledgment: false,
      ispFunctionalAssessment: false,
      habilitationServicePlan: false,
      medicalTreatmentAuthorization: false,
      emergencyEvacuationPlan: false,
      fireSafetyDrillLog: false,
      behaviorSupportPlan: false,
      transportationPlan: false,
      financialDocumentation: false,
      orientationAcknowledgments: false,
      preferencesCulturalProfile: false,
      allDocumentsReviewed: false,
    },
    programSpecialistSignature_final: null,
    programSpecialistSignature_finalDate: "",
    individualGuardianSignature_final: null,
    individualGuardianSignature_finalDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- INPUT HANDLER ---
  // --- NEW INPUT HANDLERS ---
  // A simple, reusable handler for simple states
const useThrottledHandler = (setter, limit = 200) => {
  const lastCall = useRef(0);
  const timeout = useRef();

  return (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    const now = Date.now();

    clearTimeout(timeout.current);

    if (now - lastCall.current >= limit) {
      lastCall.current = now;
      setter(prev => ({ ...prev, [name]: inputValue }));
    } else {
      timeout.current = setTimeout(() => {
        lastCall.current = Date.now();
        setter(prev => ({ ...prev, [name]: inputValue }));
      }, limit);
    }
  };
};

const handleDemographicChange = useThrottledHandler(setDemographicData,10);
const handleBehavioralChange = useThrottledHandler(setBehavioralData,10);
const handleConsentChange = useThrottledHandler(setConsentData,10);
const handleHealthSafetyChange = useThrottledHandler(setHealthSafetyData,10);
const handleTransportationChange = useThrottledHandler(setTransportationData,10);
// const handleCoverSheetChange = useThrottledHandler(setCoverSheetData,10);
  // const handleAssessmentChange = useThrottledHandler(setAssessmentData,10);
  // const handleHabilitationChange = useThrottledHandler(setHabilitationData,10);
  // const handlePreferencesChange = useThrottledHandler(setPreferencesData,10);

  // Handlers for complex states (nested objects or arrays)
  const handleFinancialChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length > 1) {
      const [outerKey, innerKey] = nameParts; // e.g., "fundUses.foodGroceries"
      setFinancialData((prevData) => ({
        ...prevData,
        [outerKey]: {
          ...prevData[outerKey],
          [innerKey]: type === "checkbox" ? checked : value,
        },
      }));
    }else {
      setFinancialData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  const handleFinanceBlur=(e) => {
    const match = e.target.name.match(/(\w+)\[(\d+)\]\.(\w+)/);
    if (match) {
      const [, key, index, field] = match;
      setFinancialData((prevData) => {
        const newArray = [...prevData[key]];
        newArray[parseInt(index)] = {
          ...newArray[parseInt(index)],
          [field]: e.target.value,
        };
        return { ...prevData, [key]: newArray };
      });
    }
  }

  const handleRightsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length > 1) {
      const [outerKey, innerKey] = nameParts; // e.g., "explanationMethods.verbalExplanation"
      setRightsData((prevData) => ({
        ...prevData,
        [outerKey]: {
          ...prevData[outerKey],
          [innerKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setRightsData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleTrainingChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length > 1) {
      const [outerKey, innerKey] = nameParts; // e.g., "orientationTopics.individualRights"
      setTrainingData((prevData) => ({
        ...prevData,
        [outerKey]: {
          ...prevData[outerKey],
          [innerKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setTrainingData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleVerificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length > 1) {
      const [outerKey, innerKey] = nameParts; // e.g., "verificationChecklist.coverSheet"
      setVerificationData((prevData) => ({
        ...prevData,
        [outerKey]: {
          ...prevData[outerKey],
          [innerKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setVerificationData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };



  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
     e.preventDefault();
  }

const handlePreview = () => {
   if (!previewHtml) {
        alert('Please click "Done" first to generate the preview.');
        return; 
    }

    // --- ADD THIS LOGGING LINE ---
    const targetPath = `/preview/${formType}`;
    console.log("Attempting to navigate to:", targetPath);
    console.log("formType value is:", formType);
    // -----------------------------

    navigate(targetPath, { state: { previewHtml: previewHtml } });
};
 const handleDone =() => {
  const originalForm = document.getElementById("consumerPacket-pdf");
  const clonedForm = originalForm.cloneNode(true);

  // Remove all buttons and interactive elements
  clonedForm.querySelectorAll("button, .btn, .signatureClear").forEach((el) => el.remove());

  // Replace inputs with simple text
  clonedForm.querySelectorAll("input[type='text'], input[type='tel'], input[type='date'], input[type='number']").forEach((input) => {
    const span = document.createElement("span");
    span.textContent = input.value || "_____" ;
    input.replaceWith(span);
  });

  // Replace textareas
  clonedForm.querySelectorAll("textarea").forEach((textarea) => {
    const div = document.createElement("div");
    div.textContent = textarea.value || "[No data provided]";
    div.style.cssText = "margin: 0 0 8px 0; white-space: pre-wrap; border: 1px solid #ced4da; background: #ffffff;";
    textarea.replaceWith(div);
  });

  // Replace selects
  
clonedForm.querySelectorAll("select").forEach((clonedSelect) => {
  const originalSelect = originalForm.querySelector(`[name="${clonedSelect.getAttribute('name')}"]`);
  
  const span = document.createElement("span");

  if (originalSelect && originalSelect.options.length > 0) {
    // 1. Get the index of the currently selected option from the LIVE/original element
    const selectedIndex = originalSelect.selectedIndex;
    
    // 2. Get the TEXT content of the selected option
    const selectedText = originalSelect.options[selectedIndex]?.text;
    
    span.textContent = selectedText || "___________";
  } else {
    span.textContent = "___________";
  }

  span.style.cssText = " padding: 2px 8px; display: inline-block; min-width: 150px;";
  
  // Replace the cloned select with the new span
  clonedSelect.replaceWith(span);
});

  // Replace checkboxes with symbols ONLY (no box)
  clonedForm.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    const span = document.createElement("span");
    span.textContent = checkbox.checked ? "☑ " : "☐ ";
    span.style.cssText = "font-size: 14pt; margin-right: 5px; display: inline;";
    
    // Find the label and prepend the symbol to it
    const label = checkbox.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.insertBefore(span, label.firstChild);
      checkbox.remove();
    } else {
      checkbox.replaceWith(span);
    }
  });

  // Replace radio buttons with symbols ONLY (no box)
  clonedForm.querySelectorAll("input[type='radio']").forEach((radio) => {
    const span = document.createElement("span");
    span.textContent = radio.checked ? "◉ " : "○ ";
    span.style.cssText = "font-size: 14pt; margin-right: 5px; display: inline;";
    
    // Find the label and prepend the symbol to it
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
    span.textContent = dateText.textContent ;
    dateText.replaceWith(span);
  });

  // Remove date inputs
  clonedForm.querySelectorAll(".signature-date-input").forEach((el) => el.remove());

  setPreviewHtml(clonedForm.innerHTML);
  setIsPreviewEnabled(true);
  alert('Preview has been generated! Click "See Preview" to view it.');
}

   // --- RENDER ---
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container-fluid full-form"
     
      >
        <form
          id="consumerPacket-pdf"
          className="bg-white consumerPdf shadow-sm rounded-3 p-4"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className=" mb-5 pb-4 border-bottom pdf-section">
            <h3 className=" fw-bold text-primary mb-3">
              Consumer Cover Sheet & Demographic Information
            </h3>
            <p className="text-muted fs-6">
              In accordance with 55 PA Code Chapter 6100
            </p>
          </div>

          {/* Cover Sheet Section */}
          <div className="mb-5 pdf-section">
            <div className="bg-primary bg-opacity-10 p-3 rounded-top">
              <h4 className="text-primary mb-0 fw-bold">Cover Sheet</h4>
            </div>
            <div className="border border-top-0 rounded-bottom p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    htmlFor="ConsumerName"
                    className="form-label fw-semibold"
                  >
                    Consumer's Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ConsumerName"
                    id="ConsumerName"
                    placeholder="Enter full name"
                    defaultValue={coverSheetData.ConsumerName}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="DateOfIntake"
                    className="form-label fw-semibold"
                  >
                    Date of Intake :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="DateOfIntake"
                    name="DateOfIntake"
                    defaultValue={coverSheetData.DateOfIntake}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="dateofbirth"
                    className="form-label fw-semibold"
                  >
                    Date of Birth :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateofbirth"
                    name="dateofbirth"
                    defaultValue={coverSheetData.dateofbirth}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="diagnosis" className="form-label fw-semibold">
                    Diagnosis / ICD-10 :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="diagnosis"
                    name="diagnosis"
                    placeholder="Enter diagnosis"
                    defaultValue={coverSheetData.diagnosis}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="supportCoordinator"
                    className="form-label fw-semibold"
                  >
                    Supports Coordinator :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="supportCoordinator"
                    name="supportCoordinator"
                    placeholder="Enter coordinator name"
                    defaultValue={coverSheetData.supportCoordinator}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="programSpecialist"
                    className="form-label fw-semibold"
                  >
                    Program Specialist :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="programSpecialist"
                    name="programSpecialist"
                    placeholder="Enter specialist name"
                    defaultValue={coverSheetData.programSpecialist}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="ispStartDate"
                    className="form-label fw-semibold"
                  >
                    ISP Start Date :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="ispStartDate"
                    name="ispStartDate"
                    defaultValue={coverSheetData.ispStartDate}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="ispEndDate"
                    className="form-label fw-semibold"
                  >
                    ISP End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="ispEndDate"
                    name="ispEndDate"
                    defaultValue={coverSheetData.ispEndDate}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="opd-id" className="form-label fw-semibold">
                    HCSIS/ODP ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="opd-id"
                    name="odpId"
                    placeholder="Enter ID"
                    defaultValue={coverSheetData.odpId}
                    // onChange={handleCoverSheetChange}
                    onBlur={
                      (e)=>{
                        setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label
                    htmlFor="waiverType"
                    className="form-label fw-semibold"
                  >
                    Waiver Type
                  </label>
                  <select
                    name="waiverType"
                    className="form-select"
                    id="waiverType"
                  value={coverSheetData.waiverType}
                  onChange={(e) => {
                  setCoverSheetData({...coverSheetData, [e.target.name]: e.target.value})
                  
                  }}
                  >
                    <option value="consolidated">Consolidated</option>
                    <option value="p_fds">P/FDS</option>
                    <option value="community_living">Community Living</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Demographic and Emergency Contact Information */}
          <div className="mb-5 pdf-section">
            <div className="bg-success bg-opacity-10 p-3 rounded-top">
              <h3 className="text-success mb-0 fw-bold">
                Demographic & Emergency Contact Information
              </h3>
            </div>
            <div className="border border-top-0 rounded-bottom p-4">
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="address" className="form-label fw-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter full address"
                    defaultValue={demographicData.address}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="(XXX) XXX-XXXX"
                    defaultValue={demographicData.phone}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="socialSecurity"
                    className="form-label fw-semibold"
                  >
                    Social Security Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="socialSecurity"
                    name="socialSecurity"
                    placeholder="XXX-XX-XXXX"
                    defaultValue={demographicData.socialSecurity}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold d-block mb-2">
                    Gender
                  </label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={demographicData.gender === "male"}
                        onChange={handleDemographicChange}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={demographicData.gender === "female"}
                        onChange={handleDemographicChange}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        checked={demographicData.gender === "other"}
                        onChange={handleDemographicChange}
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="ethnicity" className="form-label fw-semibold">
                    Ethnicity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ethnicity"
                    name="ethnicity"
                    placeholder="Enter ethnicity"
                    defaultValue={demographicData.ethnicity}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="primaryLanguage"
                    className="form-label fw-semibold"
                  >
                    Primary Language
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="primaryLanguage"
                    name="primaryLanguage"
                    placeholder="Enter primary language"
                    defaultValue={demographicData.primaryLanguage}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                </div>
                </div>
                </div>

                {/* Emergency Contact 1 */}
                <div className="col-12 mt-4 ">
                  <div className=" rounded">
                    <h5 className="fw-bold text-warning-emphasis mb-3">
                      Emergency Contact 1
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactName1"
                          className="form-label fw-semibold"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="emergencyContactName1"
                          name="emergencyContactName1"
                          placeholder="Contact name"
                          defaultValue={demographicData.emergencyContactName1}
                          // onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactRelationship1"
                          className="form-label fw-semibold"
                        >
                          Relationship
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="emergencyContactRelationship1"
                          name="emergencyContactRelationship1"
                          placeholder="Relationship"
                          defaultValue={demographicData.emergencyContactRelationship1}
                          // onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactPhone1"
                          className="form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="emergencyContactPhone1"
                          name="emergencyContactPhone1"
                          placeholder="(XXX) XXX-XXXX"
                          defaultValue={demographicData.emergencyContactPhone1}
                          onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact 2 */}
                <div className="col-12 pdf-page-break">
                  <div className=" rounded pdf-section">
                    <h5 className="fw-bold text-warning-emphasis mb-3">
                      Emergency Contact 2
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactName2"
                          className="form-label fw-semibold"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="emergencyContactName2"
                          name="emergencyContactName2"
                          placeholder="Contact name"
                          defaultValue={demographicData.emergencyContactName2}
                          // onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactRelationship2"
                          className="form-label fw-semibold"
                        >
                          Relationship
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="emergencyContactRelationship2"
                          name="emergencyContactRelationship2"
                          placeholder="Relationship"
                          defaultValue={demographicData.emergencyContactRelationship2}
                          // onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="emergencyContactPhone2"
                          className="form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="emergencyContactPhone2"
                          name="emergencyContactPhone2"
                          placeholder="(XXX) XXX-XXXX"
                          defaultValue={demographicData.emergencyContactPhone2}
                          // onChange={handleDemographicChange}
                          onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                    </div>
                  </div>
              

                {/* Medical Information */}
                <div className="col-12 mt-4">
                  <label
                    htmlFor="medicalCondition"
                    className="form-label fw-semibold"
                  >
                    Medical Conditions or Allergies
                  </label>
                  <textarea
                    className="form-control"
                    id="medicalCondition"
                    name="medicalCondition"
                    rows="4"
                    placeholder="List any medical conditions or allergies here..."
                    defaultValue={demographicData.medicalCondition}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="primaryCare-physician"
                    className="form-label fw-semibold"
                  >
                    Primary Care Physician
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="primaryCare-physician"
                    name="primaryCarePhysician"
                    placeholder="Physician name"
                    defaultValue={demographicData.primaryCarePhysician}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="physicianContact"
                    className="form-label fw-semibold"
                  >
                    Physician Contact Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="physicianContact"
                    name="physicianContact"
                    placeholder="(XXX) XXX-XXXX"
                    defaultValue={demographicData.physicianContact}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="preferredHospital1"
                    className="form-label fw-semibold"
                  >
                    Preferred Hospital
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredHospital1"
                    name="preferredHospital1"
                    placeholder="Hospital name"
                    defaultValue={demographicData.preferredHospital1}
                    // onChange={handleDemographicChange}
                    onBlur={
                      (e)=>{
                        setDemographicData({...demographicData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
         

          {/* Assessment and ISP Documentation */}
          <div className="mb-3 pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Assessment & ISP Documentation
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>

            <div className="  rounded mb-4 pdf-section">
              <h4 className="fw-bold text-info-emphasis mb-4">
                Assessment & ISP Documentation Policy
              </h4>

              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To establish a consistent process for assessing individual
                  needs, preferences, strengths, and risks, and documenting them
                  in the Individual Support Plan (ISP) as required under 55 PA
                  Code Chapter 6100.
                </p>
              </div>

              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  All individuals receiving services will undergo a
                  comprehensive assessment to identify functional abilities,
                  support needs, risks, preferences, and outcomes. This
                  information will be used to develop and update the Individual
                  Support Plan (ISP) in a person-centered manner that promotes
                  dignity, choice, and quality of life.
                </p>
              </div>

              <div>
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    Assessments will be completed at intake, annually, and as
                    needed due to changes in status.
                  </li>
                  <li className="mb-2">
                    The assessment must include input from the individual,
                    guardian (if applicable), and interdisciplinary team
                    members.
                  </li>
                  <li className="mb-2">
                    The ISP must include:
                    <ol type="a" className="mt-2">
                      <li>Strengths and needs</li>
                      <li>Measurable outcomes</li>
                      <li>Risks and mitigation strategies</li>
                      <li>
                        Service details (frequency, duration, and location)
                      </li>
                      <li>Support strategies for achieving goals</li>
                    </ol>
                  </li>
                  <li className="mb-2">
                    The provider agency must maintain a copy of the most current
                    ISP and documentation of implementation and review.
                  </li>
                  <li className="mb-2">
                    Progress toward ISP outcomes must be reviewed regularly and
                    documented in service notes.
                  </li>
                  <li>
                    The Program Specialist is responsible for reviewing and
                    signing off on ISP implementation documentation.
                  </li>
                </ol>
              </div>
            </div>
            </div>
            {/* Assessment Forms */}
            <div className="border rounded p-4">
              <h4 className="fw-bold text-dark mb-4">
                Assessment & ISP Documentation Forms
              </h4>

              <h5 className="fw-bold text-secondary mb-3">
                1. Initial Functional Assessment
              </h5>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName"
                    className="form-label fw-semibold"
                  >
                    Individual's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName"
                    name="individualName"
                    placeholder="Full name"
                    defautValue={assessmentData.individualName}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="individualDob"
                    className="form-label fw-semibold"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="individualDob"
                    name="dob"
                    defaultValue={assessmentData.dob}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="assessmentDate"
                    className="form-label fw-semibold"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="assessmentDate"
                    name="assessmentDate"
                    defaultValue={assessmentData.assessmentDate}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="completeAssessment"
                    className="form-label fw-semibold"
                  >
                    Person Completing Assessment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="completeAssessment"
                    name="completeAssessment"
                    placeholder="Assessor name"
                    defaultValue={assessmentData.completeAssessment}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Job title"
                    defaultValue={assessmentData.title}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
              </div>
                <div className="pdf-page-break">
              <div className="bg-light p-3 ">
                <p className="fw-bold mb-2">Functional Areas Assessed:</p>
                <ol className="mb-0">
                  <li>Communication</li>
                  <li>Mobility</li>
                  <li>Self-Care</li>
                  <li>Safety Awareness</li>
                  <li>Social Skills</li>
                  <li>Community Participation</li>
                  <li>Behavioral Needs</li>
                  <li>Medical Support Needs</li>
                </ol>
              </div>

              <div className="row g-3 mb-5">
                <div className="col-12">
                  <label
                    htmlFor="summaryOfNeeds"
                    className="form-label fw-semibold"
                  >
                    Summary of Needs and Strengths
                  </label>
                  <textarea
                    className="form-control"
                    id="summaryOfNeeds"
                    name="summaryOfNeeds"
                    rows="5"
                    placeholder="Provide a comprehensive summary of the individual's needs and strengths..."
                    defaultValue={assessmentData.summaryOfNeeds}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="riskAndMitigationStrategies"
                    className="form-label fw-semibold"
                  >
                    Risks and Mitigation Strategies
                  </label>
                  <textarea
                    className="form-control"
                    id="riskAndMitigationStrategies"
                    name="riskAndMitigationStrategies"
                    rows="5"
                    placeholder="Identify any risks and describe strategies to mitigate them..."
                    defaultValue={assessmentData.riskAndMitigationStrategies}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                  </div>
             
            
            <h5 className="fw-bold text-secondary mb-3">
                2. Individual Support Plan (ISP)
              </h5>
              <div className=" mb-3">
                <p className="text-secondary mb-0">
                  I acknowledge that I have received a copy of my current
                  Individual Support Plan (ISP), which includes my personal
                  outcomes, support needs, and provider responsibilities. I
                  understand my plan and was given the opportunity to
                  participate in its development.
                </p>
                <div className=" mt-3  ">
                  <div className="row g-4">
                    {/* Individual Signature */}
                    <div className="col-md-4">
                      <SignatureCanvas
                        label="Individual Signature"
                        name="individualSignature"
                      
                      />
                    </div>

                    {/* Guardian/Representative Signature */}
                    <div className="col-md-4">
                      <SignatureCanvas
                        label="Guardian/Representative Signature"
                        name="guardianSignature"
                     
                      />
                    </div>

                    {/* Program Specialist Signature */}
                    <div className="col-md-4">
                      <SignatureCanvas
                        label="Program Specialist Signature"
                        name="specialistSignature"
                      
                      />
                    </div>
                    </div>
                  </div>
               
              </div>
               </div>
              <div className="pdf-page-break">
              <h5 className="fw-bold text-secondary mb-3 ">
                {" "}
                3.ISP Goal Review Log
              </h5>
              <div className=" mb-3">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName2"
                    className="form-label fw-semibold"
                  >
                    Individual Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName2"
                    name="individualName2"
                  defaultValue={assessmentData.individualName2}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="month-year"
                    className="form-label fw-semibold"
                  >
                    Month-Year
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="month-year"
                    name="monthYear"
                    defaultValue={assessmentData.monthYear}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="outcomeAreas"
                    className="form-label fw-semibold"
                  >
                    Outcome Areas
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="outcomeAreas"
                    name="outcomeAreas"
                    defaultValue={assessmentData.outcomeAreas}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="goals" className="form-label fw-semibold">
                    Goals Description
                  </label>
                  <textarea
                    className="form-control"
                    id="goals"
                    name="goals"
                    rows="6"
                    placeholder="List any goals here..."
                    defaultValue={assessmentData.goals}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="FrequencyofReview"
                    className="form-label fw-semibold"
                  >
                    Frequency of Review
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="FrequencyofReview"
                    name="FrequencyofReview"
                    defaultValue={assessmentData.FrequencyofReview}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                </div>
              </div>
              <div className="mt-3">
                <p>Progress Summary:</p>
                <div className="col-md-9">
                  <label htmlFor="week1" className="form-label fw-semibold">
                    Week 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="week1"
                    name="week1"
                    defaultValue={assessmentData.week1}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="week2" className="form-label fw-semibold">
                    Week 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="week2"
                    name="week2"
                    defaultValue={assessmentData.week2}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="week3" className="form-label fw-semibold">
                    Week 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="week3"
                    name="week3"
                    defaultValue={assessmentData.week3}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="week4" className="form-label fw-semibold">
                    Week 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="week4"
                    name="week4"
                    defaultValue={assessmentData.week4}
                    // onChange={handleAssessmentChange}
                    onBlur={
                      (e)=>{
                        setAssessmentData({...assessmentData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <SignatureCanvas
                    label="Staff Signature"
                    name="staffSignature"
                  
                  />
                </div>
              </div>
          
         

          {/* Behavioral & Safety Documentation Policy and Forms */}
          <div className="mb-5 pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Behavioral & Safety Documentation Policy and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>
            <div className="  rounded mb-4">
              <h4 className="fw-bold text-info-emphasis mb-4">
                Behavioral & Safety Documentation Policy
              </h4>

              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that behavioral needs are addressed with dignity,
                  respect, and safety, and that all behavioral interventions and
                  supports are documented in compliance with 55 PA Code Chapter
                  6100.
                </p>
              </div>

              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency shall implement behavioral supports
                  through positive practices and least restrictive measures. All
                  behavior support plans, crisis plans, restrictive procedures,
                  and incidents must be documented thoroughly and approved as
                  required.
                </p>
              </div>
              <div>
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    Individuals with behavioral support needs will have a
                    written Behavior Support Plan (BSP) based on a Functional
                    Behavior Assessment (FBA).
                  </li>
                  <li className="mb-2">
                    BSPs must be reviewed regularly and updated as needed. A BSP
                    may only be implemented by trained staff.
                  </li>
                  <li className="mb-2">
                    Restrictive procedures shall only be used if documented in
                    the ISP and approved by the Human Rights Team.
                  </li>
                  <li className="mb-2">
                    Crisis Intervention Plans must include de-escalation
                    techniques, triggers, and emergency contacts.
                  </li>
                  <li className="mb-2">
                    All behavioral incidents must be reported through the
                    incident management system.
                  </li>
                  <li className="mb-2">
                    Staff must sign documentation acknowledging receipt and
                    understanding of the BSP and related plans.
                  </li>
                </ol>
              </div>
                 </div>
           
            {/* Behavioral & Safety Documentation Forms */}
            <div className="border rounded pdf-section p-4">
              <h4 className="fw-bold text-dark mb-4">
                Behavioral & Safety Documentation Forms
              </h4>

              <h5 className="fw-bold text-secondary mb-3">
                1. Behavioral Support Plan Summary (BSP)
              </h5>
              <div className=" row g-3 mb-4">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName3"
                    className="form-label fw-semibold"
                  >
                    Individual's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName3"
                    name="individualName3"
                    placeholder="Individual name"
                    defaultValue={behavioralData.individualName3}
                    // onChange={handleBehavioralChange}
                    onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="DateOfBsp" className="form-label fw-semibold">
                    Date of BSP
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="DateOfBsp"
                    name="DateOfBsp"
                    defaultValue={behavioralData.DateOfBsp}
                    // onChange={handleBehavioralChange}
                   onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="targetBehaviour"
                    className="form-label fw-semibold"
                  >
                    Target Behaviour
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="targetBehaviour"
                    name="targetBehaviour"
                    defaultValue={behavioralData.targetBehaviour}
                    // onChange={handleBehavioralChange}
                   onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="triggers" className="form-label fw-semibold">
                    Triggers / Antecedents:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="triggers"
                    name="triggers"
                    defaultValue={behavioralData.triggers}
                    // onChange={handleBehavioralChange}
               onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="proactiveSupport"
                    className="form-label fw-semibold"
                  >
                    Proactive Support Strategies:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="proactiveSupport"
                    name="proactiveSupport"
                    defaultValue={behavioralData.proactiveSupport}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="reactiveInterventions"
                    className="form-label fw-semibold"
                  >
                    Reactive Interventions:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reactiveInterventions"
                    name="reactiveInterventions"
                    defaultValue={behavioralData.reactiveInterventions}
                    onChange={handleBehavioralChange}
                  />
                </div>
                
                
               
                <div className="col-md-4">
                  <label
                    htmlFor="restrictiveProcedures_bsp"
                    className="form-label fw-semibold"
                  >
                    Restrictive Procedures (if any):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="restrictiveProcedures_bsp"
                    name="restrictiveProcedures_bsp"
                    defaultValue={behavioralData.restrictiveProcedures_bsp}
                    // onChange={handleBehavioralChange}
                  />
                </div>
               <div className="col-md-4">
                  <label
                    htmlFor="bspDevelopedBy"
                    className="form-label fw-semibold"
                  >
                    BSP Developed by:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bspDevelopedBy"
                    name="bspDevelopedBy"
                    defaultValue={behavioralData.bspDevelopedBy}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
               

                
                <div className="col-md-4">
                  <label
                    htmlFor="bspReviewedBy"
                    className="form-label fw-semibold"
                  >
                    Reviewed By:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bspReviewedBy"
                    name="bspReviewedBy"
                    defaultValue={behavioralData.bspReviewedBy}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                 </div>
                  </div>
                   </div>

                    <div className="pdf-page-break ">
 
                <div>
                  <div className="col-md-4">
                    <SignatureCanvas
                      label="Individual/Guardian Signature"
                      name="individualGuardianSignature_bsp"
                  
                    />
                  </div>
                  <div className="col-md-4">
                    <SignatureCanvas
                      label="Staff Signature"
                      name="staffSignature2"
                      
                    />
                  </div>
                
              </div>
                
              <div className="">
              <h5 className="fw-bold  text-secondary mb-3">
                2. Crisis Intervention Plan (CIP)
              </h5>

              <div className=" row g-3 mb-4">
                <div className="col-md-4">
                  <label
                    htmlFor="individualNameCIP"
                    className="form-label fw-semibold"
                  >
                    Individual Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualNameCIP"
                    name="individualNameCIP"
                    defaultValue={behavioralData.individualNameCIP}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="DateOfCIP" className="form-label fw-semibold">
                    Plan Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="DateOfCIP"
                    name="DateOfCIP"
                    defaultValue={behavioralData.DateOfCIP}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="knownTriggers"
                    className="form-label fw-semibold"
                  >
                    Known Triggers
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="knownTriggers"
                    name="knownTriggers"
                    defaultValue={behavioralData.knownTriggers}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="de-escalationStrategies"
                    className="form-label fw-semibold"
                  >
                    Preferred De-escalation Strategies
                  </label>
                  <textarea
                    className="form-control"
                    id="de-escalationStrategies"
                    name="deEscalationStrategies"
                    rows="6"
                    placeholder="List any de-escalation strategies here..."
                    defaultValue={behavioralData.deEscalationStrategies}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="">
                  <label
                    htmlFor="emergencyProcedures"
                    className="form-label fw-semibold"
                  >
                    Emergency Procedures
                  </label>
                  <textarea
                    className="form-control"
                    id="emergencyProcedures"
                    name="emergencyProcedures"
                    rows="6"
                    placeholder="List any emergency procedures here..."
                    defaultValue={behavioralData.emergencyProcedures}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div>
                  <label
                    className="form-label fw-semibold"
                    htmlFor="contactNumber2"
                  >
                    Contact Number(Emergency/Oncall)
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactNumber2"
                    name="contactNumber2"
                    defaultValue={behavioralData.contactNumber2}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Staff Signature(Review)"
                      name="staffSignature3"
                     
                    />
                  </div>
                </div>
              </div>
              </div>
              </div>

                  
              <h5 className="fw-bold  text-secondary mb-3">
                3.Restrictive Procedure Consent Form
              </h5>
              <div>
                <div className="mb-3 d-flex gap-2">
                  <input
                    type="radio"
                    id="restrictiveProcedures_no"
                    name="restrictiveProceduresRadio"
                    value="No restrictive procedures are currently in use"
                    checked={
                      behavioralData.restrictiveProceduresRadio ===
                      "No restrictive procedures are currently in use"
                    }
                    onChange={handleBehavioralChange}
                  />
                  <label
                    htmlFor="restrictiveProcedures_no"
                    className="form-label fw-semibold"
                  >
                    No restrictive procedures are currently in use.
                  </label>
                </div>
                <div className="mb-3 d-flex gap-2">
                  <input
                    type="radio"
                    id="restrictiveProcedures_yes"
                    name="restrictiveProceduresRadio"
                    value="I give informed consent for the use of the following restrictive procedure"
                    checked={
                      behavioralData.restrictiveProceduresRadio ===
                      "I give informed consent for the use of the following restrictive procedure"
                    }
                    onChange={handleBehavioralChange}
                  />
                  <label
                    className="form-label fw-semibold"
                    htmlFor="restrictiveProcedures_yes"
                  >
                    I give informed consent for the use of the following
                    restrictive procedure(s):
                  </label>
                </div>
                
                </div>

                <div className=" pdf-page-break mb-3">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="procedureDescription"
                  >
                    Description of Procedure
                  </label>
                  <textarea
                    className="form-control"
                    id="procedureDescription"
                    name="procedureDescription"
                    rows="6"
                    placeholder="Describe the procedure"
                    defaultValue={behavioralData.procedureDescription}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="procedurePurpose"
                  >
                    Purpose of Procedure
                  </label>
                  <textarea
                    className="form-control"
                    id="procedurePurpose"
                    name="procedurePurpose"
                    rows="6"
                    placeholder="Describe the purpose of the procedure"
                    defaultValue={behavioralData.procedurePurpose}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="monitoringDuration">
                    Duration & Monitoring Requirements:
                  </label>
                  <textarea
                    name="monitoringDuration"
                    id="monitoringDuration"
                    className="form-control"
                    rows="6"
                    placeholder="Describe the duration and monitoring requirements"
                    defaultValue={behavioralData.monitoringDuration}
                    // onChange={handleBehavioralChange}
                     onBlur={
                      (e)=>{
                        setBehavioralData({...behavioralData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Individual/Guardian Signature(Review)"
                    name="individualGuardianSignature_consent"
                    
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Support Coordinator Signature"
                    name="supportSignature"
                   
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Program Specialist Signature"
                    name="programSpecialistSignature_consent"
                 
                  />
                </div>
           
           
        
       

          {/* Consent & Authorization Policy and Forms */}
          <div className="mb-5 pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Consent & Authorization Policy and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>

            <div className="rounded mb-4">
              <h4 className="fw-bold text-info-emphasis mb-4">
                Consent & Authorization Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that individuals receiving services and/or their
                  legal guardians understand, acknowledge, and provide informed
                  consent for services, release of information, and use of
                  personal data in accordance with 55 PA Code Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency will obtain written, informed consent from
                  the individual or their legal representative prior to
                  initiating services, sharing personal or medical information,
                  or using media for any purpose. Consent shall be voluntary and
                  may be revoked at any time.
                </p>
              </div>
              <div>
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    All consents shall be completed upon intake and reviewed
                    annually or upon any significant change in services.
                  </li>
                  <li className="mb-2">
                    The individual or guardian will receive a copy of all signed
                    consents.
                  </li>
                  <li className="mb-2">
                    Staff shall ensure the individual understands the content
                    before signing.
                  </li>
                  <li className="mb-2">
                    Original consents shall be stored in the individual's
                    record.
                  </li>
                  <li className="mb-2">
                    Refusal to sign consents will not result in denial of basic
                    services, but may limit specific activities.
                  </li>
                  <li className="mb-2">
                    Staff will document any assistance provided in obtaining
                    understanding and consent
                  </li>
                </ol>
              </div>
            </div>

            {/* Consent & Authorization Forms */}
            <div className="border rounded p-4">
              <h4 className="fw-bold text-dark mb-4">
                Consent & Authorization Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Consent to Recieve Services
              </h5>
              <div className="mb-4">
                <div>
                  I,{" "}
                  <input
                    type="text"
                    className="form-control form-styles mx-2 d-inline-block"
                  
                    id="individualGuardianName_consent"
                    name="individualGuardianName_consent"
                    defaultValue={consentData.individualGuardianName_consent}
                    // onChange={handleConsentChange}
                     onBlur={
                      (e)=>{
                        setConsentData({...consentData, [e.target.name]: e.target.value})
                      }
                    }
                  />{" "}
                 (Individual/ Guardian)
                  consent to receive services provided by{" "}
                  <input
                    type="text"
                    className="form-control form-styles my-3 d-inline-block"
                  
                    id="agencyName_consent"
                    name="agencyName_consent"
                    defaultValue={consentData.agencyName_consent}
                    // onChange={handleConsentChange}
                       onBlur={
                      (e)=>{
                        setConsentData({...consentData, [e.target.name]: e.target.value})
                      }
                    }
                  />{" "}
                  (agency name). The purpose, nature, and benefits of the
                  services have been explained to me. I understand my rights and
                  may withdraw this consent at any time.
                </div>
               
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Individual/Guardian Signature"
                      name="individualGuardianSignature_auth1"
                    
                    />
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Staff/witness Signature"
                      name="staffWitnessSignature_auth1"
                     
                    />
                  </div>
                
              </div>
              </div>
                </div>
                <div className="pdf-page-break">
              <h5 className="fw-bold text-secondary mb-3">
                2. Consent to Release Information
              </h5>
              <div className="mb-4">
                I authorize{" "}
                <input
                  type="text"
                  className="form-control form-styles mx-2 d-inline-block"
                 
                  id="agencyName_release"
                  name="agencyName_release"
                  defaultValue={consentData.agencyName_release}
                  // onChange={handleConsentChange}
                     onBlur={
                      (e)=>{
                        setConsentData({...consentData, [e.target.name]: e.target.value})
                      }
                    }
                    
                />{" "}
                (agency) to release and obtain relevant information to/from the
                following for coordination of services:
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="medicalProvider"
                    name="medicalProvider"
                    checked={consentData.medicalProvider}
                    onChange={handleConsentChange}
                      
                  />
                  <label htmlFor="medicalProvider" className="form-check-label">
                    Medical Provider
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="supportCoordination"
                    name="supportCoordination"
                    checked={consentData.supportCoordination}
                    onChange={handleConsentChange}
                  
                  />
                  <label
                    htmlFor="supportCoordination"
                    className="form-check-label"
                  >
                    Support Coordination
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="behavioralHealthProviders"
                    name="behavioralHealthProviders"
                    checked={consentData.behavioralHealthProviders}
                    onChange={handleConsentChange}
                 
                  />
                  <label
                    htmlFor="behavioralHealthProviders"
                    className="form-check-label"
                  >
                    {" "}
                    Behavioral Health Providers
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="Schools"
                    name="Schools"
                    checked={consentData.Schools}
                    onChange={handleConsentChange}
                  
                  />
                  <label htmlFor="Schools" className="form-check-label">
                    {" "}
                    Schools
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="other_release"
                    name="other_release"
                    checked={consentData.other_release}
                    onChange={handleConsentChange}
                    
                  />
                  <label htmlFor="other_release" className="form-check-label">
                    {" "}
                    Other:{" "}
                    <input
                      type="text"
                      className="form-control form-styles d-inline-block"
                      
                      id="other_releaseText"
                      name="other_releaseText"
                      defaultValue={consentData.other_releaseText}
                      // onChange={handleConsentChange}
                         onBlur={
                      (e)=>{
                        setConsentData({...consentData, [e.target.name]: e.target.value})
                      }
                    }
                      disabled={!consentData.other_release}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-5 mb-3">
                <p>
                  This release is valid for one year unless revoked in writing.
                </p>
             
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Individual/Guardian Signature"
                      name="individualGuardianSignature_auth2"
                      
                    />
                  </div>
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Staff/witness Signature"
                      name="staffWitnessSignature_auth2"
                      
                    />
                  </div>
            
              

              <h5 className="fw-bold text-secondary mb-3">
                3.HIPAA Acknowledgement
              </h5>

              <p>
                I acknowledge receipt of the Notice of Privacy Practices. I
                understand how my health information may be used and my rights
                under HIPAA.
              </p>

              
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Individual/Guardian Signature"
                    name="individualGuardianSignature_auth3"
                   
                  />
                </div>
                    <div className="col-md-3">
                  <SignatureCanvas
                    label="Staff/witness Signature"
                    name="staffWitnessSignature_auth3"
                
                  />
                </div>
                 
                </div>

                <div className="pdf-page-break">
                 
              <h5 className="fw-bold text-secondary mt-3 mb-3">
                4. Acknowledgement of Individual Rights
              </h5>
              <p>
                I acknowledge that I have been informed of my rights under 55 PA
                Code Chapter 6100have received a written copy of my rights.
                These rights have been explained to me in a way that I
                understand.
              </p>
             
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Individual/Guardian Signature"
                    name="individualGuardianSignature_auth4"
               
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Staff/witness Signature"
                    name="staffWitnessSignature_auth4"
                  
                  />
                </div>
           

              <h5 className="fw-bold text-secondary mt-3 mb-3">
                5.Photo/Media Release
              </h5>
              <p>
                Please indicate your preference regarding photographs or video
                recordings for internal or promotional use:
              </p>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <input
                    type="radio"
                    id="yes"
                    name="photoMediaRelease"
                    value="I GIVE consent to be photographed or recorded"
                    checked={
                      consentData.photoMediaRelease ===
                      "I GIVE consent to be photographed or recorded"
                    }
                    onChange={handleConsentChange}
                  />
                  <label htmlFor="yes" className="form-check-label">
                    {" "}
                    I GIVE consent to be photographed or recorded.
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="radio"
                    id="no"
                    name="photoMediaRelease"
                    value="I DO NOT GIVE consent to be photographed or recorded."
                    checked={
                      consentData.photoMediaRelease ===
                      "I DO NOT GIVE consent to be photographed or recorded."
                    }
                    onChange={handleConsentChange}
                  />
                  <label htmlFor="no" className="form-check-label">
                    {" "}
                    I DO NOT GIVE consent to be photographed or recorded.
                  </label>
                </div>
              </div>
                </div>
              <div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Individual/Guardian Signature"
                    name="individualGuardianSignature_auth5"
                
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Staff/witness Signature"
                    name="staffWitnessSignature_auth5"
                 
                  />
                </div>
                </div>
           
            
        

          {/* Financial Policy Documents and Forms */}
          <div className=" pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Financial Policy Documents and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>
            <div className="rounded mb-4">
              <h4 className="fw-bold text-info-emphasis mb-4">
                Financial Documentation Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure the accurate management, safeguarding, and
                  documentation of individual funds and personal property in
                  accordance with 55 PA Code Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency will protect and account for any
                  individual funds or belongings in its possession. Individuals
                  shall have control over their personal funds to the fullest
                  extent possible, and documentation shall reflect all financial
                  transactions conducted by or on behalf of the individual.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    Staff may assist with money management only if the ISP
                    authorizes it and with documented consent.
                  </li>
                  <li className="mb-2">
                    A Financial Inventory will be completed upon intake and
                    updated regularly.
                  </li>
                  <li className="mb-2">
                    Any agency-managed funds must be documented in a financial
                    ledger and receipts kept for all purchases.
                  </li>
                  <li className="mb-2">
                    Personal property must be inventoried, labeled if necessary,
                    and stored safely.
                  </li>
                  <li className="mb-2">
                    Monthly reconciliations shall be completed and reviewed by
                    supervisory staff.
                  </li>
                  <li className="mb-2">
                    Any suspected financial exploitation must be reported as an
                    incident per policy.
                  </li>
                </ol>
              </div>
            </div>

            {/* Financial Documentation Forms */}
            <div className="pdf-section border rounded py-4">
              <h4 className="fw-bold text-dark mb-4">
                Financial Documentation Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Money Management Authorization
              </h5>

              <div className="mb-4">
                <p>
                  I authorize{" "}
                  <input
                    type="text"
                    className="form-control form-styles mx-2 d-inline-block"
                   
                    id="agencyName_money"
                    name="agencyName_money"
                    defaultValue={financialData.agencyName_money}
                    // onChange={handleFinancialChange}
                       onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                  />{" "}
                  (Agency) to assist with money management and/or maintain a
                  record of transactions on my behalf, as approved in the
                  Individual Support Plan (ISP).
                </p>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <input
                    type="radio"
                    id="ownPayee"
                    name="moneyManagementAuthorization"
                    value="ownPayee"
                    checked={
                      financialData.moneyManagementAuthorization === "ownPayee"
                    }
                    onChange={handleFinancialChange}
                  />
                  <label htmlFor="ownPayee" className="form-check-label">
                    {" "}
                    I am my own payee{" "}
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="radio"
                    id="representativePayee"
                    name="moneyManagementAuthorization"
                    value="representativePayee"
                    checked={
                      financialData.moneyManagementAuthorization ===
                      "representativePayee"
                    }
                    onChange={handleFinancialChange}
                  />
                  <label
                    htmlFor="representativePayee"
                    className="form-check-label"
                  >
                    {" "}
                    I have a Representative Payee:{" "}
                    <input
                      type="text"
                      id="representativePayeeText"
                      name="representativePayeeText"
                      className="form-control form-styles mx-2 d-inline-block"
                     
                      defaultValue={financialData.representativePayeeText}
                      // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                      disabled={
                        financialData.moneyManagementAuthorization !==
                        "representativePayee"
                      }
                    />{" "}
                  </label>
                </div>
              </div>
              <p>Authorized Uses of Funds (check all that apply):</p>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="foodGroceries"
                    name="fundUses.foodGroceries"
                    checked={financialData.fundUses.foodGroceries}
                    onChange={handleFinancialChange}
                  />
                  <label htmlFor="foodGroceries" className="form-check-label">
                    {" "}
                    Food/Groceries
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="transportation"
                    name="fundUses.transportation"
                    checked={financialData.fundUses.transportation}
                    onChange={handleFinancialChange}
                  />
                  <label htmlFor="transportation" className="form-check-label">
                    Transportation
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="communityActivities"
                    name="fundUses.communityActivities"
                    checked={financialData.fundUses.communityActivities}
                    onChange={handleFinancialChange}
                  />
                  <label
                    htmlFor="communityActivities"
                    className="form-check-label"
                  >
                    {" "}
                    Community Activities
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="personalCareItems"
                    name="fundUses.personalCareItems"
                    checked={financialData.fundUses.personalCareItems}
                    onChange={handleFinancialChange}
                  />
                  <label
                    htmlFor="personalCareItems"
                    className="form-check-label"
                  >
                    Personal Care Items
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="fundUses_others"
                    name="fundUses.others"
                    checked={financialData.fundUses.others}
                    onChange={handleFinancialChange}
                  />
                  <label htmlFor="fundUses_others" className="form-check-label">
                    Others:{" "}
                    <input
                      type="text"
                      id="fundUses_others"
                      name="fundUses_others"
                      className="form-control form-styles form-styles mx-2 d-inline-block"
                   
                      defaultValue={financialData.fundUses_others}
                      // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                      disabled={!financialData.fundUses.others}
                    />{" "}
                  </label>
                </div>
              </div>
                     </div>
          </div>
              {/* {page break} */}
              <div className="pdf-page-break py-4 mb-5">
              <div >
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Staff Signature"
                    name="staffSignature_fin"
                  
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Individual Signature"
                    name="individualSignature_fin"
              
                  />
                </div>
              </div>

              <h5 className="fw-bold text-secondary mt-3 mb-3">
                2. Personal Property Inventory
              </h5>

              <div className="mb-4 row-start">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName_inv"
                    className="form-label fw-semibold"
                  >
                    Individual Name
                  </label>
                  <input
                    type="text"
                    className="form-control  mx-2 d-inline-block"
                   
                    id="individualName_inv"
                    name="individualName_inv"
                    defaultValue={financialData.individualName_inv}
                    // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="dateOfInventory"
                    className="form-label fw-semibold"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control  mx-2 d-inline-block"
                  
                    id="dateOfInventory"
                    name="dateOfInventory"
                    defaultValue={financialData.dateOfInventory}
                    // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
                <p className="fw-bold text-secondary">
                Instructions: List all valuable or meaningful property. Update
                as needed.
              </p>
              <div className="table-responsive">
                <table border={1} className="table table-striped mb-5" style={{ minWidth: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '30%', minWidth: '150px' }}>Item Description</th>
                      <th style={{ width: '20%', minWidth: '130px' }}>Date Acquired</th>
                      <th style={{ width: '20%', minWidth: '120px' }}>Estimated Value</th>
                      <th style={{ width: '30%', minWidth: '150px' }}>Condition/Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over the inventory array */}
                    {financialData.inventory.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name={`inventory[${index}].itemDescription`}
                            defaultValue={item.itemDescription}
                            onBlur={handleFinanceBlur}
                            placeholder="Item description"
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            name={`inventory[${index}].dateAcquired`}
                            defaultValue={item.dateAcquired}
                            onBlur={handleFinanceBlur}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            name={`inventory[${index}].estimatedValue`}
                            defaultValue={item.estimatedValue}
                            onBlur={handleFinanceBlur}
                            placeholder="$0.00"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name={`inventory[${index}].conditionLocation`}
                            defaultValue={item.conditionLocation}
                            onBlur={handleFinanceBlur}
                            placeholder="Condition/Location"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h5 className="fw-bold text-secondary mt-4 mb-3">
                3.Monthly Financial Ledger (Agency-Managed Funds)
              </h5>
              <div className="mb-4 row-start">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName_ledg"
                    className="form-label fw-semibold"
                  >
                    Individual Name
                  </label>
                  <input
                    type="text"
                    className="form-control  mx-2 d-inline-block"
                 
                    id="individualName_ledg"
                    name="individualName_ledg"
                    defaultValue={financialData.individualName_ledg}
                    // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="dateOfLedger"
                    className="form-label fw-semibold"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control mx-2 d-inline-block"
                  
                    id="dateOfLedger"
                    name="dateOfLedger"
                    defaultValue={financialData.dateOfLedger}
                    // onChange={handleFinancialChange}
                      onBlur={
                      (e)=>{
                        setFinancialData({...financialData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
              <div className="table-responsive">
              <table border={1} className="table table-striped" style={{ minWidth: '100%' }}>
                <thead>
                  <tr>
              <th style={{ width: '30%', minWidth: '150px' }}>Description</th>
              <th style={{ width: '10%', minWidth: '110px' }}>Date</th>
              <th style={{ width: '20%', minWidth: '130px' }}>Amount In</th>
              <th style={{ width: '20%', minWidth: '130px' }}>Amount Out</th>
              <th style={{ width: '20%', minWidth: '130px' }}>Amount Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over the ledger array */}
                  {financialData.ledger.map((item, index) => (
                    <tr key={index}>
                          <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name={`ledger[${index}].description`}
                          defaultValue={item.description}
                          onBlur={handleFinanceBlur}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name={`ledger[${index}].date`}
                          defaultValue={item.date}
                          onBlur={handleFinanceBlur}
                        />
                      </td>
                  
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name={`ledger[${index}].amountIn`}
                          defaultValue={item.amountIn}
                          onBlur={handleFinanceBlur}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name={`ledger[${index}].amountOut`}
                          defaultValue={item.amountOut}
                          onBlur={handleFinanceBlur}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name={`ledger[${index}].amountBalance`}
                          defaultValue={item.amountBalance}
                          onBlur={handleFinanceBlur}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
           </div>

          {/* Habilitation Service Plan Policy and Forms */}
          <div className="mb-5 pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Habilitation Service Plan Policy and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>

            <div className="mb-4">
              <h4 className="fw-bold text-info-emphasis mb-4">
                Habilitation Service Plan Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that all individuals receiving habilitation services
                  have a written, person-centered service plan that outlines
                  measurable goals, support strategies, staffing
                  responsibilities, and safeguards in accordance with 55 PA Code
                  Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  Each individual receiving habilitation services must have a
                  Habilitation Service Plan developed from their current
                  Individual Support Plan (ISP). The plan shall be developed
                  collaboratively and include clear outcomes, service frequency,
                  staffing duties, and health/safety precautions.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    A Habilitation Service Plan will be developed upon intake
                    and updated at least annually or with any significant
                    change.
                  </li>
                  <li className="mb-2">
                    The plan must include:
                    <ol type="a" className="mt-2">
                      <li>Measurable goals from the ISP</li>
                      <li>Frequency, duration, and location of services</li>
                      <li>Support strategies and teaching methods</li>
                      <li>Staff responsibilities and qualifications</li>
                      <li>-Risk factors and health/safety strategies</li>
                    </ol>
                  </li>
                  <li className="mb-2">
                    The individual/guardian will review and sign the plan prior
                    to implementation.
                  </li>
                  <li className="mb-2">
                    4.The plan will be implemented and progress monitored
                    through daily service documentation.
                  </li>
                  <li className="mb-2">
                    5.Plans will be reviewed and updated as needed by the
                    Program Specialist and the support team.
                  </li>
                </ol>
              </div>
            </div>
            </div>

            {/* Habilitation Service Plan Forms */}
            <div className="pdf-section border rounded p-4">
              <h4 className="fw-bold text-dark mb-4">
                Habilitation Service Plan Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Habilitation Service Plan
              </h5>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName_hab"
                    className="form-label fw-semibold"
                  >
                    Individual's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName_hab"
                    name="individualName_hab"
                    defaultValue={habilitationData.individualName_hab}
                    // onChange={handleHabilitationChange}
                      onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="dob_hab" className="form-label fw-semibold">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob_hab"
                    name="dob_hab"
                    defaultValue={habilitationData.dob_hab}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="planStartDate"
                    className="form-label fw-semibold"
                  >
                    Plan Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="planStartDate"
                    name="planStartDate"
                    defaultValue={habilitationData.planStartDate}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="reviewDate_hab"
                    className="form-label fw-semibold"
                  >
                    Review Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reviewDate_hab"
                    name="reviewDate_hab"
                    defaultValue={habilitationData.reviewDate_hab}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="supportCoordinator_hab"
                    className="form-label fw-semibold"
                  >
                    Support Coordinator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="supportCoordinator_hab"
                    name="supportCoordinator_hab"
                    defaultValue={habilitationData.supportCoordinator_hab}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="programSpecialist_hab"
                    className="form-label fw-semibold"
                  >
                    Program Specialist:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="programSpecialist_hab"
                    name="programSpecialist_hab"
                    defaultValue={habilitationData.programSpecialist_hab}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="locationofServices"
                    className="form-label fw-semibold"
                  >
                    Site/Location of Services
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="locationofServices"
                    name="locationofServices"
                    defaultValue={habilitationData.locationofServices}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
              </div>
              <div className="pdf-page-break">
              <p className="fw-bold text-secondary">
                Measurable Outcomes from ISP:
              </p>
              <div>
                <ol className="d-flex p-0 flex-column gap-2">
                  <li>
                    <input
                      type="text"
                      className="form-control"
                      id="outcome1"
                      name="outcome1"
                      defaultValue={habilitationData.outcome1}
                      // onChange={handleHabilitationChange}
                       onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </li>
                  <li >
                    <input
                      type="text"
                      className="form-control"
                      id="outcome2"
                      name="outcome2"
                      defaultValue={habilitationData.outcome2}
                      // onChange={handleHabilitationChange}
                       onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </li>
                </ol>
              </div>
              <div className="mt-5">
                <p className="fw-bold text-secondary">
                  Service Frequency and Duration:
                </p>
                <div className="d-flex gap-2 mt-3">
                  <div className="col-md-3">
                    <label
                      htmlFor="days_per_week"
                      className="form-label fw-semibold"
                    >
                      Days per week
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="days_per_week"
                      name="days_per_week"
                      defaultValue={habilitationData.days_per_week}
                      // onChange={handleHabilitationChange}
                       onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="hours_per_day"
                      className="form-label fw-semibold"
                    >
                      Hours per day
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="hours_per_day"
                      name="hours_per_day"
                      defaultValue={habilitationData.hours_per_day}
                      // onChange={handleHabilitationChange}
                       onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <p className="fw-bold text-secondary">
                  Support Strategies and teaching methods:
                </p>
                <div className="d-flex flex-column gap-2">
                  <textarea
                    className="form-control"
                    id="supportStrategies"
                    name="supportStrategies"
                    rows="6"
                    placeholder="List any support strategies and teaching methods  here..."
                    defaultValue={habilitationData.supportStrategies}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
              </div>

              <div className="mt-5">
                <p className="fw-bold text-secondary">
                  Staff Responsibilities:
                </p>
                <div className="d-flex flex-column gap-2">
                  <input
                    type="text"
                    className="form-control"
                    id="staffResponsibilities1"
                    name="staffResponsibilities1"
                    defaultValue={habilitationData.staffResponsibilities1}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="staffResponsibilities2"
                    name="staffResponsibilities2"
                    defaultValue={habilitationData.staffResponsibilities2}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="fw-bold text-secondary">
                  Identified Risk Factors and Mitigation Strategies:
                </p>
                <div className="d-flex flex-column gap-2">
                  <textarea
                    className="form-control"
                    id="riskFactors"
                    name="riskFactors"
                    rows="6"
                    placeholder="List identified risk factors and mitigation strategies here..."
                    defaultValue={habilitationData.riskFactors}
                    // onChange={handleHabilitationChange}
                     onBlur={
                      (e)=>{
                        setHabilitationData({...habilitationData, [e.target.name]: e.target.value})
                      }
                    }
                  ></textarea>
                </div>
              </div>

              <div className="mt-5">
                <p>Signatue:</p>
                <div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Individual/guardian Signature"
                      name="individualGuardianSignature_hab"
            
                    />
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Direct Support Staff Signature"
                      name="directSupportStaffSignature"
                      
                    />
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Program Specialist Signature"
                      name="programSpecialistSignature_hab"
                      
                    />
                  </div>
                </div>
              </div>
            </div>
         
         

          {/* Health & Safety Policy and Forms */}
          <div className="mb-5 pdf-section pdf-page-break">
            <h3 className="fw-bold text-info mb-2">
              Health & Safety Policy and Forms
            </h3>
            <p className="text-muted mb-5">
              In accordance with 55 PA Code Chapter 6100
            </p>

            <div className="mb-4">
              <h4 className="fw-bold text-secondary mb-3">
                Health & Safety Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To protect the health, safety, and well-being of individuals
                  receiving services by ensuring emergency readiness, health
                  monitoring, medical authorization, and environmental safety in
                  compliance with 55 PA Code Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency shall establish and follow written
                  procedures to prevent, respond to, and report health and
                  safety concerns. Staff must be trained to respond to
                  emergencies, use universal precautions, and maintain safe
                  environments at all times.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    A Health & Safety Plan shall be completed for each
                    individual and reviewed annually.
                  </li>
                  <li className="mb-2">
                    Staff will complete emergency drills, follow site-specific
                    safety procedures, and report incidents per agency protocol.
                  </li>
                  <li className="mb-2">
                    Current medical and emergency information shall be
                    maintained in the individual's record.
                  </li>
                  <li className="mb-2">
                    Emergency contact info, treatment consents, and risk
                    mitigation strategies must be documented and accessible
                  </li>
                  <li className="mb-2">
                    Any health-related incidents will be documented and
                    addressed immediately.
                  </li>
                  <li className="mb-2">
                    Environmental safety checks shall be conducted and logged
                    monthly.
                  </li>
                </ol>
              </div>
            </div>
               </div>

            {/* Health & Safety Forms */}
            <div className="pdf-section border rounded p-4">
              <h4 className="fw-bold text-dark mb-4">Health & Safety Forms</h4>
              <h5 className="fw-bold text-secondary mb-3">
                1.Emergency Medical Treatment Authorization
              </h5>

              <div className="mb-4">
                <p>
                  I authorize{" "}
                  <input
                    type="text"
                    className="form-control form-styles mx-2 d-inline-block"
                    
                    id="agencyName_med"
                    name="agencyName_med"
                    defaultValue={healthSafetyData.agencyName_med}
                    // onChange={handleHealthSafetyChange}
                     onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                  />{" "}
                  (Provider Agency) to obtain emergency medical care for
                  <input
                    type="text"
                    className="form-control form-styles mx-2 d-inline-block"
                 
                    id="individualName_med"
                    name="individualName_med"
                    defaultValue={healthSafetyData.individualName_med}
                    // onChange={handleHealthSafetyChange}
                     onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                  />{" "}
                  (Individual's Name) in the event of an accident or emergency.
                </p>

                <div className="d-flex flex-column gap-2">
                  <div className="d-flex w-100 gap-2">
                    <div className="col-md-5">
                      <label
                        htmlFor="physicianName"
                        className="form-label fw-semibold"
                      >
                        Physician Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="physicianName"
                        name="physicianName"
                        defaultValue={healthSafetyData.physicianName}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>

                    <div className="col-md-5">
                      <label
                        htmlFor="physicianPhone"
                        className="form-label fw-semibold"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="physicianPhone"
                        name="physicianPhone"
                        defaultValue={healthSafetyData.physicianPhone}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="preferredHospital_med"
                      className="form-label fw-semibold"
                    >
                      Preferred Hospital
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="preferredHospital_med"
                      name="preferredHospital_med"
                      defaultValue={healthSafetyData.preferredHospital_med}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="medicalCondition_med"
                      className="form-label fw-semibold"
                    >
                      Medical Condition or Allergies
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medicalCondition_med"
                      name="medicalCondition_med"
                      defaultValue={healthSafetyData.medicalCondition_med}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="insuranceProvider"
                      className="form-label fw-semibold"
                    >
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      defaultValue={healthSafetyData.insuranceProvider}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="policy"
                      className="form-label fw-semibold"
                    >
                      Policy #
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="policy"
                      name="policy"
                      defaultValue={healthSafetyData.policy}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                    </div>
                    </div>
                     </div>
                  
                
                  
                      <div className="pdf-page-break">
                            <div className="col-md-3">
                      <SignatureCanvas
                        label="Individual/guardian Signature"
                        name="individualGuardianSignature_med"
                    
                      />
                        </div>
                      <div className="col-md-3 ">
                      <SignatureCanvas
                        label="Staff/witness Signature"
                        name="staffWitnessSignature_med"
                      
                      />
                    </div>
                
              
             

              <h5 className="fw-bold text-secondary mb-3">
                2.Individual-Speciﬁc Emergency Evacuation Plan
              </h5>

              <div className="mb-4">
                <div className="d-flex gap-5 mt-3">
                  <div className="col-md-5">
                    <label
                      htmlFor="individualName_evac"
                      className="form-label fw-semibold"
                    >
                      Individual's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="individualName_evac"
                      name="individualName_evac"
                      defaultValue={healthSafetyData.individualName_evac}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="site_evac"
                      className="form-label fw-semibold"
                    >
                      Site
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="site_evac"
                      name="site_evac"
                      defaultValue={healthSafetyData.site_evac}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="fw-semibold text-secondary">
                    Mobility assistant needed?
                  </p>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="mobilityAssistant_yes"
                      name="mobilityAssistant"
                      value="yes"
                      checked={healthSafetyData.mobilityAssistant === "yes"}
                      onChange={handleHealthSafetyChange}
                    />
                    <label
                      htmlFor="mobilityAssistant_yes"
                      className="form-check-label"
                    >
                      {" "}
                      Yes
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="mobilityAssistant_no"
                      name="mobilityAssistant"
                      value="no"
                      checked={healthSafetyData.mobilityAssistant === "no"}
                      onChange={handleHealthSafetyChange}
                    />
                    <label
                      htmlFor="mobilityAssistant_no"
                      className="form-check-label"
                    >
                      {" "}
                      No
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="mobilityDescription"
                    className="form-label fw-semibold"
                  >
                    If yes, Describe
                  </label>
                  <textarea
                    className="form-control"
                    id="mobilityDescription"
                    name="mobilityDescription"
                    rows="3"
                    placeholder="Describe mobility needs..."
                    defaultValue={healthSafetyData.mobilityDescription}
                    // onChange={handleHealthSafetyChange}
                      onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    disabled={healthSafetyData.mobilityAssistant !== "yes"}
                  ></textarea>

                  <div className="d-flex flex-column gap-2 mt-3">
                    <div>
                      <label
                        htmlFor="evacuationRole"
                        className="form-label fw-semibold"
                      >
                        Evacuation Role Assigned to Staff
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="evacuationRole"
                        name="evacuationRole"
                        defaultValue={healthSafetyData.evacuationRole}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="meetingPoint"
                        className="form-label fw-semibold"
                      >
                        Meeting Point After Evacuation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="meetingPoint"
                        name="meetingPoint"
                        defaultValue={healthSafetyData.meetingPoint}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reviewedOn"
                        className="form-label fw-semibold"
                      >
                        Reviewed and Practiced on:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reviewedOn"
                        name="reviewedOn"
                        defaultValue={healthSafetyData.reviewedOn}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reviewedBy"
                        className="form-label fw-semibold"
                      >
                        Reviewed by:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reviewedBy"
                        name="reviewedBy"
                        defaultValue={healthSafetyData.reviewedBy}
                        // onChange={handleHealthSafetyChange}
                          onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold text-secondary mb-3">
                3.Fire Safety & Drill Log
              </h5>

              <div className="mb-4">
                <div className="d-flex gap-5 mt-3">
                  <div className="col-md-4">
                    <label
                      htmlFor="siteName"
                      className="form-label fw-semibold"
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="siteName"
                      name="siteName"
                      defaultValue={healthSafetyData.siteName}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="siteMonth"
                      className="form-label fw-semibold"
                    >
                      Month
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="siteMonth"
                      name="siteMonth"
                      defaultValue={healthSafetyData.siteMonth}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
                <div className="d-flex gap-3 mt-4">
                  <div className="col-md-3">
                    <label
                      htmlFor="drillDate"
                      className="form-label fw-semibold"
                    >
                      Drill Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="drillDate"
                      name="drillDate"
                      defaultValue={healthSafetyData.drillDate}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="drillTime"
                      className="form-label fw-semibold"
                    >
                      Time
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="drillTime"
                      name="drillTime"
                      defaultValue={healthSafetyData.drillTime}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
                <div className="col-md-3 mt-3 mb-3">
                  <label
                    htmlFor="evacuationDate"
                    className="form-label fw-semibold"
                  >
                    Evacuation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="evacuationDate"
                    name="evacuationDate"
                    defaultValue={healthSafetyData.evacuationDate}
                    // onChange={handleHealthSafetyChange}
                      onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="mt-2">
                  <div className="col-md-4">
                    <label
                      htmlFor="staffPresent"
                      className="form-label fw-semibold"
                    >
                      Staff Present
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="staffPresent"
                      name="staffPresent"
                      defaultValue={healthSafetyData.staffPresent}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="issuesNoted"
                      className="form-label fw-semibold"
                    >
                      Issues Noted:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="issuesNoted"
                      name="issuesNoted"
                      defaultValue={healthSafetyData.issuesNoted}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                   </div>
              </div>
              </div>
             
                  <div className="col-md-4 pdf-page-break">
                    <label
                      htmlFor="correctiveActionTaken"
                      className="form-label fw-semibold"
                    >
                      Corrective Action Taken
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="correctiveActionTaken"
                      name="correctiveActionTaken"
                      defaultValue={healthSafetyData.correctiveActionTaken}
                      // onChange={handleHealthSafetyChange}
                        onBlur={
                      (e)=>{
                        setHealthSafetyData({...healthSafetyData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                    
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Completed By:"
                      name="completedBy_fire"
                    />
                  </div>
            
       
       

          {/* Individual Rights Acknowledgment Policy and Forms */}

          <div className="mb-5 pdf-section pdf-page-break">
            <h3 className="fw-bold text-info mb-2">
              Individual Rights Acknowledgment Policy and Forms
            </h3>
            <p className="text-muted mb-5">
              In accordance with 55 PA Code Chapter 6100
            </p>
            <div className="mb-4">
              <h4 className="fw-bold text-secondary mb-3">
                Individual Rights Acknowledgment Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that each individual receiving services is informed
                  of their rights as required by 55 PA Code Chapter 6100, and
                  that acknowledgment of those rights is documented.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  Each individual and/or their legal representative must be
                  informed of their rights both orally and in writing in a
                  manner they understand. This information will be provided upon
                  intake, annually, and whenever there is a significant change
                  in services.
                </p>
              </div>
              <div>
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    Rights will be reviewed and explained to the individual in a
                    format appropriate to their communication and comprehension
                    level.
                  </li>
                  <li className="mb-2">
                    A copy of the individual rights, as outlined in 55 PA Code
                    §§ 6100.181-6100.186, will be provided to the individual
                    and/or guardian.
                  </li>
                  <li className="mb-2">
                    The provider will maintain documentation that the rights
                    were explained and received.
                  </li>
                  <li className="mb-2">
                    Rights will include, but are not limited to: dignity,
                    privacy, safety, communication, participation, and
                    protection from abuse.
                  </li>
                  <li className="mb-2">
                    If rights are modified through the ISP, documentation must
                    include the reason, type, duration, and a plan for
                    restoration.
                  </li>
                  <li className="mb-2">
                    Staff are required to support the individual in
                    understanding and exercising their rights at all times.
                  </li>
                </ol>
              </div>
            </div>

            {/* Individual Rights Acknowledgment Forms */}
            <div className="pdf-section ">
              <h4 className="fw-bold text-dark mb-4">
                Individual Rights Acknowledgment Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Individual Rights Reciept and Acknowledgment
              </h5>
              <p className="text-secondary">
                I acknowledge that I have received a written copy of my rights
                as an individual receiving services, as stated in 55 PA Code
                Chapter 6100. My rights were explained to me in a manner I
                understand.
              </p>
              
                <div className=" mt-2 col-md-3">
                  <SignatureCanvas
                    label="Individual Signature"
                    name="individualSignature_rights"
                  
                  />
                </div>
                <div className="col-md-3">
                  <SignatureCanvas
                    label="Guardian Signature (if applicable)"
                    name="guardianSignature_rights"
                  
                  />
                </div>
                 </div>
          </div>
                
                <div className="col-md-3 pdf-page-break">
                  <SignatureCanvas
                    label="Staff/witness Signature"
                    name="staffSignature_rights"
                   
                  />
                </div>
              

              <h5 className="fw-bold text-secondary mb-3">
                2.Rights Education Log
              </h5>
              <div className="mb-4">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName_rights"
                    className="form-label fw-semibold"
                  >
                    Individual Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName_rights"
                    name="individualName_rights"
                    defaultValue={rightsData.individualName_rights}
                    // onChange={handleRightsChange}
                      onBlur={
                      (e)=>{
                        setRightsData({...rightsData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4 mt-3">
                  <label
                    htmlFor="dateofLog"
                    className="form-label fw-semibold"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateofLog"
                    name="dateofLog"
                    defaultValue={rightsData.dateofLog}
                    // onChange={handleRightsChange}
                        onBlur={
                      (e)=>{
                        setRightsData({...rightsData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>

                <div className="mt-3">
                  <p className="fw-semibold ">
                    Method of Explanation (check all that apply):
                  </p>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="verbalExplanation"
                        name="explanationMethods.verbalExplanation"
                        checked={
                          rightsData.explanationMethods.verbalExplanation
                        }
                        onChange={handleRightsChange}
                      />
                      <label
                        htmlFor="verbalExplanation"
                        className="form-check-label"
                      >
                        Verbal Explanation
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="visualAids"
                        name="explanationMethods.visualAids"
                        checked={rightsData.explanationMethods.visualAids}
                        onChange={handleRightsChange}
                      />
                      <label htmlFor="visualAids" className="form-check-label">
                        Visual Aids
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="writtenMaterial"
                        name="explanationMethods.writtenMaterial"
                        checked={rightsData.explanationMethods.writtenMaterial}
                        onChange={handleRightsChange}
                      />
                      <label
                        htmlFor="writtenMaterial"
                        className="form-check-label"
                      >
                        Written Material
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="assestiveTechnology"
                        name="explanationMethods.assestiveTechnology"
                        checked={
                          rightsData.explanationMethods.assestiveTechnology
                        }
                        onChange={handleRightsChange}
                      />
                      <label
                        htmlFor="assestiveTechnology"
                        className="form-check-label"
                      >
                        Assistive Technology
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        id="interpreterUsed"
                        name="explanationMethods.interpreterUsed"
                        checked={rightsData.explanationMethods.interpreterUsed}
                        onChange={handleRightsChange}
                      />
                      <label
                        htmlFor="interpreterUsed"
                        className="form-check-label"
                      >
                        Interpreter Used
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-5 ">
                  <p className="fw-semibold ">
                    Was the individual given an opportunity to ask questions?{" "}
                  </p>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="opportunityToAskQuestions_yes"
                      name="opportunityToAskQuestions"
                      value="yes"
                      checked={
                        rightsData.opportunityToAskQuestions === "yes"
                      }
                      onChange={handleRightsChange}
                    />
                    <label
                      htmlFor="opportunityToAskQuestions_yes"
                      className="form-check-label"
                    >
                      {" "}
                      Yes
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="opportunityToAskQuestions_no"
                      name="opportunityToAskQuestions"
                      value="no"
                      checked={rightsData.opportunityToAskQuestions === "no"}
                      onChange={handleRightsChange}
                    />
                    <label
                      htmlFor="opportunityToAskQuestions_no"
                      className="form-check-label"
                    >
                      {" "}
                      No
                    </label>
                  </div>
                </div>
                <div className="mt-5 ">
                  <p className="fw-semibold ">
                    Did the individual appear to understand their rights?
                  </p>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="understandingOfRights_yes"
                      name="understandingOfRights"
                      value="yes"
                      checked={rightsData.understandingOfRights === "yes"}
                      onChange={handleRightsChange}
                    />
                    <label
                      htmlFor="understandingOfRights_yes"
                      className="form-check-label"
                    >
                      {" "}
                      Yes
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      id="understandingOfRights_no"
                      name="understandingOfRights"
                      value="no"
                      checked={rightsData.understandingOfRights === "no"}
                      onChange={handleRightsChange}
                    />
                    <label
                      htmlFor="understandingOfRights_no"
                      className="form-check-label"
                    >
                      {" "}
                      No
                    </label>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="col-md-4">
                    <label
                      htmlFor="staffProvidingEducation"
                      className="form-label fw-semibold"
                    >
                      Name of Staff Providing Education
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="staffProvidingEducation"
                      name="staffProvidingEducation"
                      defaultValue={rightsData.staffProvidingEducation}
                      // onChange={handleRightsChange}
                          onBlur={
                      (e)=>{
                        setRightsData({...rightsData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Staff Signature"
                      name="staffSignature_rights_log"
                     
                    />
                  </div>
                </div>
              </div>
           

          {/* Preferences & Cultural Proﬁle Policy and Forms */}

          <div className=" pdf-section pdf-page-break">
            <h3 className="fw-bold text-info mb-2">
              Preferences & Cultural Proﬁle Policy and Forms
            </h3>
            <p className="text-muted mb-5">
              In accordance with 55 PA Code Chapter 6100
            </p>

            <div className="mb-4">
              <h4 className="fw-bold text-secondary mb-3">
                Preferences & Cultural Proﬁle Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To honor and incorporate each individual's preferences,
                  beliefs, culture, communication needs, and lifestyle choices
                  into the planning and delivery of services, as required under
                  55 PA Code Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency shall gather and document each
                  individual's preferences and cultural profile to ensure
                  person-centered, respectful, and inclusive support. This
                  information shall be used to guide service delivery, staffing
                  decisions, and community integration efforts.
                </p>
              </div>
              <div>
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    A Preferences & Cultural Profile form will be completed upon
                    intake and updated annually or as needed.
                  </li>
                  <li className="mb-2">
                    Staff will review the individual's preferences and cultural
                    needs during onboarding and receive training on cultural
                    competency.
                  </li>
                  <li className="mb-2">
                    Profiles will include food preferences, religious practices,
                    daily routines, communication preferences, holidays
                    celebrated, languages spoken, and accessibility needs.
                  </li>
                  <li className="mb-2">
                    4.Profiles will be stored in the individual's service file
                    and referenced in the implementation of the ISP.
                  </li>
                  <li className="mb-2">
                    5.Any staff assigned to support the individual must review
                    and sign acknowledgment of the profile.
                  </li>
                </ol>
              </div>
            </div>

            {/* Preferences & Cultural Proﬁle Forms */}
            <div className="pdf-section px-4">
              <h4 className="fw-bold text-dark mb-4">
                Preferences & Cultural Proﬁle Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Preferences & Cultural Profile
              </h5>

              <div className="mb-4">
                <div className="d-flex flex-column flex-sm-row  gap-3">
                  <div className="col-md-4">
                    <label
                      htmlFor="individualName_cult"
                      className="form-label fw-semibold"
                    >
                      Individual's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="individualName_cult"
                      name="individualName_cult"
                      defaultValue={preferencesData.individualName_cult}
                      // onChange={handlePreferencesChange}
                          onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="dateCompleted_cult"
                      className="form-label fw-semibold"
                    >
                      Date Completed
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateCompleted_cult"
                      name="dateCompleted_cult"
                      defaultValue={preferencesData.dateCompleted_cult}
                      // onChange={handlePreferencesChange}
                      onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="preferredName"
                    className="form-label fw-semibold"
                  >
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredName"
                    name="preferredName"
                    defaultValue={preferencesData.preferredName}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="preferredLanguage"
                    className="form-label fw-semibold"
                  >
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredLanguage"
                    name="preferredLanguage"
                    defaultValue={preferencesData.preferredLanguage}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="preferredMethod"
                    className="form-label fw-semibold"
                  >
                    Preferred Method of Communication
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredMethod"
                    name="preferredMethod"
                    defaultValue={preferencesData.preferredMethod}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }

                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="culturalIdentity"
                    className="form-label fw-semibold"
                  >
                    Cultural Identity
                  </label>
                  <input
                    type="text"
                    name="culturalIdentity"
                    id="culturalIdentity"
                    className="form-control"
                    defaultValue={preferencesData.culturalIdentity}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="religiousPractices"
                    className="form-label fw-semibold"
                  >
                    Religious or Spritual Practices
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="religiousPractices"
                    name="religiousPractices"
                    defaultValue={preferencesData.religiousPractices}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="foodPreferences"
                    className="form-label fw-semibold"
                  >
                    Food Preferences or Dietery Restrictions
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="foodPreferences"
                    name="foodPreferences"
                    defaultValue={preferencesData.foodPreferences}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="holidays"
                    className="form-label fw-semibold"
                  >
                    Holidays or Observances Important to the Individual:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="holidays"
                    name="holidays"
                    defaultValue={preferencesData.holidays}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="dailyRoutine"
                    className="form-label fw-semibold"
                  >
                    Daily Routines or Important Habits:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dailyRoutine"
                    name="dailyRoutine"
                    defaultValue={preferencesData.dailyRoutine}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="clothingPreferences"
                    className="form-label fw-semibold"
                  >
                    Clothing Preferences
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clothingPreferences"
                    name="clothingPreferences"
                    defaultValue={preferencesData.clothingPreferences}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>
            </div>
              </div>
                {/* page break */}
                <div className="pdf-page-break px-4 mb-5">
                <div className="col-md-4">
                  <label
                    htmlFor="accessibilityNeeds"
                    className="form-label fw-semibold"
                  >
                    Accessibility Needs (mobility, visual, auditory, sensory):{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accessibilityNeeds"
                    name="accessibilityNeeds"
                    defaultValue={preferencesData.accessibilityNeeds}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="hobbies"
                    className="form-label fw-semibold"
                  >
                    Hobbies, Interests, or Favorite Activities:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hobbies"
                    name="hobbies"
                    defaultValue={preferencesData.hobbies}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="importantPeople"
                    className="form-label fw-semibold"
                  >
                    Important People or Relationships in Their Life:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="importantPeople"
                    name="importantPeople"
                    defaultValue={preferencesData.importantPeople}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="otherConsiderations"
                    className="form-label fw-semibold"
                  >
                    Other Considerations or Notes:{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otherConsiderations"
                    name="otherConsiderations"
                    defaultValue={preferencesData.otherConsiderations}
                    // onChange={handlePreferencesChange}
                        onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
            

              <div className="rounded mt-4">
                <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
                  <div className="col-md-4">
                    <label
                      className="form-label fw-semibold mb-2"
                      htmlFor="completedBy_cult"
                    >
                      Completed by:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="completedBy_cult"
                      name="completedBy_cult"
                      defaultValue={preferencesData.completedBy_cult}
                      // onChange={handlePreferencesChange}
                          onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      className="form-label fw-semibold mb-2"
                      htmlFor="role_cult"
                    >
                      Role:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="role_cult"
                      name="role_cult"
                      defaultValue={preferencesData.role_cult}
                      // onChange={handlePreferencesChange}
                          onBlur={
                      (e)=>{
                        setPreferencesData({...preferencesData, [e.target.name]: e.target.value})
                      }
                    }
                    />
                  </div>
                </div>
                <div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Signature of Individual/Guardian"
                      name="individualGuardianSignature_cult"
                    
                    />
                  </div>
                  {/* THIS IS THE BLANK BOX YOU REQUESTED */}
                  <div className="col-md-3">
                    <label
                      htmlFor="staffPrintSign"
                      className="form-label fw-semibold"
                    >
                      Staff Signature(Print & SIgn)
                    </label>
                    <div
                      id="staffPrintSign"
                      className="signbox"
                
                    ></div>
                  </div>
                </div>
              </div>
              </div>
        

          {/* Training & Orientation Acknowledgments Policy and Forms */}

          <div className=" pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Training & Orientation Acknowledgments Policy and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>

            <div className="mb-4">
              <h4 className="fw-bold text-secondary mb-3">
                Training & Orientation Acknowledgments Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that individuals receiving services and/or their
                  legal guardians are informed about their rights, reporting
                  procedures, health and safety practices, and provider policies
                  through a structured orientation process, as required by 55 PA
                  Code Chapter 6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  Each individual shall receive orientation upon intake and
                  annually thereafter regarding their rights, how to report
                  abuse, the provider’s incident management process, health and
                  safety procedures, confidentiality, and how services will be
                  provided.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    Orientation will be delivered in a format that matches the
                    individual's level of comprehension (e.g., verbal, written,
                    visual).
                  </li>
                  <li className="mb-2">
                    The provider shall document that the individual/guardian has
                    received and understood each element of the training.
                  </li>
                  <li className="mb-2">
                    Signed acknowledgments will be kept in the individual’s
                    record.
                  </li>
                  <li className="mb-2">Orientation topics include:</li>
                  <ol type="a">
                    <li>Individual Rights under Chapter 6100</li>
                    <li>
                      Abuse, Neglect, and Exploitation: Definitions and Reporting
                    </li>
                    <li>Incident Management Overview</li>
                    <li>Confidentiality and HIPAA</li>
                    <li>Fire Safety and Emergency Procedures</li>
                    <li>Provider Policies and Expectations</li>
                    <li>Access to the Individual/Family Handbook</li>
                  </ol>
                </ol>
              </div>
            </div>

            {/* Training & Orientation Acknowledgments Forms */}
            <div className="pdf-section ">
              <h4 className="fw-bold text-dark mb-4">
                Training & Orientation Acknowledgments Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1. Orientation Acknowledgments Forms
              </h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label
                    htmlFor="individualName_train"
                    className="form-label fw-semibold"
                  >
                    Individual's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName_train"
                    name="individualName_train"
                    defaultValue={trainingData.individualName_train}
                    // onChange={handleTrainingChange}
                        onBlur={
                      (e)=>{
                        setTrainingData({...trainingData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="orientationdateCompleted"
                    className="form-label fw-semibold"
                  >
                    Date Completed
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="orientationdateCompleted"
                    name="orientationdateCompleted"
                    defaultValue={trainingData.orientationdateCompleted}
                    // onChange={handleTrainingChange}
                        onBlur={
                      (e)=>{
                        setTrainingData({...trainingData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="fw-semibold text-black">
                  The following topics were reviewed and explained in an
                  accessible format (check all completed):
                </p>

                <div >
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="individualRights"
                      name="orientationTopics.individualRights"
                      checked={
                        trainingData.orientationTopics.individualRights
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="individualRights"
                      className="form-check-label"
                    >
                      Individual Rights(55 PA Code Chapter 6100)
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="abuseNeglectExploitation"
                      name="orientationTopics.abuseNeglectExploitation"
                      checked={
                        trainingData.orientationTopics.abuseNeglectExploitation
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="abuseNeglectExploitation"
                      className="form-check-label"
                    >
                      Abuse/Neglect/Exploitation Reporting Procedures
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="incidentManagement"
                      name="orientationTopics.incidentManagement"
                      checked={
                        trainingData.orientationTopics.incidentManagement
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="incidentManagement"
                      className="form-check-label"
                    >
                      Incident Management Process
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="confidentiality"
                      name="orientationTopics.confidentiality"
                      checked={trainingData.orientationTopics.confidentiality}
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="confidentiality"
                      className="form-check-label"
                    >
                      Confidentiality and HIPAA
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="providerPolicies"
                      name="orientationTopics.providerPolicies"
                      checked={
                        trainingData.orientationTopics.providerPolicies
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="providerPolicies"
                      className="form-check-label"
                    >
                      Provider Policies and Expectations
                    </label>
                  </div>
               
              </div>
            </div>
          </div>
          </div>
              <div className="d-flex pdf-page-break gap-2">
                    <input
                      type="checkbox"
                      id="fireSafety"
                      name="orientationTopics.fireSafety"
                      checked={trainingData.orientationTopics.fireSafety}
                      onChange={handleTrainingChange}
                    />
                    <label htmlFor="fireSafety" className="form-check-label">
                      Fire Safety and Emergency Preparedness 20
                    </label>
                  </div>
                  <div className="d-flex  gap-2">
                    <input
                      type="checkbox"
                      id="individeal_familyHandbook"
                      name="orientationTopics.individeal_familyHandbook"
                      checked={
                        trainingData.orientationTopics
                          .individeal_familyHandbook
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="individeal_familyHandbook"
                      className="form-check-label"
                    >
                      Individual/Family Handbook
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="understandingTopics"
                      name="orientationTopics.understandingTopics"
                      checked={
                        trainingData.orientationTopics.understandingTopics
                      }
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="understandingTopics"
                      className="form-check-label"
                    >
                      I understand the above topics and received an opportunity
                      to ask questions.
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      id="recieverdCopy"
                      name="orientationTopics.recieverdCopy"
                      checked={trainingData.orientationTopics.recieverdCopy}
                      onChange={handleTrainingChange}
                    />
                    <label
                      htmlFor="recieverdCopy"
                      className="form-check-label"
                    >
                      I received a copy of the Individual/Family Handbook.
                    </label>
                  </div>
                

                <div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Individual/Guardian Signature"
                      name="individualGuardianSignature_train"
                    
                    />
                  </div>
                  <div className="col-md-3">
                    <SignatureCanvas
                      label="Staff/Witness Signature"
                      name="staffWitnessSignature_train"
                    
                    />
                  </div>
                </div>
            

          {/* Transportation Plan Policy and Forms */}
          <div className=" pdf-section pdf-page-break">
            <div className=" mb-4">
              <h3 className="fw-bold text-primary">
                Transportation Plan Policy and Forms
              </h3>
              <p className="text-muted">
                In accordance with 55 PA Code Chapter 6100
              </p>
            </div>
            <div className="mb-4">
              <h4 className="fw-bold text-secondary mb-3">
                Transportation Plan Policy
              </h4>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Purpose:</p>
                <p className="text-secondary">
                  To ensure that individuals receiving services are transported
                  safely and in accordance with their Individual Support Plan
                  (ISP) and the requirements set forth in 55 PA Code Chapter
                  6100.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Policy:</p>
                <p className="text-secondary">
                  The provider agency will ensure that all transportation
                  services are delivered by qualified staff using safe, insured,
                  and approved vehicles. Individual transportation plans will be
                  developed to address support needs, preferences, and safety
                  requirements.
                </p>
              </div>
              <div className="mb-3">
                <p className="fw-bold text-dark mb-2">Procedure:</p>
                <ol className="text-secondary">
                  <li className="mb-2">
                    A transportation plan shall be completed upon intake and
                    reviewed at least annually or with any change in
                    transportation needs.
                  </li>
                  <li className="mb-2">
                    The plan will address destinations, frequency, supervision
                    requirements, mobility supports, and medical concerns
                  </li>
                  <li className="mb-2">
                    Staff providing transportation must have valid driver's
                    licenses, current insurance, and completed transportation
                    safety training.
                  </li>
                  <li className="mb-2">
                    Individuals must be supported in entering/exiting vehicles
                    and using seatbelts, car seats, or adaptive devices as
                    required.
                  </li>
                  <li className="mb-2">
                    All transportation incidents or concerns must be reported
                    and documented immediately per agency protocol.
                  </li>
                  <li className="mb-2">
                    Consent for transportation will be obtained and kept in the
                    individual’s file
                  </li>
                </ol>
              </div>
            </div>

            {/* Transportation Plan Forms */}
            <div className="pdf-section px-4">
              <h4 className="fw-bold text-dark mb-4">
                Transportation Plan Forms
              </h4>
              <h5 className="fw-bold text-secondary mb-3">
                1.Individual Transportation Plan
              </h5>

              <div className=" row g-3  pdf-form-container">
                <div className="col-md-4">
                  <label
                    htmlFor="individualName_trans"
                    className="form-label fw-semibold"
                  >
                    Individual's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="individualName_trans"
                    name="individualName_trans"
                    defaultValue={transportationData.individualName_trans}
                    // onChange={handleTransportationChange}
                        onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="dob_trans"
                    className="form-label fw-semibold"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob_trans"
                    name="dob_trans"
                    defaultValue={transportationData.dob_trans}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="dateOfTransportation"
                    className="form-label fw-semibold"
                  >
                    Date of Transportation
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfTransportation"
                    name="dateOfTransportation"
                    defaultValue={transportationData.dateOfTransportation}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label
                    htmlFor="reviewDate_trans"
                    className="form-label fw-semibold"
                  >
                    Review Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="reviewDate_trans"
                    name="reviewDate_trans"
                    defaultValue={transportationData.reviewDate_trans}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-5">
                  <label
                    htmlFor="mobilityNeeds"
                    className="form-label fw-semibold"
                  >
                    Mobility/Accessibility Needs (e.g., lift, wheelchair,...):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobilityNeeds"
                    name="mobilityNeeds"
                    defaultValue={transportationData.mobilityNeeds}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="transportationProvider"
                    className="form-label fw-semibold"
                  >
                    Primary Transportation Provider
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="transportationProvider"
                    name="transportationProvider"
                    defaultValue={transportationData.transportationProvider}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="vehicleType"
                    className="form-label fw-semibold"
                  >
                    Vehicle Type Used
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vehicleType"
                    name="vehicleType"
                    defaultValue={transportationData.vehicleType}
                    // onChange={handleTransportationChange}
                         onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                  />
                </div>
                       <div className="col-md-4">
                        <label
                          htmlFor="preferredDestinations"
                          className="form-label fw-semibold"
                        >
                          Preferred Destinations:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="preferredDestinations"
                          name="preferredDestinations"
                          defaultValue={transportationData.preferredDestinations}
                          // onChange={handleTransportationChange}
                               onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>

                      <div className="col-md-4">
                        <label
                          htmlFor="typicalScheduleFrequency"
                          className="form-label fw-semibold"
                        >
                          Typical Schedule/Frequency:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="typicalScheduleFrequency"
                          name="typicalScheduleFrequency"
                          defaultValue={transportationData.typicalScheduleFrequency}
                          // onChange={handleTransportationChange}
                               onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                        />
                      </div>
                       </div>
                         </div>
                </div>
                  <div className="pdf-page-break mt-4">
                      <div className=" d-flex mb-4  px-4 flex-column">
                        <p className="fw-semibold">
                          Supervision Level During Transport (select one):
                        </p>
                        <div className="d-flex gap-2">
                          <input
                            type="radio"
                            id="supervisionLevel_independent"
                            name="supervisionLevel"
                            value="Independent"
                            checked={transportationData.supervisionLevel === "Independent"}
                            onChange={handleTransportationChange}
                          />
                          <label
                            htmlFor="supervisionLevel_independent"
                            className="form-check-label"
                          >
                            Independent
                          </label>
                        </div>
                        <div className="d-flex gap-2">
                          <input
                            type="radio"
                            id="supervisionLevel_partial"
                            name="supervisionLevel"
                            value="partial"
                            checked={transportationData.supervisionLevel === "partial"}
                            onChange={handleTransportationChange}
                          />
                          <label
                            htmlFor="supervisionLevel_partial"
                            className="form-check-label"
                          >
                            Partial
                          </label>
                        </div>
                             <div className="d-flex  gap-2">
                    <input
                            type="radio"
                            id="supervisionLevel_full"
                            name="supervisionLevel"
                            value="full"
                            checked={transportationData.supervisionLevel === "full"}
                            onChange={handleTransportationChange}
                          />
                          <label
                            htmlFor="supervisionLevel_full"
                            className="form-check-label"
                          >
                            Full
                          </label>
                        </div>
                        </div>
                      <div>
                        <label
                          htmlFor="medicalConsederation"
                          className="fw-semibold text-secondary"
                        >
                          Medical/Behavioral Considerations During Transport
                          (main 4 points):
                        </label>
                        <textarea
                          className="form-control"
                          id="medicalConsederation"
                          name="medicalConsederation"
                          rows="5"
                          placeholder="List any medical or behavioral considerations here..."
                          defaultValue={transportationData.medicalConsederation}
                          // onChange={handleTransportationChange}
                               onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                        ></textarea>
                      </div>
                    

                    <h5 className="fw-bold text-secondary mt-4 mb-3">
                      2.Transportation Consent Form
                    </h5>
                    <div className="mb-4">
                      <p className="col-md-12">
                        I
                        <input
                          type="text"
                          className="form-control form-styles mt-2 mx-2 d-inline-block"
                    
                          id="individualGuardianName_trans"
                          name="individualGuardianName_trans"
                          defaultValue={transportationData.individualGuardianName_trans}
                          // onChange={handleTransportationChange}
                               onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                        />{" "}
                        (individual/guardian), give permission for
                        <input
                          type="text"
                          className="form-control form-styles mx-2 mt-2 d-inline-block"
                        
                          id="agencyName5"
                          name="agencyName_trans"
                          defautValue={transportationData.agencyName_trans}
                          // onChange={handleTransportationChange}
                               onBlur={
                      (e)=>{
                        setTransportationData({...transportationData, [e.target.name]: e.target.value})
                      }
                    }
                        />{" "}
                        (provider agency) to transport the above-named
                        individual for the purposes of accessing services,
                        appointments, community activities, and other approved
                        destinations.
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="fw-semibold">
                        I understand that all safety procedures will be
                        followed, including seatbelt use and supervision.
                      </p>
                      <div className="row justify-content-start">
                        <div className="col-md-3">
                          <SignatureCanvas
                            label="Individual/Guardian Signature"
                            name="individualGuardianSignature_trans"
                           
                          />
                        </div>
                        <div className="col-md-3">
                          <SignatureCanvas
                            label="Staff/witness Signature"
                            name="staffWitnessSignature_trans"
                       
                          />
                        </div>
                      </div>
                    </div>
                    </div>
                  

                {/* Final Signature & Veriﬁcation Policy andForms */}
                <div className=" pdf-section pdf-page-break">
                  <div className=" mb-4">
                    <h3 className="fw-bold text-primary">
                      Final Signature & Veriﬁcation Policy and Forms
                    </h3>
                    <p className="text-muted">
                      In accordance with 55 PA Code Chapter 6100
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="fw-bold text-secondary mb-3">
                      Final Signature & Veriﬁcation Policy
                    </h4>
                    <div className="mb-3">
                      <p className="fw-bold text-dark mb-2">Purpose:</p>
                      <p className="text-secondary">
                        To ensure that all intake documentation required under
                        55 PA Code Chapter 6100 has been completed, reviewed,
                        and verified by appropriate personnel, and that the
                        individual or legal guardian acknowledges
                        participation in the intake process.
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="fw-bold text-dark mb-2">Policy:</p>
                      <p className="text-secondary">
                        Upon completion of the intake and onboarding process,
                        a final review will be conducted to confirm that all
                        required documents are present and accurate. The
                        Program Specialist will ensure compliance with 6100
                        regulations before services begin.
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="fw-bold text-dark mb-2">Procedure:</p>
                      <ol className="text-secondary">
                        <li className="mb-2">
                          A Final Signature & Verification Checklist shall be
                          completed for each individual file.
                        </li>
                        <li className="mb-2">
                          The checklist must include confirmation of completed
                          forms, consents, assessments, plans, and training
                          acknowledgments.
                        </li>
                        <li className="mb-2">
                          The Program Specialist shall review and sign off on
                          all items prior to service delivery.
                        </li>
                        <li className="mb-2">
                          The individual or guardian will sign to acknowledge
                          their participation and receipt of all required
                          information.
                        </li>
                        <li className="mb-2">
                          All transportation incidents or concerns must be
                          reported and documented immediately per agency
                          protocol.
                        </li>
                        <li className="mb-2">
                          The completed checklist and signatures shall be kept
                          in the individual's permanent file.
                        </li>
                      </ol>
                    </div>
                  </div>

                  {/* Final Signature & Veriﬁcation Forms */}
                  <div className="pdf-section px-4">
                    <h4 className="fw-bold text-dark mb-4">
                      Final Signature & Veriﬁcation Forms
                    </h4>
                    <h5 className="fw-bold text-secondary mb-3">
                      1.Veriﬁcation Checklist
                    </h5>
                    <div className="d-flex flex-column gap-2">
                      {/* --- CHECKBOXES UPDATED --- */}
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="coverSheet"
                          name="verificationChecklist.coverSheet"
                          checked={verificationData.verificationChecklist.coverSheet}
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="coverSheet"
                          className="form-check-label"
                        >
                          Cover Sheet Completed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="demographicContact"
                          name="verificationChecklist.demographicContact"
                          checked={
                            verificationData.verificationChecklist.demographicContact
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="demographicContact"
                          className="form-check-label"
                        >
                          Demographic & Emergency Contact Form Completed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="consentToReceiveServices"
                          name="verificationChecklist.consentToReceiveServices"
                          checked={
                            verificationData.verificationChecklist
                              .consentToReceiveServices
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="consentToReceiveServices"
                          className="form-check-label"
                        >
                          Consent to Receive Services Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="releaseOfInformation"
                          name="verificationChecklist.releaseOfInformation"
                          checked={
                            verificationData.verificationChecklist.releaseOfInformation
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="releaseOfInformation"
                          className="form-check-label"
                        >
                          Release of Information Form Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="hipaaAcknowledgment"
                          name="verificationChecklist.hipaaAcknowledgment"
                          checked={
                            verificationData.verificationChecklist.hipaaAcknowledgment
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="hipaaAcknowledgment"
                          className="form-check-label"
                        >
                          HIPAA Acknowledgment Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="rightsAcknowledgment"
                          name="verificationChecklist.rightsAcknowledgment"
                          checked={
                            verificationData.verificationChecklist.rightsAcknowledgment
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="rightsAcknowledgment"
                          className="form-check-label"
                        >
                          Rights Acknowledgment Form Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="ispFunctionalAssessment"
                          name="verificationChecklist.ispFunctionalAssessment"
                          checked={
                            verificationData.verificationChecklist
                              .ispFunctionalAssessment
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="ispFunctionalAssessment"
                          className="form-check-label"
                        >
                          ISP & Functional Assessment Copies Attached
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="habilitationServicePlan"
                          name="verificationChecklist.habilitationServicePlan"
                          checked={
                            verificationData.verificationChecklist
                              .habilitationServicePlan
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="habilitationServicePlan"
                          className="form-check-label"
                        >
                          Habilitation Service Plan Completed & Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="medicalTreatmentAuthorization"
                          name="verificationChecklist.medicalTreatmentAuthorization"
                          checked={
                            verificationData.verificationChecklist
                              .medicalTreatmentAuthorization
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="medicalTreatmentAuthorization"
                          className="form-check-label"
                        >
                          Emergency Medical Treatment Authorization Attached 24
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="emergencyEvacuationPlan"
                          name="verificationChecklist.emergencyEvacuationPlan"
                          checked={
                            verificationData.verificationChecklist
                              .emergencyEvacuationPlan
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="emergencyEvacuationPlan"
                          className="form-check-label"
                        >
                          Emergency Evacuation Plan Completed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="fireSafetyDrillLog"
                          name="verificationChecklist.fireSafetyDrillLog"
                          checked={
                            verificationData.verificationChecklist.fireSafetyDrillLog
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="fireSafetyDrillLog"
                          className="form-check-label"
                        >
                          Fire Safety/Drill Log Attached
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="behaviorSupportPlan"
                          name="verificationChecklist.behaviorSupportPlan"
                          checked={
                            verificationData.verificationChecklist.behaviorSupportPlan
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="behaviorSupportPlan"
                          className="form-check-label"
                        >
                          Behavior Support Plan or Crisis Plan (if applicable)
                          Attached
                        </label>
                      </div>
                        </div>
                        </div>
                      </div>
                      <div className="px-4 mt-2 mb-3 d-flex flex-column gap-2 pdf-page-break">
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="transportationPlan"
                          name="verificationChecklist.transportationPlan"
                          checked={
                            verificationData.verificationChecklist.transportationPlan
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="transportationPlan"
                          className="form-check-label"
                        >
                          Transportation Plan Completed
                        </label>
                      </div>
                    

                      
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="financialDocumentation"
                          name="verificationChecklist.financialDocumentation"
                          checked={
                            verificationData.verificationChecklist
                              .financialDocumentation
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="financialDocumentation"
                          className="form-check-label"
                        >
                          Financial Documentation Forms Completed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="orientationAcknowledgments"
                          name="verificationChecklist.orientationAcknowledgments"
                          checked={
                            verificationData.verificationChecklist
                              .orientationAcknowledgments
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="orientationAcknowledgments"
                          className="form-check-label"
                        >
                          Orientation Acknowledgments Signed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="preferencesCulturalProfile"
                          name="verificationChecklist.preferencesCulturalProfile"
                          checked={
                            verificationData.verificationChecklist
                              .preferencesCulturalProfile
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="preferencesCulturalProfile"
                          className="form-check-label"
                        >
                          Preferences & Cultural Profile Completed
                        </label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          id="allDocumentsReviewed"
                          name="verificationChecklist.allDocumentsReviewed"
                          checked={
                            verificationData.verificationChecklist.allDocumentsReviewed
                          }
                          onChange={handleVerificationChange}
                        />
                        <label
                          htmlFor="allDocumentsReviewed"
                          className="form-check-label"
                        >
                          All Documents Reviewed by Program Specialist
                        </label>
                      </div>
                   </div>

                    <h5 className="fw-bold text-secondary mb-3">
                      2.Final Signatures
                    </h5>

                    <div className="mb-4">
                      <p className="fw-semibold text-black">
                        I certify that all required intake documentation has
                        been completed and reviewed for accuracy and
                        compliance.
                      </p>
                      <div className="row justify-content-start">
                        <div className="col-md-3">
                          {/* program specialist and individual/guardian signatures */}
                          <SignatureCanvas
                            label="Program Specialist Signature"
                            name="programSpecialistSignature_final"
                           
                          />
                        </div>
                        <div className="col-md-3">
                          <SignatureCanvas
                            label="Individual/Guardian Signature"
                            name="individualGuardianSignature_final" 
                           
                          />
                        </div>
                      </div>
                    </div>
                

                {/* Submit and Download Buttons */}
                <div id="form-buttons" className="text-center mt-5 pdf-section">
               
                  {/* <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary btn-lg px-5 shadow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Consumer Packet"}
                  </button> */}
                </div>
            <div className="d-flex gap-2 w-100 justify-content-center">
              <button onClick={handleDone} className="btn btn-success px-3">Done</button>
              <button onClick={handlePreview} className="btn btn-info px-3" disabled={!isPreviewEnabled}>See Preview
              </button>
            </div>
              </form>

            </div>
          </div>
        );
      };  // --- RENDER ---

     
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
       
           <input
             type="date"
             className="form-control signature-date-input"
             id={`${name}Date`}
             name={`${name}Date`}
             value={signatureDate}
             onChange={handleDateChange}
           />
       
       </div>
     </div>
   );
 };

      export default ConsumerPacket;