import React from 'react'

import { DateFormatter } from './DateFormatter'

describe('DateFormatter tests', () => {
   it('should return the date in the required format', () => {
      const dateObj = new Date('2020/11/30')
      expect(DateFormatter(dateObj)).toBe('2020-11-30 12:00 AM')
   })
})
