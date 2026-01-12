import React from 'react'
import "../css/signatureCanvas.css";
import { useEffect, useRef, useState } from "react";
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

export default SignatureCanvas
