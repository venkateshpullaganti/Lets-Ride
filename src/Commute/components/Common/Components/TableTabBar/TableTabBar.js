import React from 'react'

import strings from '../../../../i18n/strings.json'
import { TABLES, RIDE, ASSET } from '../../../../constants/CommuteConstants'

import { Navigator, NavBtn } from './styledComponents'

export const TableTabBar = props => {
   return (
      <Navigator>
         <NavBtn
            isSelected={props.selected === RIDE}
            onClick={props.onClickRide}
         >
            {strings.ride}
         </NavBtn>
         <NavBtn
            isSelected={props.selected === ASSET}
            onClick={props.onClickAsset}
         >
            {strings.asset}
         </NavBtn>
      </Navigator>
   )
}
