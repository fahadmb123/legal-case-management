import './App.css'
import { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'



function App() {
  return (
    <>
    <Suspense fallback={<h1>Loadingingggggg.........**************</h1>}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
    </Suspense>
    </>
  )
}

export default App
