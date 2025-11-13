AFRAME.registerComponent('enter-planet', {
  schema: {
    url: { type: 'string' },
    hitsRequired: { type: 'int', default: 10 },
  },

  init() {
    this.hits = 0;
    this.cooldown = false;

    this.el.addEventListener('hit-by-laser', (e) => {
      this.registerHit(e.detail?.laser);
    });
  },

  registerHit(laser) {
    this.hits++;
    this.flash();

    window.dispatchEvent(new CustomEvent('portal-hit'));

    if (this.hits % this.data.hitsRequired === 0 && !this.cooldown) {
      this.cooldown = true;
      this.activatePortal();

      setTimeout(() => (this.cooldown = false), 2000);
    }

    if (laser && laser.parentNode) {
      setTimeout(() => {
        if (laser.parentNode) laser.parentNode.removeChild(laser);
      }, 50);
    }
  },

  flash() {
    this.el.setAttribute('scale', '1.15 1.15 1.15');
    this.el.setAttribute('material', 'emissiveIntensity', 3 + this.hits * 0.1);
    setTimeout(() => this.el.setAttribute('scale', '1 1 1'), 120);
  },

  activatePortal() {
    this.el.setAttribute('material', {
      color: '#00ffff',
      emissive: '#00ffff',
      emissiveIntensity: 8,
    });

    this.el.setAttribute('animation__pulse', {
      property: 'scale',
      dir: 'alternate',
      dur: 250,
      loop: true,
      to: '1.3 1.3 1.3',
    });

    // 👍 NO OBRIM AUTOMÀTICAMENT → EVITEM BLOQUEIG
    // En lloc d’això, mostrem un confirm:
    setTimeout(() => {
      const acceptar = confirm('Has activat el portal. Vols entrar-hi ara?');

      if (acceptar) {
        window.open(this.data.url, '_blank', 'noopener,noreferrer');
      }
    }, 500);
  },
});
