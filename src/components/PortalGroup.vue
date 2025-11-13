<template>
  <a-entity
    v-for="(portal, i) in portals"
    :key="`portal-${i}`"
    :id="`portal-${i}`"
    :position="portal.pos"
    float-portal
  >
    <!-- 🔵 Anell principal visual -->
    <a-torus
      :radius="portal.radius"
      radius-tubular="6"
      :color="portal.color"
      :material="`emissive: ${portal.color}; emissiveIntensity: 2; opacity: 0.8; transparent: true`"
      animation__rotacio="property: rotation; to: 0 360 0; loop: true; dur: 9000; easing: linear"
      animation__pulsacio="property: scale; dir: alternate; dur: 1400; loop: true; to: 1.1 1.1 1.1"
    ></a-torus>

    <!-- 🧊 Esfera invisible amb física (col·lisions amb làser) -->
    <a-sphere
      radius="8"
      position="0 0 0"
      material="opacity: 0; transparent: true;"
      static-body="shape: sphere; sphereRadius: 8"
      :enter-planet="`url:${portal.url}; hitsRequired:10`"
    />

    <!-- 🌀 Anell decoratiu secundari -->
    <a-ring
      :radius-inner="portal.radius * 0.7"
      :radius-outer="portal.radius"
      rotation="0 0 0"
      :color="portal.color"
      material="shader: flat; opacity: 0.6; side: double; transparent: true"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
    ></a-ring>
  </a-entity>
</template>

<script setup>
defineProps({
  portals: {
    type: Array,
    required: true,
  },
});
</script>
