import moment from 'moment'

export const DateFormatter = dateObj => {
   return moment(dateObj).format('YYYY-MM-DD hh:mm A')
}
