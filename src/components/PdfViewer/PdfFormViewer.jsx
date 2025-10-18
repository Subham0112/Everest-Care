// import React, { useEffect, useRef, useState } from "react";
// import WebViewer from "@pdftron/webviewer";

// const PdfFormViewer = ({ file }) => {
//   const viewerDiv = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let instance = null;
    
//     WebViewer(
//       {
//         path: "/webviewer/lib",
//         initialDoc: file,
//       },
//       viewerDiv.current
//     )
//       .then((webViewerInstance) => {
//         instance = webViewerInstance;
//         console.log("WebViewer loaded successfully");
//       })
//       .catch((err) => {
//         console.error("WebViewer error:", err);
//         setError(err.message);
//       });

//     return () => {
//       if (instance) {
//         // Cleanup if needed
//       }
//     };
//   }, [file]);

//   if (error) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h3>Error loading PDF viewer</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="webviewer"
//       ref={viewerDiv}
//       style={{ height: "100vh", width: "100%" }}
//     ></div>
//   );
// };

// export default PdfFormViewer;
