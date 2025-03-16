# 🎨 HackVerse - Frontend

**HackVerse** es la interfaz de usuario de la plataforma de hackathones, desarrollada con **React (Vite)** y estilizada con **TailwindCSS**. Su objetivo es ofrecer una experiencia fluida y moderna para la organización y participación en eventos tecnológicos.

## ✨ Características

✅ Diseño moderno, atractivo y **totalmente responsive** con **TailwindCSS**  
✅ Interfaz intuitiva y fácil de usar para una mejor experiencia de usuario  
✅ Navegación dinámica con **React Router**  
✅ Notificaciones amigables con **React Hot Toast**  
✅ Estilos personalizables y coherentes con el tema del proyecto  
✅ Animaciones sutiles para mejorar la interacción del usuario

## 🚀 Tecnologías Utilizadas

| Tecnología                              | Descripción                         |
| --------------------------------------- | ----------------------------------- |
| **React** + [Vite](https://vitejs.dev/) | Framework de UI rápido y moderno    |
| **TailwindCSS**                         | Estilos flexibles y personalizables |
| **React Router**                        | Navegación dinámica entre páginas   |
| **React Hot Toast**                     | Notificaciones amigables            |
| **ESLint + Prettier**                   | Formateo y calidad de código        |

> 📌 **Nota:** El proyecto usa **ESLint y Prettier** para mantener un código limpio y consistente.

## 📂 Estructura del Proyecto

```plaintext
📦 client
 ┣ 📂 src
 ┃ ┣ 📂 assets       # Imágenes, iconos, etc.
 ┃ ┣ 📂 components   # Componentes reutilizables
 ┃ ┣ 📂 hooks        # Hooks personalizados
 ┃ ┣ 📂 context      # Context API (estado global)
 ┃ ┣ 📂 pages        # Páginas principales
 ┃ ┣ 📂 utils        # Utilidades y funciones auxiliares
 ┃ ┣ 📜 main.jsx     # Punto de entrada de la app
 ┃ ┗ 📜 App.jsx      # Definición de rutas y layout
 ┣ 📜 .env.example   # Archivo de ejemplo para variables de entorno
 ┣ 📜 package.json   # Dependencias y scripts
 ┣ 📜 vite.config.js  # Configuración de Vite
 ┗ 📜 README.md      # Documentación del frontend
```

## 🛠️ Instalación y Configuración

### 1️⃣ Movernos a la carpeta client

```bash
cd hackatonPFB41rt/client
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo **.env.local** en la raíz del proyecto y define las siguientes variables:

```ini
# 🔗 URL del backend
VITE_API_URL=http://localhost:4000
```

## ▶️ Ejecución del Proyecto

```bash
npm run dev
```

## 📱 Diseño Adaptativo

HackVerse se adapta en cualquier dispositivo.

| Escritorio 🖥                                     | Móvil 📱                                           |
| ------------------------------------------------- | -------------------------------------------------- |
| ![Escritorio](../client/public/hackversedemo.gif) | ![Móvil](../client/public/hackVerseResponsive.gif) |

## 📦 Dependencias

### 🔧 Producción

| Paquete                          | Descripción                                 |
| -------------------------------- | ------------------------------------------- |
| **@tailwindcss/vite**            | Integración de Tailwind con Vite            |
| **@tiptap/extension-color**      | Extensión de TipTap para colores            |
| **@tiptap/extension-list-item**  | Extensión de TipTap para listas             |
| **@tiptap/extension-text-style** | Extensión de TipTap para estilos de texto   |
| **@tiptap/pm**                   | Core de ProseMirror para TipTap             |
| **@tiptap/react**                | Editor TipTap para React                    |
| **@tiptap/starter-kit**          | Conjunto de extensiones básicas para TipTap |
| **bootstrap-icons**              | Iconos de Bootstrap                         |
| **date-fns**                     | Manejo de fechas en JavaScript              |
| **framer-motion**                | Animaciones en React                        |
| **js-cookie**                    | Manejo de cookies en JavaScript             |
| **lucide-react**                 | Iconos minimalistas para React              |
| **primereact**                   | Biblioteca de componentes UI para React     |
| **prop-types**                   | Validación de propiedades en React          |
| **react**                        | Biblioteca para la UI                       |
| **react-datepicker**             | Selector de fechas en React                 |
| **react-dom**                    | Manipulación del DOM en React               |
| **react-hot-toast**              | Notificaciones en React                     |
| **react-icons**                  | Conjunto de iconos para React               |
| **react-router-dom**             | Enrutamiento en React                       |
| **tailwindcss**                  | Framework de estilos CSS                    |

---

### 🔨 Desarrollo

| Paquete                         | Descripción                                 |
| ------------------------------- | ------------------------------------------- |
| **@eslint/js**                  | Configuración de ESLint para JS             |
| **@types/react**                | Tipos de React para TypeScript              |
| **@types/react-dom**            | Tipos de React DOM para TypeScript          |
| **@vitejs/plugin-react**        | Soporte de React en Vite                    |
| **eslint**                      | Linter para código JavaScript               |
| **eslint-plugin-react**         | Reglas de ESLint para React                 |
| **eslint-plugin-react-hooks**   | Reglas de ESLint para hooks de React        |
| **eslint-plugin-react-refresh** | Reglas de ESLint para React Refresh         |
| **globals**                     | Lista de variables globales                 |
| **prettier**                    | Formateador de código                       |
| **vite**                        | Empaquetador rápido para proyectos frontend |
