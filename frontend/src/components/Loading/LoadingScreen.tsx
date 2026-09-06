import React from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading JurisDesk Chamber Docket..." }: LoadingScreenProps) {
  return (
    <div className="juris-loader-overlay">
      <div className="juris-loader-card">
        {/* Glowing Animated Brand Icon */}
        <div className="juris-loader-icon-wrapper">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
            <path d="M7 21h10"/>
            <path d="M12 3v18"/>
            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
          </svg>
        </div>

        {/* Application Branding */}
        <div className="juris-loader-titles">
          <h2 className="juris-loader-brand">JurisDesk</h2>
          <span className="juris-loader-edition">Chamber Edition</span>
        </div>

        {/* Modern Shimmer Progress Bar */}
        <div className="juris-progress-bar-track">
          <div className="juris-progress-bar-fill"></div>
        </div>

        {/* Dynamic Status Text */}
        <p className="juris-loader-status">{message}</p>
      </div>
    </div>
  );
}