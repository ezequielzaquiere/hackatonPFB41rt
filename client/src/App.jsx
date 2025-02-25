import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
function App() {
    return (
        <>
            <h1 className="text-red-500">Vite + React</h1>

            <Routes>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
