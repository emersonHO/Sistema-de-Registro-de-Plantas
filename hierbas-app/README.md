# Hierbas App

Una aplicación web para gestionar tu colección de hierbas medicinales de manera fácil y organizada.

## Características

### 🔐 Sistema de Autenticación Mejorado
- **Modal de Login/Registro**: Se muestra automáticamente en cada visita a la página
- **Información del Usuario**: Muestra el nombre del usuario en la esquina superior derecha
- **Cerrar Sesión**: Botón de logout accesible desde el header
- **Persistencia de Sesión**: Mantiene la sesión activa entre recargas

### 🎨 Experiencia de Usuario Mejorada
- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y efectos visuales
- **Responsive Design**: Se adapta a diferentes tamaños de pantalla
- **Animaciones Suaves**: Transiciones y efectos hover para mejor interactividad
- **Feedback Visual**: Mensajes de éxito y error claramente diferenciados
- **Loading States**: Indicadores de carga para mejor UX

### 📝 Gestión de Hierbas
- **Formulario Mejorado**: Campos organizados en grid para mejor visualización
- **Lista de Hierbas**: Diseño de tarjetas con información bien estructurada
- **Edición Inline**: Editar hierbas directamente en la lista
- **Eliminación Segura**: Confirmación antes de eliminar
- **Estado Vacío**: Mensaje amigable cuando no hay hierbas registradas

## Tecnologías Utilizadas

- **React 19**: Framework principal
- **React Router**: Navegación
- **Context API**: Gestión de estado de autenticación
- **Axios**: Cliente HTTP para API
- **CSS-in-JS**: Estilos inline para mejor mantenimiento

## Estructura del Proyecto

```
src/
├── components/
│   ├── AuthModal.jsx      # Modal de autenticación
│   ├── Header.jsx         # Header con información del usuario
│   ├── WelcomePage.jsx    # Página de bienvenida
│   ├── HierbaForm.jsx     # Formulario de hierbas
│   └── HierbaList.jsx     # Lista de hierbas
├── contexts/
│   └── AuthContext.jsx    # Contexto de autenticación
├── pages/
│   └── Dashboard.jsx      # Página principal
├── services/
│   ├── AuthService.js     # Servicios de autenticación
│   └── HierbaService.js   # Servicios de hierbas
└── App.jsx               # Componente principal
```

## Funcionalidades Principales

### Autenticación
- Login y registro con email y contraseña
- Persistencia de sesión en localStorage
- Modal que aparece automáticamente para usuarios no autenticados
- Header con información del usuario y botón de logout

### Gestión de Hierbas
- Agregar nuevas hierbas con nombre, uso, origen y propiedades
- Ver lista de hierbas en formato de tarjetas
- Editar hierbas existentes
- Eliminar hierbas con confirmación

### UX/UI
- Diseño responsive y moderno
- Gradientes y efectos visuales atractivos
- Feedback visual para todas las acciones
- Estados de carga y error bien definidos
- Animaciones suaves y transiciones

## Instalación y Uso

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm start
```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Notas Técnicas

- La aplicación requiere un backend que proporcione endpoints para autenticación y gestión de hierbas
- Los tokens de autenticación se almacenan en localStorage
- La información del usuario se extrae del email (parte antes del @)
- El diseño utiliza CSS-in-JS para mejor mantenimiento y encapsulación

## Mejoras Futuras

- [ ] Implementar búsqueda y filtros de hierbas
- [ ] Agregar categorías y tags
- [ ] Subir imágenes de hierbas
- [ ] Exportar/importar datos
- [ ] Modo oscuro
- [ ] Notificaciones push
