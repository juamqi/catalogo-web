import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CatalogoProductos from './catalogo'
import NotFound from "./NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/catalogo" element={<CatalogoProductos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

