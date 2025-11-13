<template>
  <div class="hud-controls">
    <h3>Comandaments</h3>
    <p><strong>W / A / S / D</strong> — Mou-te</p>
    <p><strong>Ratolí</strong> — Mira</p>
    <p><strong>Espai</strong> — Disparar</p>
    <p><strong>CntlL</strong> — Accelerar</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hud-controls {
  position: fixed;
  bottom: 0.8rem;
  left: 0.8rem;
  background: rgba(0, 0, 0, 0.45);
  color: #00ffcc;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  line-height: 1.1;
  border: 1px solid rgba(0, 255, 204, 0.25);
  backdrop-filter: blur(3px);
  z-index: 10000;
  pointer-events: none;
  max-width: 180px;
}

.hud-controls h3 {
  margin: 0 0 0.3rem;
  font-size: 0.8rem;
  text-shadow: 0 0 4px #00ffcc;
}


</style>
