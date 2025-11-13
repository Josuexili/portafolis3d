// src/components/camera-debug.js

AFRAME.registerComponent('camera-debug', {
  schema: {
    distance: { type: 'number', default: 10 } // Longitud de la línia visible
  },
  init: function () {
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -this.data.distance)
    ]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    this.line = new THREE.Line(geometry, material)
    this.el.object3D.add(this.line)
  }
})
