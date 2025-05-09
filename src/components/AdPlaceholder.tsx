import React from 'react';

interface AdPlaceholderProps {
  width: string | number;
  height: string | number;
  label: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ width, height, label }) => {
  return (
    <div 
      className="ad-placeholder border border-dashed border-gray-300 bg-gray-100 flex justify-center items-center"
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <span className="text-gray-400 text-sm text-center">
        {label}
      </span>
    </div>
  );
};

export default AdPlaceholder;
