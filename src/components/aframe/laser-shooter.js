AFRAME.registerComponent('laser-shooter', {
  schema: {
    speed: { type: 'number', default: 900 },
    fireRate: { type: 'number', default: 150 },
    maxDistance: { type: 'number', default: 3000 },
    hitRadius: { type: 'number', default: 15 },
  },

  init() {
    this.lastShot = 0;
    this.lasers = [];
    this.portals = [];
    const sceneEl = this.el.sceneEl;

    // ✅ Assegurem que els portals es recullen després que tot carregui
    sceneEl.addEventListener('loaded', () => {
      this.updatePortals();
      sceneEl.canvas.setAttribute('tabindex', '0');
      sceneEl.canvas.focus();
    });

    // També cada 2 segons, per si es creen portals dinàmics
    setInterval(() => this.updatePortals(), 2000);

    window.addEventListener('click', () => sceneEl.canvas.focus());
    sceneEl.canvas.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.shoot();
    });
  },

  updatePortals() {
    this.portals = Array.from(document.querySelectorAll('[enter-planet]'));
    console.log(`🌀 [laser-shooter] Portals detectats: ${this.portals.length}`);
  },

  shoot() {
    const now = Date.now();
    if (now - this.lastShot < this.data.fireRate) return;
    this.lastShot = now;

    const scene = this.el.sceneEl;
    const cameraObj = this.el.querySelector('a-camera').object3D;

    const dir = new THREE.Vector3();
    cameraObj.getWorldDirection(dir);
    dir.multiplyScalar(-1);

    const offsets = [
      new THREE.Vector3(-3, -10, -1),
      new THREE.Vector3(3, -10, -1),
    ];

    offsets.forEach((offset) => {
      const spawn = offset.clone().applyMatrix4(cameraObj.matrixWorld);

      const laser = document.createElement('a-entity');
      laser.classList.add('laser');
      laser.setAttribute(
        'geometry',
        'primitive: box; width: 2; height: 2; depth: 24'
      );
      laser.setAttribute(
        'material',
        'color: #00ffff; emissive: #00ffff; emissiveIntensity: 10; opacity: 1; transparent: true'
      );

      laser.object3D.position.copy(spawn);
      laser.object3D.quaternion.copy(cameraObj.quaternion);
      laser.userData = {
        direction: dir.clone().normalize(),
        distanceTraveled: 0,
      };

      scene.appendChild(laser);
      this.lasers.push(laser);
    });
  },

  tick(_, delta) {
    const speed = this.data.speed * (delta / 1000);
    const toRemove = [];

    this.lasers.forEach((laser) => {
      const dir = laser.userData.direction;
      laser.object3D.position.addScaledVector(dir, speed);
      laser.userData.distanceTraveled += speed;

      // 💨 Si surt del rang
      if (laser.userData.distanceTraveled > this.data.maxDistance) {
        toRemove.push(laser);
        return;
      }

      // 📡 Comprova col·lisió amb cada portal
      const lPos = laser.object3D.position;
      for (const portal of this.portals) {
        const pPos = new THREE.Vector3();
        portal.object3D.getWorldPosition(pPos);

        const dist = lPos.distanceTo(pPos);
        if (dist < this.data.hitRadius) {
          console.log(
            `🎯 Impacte amb portal`,
            portal.id || '(sense id)',
            `→ distància: ${dist.toFixed(2)}`
          );

          // 🚀 Notifica el portal
          portal.emit('hit-by-laser', { laser, shooter: this.el });

          // ✨ Efecte visual a l’impacte
          const spark = document.createElement('a-entity');
          spark.setAttribute('geometry', 'primitive: sphere; radius: 1');
          spark.setAttribute(
            'material',
            'color: #00ffff; emissive: #00ffff; emissiveIntensity: 12'
          );
          spark.object3D.position.copy(lPos);
          portal.sceneEl.appendChild(spark);
          setTimeout(() => spark.remove(), 150);

          toRemove.push(laser);
          break;
        }
      }
    });

    // 🧹 Neteja làsers impactats o llunyans
    toRemove.forEach((laser) => {
      if (laser.parentNode) laser.parentNode.removeChild(laser);
      this.lasers = this.lasers.filter((l) => l !== laser);
    });
  },
});
