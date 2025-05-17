# 🛒 Marketplace API

Backend RESTful construido con **NestJS** y **MongoDB** para una plataforma de venta de productos. Permite registrar usuarios con distintos roles, autenticación con JWT, gestión de productos y filtros avanzados.

---

## 🚀 Tecnologías

- [NestJS](https://nestjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Passport](https://docs.nestjs.com/security/authentication)
- [Swagger (opcional)](https://docs.nestjs.com/openapi/introduction)

---

## 🔐 Roles disponibles

- `admin`: Ver todos los productos, filtrar por vendedor.
- `seller`: Crear productos, ver los suyos.
- `buyer`: Buscar productos por nombre, SKU o precio.

---

## ⚙️ Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/marketplace-api.git
cd marketplace-api

Instala dependencias:

bash
Copiar
Editar
npm install
Crea un archivo .env en la raíz:

ini
Copiar
Editar
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<tu-cluster>.mongodb.net/marketplace
JWT_SECRET=jwt_secret
JWT_REFRESH_SECRET=jwt_secret_refresh
Ejecuta el servidor en desarrollo:

bash
Copiar
Editar
npm run start:dev
🧪 Endpoints principales
Método	Ruta	Rol requerido	Descripción
POST	/users/register	-	Registrar usuario
POST	/users/login	-	Iniciar sesión (JWT)
POST	/users/refresh	Auth	Refrescar token
GET	/products/mine	seller	Ver productos propios
POST	/products	seller	Crear producto
GET	/products	buyer	Buscar productos con filtros
GET	/products/all?sellerId=xxx	admin	Ver todos los productos

📦 Estructura del proyecto
bash
Copiar
Editar
src/
│
├── auth/           # Autenticación, JWT y estrategia
├── users/          # Registro, login y manejo de usuarios
├── products/       # CRUD de productos según rol
├── common/         # Guards, decorators, utils
├── app.module.ts   # Módulo raíz

Variables de entorno
Variable	Descripción
PORT	Puerto en que corre la API
MONGO_URI	URI de conexión a MongoDB Atlas
JWT_SECRET	Secreto para el token de acceso
JWT_REFRESH_SECRET	Secreto para el refresh token

🌐 Despliegue
Puedes desplegarlo fácilmente en:

Railway

Render

🧠 Autor
Desarrollado por Juan Bautista — Full Stack Developer

