<template>
  <a-entity :position="pos" :rotation="rotation">
    <a-entity
      class="modelglb"
      :gltf-model="`url(${model})`"
      :scale="scale"
      :random-fly="`speed: ${speed}; turnInterval: ${turnInterval}; turnStrength: ${turnStrength}`"
    ></a-entity>

    <a-entity
      :text="`value: ${nom}; align: center; color: ${textColor}; width: 4`"
      position="0 2.4 0"
      scale="2 2 2"
    ></a-entity>
  </a-entity>
</template>

<script setup>
defineProps({
  nom: { type: String, default: 'Caça Estel·lar' },
  model: { type: String, required: true },
  pos: { type: String, default: '0 0 0' },
  rotation: { type: String, default: '0 0 0' },
  scale: { type: String, default: '2 2 2' },
  textColor: { type: String, default: '#bb00ff' },
  speed: { type: Number, default: 10 },
  turnInterval: { type: Number, default: 3000 },
  turnStrength: { type: Number, default: 0.8 },
});
</script>
