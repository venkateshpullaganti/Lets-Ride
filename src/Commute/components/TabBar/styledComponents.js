import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div``
const Tabs = styled.ul`
   button:first-of-type {
      border-radius: 6px 0px 0px 6px;
   }
   button:last-of-type {
      border-radius: 0px 6px 6px 0px;
   }
   ${tw``};
`
const TabBtn = styled.button`
   border: 1px solid ${Colors.lightBlueGrey};
   background: ${props =>
      props.isSelected ? Colors.brightBlue : Colors.white};
   ${tw`p-2 focus:outline-none`};
`

export { Container, Tabs, TabBtn }
