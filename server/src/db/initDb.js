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
        await pool.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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
