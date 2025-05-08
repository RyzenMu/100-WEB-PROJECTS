import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginForm from './LoginForm.jsx'
import WelcomeAndLogout from './WelcomeAndLogout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <LoginForm/>
    <WelcomeAndLogout/>
  </StrictMode>,
)
