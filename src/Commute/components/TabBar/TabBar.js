import React, { Component } from 'react'

import { Tabs, TabBtn } from './styledComponents'

function TabBar(props) {
   const { onChange, tabs, selectedTab } = props
   return (
      <Tabs>
         {tabs.map((tab, index) => (
            <TabButton
               key={tab}
               onClick={onChange}
               isSelected={
                  selectedTab !== undefined ? selectedTab === tab : index === 0
               }
               title={tab}
            />
         ))}
      </Tabs>
   )
}

export { TabBar }

class TabButton extends Component {
   onClick = () => {
      const { onClick, title } = this.props
      onClick(title)
   }
   render() {
      const { isSelected, title } = this.props
      return (
         <TabBtn onClick={this.onClick} isSelected={isSelected}>
            {title}
         </TabBtn>
      )
   }
}
