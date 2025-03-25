import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoadingPage from './pages/loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingPage />
  </StrictMode>,
)
