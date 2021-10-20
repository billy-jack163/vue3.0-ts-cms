import { App } from 'vue'
import formatTime from '@/untils/date-format'
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formate(value: any) {
      return formatTime(value)
    }
  }
}
