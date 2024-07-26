import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CollectionReference } from 'firebase/firestore'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
})
