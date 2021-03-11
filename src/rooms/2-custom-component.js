// Here we import a custom component from another file.
// You can also register components directly in this file,
// but importing allows you to easily re-use the component across rooms
import '../components/normal-material.js'

// Create your A-Frame entity
const entity = document.createElement('a-box')
entity.setAttribute('position', { x: 0, y: 2, z: 0 })

// Attach the custom component
entity.setAttribute('normal-material', '')

// Add the entity to the Hubs scene
APP.scene.appendChild(entity)
