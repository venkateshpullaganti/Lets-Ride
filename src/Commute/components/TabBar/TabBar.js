import React, { Component } from 'react'

import { Tabs, Tab } from './styledComponents'

function TabBar(props) {
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

class TabButton extends Component {
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
