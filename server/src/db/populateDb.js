import 'dotenv/config';

//Importamos las dependencias
import bcrypt from 'bcrypt';

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
            INSERT INTO programmingLangs (programmingLang, createdAt) VALUES
                ('JavaScript', "${now}"),
                ('Python', "${now}"),
                ('Java', "${now}"),
                ('C++', "${now}"),
                ('CSharp', "${now}"),
                ('Ruby', "${now}"),
                ('Go', "${now}"),
                ('Swift', "${now}"),
                ('Kotlin', "${now}"),
                ('PHP', "${now}"),
                ('Rust', "${now}"),
                ('TypeScript', "${now}"),
                ('SQL', "${now}"),
                ('Perl', "${now}"),
                ('Scala', "${now}"),
                ('Dart', "${now}"),
                ('Objective-C', "${now}"),
                ('Lua', "${now}"),
                ('Haskell', "${now}"),
                ('Shell', "${now}");
        `);

        //Tabla de temas
        await pool.query(`
            INSERT INTO themes (theme, createdAt) VALUES
                ('Inteligencia Artificial', "${now}"),
                ('Desarrollo Web', "${now}"),
                ('Ciberseguridad', "${now}"),
                ('Blockchain', "${now}"),
                ('Big Data', "${now}"),
                ('Realidad Virtual', "${now}"),
                ('Videojuegos', "${now}"),
                ('Fintech', "${now}"),
                ('Energía Sostenible', "${now}"),
                ('Educación Tecnológica', "${now}"),
                ('IoT', "${now}"),
                ('Automatización', "${now}"),
                ('Robótica', "${now}"),
                ('Machine Learning', "${now}"),
                ('Biotecnología', "${now}"),
                ('MedTech', "${now}"),
                ('Criptografía', "${now}"),
                ('Marketing Digital', "${now}"),
                ('Redes y Telecomunicaciones', "${now}"),
                ('Movilidad y Transporte', "${now}");
        `);
        // Encriptamos la contraseña de los usuarios.
        const usersHashedPass = await bcrypt.hash('user', 10);

        //Tabla usuarios
        await pool.query(`
            INSERT INTO users (username, firstName, lastName, email, password, role, active, lastAuthUpdate, createdAt) VALUES
                ('cgarcia', 'Carlos', 'García', 'carlos.garcia@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('mfernandez', 'María', 'Fernández', 'maria.fernandez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('ajimenez', 'Alejandro', 'Jiménez', 'alejandro.jimenez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('lrodriguez', 'Laura', 'Rodríguez', 'laura.rodriguez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('dperez', 'David', 'Pérez', 'david.perez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('sanchezp', 'Patricia', 'Sánchez', 'patricia.sanchez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('alexm', 'Alejandro', 'Martínez', 'alejandro.martinez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('slopez', 'Sergio', 'López', 'sergio.lopez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('jblanco', 'Javier', 'Blanco', 'javier.blanco@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('tgarcia', 'Teresa', 'García', 'teresa.garcia@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('cmoreno', 'Cristina', 'Moreno', 'cristina.moreno@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('jluis', 'José Luis', 'Ramírez', 'joseluis.ramirez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('mreyes', 'Mónica', 'Reyes', 'monica.reyes@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('dtorres', 'Daniel', 'Torres', 'daniel.torres@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('tvalencia', 'Tatiana', 'Valencia', 'tatiana.valencia@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('rnavarro', 'Raúl', 'Navarro', 'raul.navarro@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('beltran', 'Beatriz', 'Beltrán', 'beatriz.beltran@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('cadams', 'Carlos', 'Adame', 'carlos.adame@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('abustos', 'Ana', 'Bustos', 'ana.bustos@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}'),
                ('pgonzalez', 'Pablo', 'González', 'pablo.gonzalez@example.com', '${usersHashedPass}', 'dev', 1, '${now}', '${now}');
        `);

        //Lista hackathones
        await pool.query(`
            INSERT INTO hackathonList (userId, title, summary, startingDate, deadline, type, location, themeId, details, resultsPublished, attachedFile, image, createdAt) VALUES
                (1, 'Hackathon AI', 'Competencia de IA', '2025-04-12 18:00:00', '2025-04-19 18:00:00', 'online', NULL, 1, 'Detalles del hackathon AI', FALSE, NULL, 'hackathon1.jpg', "${now}"),
                (1, 'Blockchain Challenge', 'Desafío de Blockchain', '2010-05-01 09:00:00', '2010-05-10 18:00:00', 'presencial', 'Madrid', 4, 'Detalles del evento de blockchain', TRUE, NULL, 'hackathon2.jpg', "${now}"),
                (1, 'Ciberseguridad 2025', 'Prueba de ciberseguridad', '2025-06-15 10:00:00', '2025-06-22 18:00:00', 'online', NULL, 3, 'Detalles del hackathon de ciberseguridad', FALSE, NULL, 'hackathon3.jpg', "${now}"),
                (1, 'Big Data Analytics', 'Concurso de Big Data', '2017-07-05 14:00:00', '2017-07-12 18:00:00', 'presencial', 'Barcelona', 5, 'Detalles del evento de Big Data', TRUE, NULL, 'hackathon4.jpg', "${now}"),
                (1, 'Desarrollo Web Express', 'Hackathon de desarrollo web', '2019-08-20 08:00:00', '2019-08-27 18:00:00', 'online', NULL, 2, 'Detalles del evento de desarrollo web', FALSE, NULL, 'hackathon5.jpg', "${now}"),
                (1, 'IoT Innovation', 'Competencia de IoT', '2025-09-10 10:00:00', '2025-09-17 18:00:00', 'online', NULL, 11, 'Detalles del hackathon IoT', FALSE, NULL, 'hackathon6.jpg', "${now}"),
                (1, 'MedTech Revolution', 'Innovaciones en tecnología médica', '2025-10-01 09:00:00', '2025-10-08 18:00:00', 'presencial', 'Valencia', 16, 'Detalles del evento de MedTech', FALSE, NULL, 'hackathon7.jpg', "${now}"),
                (1, 'Cyber Defenders', 'Hackathon de ciberseguridad avanzada', '2025-11-01 10:00:00', '2025-11-08 18:00:00', 'online', NULL, 3, 'Detalles de ciberseguridad avanzada', FALSE, NULL, 'hackathon8.jpg', "${now}"),
                (1, 'VR Future', 'Desafío de realidad virtual', '2025-12-05 10:00:00', '2025-12-12 18:00:00', 'presencial', 'Sevilla', 6, 'Detalles del evento de realidad virtual', FALSE, NULL, 'hackathon9.jpg', "${now}"),
                (1, 'Smart Cities Challenge', 'Hackathon sobre ciudades inteligentes', '2026-01-15 10:00:00', '2026-01-22 18:00:00', 'online', NULL, 7, 'Detalles del evento Smart Cities', FALSE, NULL, 'hackathon10.jpg', "${now}"),
                (1, 'FinTech Revolution', 'Innovación en tecnología financiera', '2026-02-10 09:00:00', '2026-02-17 18:00:00', 'presencial', 'Madrid', 8, 'Detalles del evento FinTech', FALSE, NULL, 'hackathon11.jpg', "${now}"),
                (1, 'GreenTech Hack', 'Hackathon sobre tecnología verde', '2020-03-05 10:00:00', '2020-03-12 18:00:00', 'online', NULL, 9, 'Detalles del evento GreenTech', FALSE, NULL, 'hackathon12.jpg', "${now}"),
                (1, 'EdTech Challenge', 'Innovación en tecnología educativa', '2026-04-01 09:00:00', '2026-04-08 18:00:00', 'presencial', 'Barcelona', 10, 'Detalles del evento EdTech', FALSE, NULL, 'hackathon13.jpg', "${now}"),
                (1, 'Quantum Computing Hack', 'Hackathon de computación cuántica', '2026-05-15 10:00:00', '2026-05-22 18:00:00', 'online', NULL, 12, 'Detalles del evento de computación cuántica', FALSE, NULL, 'hackathon14.jpg', "${now}"),
                (1, 'Automotive AI', 'Inteligencia artificial en automoción', '2026-06-20 09:00:00', '2026-06-27 18:00:00', 'presencial', 'Valencia', 13, 'Detalles del evento Automotive AI', FALSE, NULL, 'hackathon15.jpg', "${now}"),
                (1, '5G & Connectivity', 'Desafío de conectividad y redes 5G', '2026-07-10 10:00:00', '2026-07-17 18:00:00', 'online', NULL, 14, 'Detalles del evento 5G y conectividad', FALSE, NULL, 'hackathon16.jpg', "${now}"),
                (1, 'SpaceTech Innovation', 'Hackathon sobre tecnología espacial', '2026-08-05 09:00:00', '2026-08-12 18:00:00', 'presencial', 'Sevilla', 15, 'Detalles del evento SpaceTech', FALSE, NULL, 'hackathon17.jpg', "${now}"),
                (1, 'LegalTech Challenge', 'Innovación en tecnología legal', '2021-09-01 10:00:00', '2021-09-08 18:00:00', 'online', NULL, 17, 'Detalles del evento LegalTech', FALSE, NULL, 'hackathon18.jpg', "${now}"),
                (1, 'AgriTech Hack', 'Hackathon de tecnología agrícola', '2026-10-15 09:00:00', '2026-10-22 18:00:00', 'presencial', 'Madrid', 18, 'Detalles del evento AgriTech', FALSE, NULL, 'hackathon19.jpg', "${now}"),
                (1, 'GameDev Jam', 'Competencia de desarrollo de videojuegos', '2024-11-10 10:00:00', '2024-11-17 18:00:00', 'online', NULL, 19, 'Detalles del evento GameDev', FALSE, NULL, 'hackathon20.jpg', "${now}");

        `);

        //Tabla hackathonLangs
        await pool.query(`
            INSERT INTO hackathonLangs (programmingLangId, hackathonId, createdAt) VALUES
                (1, 1, "${now}"),  
                (2, 1, "${now}"),  
                (3, 1, "${now}"),  
                (4, 2, "${now}"),  
                (5, 2, "${now}"),  
                (6, 2, "${now}"),  
                (7, 3, "${now}"),  
                (8, 3, "${now}"),  
                (9, 3, "${now}"),  
                (10, 4, "${now}"), 
                (11, 4, "${now}"), 
                (12, 4, "${now}"), 
                (13, 5, "${now}"), 
                (14, 5, "${now}"), 
                (15, 5, "${now}"), 
                (16, 6, "${now}"), 
                (17, 6, "${now}"), 
                (18, 6, "${now}"), 
                (19, 7, "${now}"), 
                (20, 7, "${now}"), 
                (1, 8, "${now}"),  
                (2, 8, "${now}"),  
                (3, 8, "${now}"),  
                (4, 9, "${now}"),  
                (5, 9, "${now}"),  
                (6, 9, "${now}"),  
                (7, 10, "${now}"), 
                (8, 10, "${now}"), 
                (9, 10, "${now}"), 
                (10, 11, "${now}"),
                (11, 11, "${now}"),
                (12, 11, "${now}"),
                (13, 12, "${now}"),
                (14, 12, "${now}"),
                (15, 12, "${now}"),
                (16, 13, "${now}"),
                (17, 13, "${now}"),
                (18, 13, "${now}"),
                (1, 13, "${now}"),  
                (2, 13, "${now}"),  
                (3, 13, "${now}"),  
                (4, 14, "${now}"),  
                (5, 14, "${now}"),  
                (6, 14, "${now}"),  
                (7, 15, "${now}"),  
                (8, 15, "${now}"),  
                (9, 15, "${now}"),  
                (10, 16, "${now}"), 
                (11, 16, "${now}"), 
                (12, 16, "${now}"), 
                (13, 17, "${now}"), 
                (14, 17, "${now}"), 
                (15, 17, "${now}"), 
                (16, 18, "${now}"), 
                (17, 18, "${now}"), 
                (18, 18, "${now}"), 
                (19, 19, "${now}"), 
                (20, 19, "${now}"), 
                (1, 20, "${now}"),  
                (2, 20, "${now}"),  
                (3, 20, "${now}");
        `);

        //Tablas de registros
        await pool.query(`
            INSERT INTO registrations (userId, hackathonId, status, createdAt) VALUES
                (2, 4, "confirmada", "${now}"),
                (3, 1, "confirmada", "${now}"),
                (4, 2, "confirmada", "${now}"),
                (5, 2, "confirmada", "${now}"),
                (6, 2, "confirmada", "${now}"),
                (7, 3, "confirmada", "${now}"),
                (8, 3, "confirmada", "${now}"),
                (9, 3, "confirmada", "${now}"),
                (10, 4, "confirmada", "${now}"),
                (11, 4, "confirmada", "${now}"),
                (12, 4, "confirmada", "${now}"),
                (13, 5, "confirmada", "${now}"),
                (14, 5, "confirmada", "${now}"),
                (15, 5, "confirmada", "${now}"),
                (16, 6, "confirmada", "${now}"),
                (17, 6, "confirmada", "${now}"),
                (18, 6, "confirmada", "${now}"),
                (19, 7, "confirmada", "${now}"),
                (20, 7, "confirmada", "${now}"),
                (2, 8, "confirmada", "${now}"),
                (3, 8, "confirmada", "${now}"),
                (4, 9, "confirmada", "${now}"),
                (5, 9, "confirmada", "${now}"),
                (6, 9, "confirmada", "${now}"),
                (7, 10, "confirmada", "${now}"),
                (8, 10, "confirmada", "${now}"),
                (9, 10, "confirmada", "${now}"),
                (10, 11, "confirmada", "${now}"),
                (11, 11, "confirmada", "${now}"),
                (12, 11, "confirmada", "${now}"),
                (13, 12, "confirmada", "${now}"),
                (14, 12, "confirmada", "${now}"),
                (15, 12, "confirmada", "${now}"),
                (16, 13, "confirmada", "${now}"),
                (17, 13, "confirmada", "${now}"),
                (18, 13, "confirmada", "${now}"),
                (19, 14, "confirmada", "${now}"),
                (20, 14, "confirmada", "${now}"),
                (2, 15, "confirmada", "${now}"),
                (3, 15, "confirmada", "${now}"),
                (4, 15, "confirmada", "${now}"),
                (5, 15, "confirmada", "${now}"),
                (6, 16, "confirmada", "${now}"),
                (7, 16, "confirmada", "${now}"),
                (8, 16, "confirmada", "${now}"),
                (9, 16, "confirmada", "${now}"),
                (10, 16, "confirmada", "${now}"),
                (11, 17, "confirmada", "${now}"),
                (12, 17, "confirmada", "${now}"),
                (13, 17, "confirmada", "${now}"),
                (14, 17, "confirmada", "${now}"),
                (15, 17, "confirmada", "${now}"),
                (16, 18, "confirmada", "${now}"),
                (17, 18, "confirmada", "${now}"),
                (18, 18, "confirmada", "${now}"),
                (19, 18, "confirmada", "${now}"),
                (20, 18, "confirmada", "${now}"),
                (2, 19, "confirmada", "${now}"),
                (3, 19, "confirmada", "${now}"),
                (4, 19, "confirmada", "${now}"),
                (5, 19, "confirmada", "${now}"),
                (6, 20, "confirmada", "${now}"),
                (7, 20, "confirmada", "${now}"),
                (8, 20, "confirmada", "${now}"),
                (9, 20, "confirmada", "${now}"),
                (10, 18, "confirmada", "${now}"),
                (11, 18, "confirmada", "${now}"),
                (12, 18, "confirmada", "${now}"),
                (13, 17, "confirmada", "${now}"),
                (14, 18, "confirmada", "${now}"),
                (15, 19, "confirmada", "${now}"),
                (16, 20, "confirmada", "${now}"),
                (17, 20, "confirmada", "${now}"),
                (18, 20, "confirmada", "${now}"),
                (19, 17, "confirmada", "${now}"),
                (20, 18, "confirmada", "${now}"),
                (7, 2, "confirmada", "${now}"),
                (2, 5, "confirmada", "${now}"),
                (2, 2, "confirmada", "${now}"),
                (2, 12, "confirmada", "${now}"),
                (3, 4, "confirmada", "${now}"),
                (4, 12, "confirmada", "${now}"),
                (5, 18, "confirmada", "${now}");

        `);

        //Tabla de ratings
        await pool.query(`
            INSERT INTO ratings (userId, hackathonId, rating, createdAt) VALUES
                (4, 2, 5, "${now}"),
                (6, 2, 3, "${now}"),
                (11, 4, 4, "${now}"),
                (12, 4, 1, "${now}"),
                (13, 5, 5, "${now}"),
                (14, 5, 4, "${now}"),
                (15, 5, 4, "${now}"),
                (13, 12, 5, "${now}"),
                (14, 12, 5, "${now}"),
                (15, 12, 5, "${now}"),
                (10, 18, 4, "${now}"),
                (11, 18, 2, "${now}"),
                (12, 18, 3, "${now}"),
                (16, 20, 3, "${now}"),
                (17, 20, 3, "${now}"),
                (18, 20, 2, "${now}");
        `);

        //Tabla de podio
        await pool.query(`
            INSERT INTO podium (registrationId, position, createdAt) VALUES
                (4, 1, "${now}"),
                (5, 3, "${now}"),
                (77, 2, "${now}"),
                (9, 3, "${now}"),
                (10, 2, "${now}"),
                (11, 1, "${now}");
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
