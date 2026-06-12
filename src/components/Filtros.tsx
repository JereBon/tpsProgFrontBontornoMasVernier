interface FiltrosState {
  buscar: string;
  modalidad: string;
  nivel: string;
}

interface Props {
  filtros: FiltrosState;
  setFiltros: (f: FiltrosState) => void;
  onLimpiar: () => void;
  onResetear: () => void;
}

const MODALIDADES = ["Todas", "Presencial", "Virtual", "Híbrido"];
const NIVELES = ["Todos", "Principiante", "Intermedio", "Avanzado"];

export default function Filtros({ filtros, setFiltros, onLimpiar, onResetear }: Props) {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Buscar"
          value={filtros.buscar}
          onChange={(e) => setFiltros({ ...filtros, buscar: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
        />
        <select
          value={filtros.modalidad}
          onChange={(e) => setFiltros({ ...filtros, modalidad: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
        >
          {MODALIDADES.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select
          value={filtros.nivel}
          onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
        >
          {NIVELES.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onLimpiar}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition"
        >
          Limpiar filtros
        </button>
        <button
          onClick={onResetear}
          className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200 transition"
        >
          Resetear datos
        </button>
      </div>
    </div>
  );
}

export type { FiltrosState };
