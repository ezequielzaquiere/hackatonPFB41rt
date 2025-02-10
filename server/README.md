# Hackatoes



📌 **Tipos de usuarios:**

- **Familias** → Pueden registrar a sus hijos como jugadores y proporcionar información detallada sobre sus habilidades.
- **Ojeadores** → Pueden ver la lista de jugadores y realizar **solicitudes de contratación** si están interesados en un jugador.

---

## 🚀 Instalación

1. **Instalar las dependencias**:
    ```sh
    npm install
    ```
2. **Configurar las variables de entorno**:

    - Copia el archivo `.env.example`, renómbralo a `.env` y **completa los datos necesarios**.

3. **Inicializar la base de datos**:

    ```sh
    npm run generate-tables
    ```

4. **(Opcional) Poblar la base de datos con datos de prueba**:

    ```sh
    npm run populate-tables
    ```

5. **Iniciar el servidor**:
    ```sh
    npm run dev
    ```

---

## 📄 Base de Datos

### 📌 Tabla: `users`

| Campo      | Tipo         | Descripción                          |
| ---------- | ------------ | ------------------------------------ |
| id         | INT UNSIGNED | Identificador único del usuario      |
| username   | VARCHAR(30)  | Nombre de usuario                    |
| firstName  | VARCHAR(50)  | Nombre del usuario                   |
| lastName   | VARCHAR(100) | Apellido del usuario                 |
| email      | VARCHAR(100) | Correo electrónico                   |
| password   | VARCHAR(100) | Contraseña encriptada                |
| birthDate  | DATE         | Fecha de nacimiento                  |
| avatar     | VARCHAR(100) | URL del avatar del usuario           |
| role       | ENUM         | Rol del usuario (`family` o `scout`) |
| createdAt  | DATETIME     | Fecha de creación del usuario        |
| modifiedAt | DATETIME     | Última actualización del usuario     |

### 📌 Tabla: `players`

| Campo        | Tipo         | Descripción                             |
| ------------ | ------------ | --------------------------------------- |
| id           | INT UNSIGNED | Identificador único del jugador         |
| familyUserId | INT UNSIGNED | ID del usuario que registró al jugador  |
| firstName    | VARCHAR(50)  | Nombre del jugador                      |
| lastName     | VARCHAR(100) | Apellido del jugador                    |
| birthDate    | DATE         | Fecha de nacimiento                     |
| position     | VARCHAR(50)  | Posición en el campo                    |
| skills       | VARCHAR(500) | Habilidades destacadas                  |
| team         | VARCHAR(100) | Equipo actual del jugador               |
| strongFoot   | ENUM         | Pie dominante (`right`, `left`, `dual`) |
| createdAt    | DATETIME     | Fecha de creación del jugador           |
| modifiedAt   | DATETIME     | Última actualización del jugador        |

### 📌 Tabla: `playerVideos`

| Campo     | Tipo         | Descripción                   |
| --------- | ------------ | ----------------------------- |
| id        | INT UNSIGNED | Identificador único del video |
| playerId  | INT UNSIGNED | ID del jugador asociado       |
| youtubeId | VARCHAR(20)  | ID del vídeo de YouTube       |
| createdAt | DATETIME     | Fecha de subida del video     |

### 📌 Tabla: `hiringRequests`

| Campo       | Tipo         | Descripción                                   |
| ----------- | ------------ | --------------------------------------------- |
| id          | INT UNSIGNED | Identificador único de la solicitud           |
| scoutUserId | INT UNSIGNED | ID del ojeador que realizó la solicitud       |
| playerId    | INT UNSIGNED | ID del jugador asociado                       |
| status      | ENUM         | Estado (`pendiente`, `aceptada`, `rechazada`) |
| createdAt   | DATETIME     | Fecha de creación de la solicitud             |
| modifiedAt  | DATETIME     | Última actualización de la solicitud          |

---

## 📱 Endpoints

### **🔹 Usuarios**

| Método   | Endpoint              | Descripción                                                             |
| -------- | --------------------- | ----------------------------------------------------------------------- |
| **POST** | `/api/users/register` | Crear un nuevo usuario (`family` u `scout`). ✅                         |
| **POST** | `/api/users/login`    | Iniciar sesión. ✅                                                      |
| **GET**  | `/api/users/private`  | Obtener perfil privado del usuario autenticado. ✅                      |
| **PUT**  | `/api/users`          | Actualizar **nombre de usuario**, **email** o **avatar**. ✅            |
| **GET**  | `/api/users/hirings`  | Obtener solicitudes de contratación **relacionadas con el usuario**. ✅ |

---

### **🔹 Jugadores (Acciones de familias)**

🔒 **Restringido a usuarios de tipo `family`**  
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **POST** | `/api/players` | Registrar un nuevo jugador. ✅ |
| **GET** | `/api/players` | Obtener la lista de jugadores disponibles. ✅ |
| **POST** | `/api/players/:playerId/videos` | Agregar un video a un jugador. ✅ |
| **GET** | `/api/players/:playerId` | Obtener detalles de un jugador (incluyendo videos). ✅ |
| **PUT** | `/api/players/:playerId` | Editar **posición**, **skills**, **equipo** y **pierna dominante**. ✅ |
| **PUT** | `/api/players/:playerId/hirings/:hiringId` | Aceptar o rechazar una solicitud de contratación. ✅ |

---

### **🔹 Jugadores (Acciones de ojeadores)**

🔒 **Restringido a usuarios de tipo `scout`**  
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **POST** | `/api/players/:playerId/hirings` | Enviar una solicitud de contratación para un jugador. ✅ |
