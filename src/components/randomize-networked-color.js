/**
 * Randomizes the entity's material color when it detects a given event.
 * It includes a few important lines that allow the color to be networked properly.
 */
AFRAME.registerComponent('randomize-networked-color', {
  schema: {
    event: { type: 'string' },
  },
  update: function (oldData) {
    this.el.removeEventListener(oldData.event, this.listener)
    this.listener = this.el.addEventListener(this.data.event, () => {
      if (NAF.connection.isConnected()) {
        /**
         * You must take ownership of the entity in order for your changes
         * to the networked properties to sync across clients.
         * You can also check whether you have ownership with NAF.utils.isMine(el)
         */
        NAF.utils.takeOwnership(this.el)
        this.el.setAttribute('material', { color: Math.random() * 0xffffff })
      }
    })
  },
})
