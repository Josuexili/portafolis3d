<template>
  <div class="hud-hits">
    <p>
      Tirs encertats:
      <strong>{{ hits }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// valor reactiu compartit (es pot substituir per un event global o store més endavant)
const hits = ref(0)

// permet que altres scripts actualitzin el comptador amb window.dispatchEvent
onMounted(() => {
  window.addEventListener('portal-hit', () => {
    hits.value++
  })
})
</script>

<style scoped>
.hud-hits {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #00ffcc;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  border: 1px solid rgba(0, 255, 204, 0.4);
  backdrop-filter: blur(6px);
  z-index: 10000;
  pointer-events: none;
  text-shadow: 0 0 8px #00ffcc;
}
.hud-hits strong {
  color: #00ffcc;
  font-size: 1.2rem;
}
</style>
