import { useEffect, useState } from 'react';

//Importamos la direccion d ela api
const { VITE_API_URL } = import.meta.env;

//Funcion que obtiene las tematicas d eun hackathon
const useHackathonLangs = () => {
    const [hackathon, setHackathon] = useState(null);

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/hackathon/hackathones/details/1`
                );
                const body = await response.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setHackathon(body.data.hackathon);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchHackathon();
    }, []);
    return { hackathon };
};

export default useHackathonLangs;
