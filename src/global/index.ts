import { App } from 'vue'
import registerProperties from './register-properties'
import registerElement from './register-element'
export default function globalRegister(app: App) {
  app.use(registerProperties)
  app.use(registerElement)
}
