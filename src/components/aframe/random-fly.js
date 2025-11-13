AFRAME.registerComponent('random-fly', {
  schema: {
    speed: { type: 'number', default: 5 },
    turnInterval: { type: 'number', default: 3000 },
    turnStrength: { type: 'number', default: 0.5 }, // intensitat dels girs
  },

  init() {
    this.direction = new THREE.Vector3(0, 0, -1); // vola endavant
    this.targetDir = this.direction.clone();
    this.lastTurn = 0;
    this.tmp = new THREE.Vector3();
  },

  tick(time, delta) {
    const el = this.el;
    const obj = el.object3D;
    const dt = delta / 1000;

    if (!obj) return;

    // Cada X segons canvia la direcció objectiu aleatòriament
    if (time - this.lastTurn > this.data.turnInterval) {
      this.targetDir.set(
        (Math.random() - 0.5) * this.data.turnStrength,
        (Math.random() - 0.5) * this.data.turnStrength,
        -1
      ).normalize();
      this.lastTurn = time;
    }

    // Interpola la direcció actual cap a la nova per gir suau
    this.direction.lerp(this.targetDir, dt * 0.5).normalize();

    // Calcula el pas segons velocitat
    const step = this.direction.clone().multiplyScalar(this.data.speed * dt);
    obj.position.add(step);

    // Gira la nau per mirar cap on vola
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      this.direction
    );
    obj.quaternion.slerp(targetQuat, dt * 2); // gir suau
  },
});
