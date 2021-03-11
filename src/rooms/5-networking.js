/**
 * Check out each component file for a description of what they do
 */
import '../components/proximity-event.js'
import '../components/randomize-networked-color.js'

/**
 * Step 1: Add a new NAF template to <a-assets>
 *
 * IMPORTANT: the template ID must end in "-media"
 */

const assets = document.querySelector('a-assets')
assets.insertAdjacentHTML(
  'beforeend',
  `
  <template id="color-media">
    <a-entity
      geometry="primitive: sphere"
      material="color: white; shader: flat"
      proximity-event="event: bump; radius: 3"
      randomize-networked-color="event: bump;">
    </a-entity>
  </template>
`
)

/**
 * Step 2: Define a NAF schema to indicate what properties are networked
 */

NAF.schemas.add({
  template: '#color-media',
  components: [
    {
      component: 'material',
      property: 'color',
    },
  ],
})

/**
 * Step 3: Attach the template to an entity
 */
const entity = document.createElement('a-entity')
entity.setAttribute('position', { x: 0, y: 2, z: 0 })

entity.setAttribute('networked', {
  template: '#color-media', // Selector for our template
  networkId: 'sphere', // A fixed networkId makes this entity shared for all clients
  owner: 'scene', // Prevents newly joined clients from re-initializing the color
})

APP.scene.appendChild(entity)
