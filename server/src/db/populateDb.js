import 'dotenv/config';

//Importamos la pool
import getPool from './getPool.js';

// Función que agrega los datos de prueba a las tablas.
const populateDb = async () => {
    try {
        const pool = await getPool();

        // Fecha de inserción de los datos.
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        //Tabla de los lenguajes
        await pool.query(`
            INSERT INTO programmingLangs (programmingLang, createdAt) 
            VALUES 
                ("JavaScript", "${now}"),
                ("Python", "${now}"),
                ("Java", "${now}"),
                ("C++", "${now}"),
                ("Ruby", "${now}"),
                ("Go", "${now}"),
                ("Swift","${now}"),
                ("TypeScript", "${now}"),
                ("Rust", "${now}"),
                ("PHP", "${now}");
        `);

        //Tabla de temas
        await pool.query(`
            INSERT INTO themes (theme, createdAt) 
            VALUES 
                ("Inteligencia Artificial", "${now}"),
                ("Desarrollo Web", "${now}"),
                ("Ciberseguridad", "${now}"),
                ("Blockchain", "${now}"),
                ("Big Data", "${now}"),
                ("Videojuegos", "${now}"),
                ("IoT (Internet of Things)", "${now}"),
                ("Realidad Aumentada", "${now}"),
                ("Automatización", "${now}"),
                ("Sostenibilidad", "${now}");
        `);
        console.log('Datos de prueba insertados correctamente');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

//Ejecutamos la funcion
populateDb();
