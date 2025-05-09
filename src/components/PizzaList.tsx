import React from 'react';
import { Pizza } from '../types';

interface PizzaListProps {
  pizzas: Pizza[];
}

export const PizzaList: React.FC<PizzaListProps> = ({ pizzas }) => {
  // Group pizzas by source
  const pizzasBySource = pizzas.reduce<Record<string, Pizza[]>>((acc, pizza) => {
    const source = pizza.source || 'Unknown';
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(pizza);
    return acc;
  }, {});

  if (pizzas.length === 0) {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Nessuna pizza trovata con questi criteri.</span>
      </div>
    );
  }

  // If all pizzas are from the same source or no source is specified, show simple list
  if (Object.keys(pizzasBySource).length <= 1 && !pizzasBySource['Unknown']) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pizzas.map((pizza, index) => (
          <div key={index} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div className="card-body p-4">
              <h3 className="card-title text-red-600 text-lg">{pizza.nome}</h3>
              <p className="text-gray-700 text-sm">{pizza.ingredienti}</p>
              {pizza.source && (
                <div className="card-actions justify-end mt-2">
                  <div className="badge badge-outline badge-sm tooltip" data-tip="File source">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {pizza.source}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Otherwise, group by source
  return (
    <div className="space-y-8">
      {Object.entries(pizzasBySource).map(([source, sourcePizzas], index) => (
        <div key={index} className="bg-base-100 rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-bold text-lg">{source}</h3>
            <div className="badge badge-primary badge-sm">{sourcePizzas.length}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sourcePizzas.map((pizza, idx) => (
              <div key={idx} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body p-3">
                  <h4 className="card-title text-red-600 text-base">{pizza.nome}</h4>
                  <p className="text-gray-700 text-sm">{pizza.ingredienti}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
