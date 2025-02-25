import { Routes, Route } from 'react-router-dom';


//Importacion de paginas 
import NewHackathonPage from './pages/NewHackathonPage';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <h1 className="text-red-500">Vite + React</h1>

            <Routes>
                <Route path="/hackathon/new" element={<NewHackathonPage />} />


                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    );
}

export default App;
