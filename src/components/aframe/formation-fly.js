AFRAME.registerComponent('formation-fly', {
  schema: {
    group: { type: 'string', default: 'capsules' },
    speed: { type: 'number', default: 4 }, // 🐢 velocitat baixa per patrullar
    spacing: { type: 'number', default: 20 },
    turnInterval: { type: 'number', default: 8000 }, // gira cada 8 segons
    randomness: { type: 'number', default: 0.2 }, // menys canvi de direcció
    patrolRadius: { type: 'number', default: 2000 },
  },

  init() {
    this.direction = new THREE.Vector3(0, 0, -1);
    this.lastTurn = 0;

    // punt central de patrulla
    this.center = this.el.object3D.position.clone();

    // desfasament suau dins la formació
    this.offset = new THREE.Vector3(
      (Math.random() - 0.5) * this.data.spacing,
      (Math.random() - 0.5) * this.data.spacing * 0.4,
      (Math.random() - 0.5) * this.data.spacing
    );
  },

  tick(time, delta) {
    const obj = this.el.object3D;
    const dt = delta / 1000;
    const d = this.data;

    // 🔁 cada cert temps, ajusta molt lleugerament la direcció
    if (time - this.lastTurn > d.turnInterval) {
      const change = new THREE.Vector3(
        (Math.random() - 0.5) * d.randomness,
        (Math.random() - 0.5) * d.randomness * 0.3,
        (Math.random() - 0.5) * d.randomness
      );
      this.direction.add(change).normalize();
      this.lastTurn = time;
    }

    // 🚀 mou endavant molt lentament
    obj.position.addScaledVector(this.direction, d.speed * dt);

    // 🌊 oscil·lació suau (com flotant)
    const t = time * 0.001;
    obj.position.x += Math.sin(t * 0.2 + this.offset.x) * 0.2;
    obj.position.y += Math.sin(t * 0.3 + this.offset.y) * 0.1;
    obj.rotation.y = Math.atan2(this.direction.x, this.direction.z);

    // 📏 control de límits: torna lentament al centre
    const dist = obj.position.distanceTo(this.center);
    if (dist > d.patrolRadius) {
      const back = this.center.clone().sub(obj.position).normalize();
      this.direction.lerp(back, 0.02); // gira molt lentament cap al centre
    }
  },
});
