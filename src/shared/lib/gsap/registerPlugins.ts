import gsap from 'gsap'
import { Observer } from 'gsap/all'

let pluginsRegistered = false

export const registerGsapPlugins = () => {
  if (pluginsRegistered) {
    return
  }

  gsap.registerPlugin(Observer)
  pluginsRegistered = true
}
