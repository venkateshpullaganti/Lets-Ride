import moment from 'moment'

export const DateFormatter = (dateObj: Date): string => {
   return moment(dateObj).format('YYYY-MM-DD hh:mm A')
}
