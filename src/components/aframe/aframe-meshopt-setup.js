// aframe-meshopt-setup.js
import { MeshoptDecoder } from 'meshoptimizer';

let decoderApplied = false;

function applyDecoder() {
  if (decoderApplied) return;

  if (
    window.THREE &&
    window.THREE.GLTFLoader &&
    typeof window.THREE.GLTFLoader.prototype.setMeshoptDecoder === 'function'
  ) {
    window.THREE.GLTFLoader.prototype.setMeshoptDecoder(MeshoptDecoder);
    decoderApplied = true;
    console.log('✅ MeshoptDecoder aplicat correctament');
  }
}

// 1) Intent immediat
applyDecoder();

// 2) Observador per si A-Frame l'inicialitza més tard
const observer = new MutationObserver(() => {
  applyDecoder();
  if (decoderApplied) observer.disconnect();
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// 3) Fallback després del load del navegador
window.addEventListener('load', () => {
  setTimeout(applyDecoder, 50);
});
