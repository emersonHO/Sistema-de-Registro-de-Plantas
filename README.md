# 🌿 Sistema de Registro de Hierbas

**Proyecto tipo Hackatón** - Sistema completo de registro y gestión de hierbas medicinales, aromáticas y culinarias.

## 📋 Descripción

Sistema web desarrollado con arquitectura frontend-backend que permite:

- **Registro y autenticación de usuarios** (con login tradicional y acceso rápido por email)
- **Registro completo de hierbas** con información detallada (propiedades, usos, precauciones, etc.)
- **Listado y búsqueda** de hierbas con filtros por categoría y usuario
- **Gestión personalizada** donde cada usuario puede ver y administrar sus hierbas registradas

## 🏗️ Arquitectura

- **Frontend:** React.js con Bootstrap y React Router
- **Backend:** Spring Boot con WebFlux (programación reactiva)
- **Base de datos:** MySQL con R2DBC
- **Comunicación:** API REST con axios

## 🎯 Funcionalidades Implementadas

### ✅ Autenticación
- [x] Registro de nuevos usuarios
- [x] Login con email/contraseña
- [x] Login rápido solo con email
- [x] Gestión de sesiones con localStorage

### ✅ Gestión de Hierbas
- [x] Registro de hierbas con información completa
- [x] Listado de todas las hierbas
- [x] Búsqueda por nombre, nombre científico o descripción
- [x] Filtros por categoría (Medicinal, Aromática, Culinaria, etc.)
- [x] Filtro para ver solo las hierbas propias
- [x] Eliminación de hierbas (solo el creador)
- [x] Vista detallada en modal

### ✅ Interfaz de Usuario
- [x] Diseño responsivo y moderno
- [x] Navegación intuitiva
- [x] Feedback visual (loading, alertas, confirmaciones)
- [x] Categorización con colores distintivos

## 🚀 Instrucciones de Instalación

### Prerrequisitos

- **Java 21** o superior
- **Maven 3.8+**
- **Node.js 16+** y npm
- **MySQL 8.0+**

### 1. Configurar la Base de Datos

```bash
# Conectar a MySQL como root
mysql -u root -p

# Ejecutar el script de configuración
source /ruta/al/proyecto/registro-plantas/database-setup.sql
```

### 2. Configurar y Ejecutar el Backend

```bash
# Navegar al directorio del backend
cd registro-plantas

# Verificar configuración en src/main/resources/application.yml
# Ajustar credenciales de MySQL si es necesario

# Ejecutar la aplicación
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3. Configurar y Ejecutar el Frontend

```bash
# Navegar al directorio del frontend
cd hierbas-frontend

# Instalar dependencias
npm install

# Ejecutar la aplicación
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 🧪 Usuarios de Prueba

El sistema incluye usuarios de prueba preconfigurados:

| Email | Contraseña | Rol |
|-------|------------|-----|
| `admin@hierbas.com` | `admin123` | Administrador |
| `usuario@test.com` | `test123` | Usuario regular |
| `botanico@universidad.edu` | `botanico123` | Botánico |

## 📊 Datos de Ejemplo

El sistema se inicializa con hierbas de ejemplo en diferentes categorías:

- **Medicinales:** Manzanilla, Aloe Vera
- **Aromáticas:** Lavanda
- **Culinarias:** Albahaca, Romero
- **Ornamentales:** Caléndula
- **Silvestres:** Diente de León, Ortiga Mayor

## 🔧 Testing

### Backend - Pruebas Unitarias

```bash
cd registro-plantas
./mvnw test
```

### Frontend - Pruebas de Componentes

```bash
cd hierbas-frontend
npm test
```

### Pruebas Manuales de API

```bash
# Test de conectividad del backend
curl http://localhost:8080/api/usuarios/test

# Test de listado de hierbas
curl http://localhost:8080/api/hierbas/test
```

## 📚 Documentación de API

### Endpoints de Usuarios

- `POST /api/usuarios/registro` - Registrar nuevo usuario
- `POST /api/usuarios/login` - Login con email/contraseña
- `POST /api/usuarios/login-email?email={email}` - Login rápido
- `GET /api/usuarios/test` - Test de conectividad

### Endpoints de Hierbas

- `GET /api/hierbas` - Listar todas las hierbas
- `POST /api/hierbas` - Registrar nueva hierba
- `GET /api/hierbas/buscar?nombre={nombre}` - Buscar por nombre
- `GET /api/hierbas/categoria/{categoria}` - Filtrar por categoría
- `GET /api/hierbas/usuario/{usuarioId}` - Hierbas de un usuario
- `DELETE /api/hierbas/{id}` - Eliminar hierba
- `GET /api/hierbas/test` - Test de conectividad

## 🗂️ Estructura del Proyecto

```
proyecto-hierbas/
├── registro-plantas/           # Backend Spring Boot
│   ├── src/main/java/
│   │   └── com/plantas/registro_plantas/
│   │       ├── controller/     # Controladores REST
│   │       ├── service/        # Lógica de negocio
│   │       ├── repository/     # Repositorios R2DBC
│   │       ├── model/          # Entidades
│   │       ├── dto/            # DTOs
│   │       └── config/         # Configuración
│   ├── src/main/resources/
│   │   ├── application.yml     # Configuración de la aplicación
│   │   └── schema.sql         # Script de base de datos
│   └── database-setup.sql     # Setup completo de BD
├── hierbas-frontend/          # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Servicios API
│   │   └── App.js            # Componente principal
│   └── package.json
└── README.md
```

## 🎨 Características Técnicas

### Backend (Spring WebFlux)
- **Programación Reactiva** con Mono y Flux
- **R2DBC** para acceso reactivo a base de datos
- **CORS configurado** para comunicación con frontend
- **Validación de datos** en DTOs
- **Logging estructurado** para debugging

### Frontend (React)
- **Hooks modernos** (useState, useEffect)
- **React Router** para navegación SPA
- **Bootstrap React** para UI responsiva
- **Axios** para comunicación HTTP
- **LocalStorage** para persistencia de sesión

### Base de Datos (MySQL)
- **Diseño normalizado** con relaciones FK
- **Índices optimizados** para búsquedas
- **Datos de ejemplo** realistas
- **Constraints** para integridad de datos

## 🚀 Despliegue

### Local
Seguir las instrucciones de instalación arriba.

### Producción (Ejemplo con Docker)

```dockerfile
# Dockerfile para backend
FROM openjdk:21-jdk-slim
COPY target/registro-plantas-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Dockerfile para frontend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 Criterios de Evaluación Cumplidos

- ✅ **Funcionalidad desarrollada (3 pts):** Login, registro de hierbas, listado con filtros
- ✅ **Calidad de interfaz (1 pt):** UI moderna con Bootstrap, diseño responsivo
- ✅ **Conexión front-backend (1 pt):** API REST completamente funcional
- ✅ **Control de versiones (1 pt):** Proyecto en Git con commits organizados
- ✅ **Documentación técnica (1 pt):** README completo con instrucciones
- ✅ **Pruebas implementadas (1 pt):** Tests unitarios del backend

## 👨‍💻 Desarrollo

### Siguientes Pasos Posibles
- [ ] Implementar autenticación JWT
- [ ] Agregar carga de imágenes de hierbas
- [ ] Sistema de favoritos
- [ ] Exportación a PDF/Excel
- [ ] Notificaciones push
- [ ] Integración con APIs de plantas

### Problemas Conocidos
- Las contraseñas se almacenan en texto plano (para demo, en producción usar bcrypt)
- No hay paginación en el listado (implementar si hay muchos registros)

## 📞 Soporte

Para soporte o preguntas sobre la implementación, revisar:
1. Los logs del backend en la consola
2. Los logs del frontend en DevTools del navegador
3. La conectividad de la base de datos
4. Las configuraciones en `application.yml`

## 📄 Licencia

Proyecto educativo desarrollado para evaluación académica.

---

**Tiempo de desarrollo:** 4 horas (formato hackatón)  
**Tecnologías:** React + Spring WebFlux + MySQL  
**Estado:** ✅ Funcional y listo para demo