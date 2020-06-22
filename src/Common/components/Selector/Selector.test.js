import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'

import { Selector } from '.'

describe('Selector tests', () => {
   let sampleOptions = [
      { value: 'LAPTOP', label: 'LAPTOP' },
      { value: 'BAG', label: 'BAG' },
      { value: 'DOCUMENTS', label: 'DOCUMENTS' },
      { value: 'OTHERS', label: 'OTHERS' }
   ]

   beforeEach(() => {})
   afterEach(() => {
      jest.resetAllMocks()
      cleanup()
   })
   //    it('should render the component without any errors', () => {
   //       const mockOnChange = jest.fn()
   //       const { getByText, debug, getByRole } = render(
   //          <Selector
   //             options={sampleOptions}
   //             onChange={mockOnChange}
   //             placeholder={'select option'}
   //          />
   //       )
   //       getByText('select option')
   //    })
   it('should call on change when first option is selected', async () => {
      const mockOnChange = jest.fn()
      const { getByText, debug, getByTestId } = render(
         <Selector
            options={sampleOptions}
            onChange={mockOnChange}
            placeholder={'select option'}
         />
      )

      const selector = getByTestId('react-selector')
      fireEvent.click(selector.firstChild)
      await waitFor(() => debug())
   })
})

//  <Selector
//                   options={ASSET_TYPES}
//                   label={strings.assetType}
//                   placeholder={strings.selectAssetType}
//                   value={{ label: this.selectedAssetType }}
//                   onChange={this.onChangeAssetType}
//                   isRequired={true}
//                   isError={this.isAssetTypeError}
//                   errorMsg={this.errorMsg}
//                />
