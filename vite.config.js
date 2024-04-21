import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const { REACT_APP_BASEPATH } = process.env;

// Export config
export default defineConfig({
  plugins: [react()],
  // Other Vite config options...
  define: {
    // Expose environment variables to your client-side code
    'process.env': {
      REACT_APP_BASEPATH: REACT_APP_BASEPATH,
    },
  },
});