-- Crear base de datos
CREATE DATABASE IF NOT EXISTS hierbas_db;
USE hierbas_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de hierbas
CREATE TABLE IF NOT EXISTS hierbas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_cientifico VARCHAR(255),
    descripcion TEXT,
    propiedades_medicinales TEXT,
    habitat_natural TEXT,
    forma_uso TEXT,
    precauciones TEXT,
    categoria VARCHAR(100),
    origen VARCHAR(255),
    fecha_registro DATETIME NOT NULL,
    usuario_id BIGINT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Índices para mejorar performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_hierbas_nombre ON hierbas(nombre);
CREATE INDEX idx_hierbas_categoria ON hierbas(categoria);
CREATE INDEX idx_hierbas_usuario ON hierbas(usuario_id);

-- Datos de ejemplo
INSERT INTO usuarios (email, password, nombre, apellido, fecha_registro, activo) VALUES
('admin@hierbas.com', 'admin123', 'Admin', 'Sistema', NOW(), TRUE),
('usuario@test.com', 'test123', 'Usuario', 'Prueba', NOW(), TRUE);

INSERT INTO hierbas (nombre, nombre_cientifico, descripcion, propiedades_medicinales, habitat_natural, forma_uso, precauciones, categoria, origen, fecha_registro, usuario_id) VALUES
('Manzanilla', 'Chamaemelum nobile', 'Planta herbácea aromática con flores blancas y amarillas', 'Antiinflamatoria, relajante, digestiva', 'Praderas y campos abiertos de Europa', 'Infusión de flores secas', 'No usar en embarazo temprano', 'Medicinal', 'Europa', NOW(), 1),
('Lavanda', 'Lavandula angustifolia', 'Planta aromática con flores violetas en espigas', 'Relajante, antiséptica, aromática', 'Regiones mediterráneas secas y soleadas', 'Aceite esencial, infusión, sachets aromáticos', 'Puede causar somnolencia', 'Aromática', 'Mediterráneo', NOW(), 1),
('Aloe Vera', 'Aloe barbadensis', 'Planta suculenta con hojas carnosas y gel interno', 'Cicatrizante, hidratante, antiinflamatoria', 'Zonas áridas y semiáridas', 'Gel directo sobre la piel', 'No ingerir el látex amarillo', 'Medicinal', 'África', NOW(), 2);