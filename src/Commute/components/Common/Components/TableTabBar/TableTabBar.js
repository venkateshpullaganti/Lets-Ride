import React from 'react'

import strings from '../../../../i18n/strings.json'

import {
   Navigator,
   NavBtn,
   RequestTable,
   RequestsHeader,
   Col
} from './styledComponents'

export const TableTabBar = props => {
   return (
      <Navigator>
         <NavBtn
            isSelected={props.selected === strings.ride}
            onClick={props.onClickRide}
         >
            {strings.ride}
         </NavBtn>
         <NavBtn
            isSelected={props.selected === strings.asset}
            onClick={props.onClickAsset}
         >
            {strings.asset}
         </NavBtn>
      </Navigator>
   )
}
