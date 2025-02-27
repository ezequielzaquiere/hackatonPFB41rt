import { useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env;

//Funcion que obtinene los lenguajes de los hackathones
const useHackathonLangs = () => {
    const [hackathonLangs, setHackathonLangs] = useState([]);

    useEffect(() => {
        const fetchHackathonLangs = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/api/hackathon/hackathones/langs`
                );
                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setHackathonLangs(body.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchHackathonLangs();
    }, []);
    return hackathonLangs;
};

export default useHackathonLangs;
