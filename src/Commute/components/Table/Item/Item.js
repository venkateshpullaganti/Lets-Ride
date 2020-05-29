import React from 'react'

import { Row, Data, Badge } from './styledComponents'

export function Item(props) {
   return (
      <Row>
         {props.row.map(item => (
            <Data key={item}>{item}</Data>
         ))}
         <Badge>{props.badge}</Badge>
      </Row>
   )
}
