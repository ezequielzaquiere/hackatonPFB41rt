import { useState, useEffect } from 'react';

const useHackathonesFromToday = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    'http://localhost:7000/api/hackathon/hackathones/fromToday'
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

export default useHackathonesFromToday;
