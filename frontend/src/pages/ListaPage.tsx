import { useRef } from "react";
import { Link } from "react-router-dom";
import Filtros from "../components/Filtros";
import ParticipanteCard from "../components/ParticipanteCard";
import { useParticipantes } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";
import { useFiltros } from "../hooks/useFiltros";
import { useAtajoTeclado } from "../hooks/useAtajoTeclado";

export default function ListaPage() {
  const { participantes } = useParticipantes();
  const { user } = useAuth();

  const { filtros, setFiltros, limpiarFiltros, filtrados } = useFiltros(participantes);

  const buscarRef = useRef<HTMLInputElement>(null);

  useAtajoTeclado({ key: "b", ctrl: true }, () => {
    buscarRef.current?.focus();
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded shadow">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lista de Participantes</h2>
          <p className="text-gray-500 text-sm mt-1">
            Mostrando {filtrados.length} de {participantes.length} participantes
          </p>
        </div>
        {user?.rol === "ADMIN" && (
          <div className="mt-4 md:mt-0">
            <Link
              to="/nuevo"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              + Agregar Participante
            </Link>
          </div>
        )}
      </div>

      <Filtros
        filtros={filtros}
        setFiltros={setFiltros}
        onLimpiar={limpiarFiltros}
        buscarRef={buscarRef}
      />

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

      <p className="text-xs text-gray-400 text-center pb-2">
        Presioná{" "}
        <kbd className="bg-gray-100 border border-gray-300 rounded px-1 py-0.5 font-mono text-xs">
          Ctrl+B
        </kbd>{" "}
        para enfocar el filtro de búsqueda
      </p>
    </div>
  );
}
