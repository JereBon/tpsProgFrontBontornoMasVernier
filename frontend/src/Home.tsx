import { useState } from "react";
import Formulario from "./components/Formulario";
import Filtros, { type FiltrosState } from "./components/Filtros";
import ParticipanteCard from "./components/ParticipanteCard";
import { useParticipantes } from "./context/ParticipantesContext";

export default function Home() {
  const { participantes } = useParticipantes();

  const [filtros, setFiltros] = useState<FiltrosState>({
    buscar: "",
    modalidad: "Todas",
    nivel: "Todos",
  });

  const handleLimpiarFiltros = () => {
    setFiltros({ buscar: "", modalidad: "Todas", nivel: "Todos" });
  };

  const filtrados = participantes.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(filtros.buscar.toLowerCase());
    const matchModalidad = filtros.modalidad === "Todas" || p.modalidad === filtros.modalidad;
    const matchNivel = filtros.nivel === "Todos" || p.nivel === filtros.nivel;
    return matchNombre && matchModalidad && matchNivel;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Registro de Participantes</h1>
          <p className="text-green-100 text-sm mt-1">
            Mostrando {filtrados.length} de {participantes.length} participantes
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Formulario */}
        <Formulario />

        {/* Filtros */}
        <Filtros
          filtros={filtros}
          setFiltros={setFiltros}
          onLimpiar={handleLimpiarFiltros}
        />

        {/* Lista de participantes */}
        {filtrados.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">
            No hay participantes
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((p) => (
              <ParticipanteCard key={p.id} participante={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
