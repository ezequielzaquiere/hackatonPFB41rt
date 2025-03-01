import useHackathon from '../hooks/useHackathon';
import { useParams } from 'react-router-dom';

const DetailHackathonPage = () => {
    const { hackathonId } = useParams();
    const { hackathon } = useHackathon(hackathonId);

    // Nos aseguramos que el hackathon existe antes de cargar el contenido
    if (!hackathon) return <p>Loading...</p>;

    // info del hackathon
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white items-center justify-center">
            <div className="bg-white shadow-lg rounded-2x1 p-3 max-w-md w-full border border-gray-200 text-gray-800">
                <div className="flex items-center space-x-4">
                    <img
                        src={hackathon.image}
                        alt={hackathon.title}
                        className="w-50 h-50 min-w-[48px] min-h-[48px] rounded-full border border-gray-300"
                    />
                    <h2 className="text-xl font-bold">{hackathon.title}</h2>
                </div>
                <p className="text-gray-600 mt-5">{hackathon.summary}</p>
                <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Fecha:</span>{' '}
                    {new Date(hackathon.startingDate).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default DetailHackathonPage;
