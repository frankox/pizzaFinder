# Pizza Finder

A React TypeScript application that helps users find pizzas based on ingredients and by uploading multiple menu images. The application supports multiple file uploads, processes each file sequentially, and displays pizzas grouped by their source menu.

## Features

- Search for pizzas by ingredients
- Upload multiple menu images via drag-and-drop or file selection
- Sequential processing of uploaded files with progress tracking
- Display pizzas grouped by source menu
- Responsive design with daisyUI components
- Real-time upload progress indicators
- Combined results view with source attribution
- Detailed statistics about uploaded files and found pizzas

## Multi-File Management

The application provides a comprehensive multi-file upload and management system:

1. **Upload Multiple Files**: Users can upload multiple menu images either sequentially or at once through the drag-and-drop interface
2. **Sequential Processing**: Each file is processed one at a time to maintain compatibility with the backend
3. **Progress Tracking**: Real-time progress indicators show the status of each file upload and processing
4. **Source Attribution**: All pizzas are labeled with their source file for easy identification
5. **Combined Results**: Results from all files are combined for search functionality while maintaining file-specific grouping
6. **Expandable Menu Views**: Users can expand or collapse individual menu views to focus on specific results

## Project Structure

The application is built with React and TypeScript, following a component-based architecture:

- `App.tsx` - Main application component with multi-file handling logic
- `types.ts` - TypeScript interfaces and types for multi-file support
- `components/` - Reusable UI components
  - `SearchForm.tsx` - Input form for ingredient search with reset functionality
  - `ImageUpload.tsx` - Drag-and-drop component for uploading multiple menu images
  - `FileProgressList.tsx` - Display upload progress for each file with thumbnails
  - `MenuDisplay.tsx` - Component for displaying menus with their corresponding pizzas
  - `PizzaList.tsx` - Display of pizza search results with source grouping
  - `LoadingSpinner.tsx` - Loading indicator for global operations
  - `UploadedFilesInfo.tsx` - Summary statistics of upload results
- `assets/` - Logos and static assets

## API Integration

The application connects to a backend service via the following API endpoint:

```
https://n8n-gilda.lesbass.com/webhook/menus
```

While the backend only supports single file uploads at a time, the application handles multiple files by making sequential API calls and managing the combined results.

## Setup and Running the App

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## How to Use

1. Enter ingredients to search for in the search field, or leave empty to see all pizzas
2. Upload menu images by dragging them to the upload area or clicking to select files
3. Monitor upload progress in the file list section
4. View results grouped by menu source
5. Click on menu images to see them in full size
6. Expand or collapse individual menu results to focus on specific menus

## Technology Stack

- React
- TypeScript
- daisyUI and Tailwind CSS for styling
- Fetch API for backend communication
