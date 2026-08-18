import React from 'react';

export default function BlueprintGrid({ isDark = false, className = "" }) {
  const strokeColor = isDark ? "rgba(255, 255, 255, 0.08)" : "#E0E0E0";
  const id = isDark ? "blueprint-dark-grid" : "blueprint-light-grid";

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
