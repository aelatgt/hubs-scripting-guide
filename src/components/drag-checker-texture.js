/**
 * Enables drag events from the Hubs interaction system and performs networked
 * updates to the offset of checker-texture component in response.
 */

AFRAME.registerComponent('drag-checker-texture', {
  dependencies: ['checker-texture'],
  init: function () {
    /**
     * These 3 statements allow us to receive holdable-button up/down events
     * which are similar to pointerup and pointerdown
     */
    this.el.classList.add('interactable')
    this.el.setAttribute('tags', {
      isHoldable: true,
      holdableButton: true,
    })
    this.el.setAttribute('is-remote-hover-target', '')

    this.texture = this.el.components['checker-texture'].texture // Convenience variable
    this.dragCursor = null // This will hold the cursor performing the drag, if any
    this.prevPosition = new THREE.Vector3() // Position of the cursor on the previous frame

    // Set up handlers for those events we enabled earlier
    this.el.object3D.addEventListener(
      'holdable-button-down',
      ({ object3D }) => {
        this.dragCursor = object3D
        this.prevPosition.copy(object3D.position)
      }
    )
    this.el.object3D.addEventListener('holdable-button-up', () => {
      this.dragCursor = null
    })
  },
  tick: function () {
    // If any cursor is held down...
    if (this.dragCursor) {
      // Compute change in cursor position
      const dx = this.dragCursor.position.x - this.prevPosition.x
      const dy = this.dragCursor.position.y - this.prevPosition.y

      // Take ownership of the `networked` entity and update the networked UV offset
      NAF.utils.takeOwnership(this.el)
      this.el.setAttribute('checker-texture', {
        offset: {
          x: this.texture.offset.x - dx,
          y: this.texture.offset.y - dy,
        },
      })

      // Store cursor position for next frame
      this.prevPosition.copy(this.dragCursor.position)
    }
  },
})
