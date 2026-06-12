import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  icono: string;
}

const CURSOS: Curso[] = [
  { id: 1, titulo: "Curso React", descripcion: "Construí interfaces modernas con React, hooks y estado global.", precio: 25000, icono: "⚛️" },
  { id: 2, titulo: "Curso Python", descripcion: "Fundamentos de Python, scripting y manejo de datos.", precio: 20000, icono: "🐍" },
  { id: 3, titulo: "Curso DBA", descripcion: "Administración de bases de datos relacionales y optimización de queries.", precio: 40000, icono: "🗄️" },
  { id: 4, titulo: "Curso Node.js", descripcion: "Desarrollo backend con Node.js, Express y APIs REST.", precio: 30000, icono: "🟢" },
  { id: 5, titulo: "Curso Vue.js", descripcion: "Desarrollo frontend reactivo con Vue 3 y Composition API.", precio: 22000, icono: "💚" },
  { id: 6, titulo: "Curso Docker & DevOps", descripcion: "Contenedores, CI/CD y despliegue moderno de aplicaciones.", precio: 45000, icono: "🐳" },
];

const API_URL = "http://localhost:8000/crear-preferencia";

function getAuthHeaders() {
  const stored = localStorage.getItem("auth_user");
  const user = stored ? JSON.parse(stored) : null;
  return user ? { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

const BANNERS: Record<string, { msg: string; cls: string }> = {
  approved: { msg: "✅ ¡Pago aprobado! Tu inscripción fue registrada.", cls: "bg-green-100 text-green-800 border border-green-300" },
  pending:  { msg: "⏳ Pago pendiente. Te avisaremos cuando se acredite.", cls: "bg-yellow-100 text-yellow-800 border border-yellow-300" },
  failure:  { msg: "❌ El pago fue rechazado. Intentá con otro medio.", cls: "bg-red-100 text-red-800 border border-red-300" },
};

export default function CursosPage() {
  const { user } = useAuth();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const pagoStatus = searchParams.get("pago");
  const banner = pagoStatus ? BANNERS[pagoStatus] ?? null : null;

  const handlePagar = async (curso: Curso) => {
    setLoadingId(curso.id);
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ titulo: curso.titulo, precio: curso.precio }),
      });
      if (!response.ok) throw new Error("Error al crear la preferencia de pago");
      const data = await response.json();
      window.location.href = data.init_point;
    } catch (err) {
      setError("No se pudo conectar con Mercado Pago. Verificá que el backend esté corriendo.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800">Catálogo de Cursos</h2>
        <p className="text-gray-500 text-sm mt-1">
          Hola, <span className="font-semibold">{user?.username}</span>. Elegí el curso que querés tomar.
        </p>
      </div>

      {banner && (
        <div className={`px-4 py-3 rounded text-sm ${banner.cls}`}>
          {banner.msg}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CURSOS.map((curso) => (
          <div key={curso.id} className="bg-white rounded shadow p-5 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="text-4xl mb-3">{curso.icono}</div>
              <h3 className="text-lg font-bold text-gray-800">{curso.titulo}</h3>
              <p className="text-gray-500 text-sm mt-1">{curso.descripcion}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-700 font-bold text-xl">
                ${curso.precio.toLocaleString("es-AR")}
              </span>
              <button
                onClick={() => handlePagar(curso)}
                disabled={loadingId === curso.id}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-4 py-2 rounded transition text-sm"
              >
                {loadingId === curso.id ? "Redirigiendo..." : "QUIERO ESTE CURSO"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
