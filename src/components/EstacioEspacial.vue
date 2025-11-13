<template>
  <a-entity :position="pos" :rotation="rotation">
    <a-entity
      class="modelglb"
      :gltf-model="`url(${model})`"
      :scale="scale"
      :animation="anim"
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
  nom: { type: String, default: 'Objecte espacial' },
  model: { type: String, required: true },
  pos: { type: String, default: '0 0 0' },
  rotation: { type: String, default: '0 0 0' },
  scale: { type: String, default: '1 1 1' },
  anim: {
    type: String,
    default: 'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear',
  },
  textColor: { type: String, default: '#ffffff' },
});
</script>
