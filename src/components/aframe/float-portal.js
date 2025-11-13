AFRAME.registerComponent('float-portal', {
  schema: {
    amplitude: { type: 'number', default: 0.6 }, // alçada màxima del moviment
    speed: { type: 'number', default: 1 }, // velocitat d’oscil·lació
    rotationSpeed: { type: 'number', default: 0.05 }, // velocitat de rotació
  },

  init() {
    this.initialY = this.el.object3D.position.y;
    this.angle = Math.random() * Math.PI * 2; // per desincronitzar-los entre si
  },

  tick(time, delta) {
    const pos = this.el.object3D.position;
    this.angle += (delta / 1000) * this.data.speed;

    // Moviment vertical suau
    pos.y = this.initialY + Math.sin(this.angle) * this.data.amplitude;

    // Rotació lenta al voltant de l’eix Y
    this.el.object3D.rotation.y += this.data.rotationSpeed * (delta / 1000);
  },
});
