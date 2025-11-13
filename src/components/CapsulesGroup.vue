<template>
  <Capsula
    v-for="(c, i) in capsules"
    :key="`caps-${i}`"
    :nom="`Càpsula ${i + 1}`"
    model="/assets/optimized/sci-fi/sci-fi_base.glb"
    :pos="c.pos"
    :rotation="c.rotation"
    :scale="c.scale"
    textColor="#00ffcc"
  />
</template>

<script setup>
import Capsula from './Capsula.vue'

defineProps({
  capsules: {
    type: Array,
    required: true
  }
})
</script>
