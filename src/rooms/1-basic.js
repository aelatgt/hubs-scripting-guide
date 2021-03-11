// Create your A-Frame entity
const entity = document.createElement('a-box')

// Position it a bit above the ground
entity.setAttribute('position', { x: 0, y: 2, z: 0 })

// Give it a red standard material
entity.setAttribute('material', { color: 'red' })

// Add the entity to the Hubs scene
APP.scene.appendChild(entity)
