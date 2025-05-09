import React from 'react';

interface SearchFormProps {
  ingredientSearch: string;
  setIngredientSearch: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  onReset?: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ 
  ingredientSearch, 
  setIngredientSearch, 
  onSearch,
  disabled = false,
  onReset
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSearch();
    }
  };

  const handleClear = () => {
    setIngredientSearch('');
    if (onReset) onReset();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Che ingredienti desideri?</h3>
      <div className="join w-full">
        <input
          type="text"
          placeholder="Quali ingredienti desideri che contenga la pizza?"
          value={ingredientSearch}
          onChange={(e) => setIngredientSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered join-item w-full"
          disabled={disabled}
        />
        <button 
          onClick={onSearch} 
          className="btn join-item bg-red-600 hover:bg-red-700 text-white"
          disabled={disabled}
        >
          CERCA
        </button>
        {ingredientSearch && (
          <button 
            onClick={handleClear} 
            className="btn join-item btn-outline"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
