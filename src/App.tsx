import React, { useState, useCallback } from 'react';
import { PizzaList } from './components/PizzaList';
import { SearchForm } from './components/SearchForm';
import { ImageUpload } from './components/ImageUpload';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FileProgressList } from './components/FileProgressList';
import { UploadedFilesInfo } from './components/UploadedFilesInfo';
import { MenuDisplay } from './components/MenuDisplay';
import Logo from './assets/Logo';
import { Pizza, MenuFile, ApiResponse } from './types';

function App() {
  const [ingredientSearch, setIngredientSearch] = useState<string>('');
  const [menuFiles, setMenuFiles] = useState<MenuFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pizzaResults, setPizzaResults] = useState<Pizza[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleFileUpload = (files: File[]) => {
    // Create a unique timestamp for this batch to ensure they get unique IDs 
    // even if multiple files are added in the same millisecond
    const timestamp = Date.now();
    
    const newFiles = files.map((file, index) => {
      return {
        id: `file-${timestamp}-${index}-${Math.random().toString(36).substring(2, 9)}`,
        file: file,
        data: '',
        status: 'pending' as const,
        progress: 0,
        pizzas: []
      };
    });

    setMenuFiles(prevFiles => [...prevFiles, ...newFiles]);
    setHasSearched(true); // Ensure results are displayed

    // Process files sequentially for better performance
    processFilesSequentially(newFiles);
  };
  
  const processFilesSequentially = async (files: MenuFile[]) => {
    for (const file of files) {
      await processFile(file);
    }
  };

  const processFile = async (fileObj: MenuFile) => {
    // Update status to uploading
    updateFileStatus(fileObj.id, 'uploading', 0);

    try {
      // Read file as data URL
      const fileData = await readFileAsDataURL(fileObj.file);
      
      // Update file with data
      updateFileData(fileObj.id, fileData);
      
      // Process through API
      await uploadFileToApi(fileObj.id, fileData);
      
    } catch (err) {
      console.error('Error processing file:', err);
      updateFileStatus(fileObj.id, 'error', 100, (err as Error).message);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result as string;
        resolve(result);
      };
      
      reader.onerror = (error) => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const updateFileStatus = (fileId: string, status: MenuFile['status'], progress: number, error?: string) => {
    setMenuFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, status, progress, error } 
          : file
      )
    );
  };

  const updateFileData = (fileId: string, data: string) => {
    setMenuFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, data } 
          : file
      )
    );
  };

  const updateFilePizzas = (fileId: string, pizzas: Pizza[]) => {
    // Add source metadata to each pizza
    const currentFile = menuFiles.find(file => file.id === fileId);
    const fileName = currentFile?.file.name || 'Unknown';
    const pizzasWithSource = pizzas.map(pizza => ({
      ...pizza,
      source: fileName
    }));
    
    // Update the specified file with its pizzas
    setMenuFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, pizzas: pizzasWithSource } 
          : file
      )
    );
    
    // Update the combined pizza results for search functionality
    // We only use this for non-file searches
    if (menuFiles.length === 0) {
      setPizzaResults(pizzasWithSource);
    } else {
      // For file uploads, we don't need to update the combined results
      // since we're showing pizzas by file source in the MenuDisplay component
    }
  };

  const uploadFileToApi = async (fileId: string, fileData: string) => {
    try {
      // Mock progress updates (since fetch doesn't support progress)
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          updateFileStatus(fileId, 'uploading', progress);
        } else {
          clearInterval(progressInterval);
        }
      }, 300);

      const response = await fetch('https://n8n-gilda.lesbass.com/webhook/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: ingredientSearch,
          file: fileData
        })
      });
      
      clearInterval(progressInterval);
      
      const data: ApiResponse = await response.json();
      
      if (response.ok && data.pizze) {
        updateFileStatus(fileId, 'success', 100);
        updateFilePizzas(fileId, data.pizze);
        setHasSearched(true);
      } else {
        const errorMessage = data.errore || 'Si è verificato un errore durante la ricerca';
        updateFileStatus(fileId, 'error', 100, errorMessage);
      }
    } catch (err) {
      updateFileStatus(fileId, 'error', 100, 'Errore di connessione al server');
      console.error('API upload error:', err);
    }
  };

  const handleSearch = async () => {
    // Clear previous results
    setPizzaResults([]);
    setError(null);
    setHasSearched(true);
    
    if (menuFiles.length === 0) {
      // If no files, perform a simple ingredient search
      setIsLoading(true);
      
      try {
        const response = await fetch('https://n8n-gilda.lesbass.com/webhook/menus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ingredients: ingredientSearch
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setPizzaResults(data.pizze || []);
        } else {
          setError(data.errore || 'Si è verificato un errore durante la ricerca');
        }
      } catch (err) {
        setError('Errore di connessione al server');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // If files exist, process each file again with the new search criteria
      menuFiles.forEach(file => {
        if (file.data) {
          uploadFileToApi(file.id, file.data);
        }
      });
    }
  };
  
  const removeFile = (fileId: string) => {
    setMenuFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    
    // Recalculate pizza results when a file is removed
    setMenuFiles(prevFiles => {
      const remainingFiles = prevFiles.filter(file => file.id !== fileId);
      
      // Gather all pizzas from remaining files
      const allPizzas = remainingFiles.flatMap(file => file.pizzas || []);
      
      // Remove duplicates
      const uniquePizzas = allPizzas.filter((pizza, index, self) => 
        index === self.findIndex(p => 
          p.nome === pizza.nome && p.ingredienti === pizza.ingredienti
        )
      );
      
      setPizzaResults(uniquePizzas);
      
      return remainingFiles;
    });
  };

  const hasActiveUploads = menuFiles.some(file => file.status === 'uploading');

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-white min-h-screen shadow-lg">
      {isLoading && <LoadingSpinner />}
      
      <header className="mb-8">
        <div className="logo">
          <Logo />
        </div>
      </header>
      
      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <section className="mb-6">
          <SearchForm 
            ingredientSearch={ingredientSearch} 
            setIngredientSearch={setIngredientSearch} 
            onSearch={handleSearch}
            onReset={() => {
              setPizzaResults([]);
              setHasSearched(false);
              setError(null);
            }}
            disabled={hasActiveUploads}
          />
        </section>
        
        <section>
          <ImageUpload 
            onFileUpload={handleFileUpload}
            disabled={hasActiveUploads}
          />
        </section>
        
        {menuFiles.length > 0 && (
          <section className="mt-8">
            <FileProgressList 
              files={menuFiles}
              onRemoveFile={removeFile}
            />
          </section>
        )}
      </div>
      
      {error && (
        <div className="alert alert-error mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      )}
      
      {hasSearched && (
        <section className="results-container">
          {menuFiles.length > 0 && (
            <>
              <UploadedFilesInfo files={menuFiles} />
              <div className="divider">Menu Caricati</div>
              <MenuDisplay menuFiles={menuFiles} />
            </>
          )}
          
          {pizzaResults.length > 0 && menuFiles.length === 0 ? (
            <>
              <h2 className="text-2xl font-bold italic mb-6">Ecco i risultati e... buon appetito!</h2>
              <PizzaList pizzas={pizzaResults} />
            </>
          ) : pizzaResults.length === 0 && menuFiles.length === 0 && (
            <h2 className="text-2xl font-bold italic mt-8 text-center">Nessuna pizza trovata 🥲</h2>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
