import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">ParticipantesApp</Link>
        </h1>
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-green-200 transition font-semibold">
            Lista
          </Link>
          <Link to="/nuevo" className="hover:text-green-200 transition font-semibold">
            Nuevo Participante
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-green-700 px-6 py-4 space-y-2">
          <Link
            to="/"
            className="block text-white hover:text-green-200 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Lista
          </Link>
          <Link
            to="/nuevo"
            className="block text-white hover:text-green-200 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Nuevo Participante
          </Link>
        </div>
      )}
    </nav>
  );
}
