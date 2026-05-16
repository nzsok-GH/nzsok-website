import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'

const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Admission = lazy(() => import('./pages/Admission'))
const Gallery   = lazy(() => import('./pages/Gallery'))

function ScrollRestore() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollRestore />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/media" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
