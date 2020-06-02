import React, { Component } from 'react'

import { Selector } from '../Selector'
import { Bar, TaskCount, Filters } from './styledComponents'

import images from '../../../Common/themes/Images'

import strings from '../../i18n/strings.json'

class FilterBar extends Component {
   render() {
      const {
         taskCount,
         onChangeSort,
         onChangeFilter,
         filterOptions,
         sortOptions
      } = this.props
      return (
         <Bar>
            <TaskCount>{taskCount} Tasks</TaskCount>
            <Filters>
               <Selector
                  dropdownName={strings.sort}
                  options={sortOptions}
                  onChange={onChangeSort}
                  icon={images.sortIcon}
                  shouldRotateIcon={false}
               />
               <Selector
                  dropdownName={strings.filter}
                  options={filterOptions}
                  onChange={onChangeFilter}
                  icon={images.filterIcon}
                  shouldRotateIcon={false}
               />
            </Filters>
         </Bar>
      )
   }
}

export { FilterBar }

FilterBar.defaultProps = {
   filterOptions: ['Date', 'Time'],
   sortOptions: ['Active', 'Expired']
}
