AFRAME.registerComponent('normal-material', {
  init: function () {
    const material = new THREE.MeshNormalMaterial()
    this.el.getOrCreateObject3D('mesh').material = material
  },
})
