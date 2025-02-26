import useHackathon from '../hooks/useHackathon';
import { useParams } from 'react-router-dom';

const DetailHackathonPage = () => {
    const { hackathonId } = useParams();
    const { hackathon } = useHackathon(hackathonId);
    // Nos aseguramos que el hackathon existe antes de cargar el contenido
    hackathon && (
        <h2> Página con detalles del hackahton con id {hackathonId} </h2>
    );
    // info del hackathon
    return (
        <div className="hackathon-detail">
            <ul>
                <li>Tutulo:{hackathon.title}</li>
                <li>Detalles:{hackathon.summary}</li>
                <li>
                    Fecha:{' '}
                    {new Date(hackathon.startingDate).toLocaleDateString()}
                </li>
            </ul>
        </div>
    );
};

export default DetailHackathonPage;
