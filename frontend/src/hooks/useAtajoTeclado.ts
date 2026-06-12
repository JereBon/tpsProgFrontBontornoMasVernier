import { useEffect } from "react";

interface Atajo {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function useAtajoTeclado(atajo: Atajo, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrlOk = atajo.ctrl !== undefined ? e.ctrlKey === atajo.ctrl : true;
      const shiftOk = atajo.shift !== undefined ? e.shiftKey === atajo.shift : true;
      const altOk = atajo.alt !== undefined ? e.altKey === atajo.alt : true;
      if (
        e.key.toLowerCase() === atajo.key.toLowerCase() &&
        ctrlOk &&
        shiftOk &&
        altOk
      ) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [atajo.key, atajo.ctrl, atajo.shift, atajo.alt, callback]);
}
