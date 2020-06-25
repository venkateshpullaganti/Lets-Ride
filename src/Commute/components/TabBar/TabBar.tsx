import React, { Component } from 'react'

import { Tabs, Tab } from './styledComponents'
import { OptionsType } from '../types'

interface TabBarProps {
   onChange: (selectedTab: string) => void
   tabs: OptionsType
   selectedTab: string
}

interface TabButtonProps {
   value: string
   onClick: (selectedTab: string) => void
   isSelected: boolean
   title: string
}

class TabButton extends Component<TabButtonProps> {
   onClick = () => {
      const { onClick, value } = this.props
      onClick(value)
   }
   render() {
      const { isSelected, title } = this.props
      return (
         <Tab onClick={this.onClick} isSelected={isSelected}>
            {title}
         </Tab>
      )
   }
}

function TabBar(props: TabBarProps) {
   const { onChange, tabs, selectedTab } = props
   return (
      <Tabs>
         {tabs.map((tab, index) => (
            <TabButton
               key={tab.value}
               onClick={onChange}
               value={tab.value}
               isSelected={
                  selectedTab !== undefined
                     ? selectedTab === tab.value
                     : index === 0
               }
               title={tab.label}
            />
         ))}
      </Tabs>
   )
}

export { TabBar }
