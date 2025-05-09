import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  onFileUpload: (files: File[]) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onFileUpload, disabled = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Convert FileList to Array
      const fileArray = Array.from(files);
      onFileUpload(fileArray);
      
      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length > 0) {
        onFileUpload(imageFiles);
      }
    }
  };

  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-semibold mb-3">Carica i menu delle pizzerie</h3>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors 
          ${isDragging ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="menu-upload"
          multiple
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-3">
          <div className="rounded-full bg-primary/10 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-base">
              {isDragging 
                ? 'Rilascia per caricare' 
                : disabled 
                  ? 'Caricamento in corso...' 
                  : 'Trascina qui i file o clicca per selezionare'}
            </p>
            <p className="text-sm text-gray-500 mt-1">File supportati: JPG, PNG, GIF</p>
            <p className="text-sm text-primary mt-4 font-medium">Puoi caricare più file contemporaneamente</p>
          </div>
        </div>
      </div>
    </div>
  );
};
