import { useState, useEffect } from "react";

interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
  aceptaTerminos: boolean;
}

const TECNOLOGIAS = ["React", "Angular", "Vue", "Node", "Python", "Java"];
const PAISES = ["Argentina", "Chile", "Uruguay", "México", "España"];
const NIVELES = ["Principiante", "Intermedio", "Avanzado"];
const MODALIDADES = ["Presencial", "Virtual", "Híbrido"];

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

const initialForm = {
  nombre: "",
  email: "",
  edad: "",
  pais: "Argentina",
  modalidad: "Presencial",
  tecnologias: [] as string[],
  nivel: "Principiante",
  aceptaTerminos: false,
};

export default function App() {
  const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const stored = localStorage.getItem("participantes");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState(initialForm);
  const [buscar, setBuscar] = useState("");
  const [filtroModalidad, setFiltroModalidad] = useState("Todas");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);

  const handleTecnologia = (tec: string) => {
    setForm((prev) => ({
      ...prev,
      tecnologias: prev.tecnologias.includes(tec)
        ? prev.tecnologias.filter((t) => t !== tec)
        : [...prev.tecnologias, tec],
    }));
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.email || !form.edad) {
      setError("Por favor completá nombre, email y edad.");
      return;
    }
    if (!form.aceptaTerminos) {
      setError("Debés aceptar los términos y condiciones.");
      return;
    }
    setError("");
    const nuevo: Participante = {
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
      edad: Number(form.edad),
      pais: form.pais,
      modalidad: form.modalidad,
      tecnologias: form.tecnologias,
      nivel: form.nivel,
      aceptaTerminos: form.aceptaTerminos,
    };
    setParticipantes((prev) => [...prev, nuevo]);
    setForm(initialForm);
  };

  const eliminar = (id: number) => {
    setParticipantes((prev) => prev.filter((p) => p.id !== id));
  };

  const filtrados = participantes.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(buscar.toLowerCase());
    const matchModalidad =
      filtroModalidad === "Todas" || p.modalidad === filtroModalidad;
    const matchNivel = filtroNivel === "Todos" || p.nivel === filtroNivel;
    return matchNombre && matchModalidad && matchNivel;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Registro de Participantes</h1>
          <p className="text-green-100 text-sm mt-1">
            Participantes registrados: {participantes.length}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Formulario */}
        <div className="bg-white rounded shadow p-6">
          {error && (
            <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nombre: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Edad */}
            <div>
              <input
                type="number"
                placeholder="Edad"
                value={form.edad}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, edad: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>

            {/* País */}
            <div>
              <select
                value={form.pais}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, pais: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              >
                {PAISES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Modalidad */}
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-green-700 mb-1">
                Modalidad
              </p>
              <div className="flex gap-4">
                {MODALIDADES.map((m) => (
                  <label key={m} className="flex items-center gap-1 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="modalidad"
                      value={m}
                      checked={form.modalidad === m}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, modalidad: m }))
                      }
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            {/* Tecnologías */}
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-green-700 mb-1">
                Tecnologías
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TECNOLOGIAS.map((tec) => (
                  <label key={tec} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.tecnologias.includes(tec)}
                      onChange={() => handleTecnologia(tec)}
                    />
                    {tec}
                  </label>
                ))}
              </div>
            </div>

            {/* Nivel */}
            <div>
              <select
                value={form.nivel}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nivel: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              >
                {NIVELES.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Acepta términos */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terminos"
                checked={form.aceptaTerminos}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    aceptaTerminos: e.target.checked,
                  }))
                }
              />
              <label htmlFor="terminos" className="text-sm cursor-pointer">
                Acepto los términos y condiciones del evento
              </label>
            </div>
          </div>

          {/* Botón */}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-semibold"
            >
              Registrar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Buscar"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
            <select
              value={filtroModalidad}
              onChange={(e) => setFiltroModalidad(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            >
              <option value="Todas">Todas</option>
              {MODALIDADES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            >
              <option value="Todos">Todos</option>
              {NIVELES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de participantes */}
        {filtrados.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">
            No hay participantes registrados.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((p) => (
              <div
                key={p.id}
                className={`rounded shadow p-4 hover:shadow-lg transition ${nivelBg[p.nivel]}`}
              >
                <p className="font-bold text-gray-800">{p.nombre}</p>
                <p className="text-gray-500 text-sm">{p.pais}</p>
                <p className="text-sm mt-2">
                  Modalidad: <span className="font-medium">{p.modalidad}</span>
                </p>
                <p className={`text-sm font-medium ${nivelColor[p.nivel]}`}>
                  Nivel: {p.nivel}
                </p>
                {p.tecnologias.length > 0 && (
                  <p className="text-sm mt-1 text-gray-600">
                    {p.tecnologias.join(", ")}
                  </p>
                )}
                <button
                  onClick={() => eliminar(p.id)}
                  className="mt-3 bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
