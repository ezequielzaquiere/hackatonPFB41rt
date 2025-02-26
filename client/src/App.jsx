//Importamos los componentes
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

//Importamos las páginas
import HomePage from './pages/HomePage';
import NewHackathonPage from './pages/NewHackathonPage';
import NotFound from './pages/NotFound';

//Definimos el componente principal
const App = () => {
    return (
        <>
            <Header />

            {/* Aquí va el Toaster */}

            {/* Aquí irán los endpoints dentro del componente Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hackathon/new" element={<NewHackathonPage />} />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
