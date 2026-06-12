# Trabajo Práctico N° 8 - Programación 4

**Integrantes:** Jeremías Bontorno, Valentino Vernier, Luciano Mas

Este proyecto es una aplicación de "Registro de Participantes" dividida en Frontend y Backend. En este TP N° 8, el foco principal fue implementar los hooks **`useRef`**, **`useId`** y **Custom Hooks** para mejorar la experiencia de usuario y reutilizar lógica en el frontend.

1. **Frontend**: Creado con React, TypeScript y Vite. Utiliza la Context API con `useReducer` para el estado global, `react-router-dom` para la navegación multipantalla, `AuthContext` para el manejo de sesión y rutas protegidas por `PrivateRoute`.
2. **Backend**: Creado con FastAPI y Python. Utiliza SQLite como base de datos local y SQLModel como ORM. Implementa autenticación mediante **JWT**, hashing de contraseñas con `bcrypt` y protección de endpoints por token y rol.

## Novedades del TP N° 8

### Parte 1 — `useRef`
- **Foco automático en el formulario**: al ingresar a la pantalla de nuevo participante o editar, el cursor se posiciona automáticamente en el campo **Nombre**.
- **Atajo de teclado `Ctrl+B`**: desde la lista de participantes, presionar `Ctrl+B` mueve el foco directamente al input de búsqueda en la sección de filtros.

### Parte 2 — `useId`
- Todos los campos del formulario (inputs, selects, radio buttons y checkboxes) ahora tienen **IDs únicos y accesibles** generados por `useId`, vinculados con su `<label>` mediante `htmlFor`.
- Los filtros de la lista también tienen sus labels correctamente asociados.
- Esto mejora la accesibilidad y permite que al hacer click en un label se active su campo correspondiente.

### Parte 3 — Custom Hooks
- **`useFiltros`** (`src/hooks/useFiltros.ts`): encapsula el estado de los filtros y la lógica de filtrado. Reemplaza el `useState` y el `.filter()` que estaban duplicados en `ListaPage`.
- **`useAtajoTeclado`** (`src/hooks/useAtajoTeclado.ts`): hook genérico reutilizable que registra atajos de teclado. Recibe `{ key, ctrl?, shift?, alt? }` y un callback. Usado para implementar el `Ctrl+B`.

---

## Usuarios de prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `admin123` | ADMIN |
| `consulta` | `consulta123` | CONSULTA |

---

## Estructura del Proyecto

```
tp8BontornoMasVernier/
├── frontend/
│   └── src/
│       ├── hooks/           ← Custom Hooks (useFiltros, useAtajoTeclado)
│       ├── components/      ← Formulario, Filtros, Navbar, ParticipanteCard
│       ├── context/         ← AuthContext, ParticipantesContext
│       ├── pages/           ← LoginPage, ListaPage, FormularioPage, EditarPage, ...
│       ├── reducers/        ← participantesReducer
│       ├── routes/          ← PrivateRoute
│       └── models/          ← Participante
└── backend/
    └── main.py              ← API REST con FastAPI + JWT
```

---

## Instrucciones para Ejecutar el Proyecto

Necesitás dos terminales abiertas simultáneamente.

### 1. Iniciar el Backend (FastAPI)

1. Abrí una terminal y dirigite a la carpeta `backend`:
   ```bash
   cd tp8BontornoMasVernier/backend
   ```
2. Creá y activá un entorno virtual:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Instalá las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Ejecutá el servidor:
   ```bash
   uvicorn main:app --reload
   ```

> El servidor estará corriendo en `http://localhost:8000`. La primera vez se crea automáticamente `database.db` con los usuarios y participantes de prueba.

### 2. Iniciar el Frontend (React)

1. Abrí una nueva terminal y dirigite a la carpeta `frontend`:
   ```bash
   cd tp8BontornoMasVernier/frontend
   ```
2. Instalá los paquetes:
   ```bash
   npm install
   ```
3. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```

> El frontend estará disponible en `http://localhost:5173`.

---

## Inspeccionar la Base de Datos

Los datos se guardan en `backend/database.db`. Para visualizarlos recomendamos la extensión **SQLite Viewer** de Florian Klampfer en Visual Studio Code.
