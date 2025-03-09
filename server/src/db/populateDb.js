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
            INSERT INTO users (username, firstName, lastName, email, password, role, active, createdAt) VALUES
                ('user1', 'John', 'Doe', 'john.doe@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user2', 'Jane', 'Smith', 'jane.smith@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user3', 'Mike', 'Brown', 'mike.brown@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user4', 'Emily', 'Davis', 'emily.davis@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user5', 'Chris', 'Wilson', 'chris.wilson@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user6', 'Pat', 'Johnson', 'pat.johnson@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user7', 'Alex', 'Martinez', 'alex.martinez@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user8', 'Sam', 'Lopez', 'sam.lopez@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user9', 'Jordan', 'White', 'jordan.white@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user10', 'Taylor', 'Harris', 'taylor.harris@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user11', 'Casey', 'Clark', 'casey.clark@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user12', 'Jamie', 'Lewis', 'jamie.lewis@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user13', 'Morgan', 'Young', 'morgan.young@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user14', 'Drew', 'Allen', 'drew.allen@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user15', 'Taylor', 'King', 'taylor.king@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user16', 'Robin', 'Scott', 'robin.scott@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user17', 'Blake', 'Hall', 'blake.hall@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user18', 'Charlie', 'Adams', 'charlie.adams@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user19', 'Alexis', 'Baker', 'alexis.baker@example.com', '${usersHashedPass}', 'dev', 1, '${now}'),
                ('user20', 'Parker', 'Gonzalez', 'parker.gonzalez@example.com', '${usersHashedPass}', 'dev', 1, '${now}');
        `);

        //Lista hackathones
        await pool.query(`
            INSERT INTO hackathonList (userId, title, summary, startingDate, deadline, type, location, themeId, details, attachedFile, image, createdAt) VALUES
                (1, 'Hackathon AI', 'Competencia de IA', '2025-04-12 18:00:00', '2025-04-19 18:00:00', 'online', NULL, 1, 'Detalles del hackathon AI', NULL, 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Wikimania_hackathon_2.JPG', "${now}"),
                (1, 'Blockchain Challenge', 'Desafío de Blockchain', '2010-05-01 09:00:00', '2010-05-10 18:00:00', 'presencial', 'Madrid', 4, 'Detalles del evento de blockchain', NULL, 'https://eventoociomadrid.com/wp-content/uploads/2023/07/Hackathon-que-es.jpg', "${now}"),
                (1, 'Ciberseguridad 2025', 'Prueba de ciberseguridad', '2025-06-15 10:00:00', '2025-06-22 18:00:00', 'online', NULL, 3, 'Detalles del hackathon de ciberseguridad', NULL, 'https://res.cloudinary.com/devex/image/fetch/https://lh4.googleusercontent.com/VQyrPPyh-FGdV2BJtlcwDphesnxERD6SLWvGtARygLDVNSsXhFF0kzG_yXvLyiARZbKIG3VYF_CIbF4_B-Wy3Eu7kKhHKKR3pq_2ob2pdZgxt_Wz_uqXjRMrhIBKREQnJo--Ui9b', "${now}"),
                (1, 'Big Data Analytics', 'Concurso de Big Data', '2017-07-05 14:00:00', '2017-07-12 18:00:00', 'presencial', 'Barcelona', 5, 'Detalles del evento de Big Data', NULL, 'https://innovaromorir.com/wp-content/uploads/2022/12/Hackathon_TLV_2013.jpg', "${now}"),
                (1, 'Desarrollo Web Express', 'Hackathon de desarrollo web', '2019-08-20 08:00:00', '2019-08-27 18:00:00', 'online', NULL, 2, 'Detalles del evento de desarrollo web', NULL, 'https://edison365.com/wp-content/uploads/2022/03/How-do-hackathons-work.png', "${now}"),
                (1, 'IoT Innovation', 'Competencia de IoT', '2025-09-10 10:00:00', '2025-09-17 18:00:00', 'online', NULL, 11, 'Detalles del hackathon IoT', NULL, 'https://www.madebywifi.com/wp-content/uploads/2018/01/internet-for-hackatons-1024x480.jpg', "${now}"),
                (1, 'MedTech Revolution', 'Innovaciones en tecnología médica', '2025-10-01 09:00:00', '2025-10-08 18:00:00', 'presencial', 'Valencia', 16, 'Detalles del evento de MedTech', NULL, 'https://www.acceptmission.com/wp-content/uploads/2021/11/techcrunch-hackathon.png.webp', "${now}"),
                (1, 'Cyber Defenders', 'Hackathon de ciberseguridad avanzada', '2025-11-01 10:00:00', '2025-11-08 18:00:00', 'online', NULL, 3, 'Detalles de ciberseguridad avanzada', NULL, 'https://www.viladecans.cat/sites/default/files/styles/full-16-9/public/hackathon2.jpg?itok=sT1cANvR', "${now}"),
                (1, 'VR Future', 'Desafío de realidad virtual', '2025-12-05 10:00:00', '2025-12-12 18:00:00', 'presencial', 'Sevilla', 6, 'Detalles del evento de realidad virtual', NULL, 'https://imgs.search.brave.com/0_gREqVJ_q6wAkn43sdlO8zQUSFzJtQ4ExrIYuJuO3A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/Zm90b2dyYWZvLW1p/cmFuZG8tZm90b18y/My0yMTQ4MDE5MTc5/LmpwZz9zZW10PWFp/c19oeWJyaWQ', "${now}"),
                (1, 'Smart Cities Challenge', 'Hackathon sobre ciudades inteligentes', '2026-01-15 10:00:00', '2026-01-22 18:00:00', 'online', NULL, 7, 'Detalles del evento Smart Cities', NULL, 'https://hackathonspain.com/wp-content/uploads/2017/07/Difundir-hackathon-online-Hackathon-Spain.jpg', "${now}"),
                (1, 'FinTech Revolution', 'Innovación en tecnología financiera', '2026-02-10 09:00:00', '2026-02-17 18:00:00', 'presencial', 'Madrid', 8, 'Detalles del evento FinTech', NULL, 'https://www.endesa.com/content/dam/endesa-com/home/las-ciudades-inteligentes/Digitalizacion/hackathon_retos_industriales.jpg', "${now}"),
                (1, 'GreenTech Hack', 'Hackathon sobre tecnología verde', '2020-03-05 10:00:00', '2020-03-12 18:00:00', 'online', NULL, 9, 'Detalles del evento GreenTech', NULL, 'https://eurekaemprende.com/wp-content/uploads/2025/01/Diseno-sin-titulo-31.jpg', "${now}"),
                (1, 'EdTech Challenge', 'Innovación en tecnología educativa', '2026-04-01 09:00:00', '2026-04-08 18:00:00', 'presencial', 'Barcelona', 10, 'Detalles del evento EdTech', NULL, 'https://uf3ceu.es/wp-content/uploads/hackathon-ceu-partyrock.jpg', "${now}"),
                (1, 'Quantum Computing Hack', 'Hackathon de computación cuántica', '2026-05-15 10:00:00', '2026-05-22 18:00:00', 'online', NULL, 12, 'Detalles del evento de computación cuántica', NULL, 'https://cdn.prod.website-files.com/646caab5700fe0d1824a61b9/65170c1e01c86d489de784dd_hackathon.png', "${now}"),
                (1, 'Automotive AI', 'Inteligencia artificial en automoción', '2026-06-20 09:00:00', '2026-06-27 18:00:00', 'presencial', 'Valencia', 13, 'Detalles del evento Automotive AI', NULL, 'https://www.vectara.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fp0pvmro2%2Fproduction%2F5d53d465612d1379bfa67c0aa16b2c7af51cb5cb-1792x1024.jpg%3Frect%3D0%2C6%2C1792%2C1013%26w%3D1408%26h%3D796%26q%3D90%26fit%3Dcrop%26auto%3Dformat&w=1920&q=100', "${now}"),
                (1, '5G & Connectivity', 'Desafío de conectividad y redes 5G', '2026-07-10 10:00:00', '2026-07-17 18:00:00', 'online', NULL, 14, 'Detalles del evento 5G y conectividad', NULL, 'https://www.dcu.ie/sites/default/files/styles/user_defined/public/staff/2024-10/hackathon-1.jpg?itok=XI9GnfZ_', "${now}"),
                (1, 'SpaceTech Innovation', 'Hackathon sobre tecnología espacial', '2026-08-05 09:00:00', '2026-08-12 18:00:00', 'presencial', 'Sevilla', 15, 'Detalles del evento SpaceTech', NULL, 'https://cdn.theatlantic.com/thumbor/uAIq0JxGpYJ5hH-MetfoO42JGoc=/0x33:3477x1989/960x540/media/img/mt/2015/07/22_image/original.jpg', "${now}"),
                (1, 'LegalTech Challenge', 'Innovación en tecnología legal', '2021-09-01 10:00:00', '2021-09-08 18:00:00', 'online', NULL, 17, 'Detalles del evento LegalTech', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Gb40HM7clX1h0q9D7fs0TS3ONunukP580Q&s', "${now}"),
                (1, 'AgriTech Hack', 'Hackathon de tecnología agrícola', '2026-10-15 09:00:00', '2026-10-22 18:00:00', 'presencial', 'Madrid', 18, 'Detalles del evento AgriTech', NULL, 'https://www.criptonoticias.com/wp-content/uploads/2022/10/hackathon-web3-desarrolladores-750x375.jpg', "${now}"),
                (1, 'GameDev Jam', 'Competencia de desarrollo de videojuegos', '2024-11-10 10:00:00', '2024-11-17 18:00:00', 'online', NULL, 19, 'Detalles del evento GameDev', NULL, 'https://static.smartgridsinfo.es/media/2017/04/evento-Ennomotive-Hackathon-for-Industry.png', "${now}");

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
                (1, 1, "confirmada", "${now}"),
                (2, 1, "pendiente", "${now}"),
                (3, 1, "confirmada", "${now}"),
                (4, 2, "cancelada", "${now}"),
                (5, 2, "confirmada", "${now}"),
                (6, 2, "pendiente", "${now}"),
                (7, 3, "confirmada", "${now}"),
                (8, 3, "pendiente", "${now}"),
                (9, 3, "cancelada", "${now}"),
                (10, 4, "confirmada", "${now}"),
                (11, 4, "pendiente", "${now}"),
                (12, 4, "confirmada", "${now}"),
                (13, 5, "cancelada", "${now}"),
                (14, 5, "pendiente", "${now}"),
                (15, 5, "confirmada", "${now}"),
                (16, 6, "confirmada", "${now}"),
                (17, 6, "pendiente", "${now}"),
                (18, 6, "cancelada", "${now}"),
                (19, 7, "confirmada", "${now}"),
                (20, 7, "pendiente", "${now}"),
                (1, 8, "cancelada", "${now}"),
                (2, 8, "confirmada", "${now}"),
                (3, 8, "pendiente", "${now}"),
                (4, 9, "confirmada", "${now}"),
                (5, 9, "pendiente", "${now}"),
                (6, 9, "cancelada", "${now}"),
                (7, 10, "confirmada", "${now}"),
                (8, 10, "pendiente", "${now}"),
                (9, 10, "confirmada", "${now}"),
                (10, 11, "cancelada", "${now}"),
                (11, 11, "pendiente", "${now}"),
                (12, 11, "confirmada", "${now}"),
                (13, 12, "confirmada", "${now}"),
                (14, 12, "pendiente", "${now}"),
                (15, 12, "cancelada", "${now}"),
                (16, 13, "confirmada", "${now}"),
                (17, 13, "pendiente", "${now}"),
                (18, 13, "confirmada", "${now}"),
                (19, 14, "cancelada", "${now}"),
                (20, 14, "confirmada", "${now}"),
                (1, 15, "confirmada", "${now}"),
                (2, 15, "pendiente", "${now}"),
                (3, 15, "confirmada", "${now}"),
                (4, 15, "cancelada", "${now}"),
                (5, 15, "confirmada", "${now}"),
                (6, 16, "pendiente", "${now}"),
                (7, 16, "confirmada", "${now}"),
                (8, 16, "pendiente", "${now}"),
                (9, 16, "cancelada", "${now}"),
                (10, 16, "confirmada", "${now}"),
                (11, 17, "pendiente", "${now}"),
                (12, 17, "confirmada", "${now}"),
                (13, 17, "cancelada", "${now}"),
                (14, 17, "pendiente", "${now}"),
                (15, 17, "confirmada", "${now}"),
                (16, 18, "confirmada", "${now}"),
                (17, 18, "pendiente", "${now}"),
                (18, 18, "cancelada", "${now}"),
                (19, 18, "confirmada", "${now}"),
                (20, 18, "pendiente", "${now}"),
                (1, 19, "confirmada", "${now}"),
                (2, 19, "pendiente", "${now}"),
                (3, 19, "cancelada", "${now}"),
                (4, 19, "confirmada", "${now}"),
                (5, 19, "pendiente", "${now}"),
                (6, 20, "cancelada", "${now}"),
                (7, 20, "confirmada", "${now}"),
                (8, 20, "pendiente", "${now}"),
                (9, 20, "confirmada", "${now}"),
                (10, 20, "cancelada", "${now}"),
                (11, 15, "confirmada", "${now}"),
                (12, 16, "pendiente", "${now}"),
                (13, 17, "cancelada", "${now}"),
                (14, 18, "confirmada", "${now}"),
                (15, 19, "pendiente", "${now}"),
                (16, 20, "confirmada", "${now}"),
                (17, 15, "cancelada", "${now}"),
                (18, 16, "confirmada", "${now}"),
                (19, 17, "pendiente", "${now}"),
                (20, 18, "confirmada", "${now}"),
                (1, 2, "confirmada", "${now}"),
                (2, 5, "confirmada", "${now}"),
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
                (12, 4, 3, "${now}"),
                (13, 5, 5, "${now}"),
                (14, 5, 4, "${now}"),
                (15, 5, 3, "${now}"),
                (13, 12, 3, "${now}"),
                (14, 12, 5, "${now}"),
                (15, 12, 4, "${now}"),
                (10, 18, 4, "${now}"),
                (11, 18, 3, "${now}"),
                (12, 18, 5, "${now}"),
                (16, 20, 4, "${now}"),
                (17, 20, 3, "${now}"),
                (18, 20, 5, "${now}");
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
