# TP1 - Gestion de Usuarios (Full Stack)
Catedra: Programacion 4 - UTN
Entorno: Node.js + MySQL + JavaScript Vanilla (Nativo)

Este proyecto es una aplicacion integral que permite la gestion de usuarios mediante una API REST y un frontend dinamico. Incluye funcionalidades de autenticacion, busqueda con filtros LIKE y administracion de estados (Bloqueo/Desbloqueo).

---

## 1. Requisitos e Instalacion del Entorno

### Node.js y npm (Motor de ejecucion)
* Windows: Descarga el instalador LTS desde nodejs.org y sigue los pasos.
* Linux: Ejecuta 'sudo apt update && sudo apt install nodejs npm'.
* Verificacion: Ejecuta 'node -v' y 'npm -v' en tu terminal.

### MySQL Server y Workbench (Base de Datos)
* Windows (Recomendado): Instala XAMPP desde apachefriends.org y activa el modulo MySQL. Luego instala MySQL Workbench desde dev.mysql.com.
* Linux: Ejecuta 'sudo apt install mysql-server mysql-workbench'.

---

## 2. Configuracion de la Base de Datos

### Paso A: Abrir la terminal de MySQL
* Windows (XAMPP): En el Panel de XAMPP, haz clic en el boton "Shell" y escribe: 'mysql -u root -p'.
* Linux: Abre una terminal y escribe: 'sudo mysql -u root'.

### Paso B: Arreglar permisos de acceso (IMPORTANTE)
Si recibes el error "Access denied", ejecuta estos comandos dentro de la terminal de MySQL para definir una contraseña clara:

1. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
2. FLUSH PRIVILEGES;
3. exit;

### Paso C: Cargar el Script
1. Abre MySQL Workbench y conectate usando el usuario 'root' y la clave 'admin123'.
2. Ve a File > Open SQL Script y selecciona 'script_db.sql'.
3. Ejecuta el icono del rayo para crear la base 'utn_db' y las tablas.

---

## 3. Ajuste de Credenciales en el Codigo

Abre el archivo 'server.js' y asegurate de que la conexion coincida con lo configurado arriba:

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123', 
    database: 'utn_db'
});

---

## 4. Puesta en Marcha

1. Instalar librerias: Abre una terminal en la carpeta del proyecto y ejecuta:
   npm install

2. Iniciar el Backend:
   node server.js

3. Ejecutar el Frontend:
   Haz doble clic en 'login.html' para abrirlo en el navegador.

---

## 5. Documentacion y Pruebas

* API Interactiva (Swagger): http://localhost:8080/api-docs
* Usuario de prueba: mjmartinez | Password: 123456 (Estado: Activo)
* Usuario de prueba: mfsilvestre | Password: 123456 (Estado: Bloqueado)

---

## Estructura de Archivos
* server.js: Servidor y Endpoints.
* login.html / lista.html: Frontend Nativo.
* script_db.sql: Base de datos.
* package.json: Dependencias del sistema.

Desarrollado para la catedra de Programacion 4 - UTN.
