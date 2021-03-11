import '../components/single-action-button.js'
import '../components/randomize-networked-color.js'

/**
 * This room script is almost identical to the previous, the only difference is that
 * color randomization is now triggered by clicks from the interaction system.
 *
 * Take a look at the single-action-button component for the interesting stuff.
 */

const assets = document.querySelector('a-assets')
assets.insertAdjacentHTML(
  'beforeend',
  `
  <template id="color-media">
    <a-entity
      geometry="primitive: sphere"
      material="shader: flat"
      single-action-button="event: click"
      randomize-networked-color="event: click"
    ></a-entity>
  </template>
`
)

NAF.schemas.add({
  template: '#color-media',
  components: [
    {
      component: 'material',
      property: 'color',
    },
  ],
})

const entity = document.createElement('a-entity')
entity.setAttribute('position', { x: 0, y: 2, z: 0 })
entity.setAttribute('networked', {
  template: '#color-media',
  networkId: 'button',
  owner: 'scene',
})

APP.scene.appendChild(entity)
