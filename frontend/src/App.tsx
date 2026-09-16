import './App.css'
import { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import LoadingScreen from './components/Loading/LoadingScreen'
import { Toaster } from 'sonner'


function App() {
  return (
    <>
    <Suspense fallback={<LoadingScreen message="Securing Chamber Archives..." />}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
    </Suspense>
    <Toaster richColors position="top-right" closeButton />
    </>
  )
}

export default App
