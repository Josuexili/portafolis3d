<template>
  <div class="perf-hud">
    <div>⚙️ CPU: <span>{{ cpu }}</span>%</div>
    <div>🧠 Memòria: <span>{{ memory }}</span> MB</div>
    <div>📶 Internet: <span>{{ latency }}</span> ms</div>
    <div>🎮 FPS: <span>{{ fps }}</span></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cpu = ref('-')
const memory = ref('-')
const latency = ref('-')
const fps = ref('-')

onMounted(() => {
  let lastFrame = performance.now()
  let netLatency = 0

  async function pingLatency() {
    const start = performance.now()
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts/1', { cache: 'no-store' })
      netLatency = performance.now() - start
    } catch {
      netLatency = 999
    }
    latency.value = netLatency.toFixed(0)
  }

  function updateStats() {
    const now = performance.now()
    const frameTime = now - lastFrame
    lastFrame = now
    fps.value = (1000 / frameTime).toFixed(0)

    const mem = performance.memory
      ? (performance.memory.usedJSHeapSize / 1048576).toFixed(0)
      : 'N/A'
    memory.value = mem

    const cpuEstimate = Math.min(100, Math.round(fps.value < 55 ? (60 - fps.value) * 3 : 20))
    cpu.value = cpuEstimate

    requestAnimationFrame(updateStats)
  }

  setInterval(pingLatency, 2000)
  requestAnimationFrame(updateStats)
})
</script>

<style scoped>
.perf-hud {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #00ffcc;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85rem;
  padding: 8px 10px;
  border-radius: 8px;
  line-height: 1.4;
  border: 1px solid rgba(0, 255, 204, 0.4);
  z-index: 9999;
  text-align: right;
  transition: opacity 0.3s ease;
}
</style>
