/**
 * This example is very similar to the previous one, but we register a root component
 * that attaches all other components rather than encoding each one in the .glb entity
 *
 * The benefit of this pattern is we can add new components and tweak their properties
 * without having to export a new .glb, and we only need one GLTFModelPlus registration
 */

import '../components/normal-material.js'

AFRAME.registerComponent('entity-4', {
  init: function () {
    this.el.setAttribute('geometry', { primitive: 'dodecahedron' })
    this.el.setAttribute('normal-material', '')
    this.el.setAttribute('animation', {
      property: 'rotation',
      from: { x: 0, y: 0, z: 0 },
      to: { x: 0, y: 360, z: 0 },
      loop: true,
      dur: 3000,
      easing: 'linear',
    })
  },
})

AFRAME.GLTFModelPlus.registerComponent('entity-4', 'entity-4')

/**
 * Add this script to your room and drag entity-4.glb into the room.
 *
 * Pin the object, adjust the animation duration and refresh the page to see it update.
 */
