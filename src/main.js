// 0) Meshopt primer (si el fas servir)
import './components/aframe/aframe-meshopt-setup.js';

// 1) Carregar A-Frame i exposar-lo al global (IMPORTANT per Vercel i Vite)
import AFRAME from 'aframe';
window.AFRAME = AFRAME;

// 2) Afegir plugins DESPRÉS d’haver exposat AFRAME
import 'aframe-physics-system';
import 'aframe-extras';

// 3) Iniciar Vue
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
