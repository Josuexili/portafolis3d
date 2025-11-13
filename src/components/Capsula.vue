<template>
  <a-entity :position="pos" :rotation="rotation">
    <a-entity
      class="modelglb"
      :gltf-model="`url(${model})`"
      :scale="scale"
      :formation-fly="`group: ${group}; speed: ${speed}; spacing: ${spacing}; turnInterval: ${turnInterval}; randomness: ${randomness}; patrolRadius: ${patrolRadius}`"
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
  nom: { type: String, default: 'Càpsula' },
  model: { type: String, required: true },
  pos: { type: String, default: '0 0 0' },
  rotation: { type: String, default: '0 0 0' },
  scale: { type: String, default: '20 20 20' },
  textColor: { type: String, default: '#00ffcc' },
  group: { type: String, default: 'capsules' },
  speed: { type: Number, default: 4 },
  spacing: { type: Number, default: 20 },
  turnInterval: { type: Number, default: 8000 },
  randomness: { type: Number, default: 0.2 },
  patrolRadius: { type: Number, default: 2000 },
});
</script>
