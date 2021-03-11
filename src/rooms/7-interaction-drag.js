import '../components/checker-texture.js'
import '../components/drag-checker-texture.js'

/**
 * This room spawns a plane with a checkered texture.
 * Visitors can click and drag on the plane to drag the texture.
 * The drag effect is networked for all visitors.
 */
const assets = document.querySelector('a-assets')
assets.insertAdjacentHTML(
  'beforeend',
  `
  <template id="drag-media">
    <a-entity
      geometry="primitive: plane"
      material="side: double"
      scale="2 2 2"
      checker-texture="repeat: 2 2; offset: 0 0"
      drag-checker-texture
    ></a-entity>
  </template>
`
)

/**
 * In our schema, we network the UV offset of our custom checker texture
 * so that everyone can see it drag in sync.
 */

NAF.schemas.add({
  template: '#drag-media',
  components: [
    {
      component: 'checker-texture',
      property: 'offset',
    },
  ],
})

const entity = document.createElement('a-entity')
entity.setAttribute('position', { x: 0, y: 2, z: 1 })
entity.setAttribute('networked', {
  template: '#drag-media',
  networkId: 'drag',
  owner: 'scene',
})

APP.scene.appendChild(entity)
