-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS turismo;

-- Crear la base de datos
CREATE DATABASE turismo;

-- Usar la base de datos
USE turismo;

-- Crear la tabla contacto
CREATE TABLE contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo_electronico VARCHAR(100),
    pais VARCHAR(50),
    telefono VARCHAR(20),
    asunto VARCHAR(100),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consultar todos los registros de la tabla contacto
SELECT * FROM contacto;
