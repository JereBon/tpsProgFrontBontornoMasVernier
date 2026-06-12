import { useState } from "react";
import { Participante } from "../models/Participante";

export interface FiltrosState {
  buscar: string;
  modalidad: string;
  nivel: string;
}

const estadoInicial: FiltrosState = {
  buscar: "",
  modalidad: "Todas",
  nivel: "Todos",
};

export function useFiltros(participantes: Participante[]) {
  const [filtros, setFiltros] = useState<FiltrosState>(estadoInicial);

  const limpiarFiltros = () => setFiltros(estadoInicial);

  const filtrados = participantes.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(filtros.buscar.toLowerCase());
    const matchModalidad = filtros.modalidad === "Todas" || p.modalidad === filtros.modalidad;
    const matchNivel = filtros.nivel === "Todos" || p.nivel === filtros.nivel;
    return matchNombre && matchModalidad && matchNivel;
  });

  return { filtros, setFiltros, limpiarFiltros, filtrados };
}
