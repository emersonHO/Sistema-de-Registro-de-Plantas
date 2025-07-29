-- Script de configuración de la base de datos para el Sistema de Registro de Hierbas
-- Ejecutar como usuario root de MySQL

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS hierbas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario dedicado (opcional, usar si se quiere un usuario específico)
-- CREATE USER IF NOT EXISTS 'hierbas_user'@'localhost' IDENTIFIED BY 'hierbas_password';
-- GRANT ALL PRIVILEGES ON hierbas_db.* TO 'hierbas_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Usar la base de datos
USE hierbas_db;

-- Tabla de usuarios
DROP TABLE IF EXISTS hierbas;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    
    INDEX idx_usuarios_email (email),
    INDEX idx_usuarios_activo (activo)
) ENGINE=InnoDB;

-- Tabla de hierbas
CREATE TABLE hierbas (
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
    
    INDEX idx_hierbas_nombre (nombre),
    INDEX idx_hierbas_categoria (categoria),
    INDEX idx_hierbas_usuario (usuario_id),
    INDEX idx_hierbas_fecha (fecha_registro),
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insertar datos de ejemplo
INSERT INTO usuarios (email, password, nombre, apellido, fecha_registro, activo) VALUES
('admin@hierbas.com', 'admin123', 'Admin', 'Sistema', NOW(), TRUE),
('usuario@test.com', 'test123', 'Usuario', 'Prueba', NOW(), TRUE),
('botanico@universidad.edu', 'botanico123', 'Dr. Carlos', 'Verdinez', NOW(), TRUE);

INSERT INTO hierbas (nombre, nombre_cientifico, descripcion, propiedades_medicinales, habitat_natural, forma_uso, precauciones, categoria, origen, fecha_registro, usuario_id) VALUES
-- Hierbas medicinales
('Manzanilla', 'Chamaemelum nobile', 'Planta herbácea aromática con flores blancas y amarillas, pétalos delgados y centro amarillo. Las hojas son pequeñas y divididas.', 'Antiinflamatoria, relajante, digestiva, antiespasmódica, cicatrizante', 'Praderas y campos abiertos de Europa, prefiere suelos bien drenados y sol directo', 'Infusión de flores secas (1-2 cucharaditas por taza), compresas tibias para la piel', 'No usar en embarazo temprano. Puede causar reacciones alérgicas en personas sensibles a la familia Asteraceae', 'Medicinal', 'Europa', NOW(), 1),

('Lavanda', 'Lavandula angustifolia', 'Arbusto aromático perenne con flores violetas en espigas largas. Las hojas son estrechas, grisáceas y muy fragantes.', 'Relajante, antiséptica, aromática, cicatrizante, antidepresiva leve', 'Regiones mediterráneas secas y soleadas, suelos calcáreos y bien drenados', 'Aceite esencial (2-3 gotas), infusión, sachets aromáticos, baños relajantes', 'Puede causar somnolencia. Evitar uso interno del aceite esencial puro', 'Aromática', 'Mediterráneo', NOW(), 1),

('Aloe Vera', 'Aloe barbadensis', 'Planta suculenta con hojas carnosas, gruesas y espinosas en los bordes. El gel interno es transparente y mucilaginoso.', 'Cicatrizante, hidratante, antiinflamatoria, antibacteriana, regeneradora', 'Zonas áridas y semiáridas, tolera sequía pero no heladas', 'Gel directo sobre la piel, cremas, lociones. Solo la pulpa interna', 'No ingerir el látex amarillo (aloína). Puede causar irritación en pieles muy sensibles', 'Medicinal', 'África del Norte', NOW(), 2),

-- Hierbas culinarias
('Albahaca', 'Ocimum basilicum', 'Hierba anual con hojas ovaladas, brillantes y muy aromáticas. Las flores son pequeñas y blancas o rosadas.', 'Digestiva, antioxidante, antibacteriana, antiinflamatoria', 'Regiones tropicales y subtropicales, requiere calor y humedad', 'Hojas frescas en ensaladas, salsas, pestos. Infusión digestiva', 'Evitar durante el embarazo en grandes cantidades', 'Culinaria', 'Asia tropical', NOW(), 2),

('Romero', 'Rosmarinus officinalis', 'Arbusto perenne con hojas aciculares, coriáceas y muy aromáticas. Flores pequeñas azules o violetas.', 'Estimulante, antioxidante, antimicrobiana, mejora la concentración', 'Regiones mediterráneas, suelos secos y pedregosos, pleno sol', 'Condimento en carnes, infusión estimulante, aceite esencial para masajes', 'No usar aceite esencial durante el embarazo. Puede elevar la presión arterial', 'Culinaria', 'Mediterráneo', NOW(), 3),

-- Hierbas ornamentales
('Caléndula', 'Calendula officinalis', 'Planta anual con flores grandes, naranjas o amarillas, muy vistosas. Las hojas son oblongas y algo pegajosas.', 'Cicatrizante, antiinflamatoria, antimicrobiana, emoliente', 'Adaptable a diferentes climas, prefiere sol directo y suelos bien drenados', 'Infusión para lavados, cremas, aceites macerados, compresas', 'Generalmente segura. Evitar en caso de alergia a la familia Asteraceae', 'Ornamental', 'Sur de Europa', NOW(), 3),

-- Hierbas silvestres
('Diente de León', 'Taraxacum officinale', 'Hierba perenne con hojas profundamente dentadas y flores amarillas. Todas las partes contienen látex blanco.', 'Diurética, depurativa, digestiva, rica en vitaminas y minerales', 'Praderas, jardines, bordes de caminos, muy resistente y adaptable', 'Hojas tiernas en ensaladas, raíz en decocción, flores en vino medicinal', 'Puede potenciar medicamentos diuréticos. Evitar en obstrucción de vías biliares', 'Silvestre', 'Hemisferio Norte', NOW(), 1),

('Ortiga Mayor', 'Urtica dioica', 'Planta perenne con hojas dentadas cubiertas de pelos urticantes. Flores pequeñas verdosas en racimos.', 'Rica en hierro, diurética, antiinflamatoria, nutritiva, depurativa', 'Suelos ricos en nitrógeno, cerca de zonas habitadas, prefiere humedad', 'Hojas cocidas como verdura, infusión (hojas secas), sopas nutritivas', 'Las hojas frescas causan urticaria. Usar guantes para recolectar', 'Silvestre', 'Europa y Asia', NOW(), 2);

-- Mostrar resumen de datos insertados
SELECT 'USUARIOS CREADOS:' as TIPO, COUNT(*) as CANTIDAD FROM usuarios
UNION ALL
SELECT 'HIERBAS REGISTRADAS:' as TIPO, COUNT(*) as CANTIDAD FROM hierbas;

-- Mostrar distribución por categorías
SELECT categoria, COUNT(*) as cantidad 
FROM hierbas 
GROUP BY categoria 
ORDER BY cantidad DESC;