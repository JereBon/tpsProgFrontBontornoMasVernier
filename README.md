# Trabajo Práctico N° 4 - Programación 4

Este proyecto consiste en una aplicación de "Registro de Participantes" dividida en dos partes:
1. **Frontend**: Creado con React, TypeScript y Vite. Utiliza la Context API (`useContext`) para el manejo global del estado y se comunica con el backend mediante `axios`.
2. **Backend**: Creado con FastAPI y Python. Utiliza SQLite como base de datos local y SQLModel (ORM) para la gestión y validación de datos.

## Estructura del Proyecto

- `/frontend`: Código fuente de la interfaz de usuario en React.
- `/backend`: Código fuente de la API REST en FastAPI.

---

## Instrucciones para Ejecutar el Proyecto

Para hacer funcionar la aplicación en tu entorno local, necesitas levantar tanto el servidor Backend como el servidor Frontend de manera simultánea en dos terminales distintas.

### 1. Iniciar el Backend (FastAPI)

1. Abre una terminal y dirígete a la carpeta `backend`:
   ```bash
   cd TP4/backend
   ```
2. Instala las dependencias necesarias (si es la primera vez que lo ejecutas):
   ```bash
   pip install -r requirements.txt
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   uvicorn main:app --reload
   ```
> El servidor estará corriendo en `http://localhost:8000`. Además, la primera vez que inicies el servidor se creará automáticamente el archivo `database.db` que aloja la base de datos de SQLite.

### 2. Iniciar el Frontend (React)

1. Abre una nueva terminal y dirígete a la carpeta `frontend`:
   ```bash
   cd TP4/frontend
   ```
2. Instala los paquetes de Node:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
> El servidor te indicará en qué URL local está corriendo el proyecto (por lo general, `http://localhost:5173`). ¡Abre ese enlace en tu navegador para usar la aplicación!

---

## 💾 Inspeccionar la Base de Datos

Los participantes se guardan de forma persistente en el archivo `database.db` (dentro de `/backend`). Para ver el contenido de las tablas directamente desde tu editor sin usar código, recomendamos la siguiente extensión para **Visual Studio Code**:

1. Ve a la sección de **Extensiones** en VS Code.
2. Busca e instala la extensión **"SQLite Viewer"** (autor: *Florian Klampfer*).
3. Una vez instalada, simplemente haz clic sobre el archivo `backend/database.db` desde tu explorador de archivos en VS Code. Se abrirá una pestaña interactiva donde podrás explorar las tablas, filas y columnas de manera visual.
