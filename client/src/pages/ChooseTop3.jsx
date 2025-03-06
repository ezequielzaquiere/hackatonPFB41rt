
import * as React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import toast from "react-hot-toast";

const ChooseTop3 = () => {

    const navigate = useNavigate();

    const [participants, setParticipants] = React.useState([]);

    const hackathon = useParams();
    

    React.useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}/api/hackathon/${hackathon.hackathonId}/participants/private`);
                const data = await response.json();
                setParticipants(data.data.hackathonUsers); // Assuming API returns an array
                console.log(data)
            } catch (err) {
                toast.error("Ha habido un fallo al obtener los usuarios registrados.");
            };
        };

        fetchParticipants();
    }, [hackathon.hackathonId]);

    const AssignWinners = ({ participants }) => {
        const [firstPlace, setFirstPlace] = React.useState("");
        const [secondPlace, setSecondPlace] = React.useState("");
        const [thirdPlace, setThirdPlace] = React.useState("");
    
        const handleSelection = (place, value) => {
            if (place === "first") setFirstPlace(value);
            if (place === "second") setSecondPlace(value);
            if (place === "third") setThirdPlace(value);
        };
        

        const handleSubmit = async (firstPlace, secondPlace, thirdPlace) => {

            const podiumData = {
                first: Number(firstPlace),
                second: Number(secondPlace),
                third: 3,
            };

            try {
                const response = await fetch(`http://localhost:8800/api/hackathon/${hackathon.hackathonId}/publish`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(podiumData)
                });

                const result = await response.json();
                console.log("API Response:", result);

                if (result.status === "ok") {
                    toast.success(result.message);
                    navigate("/");
                } else {
                    toast.error("Error al enviar datos: " + result.message);
                }
            } catch (error) {
                toast.error("Error al enviar datos:", error);
            }
        };
    
        const filteredParticipants = (selected) =>
            participants.filter((list) => ![Number(firstPlace), Number(secondPlace), Number(thirdPlace)].includes(list.userId) || list.userId === selected);

 
        return (
            <div>
                <div>
    
                </div>
                <div>
                    <label>Primer puesto:</label>
                    <select value={firstPlace} onChange={(e) => handleSelection("first", e.target.value)}>
                        <option value=""></option>
                        {filteredParticipants(firstPlace).map((participant) => (
                            <option key={participant.id} value={participant.id}>{participant.username}</option>
                        ))}
                    </select>
                    <label>Segundo puesto:</label>
                    <select value={secondPlace} onChange={(e) => handleSelection("second", e.target.value)}>
                        <option value=""></option>
                        {filteredParticipants(secondPlace).map((participant) => (
                            <option key={participant.id} value={participant.id}>{participant.username}</option>
                        ))}
                    </select>
                    <label>Tercer puesto:</label>
                    <select value={thirdPlace} onChange={(e) => handleSelection("third", e.target.value)}>
                        <option value=""></option>
                        {filteredParticipants(thirdPlace).map((participant) => (
                            <option key={participant.id} value={participant.id}>{participant.username}</option>
                        ))}
                    </select>
    
                </div>
                <div>
                    <button onClick={() =>
                                    handleSubmit(firstPlace, secondPlace, thirdPlace)
                                }> Enviar

                    </button>
                </div>
                
            </div>
        );
    
    };

    

    return (
        <AssignWinners participants={participants}/>
    );

};

export default ChooseTop3;