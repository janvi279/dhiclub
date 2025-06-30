import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { MemberListProvider } from './context/MemberListContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <MemberListProvider>
      <App />
    </MemberListProvider>


  </StrictMode>,
)
