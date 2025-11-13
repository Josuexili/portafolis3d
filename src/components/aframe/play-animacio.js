AFRAME.registerComponent('play-animacio', {
  init() {
    this.el.addEventListener('model-loaded', () => {
      const model = this.el.getObject3D('mesh');
      if (model && model.animations && model.animations.length) {
        this.mixer = new THREE.AnimationMixer(model);
        this.action = this.mixer.clipAction(model.animations[0]);
        this.action.play();
      }
    });
  },
  tick(time, delta) {
    if (this.mixer) this.mixer.update(delta / 1000);
  },
});
