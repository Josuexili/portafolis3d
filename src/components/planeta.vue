<template>
  <a-entity :position="pos" :rotation="rotation">
    <!-- 🌍 Model 3D del planeta -->
    <a-entity
      class="modelglb"
      :gltf-model="`url(${model})`"
      :scale="scale"
      :animation="anim"
    ></a-entity>

    <!-- 🪐 Text flotant amb el nom -->
    <a-entity
      :text="`value: ${nom}; align: center; color: ${textColor}; width: 4`"
      position="0 2.4 0"
      scale="2 2 2"
    ></a-entity>

    <!-- 🌌 Portal visual (torus + anell interior) -->
    <template v-if="portal">
      <a-torus
        :radius="portal.radius * 2"
        radius-tubular="5"
        position="0 0 150"
        rotation="0 0 0"
        material="color: #00ffff; metalness: 0.8; roughness: 0.2; opacity: 0.9; transparent: true;"
        emissive-color="#00ffff"
        
        animation__rotacio="property: rotation; to: 0 360 0; loop: true; dur: 8000; easing: linear"
        animation__pulsacio="property: scale; dir: alternate; dur: 1400; loop: true; to: 1.1 1.1 1.1"
        :enter-planet="`url:${portal.url}; radius:${portal.radius}`"
      ></a-torus>

      <a-ring
        :radius-inner="portal.radius * 1.4"
        :radius-outer="portal.radius * 2"
        position="0 0 150"
        rotation="0 0 0"
        material="shader: flat; color: #00ffff; opacity: 0.6; side: double; transparent: true;"
        emissive-color="#00ffff"
        emissive-intensity="1.8"
        animation="property: rotation; to: 0 360 0; loop: true; dur: 9000; easing: linear"
      ></a-ring>
    </template>

    <!-- ⚪ Esfera invisible per la col·lisió del portal -->
    <a-sphere
      v-if="portal"
      :radius="portal.radius"
      material="opacity: 0; transparent: true;"
      :enter-planet="`url:${portal.url}; radius:${portal.radius}`"
    ></a-sphere>
  </a-entity>
</template>

<script setup>
defineProps({
  nom: {
    type: String,
    default: 'Planeta desconegut',
  },
  model: {
    type: String,
    required: true,
  },
  pos: {
    type: String,
    default: '0 0 0',
  },
  rotation: {
    type: String,
    default: '0 0 0',
  },
  scale: {
    type: String,
    default: '1 1 1',
  },
  anim: {
    type: String,
    default:
      'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear',
  },
  textColor: {
    type: String,
    default: '#ffffff',
  },
  portal: {
    type: Object,
    required: false,
    default: null,
  },
});
</script>
