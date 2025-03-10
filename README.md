# HackVerse - Plataforma de Hackathones

HackVerse es una plataforma innovadora que permite la creación, organización y participación en hackathones. Esta aplicación fullstack está desarrollada con **React (Vite) en el frontend** y **Node.js con Express en el backend**.

## 🚀 Tecnologías Utilizadas

### 🖥️ **Frontend (Client)**
  - React + Vite
  - TailwindCSS (para estilos)
  - React Router (para la navegación)
  - ESLint & Prettier (para calidad de código)

### 🛠 **Backend (Server)**
  - Node.js + Express.js
  - Base de Datos (MySQL o PostgreSQL)
  - JWT (JSON Web Token) para autenticación
  - Dotenv (para variables de entorno)

## 📂 Estructura del Proyecto

  ```
  PFB - HackABoss/
  │── client/         # Frontend (React + Vite)
  │   ├── src/        # Código fuente de React
  │   ├── public/     # Archivos estáticos
  │   ├── package.json
  │   ├── vite.config.js
  │   └── ...
  │
  │── server/         # Backend (Node.js + Express)
  │   ├── src/        # Código fuente del servidor
  │   ├── uploads/    # Archivos subidos
  │   ├── app.js      # Punto de entrada del backend
  │   ├── package.json
  │   └── ...
  │
  │── .gitignore      # Archivos ignorados por Git
  │── README.md       # Documentación del proyecto
  ```

## 🛠 Instalación y Configuración

### 1️⃣ **Clonar el repositorio**
  ```bash
  git clone https://github.com/tu_usuario/hackverse.git
  cd hackverse
  ```

### 2️⃣ **Instalar dependencias**
#### 📌 **Frontend**
  ```bash
  cd client
  npm install
  ```

#### 📌 **Backend**
  ```bash
  cd server
  npm install
  ```

### 3️⃣ **Configurar las variables de entorno**
En ambos directorios (`client/` y `server/`), copia el archivo de variables de entorno de ejemplo y configúralo:
  ```bash
  cp .env.example .env
  ```

### 4️⃣ **Ejecutar el proyecto**
#### 🚀 **Frontend**
  ```bash
  cd client
  npm run dev
  ```
#### 🛠 **Backend**
  ```bash
  cd server
  npm start
  ```

## 🏗️ Endpoints de la API
Para probar los endpoints, puedes usar **Postman** con la colección incluida:
  - `server/HackVerse-PFB.postman_collection.json`

## 📸 Capturas de Pantalla
*(Opcional: Agrega aquí algunas capturas de pantalla de la aplicación en funcionamiento.)*

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Si deseas contribuir, siéntete libre de hacer un fork y enviar pull requests. 💜

---
✉️ **Desarrollado por:** [HackVerse]  
🌐 **Repositorio:** [GitHub](https://github.com/ezequielzaquiere/hackatonPFB41rt)

