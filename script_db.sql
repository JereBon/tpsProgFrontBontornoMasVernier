CREATE DATABASE IF NOT EXISTS utn_db;
USE utn_db;

CREATE TABLE IF NOT EXISTS usuarios_utn (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    clave VARCHAR(20) NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    bloqueado CHAR(1) DEFAULT 'N'
);


INSERT INTO usuarios_utn (usuario, clave, nombre, apellido, bloqueado) VALUES 
('rcsiri', '123456', 'Rocio Cecilia', 'SIRI', 'N'),
('mjmartinez', '123456', 'M. J.', 'MARTINEZ', 'N'),
('mfsilvestre', '123456', 'MARIA FLORENCIA', 'SILVESTRE', 'Y');
