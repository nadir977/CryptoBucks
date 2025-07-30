import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CryptoProvider } from './context/CryptoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoProvider>
    <App />
    </CryptoProvider>
  </StrictMode>,
)
