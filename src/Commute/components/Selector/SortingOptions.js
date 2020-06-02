import React from 'react'

import { SortingOptions, Item } from './styledComponents'

export default function SortingOptions() {
   return (
      <SortingOptionsContainer
         key={uuid()}
         shouldShowSortOptions={this.shouldShowSortOptions}
      >
         <Item key={uuid()} onClick={() => onChange(option.value, 'ASC')}>
            {'Ascending'}
         </Item>
         <Item key={uuid()} onClick={() => onChange(option.value, 'DESC')}>
            {'Descending'}
         </Item>
      </SortingOptionsContainer>
   )
}
