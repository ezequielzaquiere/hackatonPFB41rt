# ⚙️ HackVerse - Backend

Este es el **backend de HackVerse**, una API REST desarrollada con Node.js y Express para gestionar hackathones y usuarios.

## ✨ Características

✅ API RESTful desarrollada con **Express.js**  
✅ Base de datos relacional con **MySQL**  
✅ Autenticación segura con **JWT (JSON Web Tokens)**  
✅ Gestión de archivos con **Express File Upload**  
✅ Validaciones de datos con **Joi**  
✅ Cifrado de contraseñas con **Bcrypt**  
✅ Registro de actividad con **Morgan**  
✅ Configuración mediante variables de entorno con **Dotenv**  
✅ Soporte para CORS para conexión con el frontend  
✅ Sistema de envío de correos con **Nodemailer**

## 🚀 Tecnologías Utilizadas

| Tecnología                   | Descripción                                       |
| ---------------------------- | ------------------------------------------------- |
| **Node.js** + **Express.js** | Framework para el servidor                        |
| **MySQL**                    | Base de datos relacional                          |
| **JWT (jsonwebtoken)**       | Autenticación segura                              |
| **Joi**                      | Validación de datos                               |
| **Bcrypt**                   | Encriptación de contraseñas                       |
| **Cors**                     | Seguridad para manejar solicitudes entre dominios |
| **Morgan**                   | Registro de peticiones HTTP                       |
| **Dotenv**                   | Manejo de variables de entorno                    |
| **Nodemailer**               | Envío de correos electrónicos                     |
| **Express-fileupload**       | Manejo de archivos                                |
| **Sharp**                    | Procesamiento de imágenes                         |
| **Fs-extra**                 | Extensiones para trabajar con archivos            |
| **Nodemon**                  | Recarga automática en cambios                     |

## 📂 Estructura del Proyecto

```plaintext
📦 server/
│── 📂 src/
│   ├── 📂 controllers/   # Lógica de negocio
│   ├── 📂 routes/        # Rutas de la API
│   ├── 📂 models/        # Modelos de base de datos
│   ├── 📂 middlewares/   # Middleware para validaciones, seguridad, etc.
│   ├── 📂 db/            # Base de datos
│   ├── 📂 utils/         # Funciones auxiliares
│   ├── 📜 index.js       # Punto de entrada del servidor
│── 📜 .env.example       # Variables de entorno (ejemplo)
│── 📜 package.json       # Dependencias y scripts
│── 📜 README.md          # Documentación del backend

```

## 🛠️ Instalación y Configuración

### 1️⃣ Movernos a la carpeta server

```bash
cd hackatonPFB41rt/server
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar las variables de entorno

Crea un archivo .env basado en .env.example y completa los valores:

```ini
# 🔧 Configuración del Servidor
PORT=4000  # Puerto en el que correrá el backend

# 🛢️ Configuración de la Base de Datos MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=tu_contraseña
MYSQL_DB=hackverse

# 🔐 Seguridad
SECRET=tu_secreto_jwt  # Clave secreta para JWT

# 📂 Configuración de Archivos
UPLOADS_DIR=uploads  # Directorio donde se almacenan los archivos subidos

# 🌍 Configuración de CORS (URL del frontend)
CLIENT_URL=http://localhost:5173

# 📧 Configuración de Email (SMTP)
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=tu_email
SMTP_PASS=tu_contraseña

# 🔑 Contraseña del Administrador
ADMIN_PASS=contraseña_admin
```

### 4️⃣ Inicializar la base de datos

Antes de ejecutar el servidor, debes crear la estructura de la base de datos y llenarla con datos iniciales.

#### 🔹 Crear la estructura de la base de datos

```bash
npm run initdb
```

#### 🔹 Poblar la base de datos con datos iniciales

```bash
npm run populate-tables
```

#### 5️⃣ Ejecutar el servidor (con recarga automática)

```bash
npm run dev
```

## 📂 Archivos de Prueba

Para facilitar las pruebas, el proyecto incluye una estructura de carpetas con imágenes de ejemplo.

```plaintext
📂 uploads.example
 ┣ 📂 imgHack   # Contiene imágenes de hackathones de prueba
```

### Uso de la Carpeta uploads.example

- uploads.example es una carpeta que contiene archivos de prueba y no debe subirse a producción.

- Si necesitas usar estas imágenes localmente, renómbrala a uploads para que el backend pueda acceder a ellas correctamente.

## 🔐 Seguridad y Buenas Prácticas

- **JWT**: Se usa autenticación con tokens JSON Web Token (JWT) para proteger rutas.
- **CORS**: Configurado para permitir peticiones desde `CLIENT_URL` definido en `.env`.
- **Validaciones**: Se usa `Joi` para validar datos antes de guardarlos en la base de datos.

## 📖 Documentación de la API

Puedes probar los endpoints usando [Postman](https://www.postman.com/) o revisar la documentación completa en Swagger.

- 📂 Archivo JSON de Postman: [`hackverse-api.postman_collection.json`](./HackVerse%20-PFB.postman_collection.json)

## 📡 Endpoints de la API

### Endpoints del usuario

- **POST** - [`/api/users/register`] - Crea un nuevo usuario pendiente de activar.
- **PATCH** - [`/api/users/validate/:regCode`] - Activa un usuario mediante un código de registro.
- **POST** - [`/api/users/login`] - Logea a un usuario activo retornando un token.
- **GET** - [`/api/users`] - Retorna información privada del usuario con el id del token.
- **PUT** - [`/api/users/password/change`] - Permite crear una nueva contraseña a partir de la actual.
- **PUT** - [`/api/users/password/reset`] - Enviar código de recuperación de contraseña al email del usuario.
- **PUT** - [`/api/users/:userId/password/recover/:recoverPassCode`] - Actualiza la contraseña de un usuario con un código de recuperación.
- **PUT** - [`/api/users/profile/edit`] - Editar información del usuario.
- **GET** - [`/api/users/profile/:username/futureParticipations`] - Devuelve los hackathones en los que el usuario está registrado y todavía no han tenido lugar.
- **GET** - [`/api/users/profile/:username/participationHistory`] - Devuelve los hackathones en los que el usuario está registrado y ya han tenido lugar.
- **GET** - [`/api/users/profile/:username/creationHistory`] - Devuelve los hackathones que el admin ha creado y ya han tenido lugar.
- **GET** - [`/api/users/profile/:username/futureCreations`] - Devuelve los hackathones que el admin ha creado y todavía no han tenido lugar.

### Endpoints de los hackathones

- **POST** - [`/api/hackathon/new`] - Crea un nuevo hackathon.
- **PATCH** - [`/api/hackathon/:hackathonId`] - Permite modificar los detalles de un hackathon.
- **DELETE** - [`/api/hackathon/:hackathonId`] - Permite eliminar un hackathon y todo lo relacionado con este.
- **GET** - [`/api/hackathon/hackathones/themes`] - Retorna el listado de temáticas de hackathones.
- **GET** - [`/api/hackathon/hackathones/langs`] - Devuelve todos los lenguajes de programación.
- **GET** - [`/api/hackathon/hackathones/fromToday`] - Devuelve los hackathones a partir de la fecha actual.
- **GET** - [`/api/hackathon/hackathones/location`] - Devuelve la lisat de localizaciones.
- **GET** - [`/api/hackathon/hackathones/details/:id`] - Devuelve todos los detalles del hackathon con el id indicado.
- **GET** - [`/api/hackathon//hackathones/filter`] - Devuelve todos los detalles de los hackathones filtrados por ciertos parámetros.
- **POST** - [`/api/hackathon/:hackathonId/ratings`] - Permite valorar un hackathon (1-5) despues de la fecha de realizacion.
- **GET** - [`/api/hackathon/:hackathonId/participants`] - Ruta pública para ver los usuarios registrados a un hackathon acabado.
- **GET** - [`api/hackathon/:hackathonId/participants/private`] - Ruta para admins para ver los usuarios registrados a un hackathon.
- **POST** - [`api/hackathon/:hackathonId/publish`] - Permite a un admin clasificar a usuarios en el podio y hacer pública la ruta pública de usuarios registrados.
- **GET** - [`api/hackathon/hackathones/bestHackathones`] - Ruta que devuelve los tres mejores hackathones según la media de su puntuación.

### Endpoints de los registros/participaciones

- **POST** - [`/api/register/:hackathonId`] - Registra a un usuario en un hackathon.
- **PATCH** - [`/api/register/:hackathonId/:confirmationCode`] - Confirma que un usuario participará en un hackathon.
- **DELETE** - [`/api/register/:hackathonId`] - Elimina la participación de un usuario en un hackathon.

## 📦 Dependencias

### 🔧 Producción

| Paquete            | Descripción                        |
| ------------------ | ---------------------------------- |
| express            | Framework del servidor             |
| mysql2             | Conexión con MySQL                 |
| jsonwebtoken       | Autenticación con JWT              |
| bcrypt             | Hashing de contraseñas             |
| joi                | Validación de datos                |
| cors               | Permitir peticiones entre dominios |
| dotenv             | Variables de entorno               |
| morgan             | Logs de peticiones HTTP            |
| nodemailer         | Envío de emails                    |
| sharp              | Optimización de imágenes           |
| express-fileupload | Manejo de archivos                 |

## 🔨 Desarrollo

| Paquete  | Descripción                   |
| -------- | ----------------------------- |
| nodemon  | Recarga automática en cambios |
| eslint   | Estilo y calidad de código    |
| prettier | Formateo de código            |

# 📄 Base de Datos

## 📌 Tabla: `users` (Usuarios)

Guarda la información de los usuarios registrados.

| Campo           | Tipo                 | Restricciones               |
| --------------- | -------------------- | --------------------------- |
| id              | INT UNSIGNED         | PRIMARY KEY, AUTO_INCREMENT |
| username        | VARCHAR(20)          | NOT NULL                    |
| firstName       | VARCHAR(40)          | NOT NULL                    |
| lastName        | VARCHAR(70)          | NOT NULL                    |
| email           | VARCHAR(70)          | UNIQUE, NOT NULL            |
| password        | VARCHAR(200)         | NOT NULL                    |
| regCode         | CHAR(30)             | -                           |
| recoverPassCode | CHAR(30)             | -                           |
| active          | BOOLEAN              | -                           |
| avatar          | VARCHAR(500)         | -                           |
| role            | ENUM("dev", "admin") | DEFAULT "dev"               |
| lastAuthUpdate  | DATETIME             | -                           |
| createdAt       | DATETIME             | -                           |

---

## 🎨 Tabla: `themes` (Temas)

Almacena los temas disponibles para los hackathones.

| Campo     | Tipo         | Restricciones               |
| --------- | ------------ | --------------------------- |
| id        | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT |
| theme     | VARCHAR(50)  | NOT NULL                    |
| createdAt | DATETIME     | -                           |

---

## 💻 Tabla: `programmingLangs` (Lenguajes de Programación)

Lista los lenguajes de programación disponibles.

| Campo           | Tipo         | Restricciones               |
| --------------- | ------------ | --------------------------- |
| id              | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT |
| programmingLang | VARCHAR(50)  | NOT NULL                    |
| createdAt       | DATETIME     | -                           |

---

## 🏆 Tabla: `hackathonList` (Lista de Hackathones)

Guarda los hackathones creados por los usuarios.

| Campo            | Tipo                         | Restricciones                     |
| ---------------- | ---------------------------- | --------------------------------- |
| id               | INT UNSIGNED                 | PRIMARY KEY, AUTO_INCREMENT       |
| userId           | INT UNSIGNED                 | FOREIGN KEY (users.id), NOT NULL  |
| title            | VARCHAR(100)                 | NOT NULL                          |
| summary          | VARCHAR(500)                 | NOT NULL                          |
| startingDate     | TIMESTAMP                    | NOT NULL                          |
| deadline         | TIMESTAMP                    | NOT NULL                          |
| type             | ENUM("online", "presencial") | -                                 |
| location         | VARCHAR(200)                 | -                                 |
| themeId          | INT UNSIGNED                 | FOREIGN KEY (themes.id), NOT NULL |
| details          | TEXT                         | -                                 |
| resultsPublished | BOOLEAN                      | DEFAULT FALSE                     |
| attachedFile     | VARCHAR(500)                 | -                                 |
| image            | VARCHAR(500)                 | -                                 |
| createdAt        | DATETIME                     | -                                 |
| modifiedAt       | DATETIME                     | -                                 |

---

## 🔗 Tabla: `hackathonLangs` (Hackathones y Lenguajes)

Relación entre hackathones y lenguajes de programación.

| Campo             | Tipo         | Restricciones                               |
| ----------------- | ------------ | ------------------------------------------- |
| id                | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT                 |
| programmingLangId | INT UNSIGNED | FOREIGN KEY (programmingLangs.id), NOT NULL |
| hackathonId       | INT UNSIGNED | FOREIGN KEY (hackathonList.id), NOT NULL    |
| createdAt         | DATETIME     | -                                           |
| modifiedAt        | DATETIME     | -                                           |

---

## 📋 Tabla: `registrations` (Registros)

Almacena los registros de usuarios en hackathones.

| Campo            | Tipo                            | Restricciones                            |
| ---------------- | ------------------------------- | ---------------------------------------- |
| id               | INT UNSIGNED                    | PRIMARY KEY, AUTO_INCREMENT              |
| userId           | INT UNSIGNED                    | FOREIGN KEY (users.id), NOT NULL         |
| hackathonId      | INT UNSIGNED                    | FOREIGN KEY (hackathonList.id), NOT NULL |
| confirmationCode | CHAR(30)                        | -                                        |
| status           | ENUM("pendiente", "confirmada") | DEFAULT "pendiente"                      |
| createdAt        | DATETIME                        | -                                        |
| modifiedAt       | DATETIME                        | -                                        |

---

## 🏅 Tabla: `podium` (Podio)

Almacena los ganadores de los hackathones.

| Campo          | Tipo         | Restricciones                          |
| -------------- | ------------ | -------------------------------------- |
| id             | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT            |
| registrationId | INT UNSIGNED | FOREIGN KEY (registrations.id), UNIQUE |
| position       | TINYINT      | CHECK (position BETWEEN 1 AND 3)       |
| createdAt      | DATETIME     | -                                      |

---

## ⭐ Tabla: `ratings` (Valoraciones)

Guarda las calificaciones de los hackathones por parte de los usuarios.

| Campo       | Tipo             | Restricciones                                                         |
| ----------- | ---------------- | --------------------------------------------------------------------- |
| id          | INT UNSIGNED     | PRIMARY KEY, AUTO_INCREMENT                                           |
| userId      | INT UNSIGNED     | FOREIGN KEY (users.id), NOT NULL                                      |
| hackathonId | INT UNSIGNED     | FOREIGN KEY (hackathonList.id), NOT NULL, UNIQUE(userId, hackathonId) |
| rating      | TINYINT UNSIGNED | CHECK (rating BETWEEN 1 AND 5)                                        |
| createdAt   | DATETIME         | -                                                                     |

```

```
