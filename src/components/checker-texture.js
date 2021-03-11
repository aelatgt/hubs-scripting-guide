/**
 * Generates a black and white checker texture and attaches it to the material.
 * Repeat determines how many times the checker pattern will repeat in either direction.
 * Offset represents UV coordinate offset, we will network this property.
 */

AFRAME.registerComponent('checker-texture', {
  dependencies: ['material'],
  schema: {
    repeat: { type: 'vec2', default: { x: 1, y: 1 } },
    offset: { type: 'vec2', default: { x: 0, y: 0 } },
  },
  init: function () {
    this.material = this.el.components.material.material
    const checkerCanvas = getCheckerCanvas(512)
    this.texture = new THREE.CanvasTexture(checkerCanvas)
    this.material.map = this.texture
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
  },
  update: function () {
    this.texture.repeat.copy(this.data.repeat)
    this.texture.offset.copy(this.data.offset)
  },
})

// Generates 2x2 checker pattern on a square canvas of a given size
function getCheckerCanvas(size = 512) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#000'
  const c = size / 2 // Checker size
  ctx.fillRect(0, 0, c, c)
  ctx.fillRect(c, c, c, c)
  return canvas
}
