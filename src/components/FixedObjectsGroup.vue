<template>

  <!-- 🛰️ ESTACIÓ ESPACIAL -->
  <EstacioEspacial
    :model="'/assets/optimized/space_station/space_station_base.glb'"
    :pos="'800 100 -700'"
    :rotation="'0 180 0'"
    :scale="'60 60 60'"
    :anim="'property: rotation; to: 0 360 0; loop: true; dur: 40000; easing: linear'"
    :textColor="'#00ffcc'"
    :nom="'Estació Espacial'"
  />

  <!-- 🚀 CAÇA ESTEL·LAR -->
  <Fighter
    :nom="'Caça Estel·lar'"
    model="/assets/optimized/space_fighter/space_fighter_base.glb"
    pos="-20 -2 -200"
    rotation="0 -90 0"
    scale="2 2 2"
    textColor="#bb00ff"
  />
</template>

<script setup>
import EstacioEspacial from './EstacioEspacial.vue'
import Fighter from './fighter.vue'
</script>
