import { Participante } from "../models/Participante";
import { useParticipantes } from "../context/ParticipantesContext";

const nivelColor: Record<string, string> = {
  Principiante: "text-green-600",
  Intermedio: "text-yellow-600",
  Avanzado: "text-red-600",
};

const nivelBg: Record<string, string> = {
  Principiante: "bg-green-50",
  Intermedio: "bg-yellow-50",
  Avanzado: "bg-red-50",
};

interface Props {
  participante: Participante;
}

export default function ParticipanteCard({ participante: p }: Props) {
  const { eliminar, seleccionarParaEditar } = useParticipantes();
  return (
    <div className={`rounded shadow p-4 hover:shadow-lg transition ${nivelBg[p.nivel]}`}>
      <p className="font-bold text-gray-800">{p.nombre}</p>
      <p className="text-gray-500 text-sm">{p.pais}</p>
      <p className="text-sm mt-2">
        Modalidad: <span className="font-medium">{p.modalidad}</span>
      </p>
      <p className={`text-sm font-medium ${nivelColor[p.nivel]}`}>
        Nivel: {p.nivel}
      </p>
      {p.tecnologias.length > 0 && (
        <p className="text-sm mt-1 text-gray-600">{p.tecnologias.join(", ")}</p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => seleccionarParaEditar(p)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => { if (p.id) eliminar(p.id) }}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
