import { useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env;
const useHackathon = (hackathonId) => {
    const [hackathon, setHackathon] = useState('');

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/hackathon/hackathones/details/${hackathonId}`
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
    }, [hackathonId]);
    return { hackathon };
};

export default useHackathon;
