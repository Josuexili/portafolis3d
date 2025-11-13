<template>
  <Planeta
    v-for="(p, i) in planetes"
    :key="`planet-${i}`"
    :nom="p.nom"
    :model="p.model"
    :pos="p.pos"
    :rotation="p.rotation"
    :scale="p.scale"
    :anim="p.anim"
    :textColor="p.textColor"
  />
</template>

<script setup>
import Planeta from './planeta.vue'

defineProps({
  planetes: {
    type: Array,
    required: true
  }
})
</script>
