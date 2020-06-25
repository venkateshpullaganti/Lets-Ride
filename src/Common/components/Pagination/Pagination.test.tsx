import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Pagination } from '.'

describe('Pagination Tests', () => {
   beforeEach(() => {
      jest.resetAllMocks()
   })

   it('should test the next page and previous page clicks', () => {
      const totalPages = 10
      const currentPage = 4
      const mockHandlePageClick = jest.fn()
      const { getByRole } = render(
         <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={mockHandlePageClick}
         />
      )
      const nextButton = getByRole('button', { name: '>' })
      const previousButton = getByRole('button', { name: '<' })

      fireEvent.click(nextButton)
      expect(mockHandlePageClick).toBeCalledWith(5)

      fireEvent.click(previousButton)
      fireEvent.click(previousButton)
      expect(mockHandlePageClick).toBeCalledWith(3)
   })
   it('should disable the previous button on first page', () => {
      const totalPages = 10
      const currentPage = 1
      const mockHandlePageClick = jest.fn()
      const { getByRole } = render(
         <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={mockHandlePageClick}
         />
      )
      const previousButton = getByRole('button', { name: '<' })

      fireEvent.click(previousButton)
      expect(mockHandlePageClick).not.toBeCalled()
   })
   it('should disable the next button on last page', () => {
      const totalPages = 10
      const currentPage = 10
      const mockHandlePageClick = jest.fn()
      const { getByRole } = render(
         <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={mockHandlePageClick}
         />
      )
      const nextButton = getByRole('button', { name: '>' })

      fireEvent.click(nextButton)
      expect(mockHandlePageClick).not.toBeCalled()
   })
   it('should call the callback function with a clicked page number', () => {
      const totalPages = 10
      const currentPage = 1
      const mockHandlePageClick = jest.fn()
      const { getByRole } = render(
         <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageRange={10}
            handlePageClick={mockHandlePageClick}
         />
      )

      const fifthBtn = getByRole('button', { name: 'Page 5' })
      fireEvent.click(fifthBtn)
      expect(mockHandlePageClick).toBeCalledWith(5)

      const eighthBtn = getByRole('button', { name: 'Page 8' })
      fireEvent.click(eighthBtn)
      expect(mockHandlePageClick).toBeCalledWith(8)
   })
})
