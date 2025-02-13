// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';

// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que nos permite conectarnos a la base de datos.
import getPool from './getPool.js';

// Función principal encargada de crear las tablas.
const main = async () => {
    try {
        // Obtenemos el pool.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            'DROP TABLE IF EXISTS ratings, podium, registrations, hackathonLangs, hackathonList, programmingLangs, themes, users'
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(20) NOT NULL,
                firstName VARCHAR(40) NOT NULL,
                lastName VARCHAR(70) NOT NULL,
                email VARCHAR(70) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL,
                regCode CHAR(30),
                active BOOLEAN,
                avatar VARCHAR(500) DEFAULT "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
                role ENUM ("dev", "admin") NOT NULL,
                createdAt DATETIME               
            )	
        `);

        // Creamos la tabla de temas.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS themes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                theme VARCHAR (50) NOT NULL,
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla de lenguajes de programacion.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS programmingLangs (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                programmingLang VARCHAR (50) NOT NULL,
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla de lista de hackathones.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS hackathonList (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                creator INT UNSIGNED NOT NULL,
                FOREIGN KEY(creator) REFERENCES USERS(id),
                title VARCHAR(100) NOT NULL,
                summary VARCHAR(140) NOT NULL,
                startingDate TIMESTAMP NOT NULL,
                deadline TIMESTAMP NOT NULL,
                type ENUM ("online", "presencial") NOT NULL,
                location VARCHAR(200),
                theme INT UNSIGNED NOT NULL,
                FOREIGN KEY(theme) REFERENCES themes(id),
                programmingLangs INT UNSIGNED NOT NULL,
                FOREIGN KEY(programmingLangs) REFERENCES hackathonLangs(id),
                details VARCHAR(1000),
                attachedFile VARCHAR(500),
                image VARCHAR(500) DEFAULT "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla intermedia de hackathones y lenguajes de programacion.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS hackathonLangs (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                programmingLang INT UNSIGNED NOT NULL,
                FOREIGN KEY(programmingLang) REFERENCES programmingLangs(id),
                hackathon INT UNSIGNED NOT NULL,
                FOREIGN KEY(hackathon) REFERENCES hackathonList(id),
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla de registros.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS registrations (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                user INT UNSIGNED NOT NULL,
                FOREIGN KEY(user) REFERENCES users(id),
                hackathon INT UNSIGNED NOT NULL,
                FOREIGN KEY(hackathon) REFERENCES hackathonList(id),
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla de resultados o podium.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS podium (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                registration INT UNSIGNED NOT NULL,
                FOREIGN KEY(registration) REFERENCES registrations(id),
                position TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 3),
                createdAt DATETIME
            )	
        `);

        // Creamos la tabla de ratings.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                user INT UNSIGNED NOT NULL,
                FOREIGN KEY(user) REFERENCES users(id),
                hackathon INT UNSIGNED NOT NULL,
                FOREIGN KEY(hackathon) REFERENCES hackathonList(id),
                CONSTRAINT uniqueRating UNIQUE (user, hackathon),
                rating TINYINT UNSIGNED CHECK (rating BETWEEN 1 AND 5),
                createdAt DATETIME
            )	
        `);

        console.log('¡Tablas creadas!');

        // Encriptamos la contraseña del administrador.
        const hashedPass = await bcrypt.hash('admin', 10);

        // Insertamos el usuario administrador.
        await pool.query(
            `
                INSERT INTO users (username, email, password, role)
                VALUES (?, ?, ?, ?)
            `,
            ['admin', 'admin@example.com', hashedPass, 'admin']
        );

        console.log('¡Usuario administrador insertado!');

        // Cerramos el proceso con código 0.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1.
        process.exit(1);
    }
};

// Llamamos a la función principal.
main();
