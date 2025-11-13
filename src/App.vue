<template>
  <div>
    <h1 class="title">Portafolis 3D – {{ nom }}</h1>

    <!-- 📊 MONITOR DE RENDIMENT -->
    <PerformanceHud />

    <div v-if="mostrarPanel" class="panel" v-html="panelText"></div>
    <EscenaPrincipal ref="escena" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EscenaPrincipal from './components/EscenaPrincipal.vue'
import PerformanceHud from './components/PerformanceHud.vue'

const nom = 'Josuè González'
const mostrarPanel = ref(false)
const panelText = ref('')
const escena = ref(null)

onMounted(() => {
  console.log('✅ App inicialitzada — Escena principal carregada correctament')
})
</script>
