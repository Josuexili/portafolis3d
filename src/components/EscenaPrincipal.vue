<template>
  <!-- LOADER -->
  <Loader v-if="!loaded" :progress="progress" />

  <!-- HUD principal -->
  <HudControls v-if="loaded" />
  <HUDHits v-if="loaded" />

  <!-- ESCENA -->
  <a-scene
    v-show="ready"
    physics="gravity: 0; debug: false"
    srgb
    meshopt-decoder-path="/assets/meshopt_decoder.js"
  >
    <!-- 🌌 FONS -->
    <a-entity
      class="modelglb"
      gltf-model="url(/assets/sky_nebula.glb)"
      scale="1000 1000 1000"
      position="-200 -1400 -1000"
      rotation="0 180 0"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 900000; easing: linear"
    ></a-entity>

    <!-- 💡 LLUMS -->
    <a-entity light="type: ambient; color: #ffffff; intensity: 1.6"></a-entity>
    <a-entity
      light="type: directional; color: #ffffff; intensity: 1.4"
      position="5 3 1"
    ></a-entity>
    <a-entity
      light="type: point; color: #00ffcc; intensity: 2"
      position="0 3 3"
    ></a-entity>

    <!-- 🎥 CÀMERA -->
    <a-entity
      id="cameraRig"
      position="0 5 70"
      dynamic-body="mass: 5; shape: sphere; sphereRadius: 1"
      physics-controls="speed: 400; fly: true"
      laser-shooter
    >
      <a-camera
        look-controls="pointerLockEnabled: true"
        near="0.1"
        far="5000"
        fov="80"
      ></a-camera>
    </a-entity>

    <!-- 🪐 PLANETES -->
    <PlanetesGroup :planetes="planetes" />

    <!-- 🔮 PORTALS LLIURES -->
    <PortalGroup :portals="portalsLliures" />

    <!-- 👨‍🚀 ASTRONAUTA -->
    <a-entity
      class="modelglb"
      gltf-model="url(/assets/optimized/astronauta2/astronauta2_final.glb)"
      scale="10 10 10"
      position="40 -25 -35"
      rotation="0 -40 0"
      animation-mixer="clip: *; loop: repeat; crossFadeDuration: 0.4"
      float-suau="speed: 1; amplitude: 0.6"
      explota-en-xoc
      kinematic-body="shape: sphere"
    ></a-entity>
    <a-entity
      text="value: Astronauta; align: center; color: #00ffcc; width: 4"
      position="40 -22 -35"
      scale="2 2 2"
    ></a-entity>

    <!-- 🛰️ ESTACIÓ ESPACIAL -->
    <a-entity
      class="modelglb"
      gltf-model="url(/assets/optimized/space_station/space_station_base.glb)"
      position="800 100 -700"
      rotation="0 180 0"
      scale="60 60 60"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 40000; easing: linear"
      float-suau="speed: 0.4; amplitude: 0.3"
    ></a-entity>
    <a-entity
      text="value: Estació Espacial; align: center; color: #00ffcc; width: 5"
      position="800 170 -700"
      scale="3 3 3"
    ></a-entity>

    <!-- 🚀 CAÇA ESTEL·LAR -->
    <a-entity
      class="modelglb"
      gltf-model="url(/assets/optimized/space_fighter/space_fighter_base.glb)"
      position="-20 -2 -200"
      rotation="0 -90 0"
      scale="2 2 2"
      animation-mixer="clip: *; loop: repeat"
      float-suau="speed: 1.5; amplitude: 0.5"
    ></a-entity>
    <a-entity
      text="value: Caça Estel·lar; align: center; color: #bb00ff; width: 4"
      position="-20 2 -200"
      scale="2 2 2"
    ></a-entity>

    <!-- 🛸 CÀPSULES -->
    <CapsulesGroup :capsules="capsules" />

    <!-- 💬 Missatge central -->
    <!-- 🧭 Títol flotant com abans -->
<div
  class="title-overlay"
>
  <h1>Dispara al centre dels anells</h1>
  <h2>Josuè González</h2>
</div>

  </a-scene>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import './aframe/camera-physics-controls.js';
import './aframe/random-fly.js';
import './aframe/formation-fly.js';
import './aframe/laser-shooter.js';
import './aframe/enter-planet.js';
import './aframe/float-portal.js';

import Loader from './Loader.vue';
import HudControls from './HudControls.vue';
import HUDHits from './HUDHits.vue';
import PortalGroup from './PortalGroup.vue';
import PlanetesGroup from './PlanetesGroup.vue';
import CapsulesGroup from './CapsulesGroup.vue';

const ready = ref(false);
const loaded = ref(false);
const connectionOK = ref(false);
const progress = ref(0);
let pendingModels = 0;
let totalModels = 0;

const planetes = ref([
  {
    id: 'terra',
    nom: 'Terra',
    model: '/assets/optimized/terra/terra_base.glb',
    pos: '-1000 -1000 -2500',
    rotation: '0 40 0',
    scale: '0.5 0.5 0.5',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 16000; easing: linear',
    textColor: '#00ffcc',
  },
  {
    id: 'mart',
    nom: 'Mart',
    model: '/assets/optimized/mart/mart_base.glb',
    pos: '1300 -200 -1000',
    rotation: '10 25 0',
    scale: '0.02 0.02 0.02',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 17000; easing: linear',
    textColor: '#bb00ff',
  },
  {
    id: 'venus',
    nom: 'Venus',
    model: '/assets/optimized/venus/venus_base.glb',
    pos: '-2000 10.5 -4000',
    rotation: '0 -35 15',
    scale: '500 500 500',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 19000; easing: linear',
    textColor: '#00ffcc',
  },
  {
    id: 'jupiter',
    nom: 'Júpiter',
    model: '/assets/optimized/jupiter/jupiter_base.glb',
    pos: '300 400 -800',
    rotation: '0 10 0',
    scale: '0.5 0.5 0.5',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 25000; easing: linear',
    textColor: '#cc00ff',
  },
  {
    id: 'neptuno',
    nom: 'Neptú',
    model: '/assets/optimized/neptuno/neptuno_base.glb',
    pos: '1000 1.5 -3000',
    rotation: '-10 50 0',
    scale: '1 1 1',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 23000; easing: linear',
    textColor: '#00bbff',
  },
  {
    id: 'mercurio',
    nom: 'Mercuri',
    model: '/assets/optimized/mercurio_v1.1/mercurio_v1.1_base.glb',
    pos: '-1500 500 -1200',
    rotation: '0 90 0',
    scale: '1 1 1',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 12000; easing: linear',
    textColor: '#ffaa00',
  },
  {
    id: 'corot',
    nom: 'Corot-7c',
    model: '/assets/optimized/corot/corot_base.glb',
    pos: '-800 -100 -600',
    rotation: '-15 15 0',
    scale: '0.1 0.1 0.1',
    anim: 'property: rotation; to: 0 360 0; loop: true; dur: 15000; easing: linear',
    textColor: '#ff3300',
  },
]);

const portalsLliures = [
  {
    pos: '500 200 -800',
    url: 'https://josuegs.netlify.app',
    color: '#00ffff',
    radius: 80,
  },
  {
    pos: '-1200 -400 -2500',
    url: 'https://josuegs.netlify.app',
    color: '#ff00ff',
    radius: 120,
  },
  {
    pos: '2000 300 -1800',
    url: 'https://josuegs.netlify.app',
    color: '#ffaa00',
    radius: 100,
  },
  {
    pos: '-600 100 -400',
    url: 'https://josuegs.netlify.app',
    color: '#00ff99',
    radius: 60,
  },
];

const capsules = [
  { pos: '-400 40 -240', rotation: '0 30 0', scale: '20 20 20' },
  { pos: '-360 40 -200', rotation: '0 -10 0', scale: '20 20 20' },
  { pos: '-320 40 -220', rotation: '0 45 0', scale: '20 20 20' },
  { pos: '-280 40 -260', rotation: '0 -45 0', scale: '20 20 20' },
];

function checkFullyLoaded() {
  if (pendingModels > 0) {
    const loadedCount = totalModels - pendingModels;
    progress.value = Math.floor((loadedCount / totalModels) * 100);
  } else {
    progress.value = 100;
    if (connectionOK.value) loaded.value = true;
  }
}

async function checkConnection() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    connectionOK.value = response.ok;
  } catch {
    connectionOK.value = true;
  }
  setTimeout(checkFullyLoaded, 200);
}

onMounted(() => {
  ready.value = true;
  const models = document.querySelectorAll('.modelglb');
  pendingModels = models.length;
  totalModels = models.length;
  models.forEach((m) => {
    if (!m.hasAttribute('material'))
      m.setAttribute('material', 'color: #ffffff');
    m.addEventListener('model-loaded', () => {
      pendingModels--;
      checkFullyLoaded();
    });
  });
  document
    .querySelector('a-scene')
    ?.addEventListener('loaded', checkFullyLoaded);
  checkConnection();
});
</script>

<style scoped>
a-scene {
  width: 100vw;
  height: 100vh;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #00ffcc;
  font-family: 'Orbitron', sans-serif;
}
.spinner {
  width: 64px;
  height: 64px;
  border: 6px solid rgba(0, 255, 204, 0.3);
  border-top-color: #00ffcc;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin-bottom: 20px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.hud-controls {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #00ffcc;
  padding: 1rem 1.4rem;
  border-radius: 12px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 255, 204, 0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
  pointer-events: none;
}
.title-overlay {
  position: fixed;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #00ffcc;
  text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
  z-index: 1000;
  user-select: none;
  pointer-events: none;
  animation: fadeIn 2s ease-out;
  opacity: 0.9;
}

.title-overlay h1 {
  font-size: 1.6rem;
  letter-spacing: 1px;
  margin: 0;
  font-weight: 600;
}

.title-overlay h2 {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.7;
  margin-top: 0.2rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 0.9;
    transform: translate(-50%, 0);
  }
}

</style>
