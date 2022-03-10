import { createApp, ComponentPublicInstance } from 'vue'
import Main from './main.vue'
interface InstanceInterface extends ComponentPublicInstance {
  id?: string,
  message?: string,
  visible?: boolean,
  verticalOffset?: number,
  duration?: number,
  type?: string,
  onClose?(id: string): void,
}

interface MessageInterface {
  message: string,
  type: string,
  duration?: number
}

let instance: InstanceInterface
let seed = 1
const instances: Array<InstanceInterface> = []
function Message (options: MessageInterface): void {
  const id = 'nx-message' + seed++
  const parent = document.createElement('div')
  instance = createApp(Main).mount(parent)
  instance.id = id
  instance.onClose = function (id: string) {
    Message.close(id)
  }
  instance.message = options.message
  instance.duration = options.duration || 2000
  instance.type = options.type
  document.body.appendChild(instance.$el)
  instance.visible = true
  instance.verticalOffset = instances.length * 42 + 20
  instances.push(instance)
}

Message.success = function (options: string): void {
  Message({
    message: options,
    type: 'success'
  })
}

Message.error = function (options: string): void {
  Message({
    message: options,
    type: 'error'
  })
}

Message.close = function (id: string | undefined): void {
  for (let i = 0; i < instances.length; i++) {
    if (instances[i].id === id) {
      instances[i].visible = false
      instances.splice(i, 1)
      seed--
      break
    }
  }
}

Message.closeAll = function () {
  for (let i = 0; i < instances.length; i++) {
    Message.close(instances[i].id)
  }
  seed = 0
}

export default Message
