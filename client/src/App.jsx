import { Routes, Route } from 'react-router-dom';

{
    /* Importacion de paginas */
}
import NewHackathonPage from './pages/NewHackathonPage';
function App() {
    return (
        <>
            <h1 className="text-red-500">Vite + React</h1>
            <Routes>
                <Route path="/hackathon/new" element={<NewHackathonPage />} />
            </Routes>
        </>
    );
}

export default App;
