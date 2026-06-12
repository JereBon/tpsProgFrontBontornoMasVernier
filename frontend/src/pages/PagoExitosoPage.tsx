import { useEffect, useState } from "react";

const CURSOS_URL = "http://localhost:5173/cursos";

export default function PagoExitosoPage() {
  const [cuenta, setCuenta] = useState(4);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCuenta((c) => {
        if (c <= 1) {
          clearInterval(intervalo);
          window.location.href = CURSOS_URL;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded shadow p-10 max-w-md text-center space-y-4">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-bold text-green-700">¡Pago exitoso!</h2>
        <p className="text-gray-600">Tu compra fue procesada correctamente.</p>
        <p className="text-gray-400 text-sm">Volviendo a cursos en {cuenta} segundos...</p>
        <a href={CURSOS_URL} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition">
          Volver ahora
        </a>
      </div>
    </div>
  );
}
