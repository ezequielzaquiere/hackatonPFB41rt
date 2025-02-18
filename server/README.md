# Web - Hackathones (`Insertar nombre del proyecto`)

Se trata de una web donde los usuarios se podrán apuntar a hackathones. Cada hackathon tiene creador, título, resumen, fecha de inicio,
deadline, tipo "online/presencial", localización, tema, lenguajes de programación, detalles y archivo + imagen adjunto.
Cada hackathon puede ser votado con un rating de 1 a 5 estrellas.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run populate-tables` para añadir los datos necesarios a las tablas en la base de datos.

5. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo     | Tipo         | Descripción                      |
| --------- | ------------ | -------------------------------- |
| id        | VARCHAR(36)  | Identificador único del usuario  |
| username  | VARCHAR(20)  | Nombre de usuario del usuario    |
| firstName | VARCHAR(40)  | Nombre del usuario               |
| lastName  | VARCHAR(70)  | Apellido del usuario             |
| email     | VARCHAR(70)  | Correo electrónico del usuario   |
| password  | VARCHAR(200) | Contraseña del usuario (hash)    |
| regCode   | CHAR(30)     | Código de registro del usuario   |
| active    | BOOLEAN      | Indica si el usuario está activo |
| role      | ENUM         | Rol del usuario ("admin", "dev") |
| createdAt | DATETIME     | Fecha y hora de la creación      |

### themes

| Campo     | Tipo        | Descripción                  |
| --------- | ----------- | ---------------------------- |
| id        | VARCHAR(36) | Identificador único del tema |
| theme     | VARCHAR(50) | Tema del hackathon           |
| createdAt | DATETIME    | Fecha y hora de la creación  |

### programmingLangs

| Campo           | Tipo        | Descripción                      |
| --------------- | ----------- | -------------------------------- |
| id              | VARCHAR(36) | Identificador único del lenguaje |
| programmingLang | VARCHAR(50) | Lenguaje de programación         |
| createdAt       | DATETIME    | Fecha y hora de la creación      |

### hackathonList

| Campo            | Tipo          | Descripción                                            |
| ---------------- | ------------- | ------------------------------------------------------ |
| id               | VARCHAR(36)   | Identificador único del hackathon                      |
| creator          | VARCHAR(36)   | Creador del hackathon                                  |
| title            | VARCHAR(100)  | Título del hackathon                                   |
| summary          | VARCHAR(140)  | Resúmen del hackathon                                  |
| startingDate     | TIMESTAMP     | Fecha y hora de inicio del hackathon                   |
| deadline         | TIMESTAMP     | Fecha y hora de deadline del hackathon                 |
| type             | ENUM          | Tipo de modalidad de hackathon ("online","presencial") |
| location         | VARCHAR(200)  | Localización del hackathon                             |
| theme            | VARCHAR(36)   | Tema del hackathon                                     |
| programmingLangs | VARCHAR(36)   | Lenguaje del hackathon                                 |
| details          | VARCHAR(1000) | Detalles del hackathon                                 |
| attachedFile     | VARCHAR(500)  | Documento adjunto al hackathon                         |
| image            | VARCHAR(500)  | Imagen adjunta al hackathon                            |
| createdAt        | DATETIME      | Fecha y hora de la creación                            |

### hackathonLangs

| Campo           | Tipo        | Descripción                                          |
| --------------- | ----------- | ---------------------------------------------------- |
| id              | VARCHAR(36) | Identificador único de los lenguajes de un hackathon |
| programmingLang | VARCHAR(36) | Identificador del lenguaje del hackathon             |
| hackathon       | VARCHAR(36) | Identificador del hackathon                          |
| createdAt       | DATETIME    | Fecha y hora de la creación                          |

### registrations

| Campo     | Tipo        | Descripción                      |
| --------- | ----------- | -------------------------------- |
| id        | VARCHAR(36) | Identificador único del registro |
| user      | VARCHAR(36) | Identificador del usuario        |
| hackathon | VARCHAR(36) | Identificador del hackathon      |
| createdAt | DATETIME    | Fecha y hora de la creación      |

### podium

| Campo        | Tipo        | Descripción                      |
| ------------ | ----------- | -------------------------------- |
| id           | VARCHAR(36) | Identificador único del registro |
| registration | VARCHAR(36) | Identificador del registro       |
| position     | TINYINT     | Rating/posición entre 1 y 3      |
| createdAt    | DATETIME    | Fecha y hora de la creación      |

### ratings

| Campo        | Tipo        | Descripción                       |
| ------------ | ----------- | --------------------------------- |
| id           | VARCHAR(36) | Identificador único del rating    |
| user         | VARCHAR(36) | Identificador del usuario         |
| hackathon    | VARCHAR(36) | Identificador del hackathon       |
| uniqueRating | CONSTRAINT  | Rating único (usuario, hackathon) |
| rating       | TINYINT     | Rating/posición entre 1 y 3       |
| createdAt    | DATETIME    | Fecha y hora de la creación       |

## Endpoints del usuario

- **POST** - [`/api/users/register`] - Crea un nuevo usuario pendiente de activar.
- **PATCH** - [`/api/users/validate/:regCode`] - Activa un usuario mediante un código de registro.
- **POST** - [`/api/users/login`] - Logea a un usuario activo retornando un token.
- **GET** - [`/api/users`] - Retorna información privada del usuario con el id del token.
- **PUT** - [`/api/users/changePassword`] - Permite crear una nueva contraseña a partir de la actual.
- **PUT** - [`/api/users/password/reset`] - Enviar código de recuperación de contraseña al email del usuario.
- **PUT** - [`/api/users/password/reset/:recoverPassCode`] - Actualiza la contraseña de un usuario con un código de recuperación.
- **PUT** - [`/api/users/profile/edit`] - Editar información del usuario.
- **GET** - [`/api/users/profile/:id`] - Enseña información no sensible del usuario.

## Endpoints de los hackathones

- **POST** - [`/api/hackathones/new`] - Crea un nuevo hackathon.
- **PATCH** - [`/api/hackathones/:hackathonId`] - Permite modificar los detalles de un hackathon.
- **GET** - [`/api/hackathones/hackathones`] - Retorna el listado de entradas.
- **GET** - [`/api/hackathones/hackathones/themes`] - Retorna el listado de temáticas de hackathones.
- **GET** - [`/api/hackathones/hackathones/details`] - Devuelve todos los detalles de los hackathones.
- **GET** - [`/api/hackathones/hackathones/details?hackathon= &programmingLang= `] - Devuelve todos los detalles de los hackathones filtrados por cierto lenguaje o filtrados por nombre, o ambas.
- **GET** - [`/api/hackathones/hackathones/langs`] - Devuelve todos los lenguajes de programación.

- **DELETE** - [`/api/hackathones/:hackathonId`] - Permite eliminar los datos de un hackathon y todo lo relacionado con el.

## Endpoints de los registros/participaciones

- **POST** - [`/api/register/:hackathonId`] - Registra a un usuario en un hackathon.
- **PATCH** - [`/api/register/:hackathonId/:confirmationCode`] - Confirma que un usuario participará en un hackathon.
- **PATCH** - [`/api/register/:hackathonId`] - Elimina la participación de un usuario en un hackathon.
