AFRAME.registerComponent('physics-controls', {
  schema: {
    speed: { type: 'number', default: 50 },
    fly: { type: 'boolean', default: true },
    rotationSpeed: { type: 'number', default: 1.5 },
  },

  init: function () {
    this.keys = {};
    this.camera = this.el.querySelector('[camera]');

    window.addEventListener('keydown', (e) => (this.keys[e.code] = true));
    window.addEventListener('keyup', (e) => (this.keys[e.code] = false));
  },

  tick: function (time, delta) {
    const el = this.el;
    const body = el.body;
    if (!body || !this.camera) return;

    const move = new THREE.Vector3();

    // 🎮 Moviment WASD
    if (this.keys['KeyW']) move.z -= 1;
    if (this.keys['KeyS']) move.z += 1;
    if (this.keys['KeyA']) move.x -= 1;
    if (this.keys['KeyD']) move.x += 1;

    // 🛸 Vol vertical
    if (this.data.fly) {
      if (this.keys['KeyZ']) move.y += 1;
      if (this.keys['KeyX']) move.y -= 1;
    }

    // 🚀 Turbo amb Ctrl
    const speed = this.keys['ControlLeft']
      ? this.data.speed * 4
      : this.data.speed;

    // Si no hi ha moviment, igualment comprovem rotació
    const cameraObj = this.camera.object3D;
    const elObj = el.object3D;

    // 🎯 Direcció de la càmera
    const cameraDir = new THREE.Vector3();
    cameraObj.getWorldDirection(cameraDir);
    const forward = cameraDir.clone().normalize();
    const right = new THREE.Vector3()
      .crossVectors(forward, cameraObj.up)
      .normalize();
    const up = this.data.fly
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(0, 0, 0);

    // 💫 Vector de moviment combinat
    const moveVec = new THREE.Vector3();
    moveVec.addScaledVector(forward, move.z);
    moveVec.addScaledVector(right, move.x);
    moveVec.addScaledVector(up, move.y);
    if (moveVec.lengthSq() > 0) moveVec.normalize();

    // 📦 Aplica moviment
    const pos = elObj.position;
    const step = moveVec.multiplyScalar((speed * delta) / 1000);
    pos.add(step);

    // ⚙️ Manté estable el cos físic
    body.velocity.set(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
    body.position.copy(pos);

    // 🔄 Gir amb Q i E (rotació en Y)
    const rot = elObj.rotation;
    const rotationStep = (this.data.rotationSpeed * delta) / 1000;

    if (this.keys['KeyQ']) rot.y += rotationStep;
    if (this.keys['KeyE']) rot.y -= rotationStep;

    elObj.rotation.set(rot.x, rot.y, rot.z);
  },
});
