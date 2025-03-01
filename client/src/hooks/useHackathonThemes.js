import { useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env;

//Funcion que obtinene los temas de los hackathones
const useHackathonThemes = () => {
    const [hackathonThemes, setHackathonThemes] = useState([]);

    useEffect(() => {
        const fetchHackathonThemes = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/api/hackathon/hackathones/themes`
                );
                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setHackathonThemes(body.data.hackathonesThemes);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchHackathonThemes();
    }, []);
    return hackathonThemes;
};

export default useHackathonThemes;
