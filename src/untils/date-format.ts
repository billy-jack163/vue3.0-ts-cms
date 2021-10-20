import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export default function formatTime(utcString: string, format = 'YYYY-MM-DD HH:mm:ss'): any {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
