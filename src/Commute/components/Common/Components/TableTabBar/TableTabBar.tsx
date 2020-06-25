import React from 'react'

import strings from '../../../../i18n/strings.json'
import { TABLES, RIDE, ASSET } from '../../../../constants/CommuteConstants'

import { Navigator, NavBtn } from './styledComponents'

interface TableTabBarProps {
   selected: string
   onClickRide: () => void
   onClickAsset: () => void
}

export const TableTabBar = (props: TableTabBarProps) => {
   const { selected, onClickRide, onClickAsset } = props
   return (
      <Navigator>
         <NavBtn isSelected={selected === RIDE} onClick={onClickRide}>
            {strings.ride}
         </NavBtn>
         <NavBtn isSelected={selected === ASSET} onClick={onClickAsset}>
            {strings.asset}
         </NavBtn>
      </Navigator>
   )
}
