import React, { Component } from 'react'

import { Selector } from '../Selector'
import { Bar, TaskCount, Filters } from './styledComponents'

class FilterBar extends Component {
   render() {
      const { taskCount, onChangeSort, onChangeFilter } = this.props
      return (
         <Bar>
            <TaskCount>{taskCount} Tasks</TaskCount>
            <Filters>
               <Selector
                  dropdownName={'Sort'}
                  options={['Date', 'Time']}
                  onChange={onChangeSort}
               />
               <Selector
                  dropdownName={'Filter'}
                  options={['Active', 'Expired']}
                  onChange={onChangeFilter}
               />
            </Filters>
         </Bar>
      )
   }
}

export { FilterBar }
