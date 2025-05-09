export interface Pizza {
  nome: string;
  ingredienti: string;
  source?: string; // Track which file the pizza came from
}

export interface MenuFile {
  id: string;
  file: File;
  data: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  pizzas?: Pizza[];
}

export interface ApiResponse {
  pizze?: Pizza[];
  errore?: string;
}