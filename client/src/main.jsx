//Importamos la función createRoot o etiqueta rai de HTML
import { createRoot } from 'react-dom/client';

//Importamos los componentes
import { StrictMode } from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

//Importamos estilos
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
