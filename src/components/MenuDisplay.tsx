import React, { useState } from 'react';
import { Pizza, MenuFile } from '../types';

interface MenuDisplayProps {
  menuFiles: MenuFile[];
}

export const MenuDisplay: React.FC<MenuDisplayProps> = ({ menuFiles }) => {
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>(null);
  const successfulFiles = menuFiles.filter(file => file.status === 'success' && file.pizzas && file.pizzas.length > 0);
  
  if (successfulFiles.length === 0) {
    return (
      <div className="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Nessun menu con pizze trovato. Carica un menu o modifica i criteri di ricerca.</span>
        </div>
      </div>
    );
  }

  const toggleMenu = (fileId: string) => {
    if (expandedMenuId === fileId) {
      setExpandedMenuId(null);
    } else {
      setExpandedMenuId(fileId);
    }
  };

  return (
    <div className="space-y-12 mt-6">
      {successfulFiles.map(file => {
        const isExpanded = expandedMenuId === file.id;
        
        return (
          <div key={file.id} className="menu-container">
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img 
                    src={file.data} 
                    alt={file.file.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{file.file.name}</h3>
                  <div className="badge badge-primary">
                    {file.pizzas?.length} {file.pizzas?.length === 1 ? 'pizza' : 'pizze'}
                  </div>
                </div>
                <p className="text-sm opacity-70">
                  {(file.file.size / 1024).toFixed(1)} KB • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Menu preview with image and pizzas side by side */}
            <div className="rounded-lg border border-base-300 overflow-hidden">
              <div className="bg-base-200 p-3 border-b border-base-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Contenuto Menu</h4>
                  <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => toggleMenu(file.id)}
                  >
                    {isExpanded ? 'Comprimi' : 'Espandi'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                {/* Menu image preview */}
                <div className={`bg-base-200 p-3 md:w-1/3 max-h-96 overflow-hidden flex justify-center items-start`}>
                  <img 
                    src={file.data} 
                    alt={file.file.name} 
                    className="max-w-full max-h-full object-contain rounded shadow"
                    onClick={() => window.open(file.data, '_blank')}
                    style={{ cursor: 'zoom-in' }}
                  />
                </div>
                
                {/* Pizza list */}
                <div className={`p-3 bg-base-100 md:w-2/3 ${isExpanded ? '' : 'max-h-96 overflow-y-auto'}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {file.pizzas?.map((pizza, index) => (
                      <div key={index} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200">
                        <div className="card-body p-3">
                          <h5 className="card-title text-red-600 text-base">{pizza.nome}</h5>
                          <p className="text-gray-700 text-sm italic">{pizza.ingredienti}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
