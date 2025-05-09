import React from 'react';
import { MenuFile } from '../types';

interface UploadedFilesInfoProps {
  files: MenuFile[];
}

export const UploadedFilesInfo: React.FC<UploadedFilesInfoProps> = ({ files }) => {
  // Count successful uploads and total pizzas found
  const successfulFiles = files.filter(file => file.status === 'success').length;
  const totalPizzasFound = files.reduce((total, file) => total + (file.pizzas?.length || 0), 0);
  const errorFiles = files.filter(file => file.status === 'error').length;
  const processingFiles = files.filter(file => file.status === 'pending' || file.status === 'uploading').length;
  
  if (files.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg mb-4">Risultati della ricerca</h3>
      
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-title">File elaborati</div>
          <div className="stat-value text-primary">{successfulFiles}/{files.length}</div>
          {errorFiles > 0 && (
            <div className="stat-desc text-error">{errorFiles} con errori</div>
          )}
          {processingFiles > 0 && (
            <div className="stat-desc text-warning">{processingFiles} in elaborazione</div>
          )}
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title">Pizze trovate</div>
          <div className="stat-value text-secondary">{totalPizzasFound}</div>
          {successfulFiles > 0 && (
            <div className="stat-desc">
              {(totalPizzasFound / successfulFiles).toFixed(1)} pizze per file
            </div>
          )}
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="stat-title">Completamento</div>
          <div className="stat-value text-accent">{Math.round((successfulFiles / files.length) * 100)}%</div>
        </div>
      </div>
    </div>
  );
};