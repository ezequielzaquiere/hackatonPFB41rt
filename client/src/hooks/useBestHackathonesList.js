import { useState, useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;

const useBestHackathonesList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/hackathon/hackathones/bestHackathones`
                );
                if (!response.ok) {
                    throw new Error(
                        'Network response was not ok ' + response.statusText
                    );
                }
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        getData();
    }, []);
    return data;
};

export default useBestHackathonesList;
