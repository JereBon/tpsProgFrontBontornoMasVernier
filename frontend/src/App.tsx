// Autores de la Comisión 1: Jeremías Bontorno, Nicolas Hassan, Axel Mejias, Valentino Vernier, Luciano Mas y Leandro Nuñez.
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaPage />} />
        <Route path="/nuevo" element={<FormularioPage />} />
        <Route path="/editar/:id" element={<EditarPage />} />
      </Routes>
    </div>
  );
}
