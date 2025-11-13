// ✅ 1) Meshopt PRIMER
import './components/aframe/aframe-meshopt-setup.js';

// ✅ 2) A-Frame després
import 'aframe';
import 'aframe-physics-system';

// ✅ 3) Vue App
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
