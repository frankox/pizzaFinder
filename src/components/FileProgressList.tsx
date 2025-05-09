import React from 'react';
import { MenuFile } from '../types';

interface FileProgressListProps {
  files: MenuFile[];
  onRemoveFile: (fileId: string) => void;
}

export const FileProgressList: React.FC<FileProgressListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">File caricati ({files.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((file) => (
          <div key={file.id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body p-4">
              <div className="flex items-start gap-3">
                {file.data && (
                  <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-base-300">
                    <img 
                      src={file.data} 
                      alt={file.file.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm truncate" title={file.file.name}>
                        {file.file.name}
                      </h4>
                      <p className="text-xs opacity-70 mt-0.5">
                        {(file.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    
                    {file.status !== 'uploading' && (
                      <button 
                        className="btn btn-sm btn-circle btn-ghost" 
                        onClick={() => onRemoveFile(file.id)}
                        aria-label="Remove file"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  <div className="w-full mt-3">
                    {file.status === 'uploading' && (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Caricamento...</span>
                          <span className="text-xs font-medium">{file.progress}%</span>
                        </div>
                        <progress 
                          className="progress progress-primary w-full h-2" 
                          value={file.progress} 
                          max="100"
                        ></progress>
                      </>
                    )}
                    
                    {file.status === 'success' && (
                      <div className="flex items-center gap-2 text-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs">
                          {file.pizzas?.length || 0} {file.pizzas?.length === 1 ? 'pizza trovata' : 'pizze trovate'}
                        </span>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="text-error">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-xs font-medium">Errore</span>
                        </div>
                        {file.error && (
                          <p className="text-xs mt-1">{file.error}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
