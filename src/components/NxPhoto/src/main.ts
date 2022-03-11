import { createApp, ComponentPublicInstance } from 'vue'
import Main from './main.vue'
interface InstanceInterface extends ComponentPublicInstance {
  pic?: string,
  list?: Array<string>,
  visible?: boolean
}

interface PhotoInterface {
  pic: string,
  list?: Array<string>
}

let instance: InstanceInterface
function SetPhotoScreen (options: PhotoInterface): void {
  const parent = document.createElement('div')
  instance = createApp(Main).mount(parent)
  instance.pic = options.pic
  instance.list = options.list || []
  document.body.appendChild(instance.$el)
  instance.visible = true
}

export default SetPhotoScreen
