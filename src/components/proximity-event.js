/**
 * Emit an event of your choosing when the player is within a given
 * radius of the entity
 */

const vec = new THREE.Vector3() // Scratch variable

AFRAME.registerComponent('proximity-event', {
  schema: {
    event: { type: 'string', default: 'bump' },
    radius: { type: 'number', default: 3 },
  },
  init: function () {
    this.player = document.querySelector('#avatar-rig').object3D
    this.active = false
  },
  tick: function () {
    this.el.object3D.getWorldPosition(vec)
    if (vec.distanceTo(this.player.position) < this.data.radius) {
      !this.active && this.el.emit(this.data.event)
      this.active = true
    } else {
      this.active = false
    }
  },
})
