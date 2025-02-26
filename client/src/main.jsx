//Importamos la función createRoot o etiqueta rai de HTML
import { createRoot } from 'react-dom/client';

//Importamos los componentes
import { StrictMode } from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

//Importamos estilos
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
