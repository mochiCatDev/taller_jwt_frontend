# Taller Frontend: Registro y JWT en React

Aplicación web desarrollada en **React** con enrutamiento dinámico y consumo de servicios REST protegidos con autenticación JWT, siguiendo los lineamientos del taller de KrakeDev.

## Características del Proyecto
- **Pantalla de Login (`/login`)**: Autenticación de usuarios existentes con manejo de tokens y almacenamiento en `localStorage`.
- **Pantalla de Registro (`/registrar`)**: Formulario interactivo con selector de roles (`USER`, `ADMIN`) conectado al endpoint `POST /auth/registrar` del backend.
- **Rutas Protegidas (`/perfil`)**: Componentes de navegación protegidos que validan la sesión activa del usuario.
- **Diseño Moderno & Responsive**: Interfaz adaptada con modo oscuro, centrada y optimizada para dispositivos móviles.

---

## Enlaces Relacionados
- **Backend (Spring Boot)**: https://github.com/mochiCatDev/taller_jwt_backend

---

## Tecnologías Utilizadas
- React
- React Router DOM
- CSS Custom Properties
- Fetch API para consumo de servicios REST
