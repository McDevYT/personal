import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DataProvider } from './DataContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </StrictMode>
);
