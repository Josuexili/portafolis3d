AFRAME.registerComponent('enter-planet', {
  schema: {
    url: { type: 'string' },
    hitsRequired: { type: 'int', default: 10 },
  },

  init() {
    this.hits = 0;
    this.cooldown = false;

    console.log(
      `🟢 [enter-planet] Component inicialitzat per`,
      this.el.id || this.el
    );

    // 📡 Detecta impactes de làsers (event emès pel laser-shooter)
    this.el.addEventListener('hit-by-laser', (e) => {
      this.registerHit(e.detail?.laser);
    });
  },

  registerHit(laser) {
    this.hits++;
    this.flash();

    console.log(
      `🎯 Impacte #${this.hits} al portal ${this.el.id || '(sense id)'}`
    );

    // 🔔 Envia esdeveniment global al HUD per actualitzar el comptador
    window.dispatchEvent(new CustomEvent('portal-hit'));

    // 🚀 Cada X impactes, activa el portal
    if (this.hits % this.data.hitsRequired === 0 && !this.cooldown) {
      this.cooldown = true;
      this.activatePortal();
      setTimeout(() => (this.cooldown = false), 2000);
    }

    // 💨 Elimina el làser després d’un impacte per netejar l’escena
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
    console.log(`✨ [enter-planet] Activant portal ${this.el.id || ''}`);
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

    // 🌐 Obre pestanya després d’un curt retard
    setTimeout(() => {
      console.log('🌐 Obrint pestanya:', this.data.url);
      try {
        window.open(this.data.url, '_blank', 'noopener,noreferrer');
        console.log('✅ Pestanya oberta correctament');
      } catch (err) {
        console.error('❌ Error obrint pestanya:', err);
      }
    }, 500);
  },
});
