import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import axios from "axios";
import { Participante } from "../models/Participante";

interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => void;
  eliminar: (id: number) => void;
  resetear: () => void;
}

export const ParticipantesContext = createContext<ContextType | undefined>(undefined);

const API_URL = "http://localhost:8000/participantes";

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  const fetchParticipantes = async () => {
    try {
      const response = await axios.get(API_URL);
      setParticipantes(response.data);
    } catch (error) {
      console.error("Error al obtener participantes", error);
    }
  };

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const agregar = async (p: Participante) => {
    try {
      const response = await axios.post(API_URL, p);
      setParticipantes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al agregar participante", error);
    }
  };

  const eliminar = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setParticipantes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar participante", error);
    }
  };

  const resetear = () => {
    // Para resetear en la BD podríamos eliminar uno por uno o tener un endpoint
    // Como el requerimiento menciona "resetear", pero no hay endpoint delete all
    // Eliminamos uno por uno para mantener consistencia, o solo en frontend.
    // Lo mejor es hacer un request a delete uno por uno y luego vaciar, o solo vaciar.
    participantes.forEach((p) => {
        if (p.id) {
            axios.delete(`${API_URL}/${p.id}`).catch(err => console.error(err));
        }
    });
    setParticipantes([]);
  };

  return (
    <ParticipantesContext.Provider value={{ participantes, agregar, eliminar, resetear }}>
      {children}
    </ParticipantesContext.Provider>
  );
}

export function useParticipantes() {
  const context = useContext(ParticipantesContext);
  if (!context) {
    throw new Error("useParticipantes debe usarse dentro de un ParticipantesProvider");
  }
  return context;
}
