// Import the custom component like before
import '../components/normal-material.js'

// Register it with gltf-model-plus
AFRAME.GLTFModelPlus.registerComponent('normal-material', 'normal-material')

// We'll also register a couple of built-in A-Frame components referenced by our entity
AFRAME.GLTFModelPlus.registerComponent('geometry', 'geometry')
AFRAME.GLTFModelPlus.registerComponent('animation', 'animation')

/**
 * Now that Hubs knows about the component, you can inject it via a glTF file!
 *
 * Try dragging entity-3.glb into the room. You can move it around, scale, it, pin it, whatever!
 * Also works if you add the .glb file to Spoke and add your custom script to a room created with that scene.
 *
 * Import entity-3.glb into the entity generator https://www.aelatgt.org/hubs-entity-generator/
 * to see how it was defined from A-Frame components.
 */
