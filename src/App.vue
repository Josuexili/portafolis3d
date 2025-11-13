<template>
  <div>
    <h1 class="title">Portafolis 3D – {{ nom }}</h1>

    <!-- Monitor de rendiment -->
    <PerformanceHud />

    <div v-if="mostrarPanel" class="panel" v-html="panelText"></div>

    <EscenaPrincipal ref="escena" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EscenaPrincipal from './components/EscenaPrincipal.vue'
import PerformanceHud from './components/performanceHud.vue'

const nom = 'Josuè González'
const mostrarPanel = ref(false)
const panelText = ref('')
const escena = ref(null)

onMounted(() => {
  console.log('App inicialitzada — Escena principal carregada correctament')
})
</script>

<style scoped>
/* Els teus estils aquí */
</style>
