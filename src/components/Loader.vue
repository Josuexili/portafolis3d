<template>
  <div class="loader">
    <div class="spinner"></div>
    <p>Carregant univers... {{ progress }}%</p>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
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
</style>
