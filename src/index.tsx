import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ROOT_ID = 'root';

let container = document.getElementById(ROOT_ID);

if (!container) {
    container = document.createElement('div');
    container.id = ROOT_ID
    document.body.appendChild(container);
}

const root = createRoot(container);
root.render(<App />);
