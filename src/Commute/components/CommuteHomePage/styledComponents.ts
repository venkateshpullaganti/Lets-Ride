import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

interface NavBtnProps {
   isSelected: boolean
}
const Root = styled.div`
   background: ${Colors.whiteTwo};
   ${'' /* min-height: 100vh; */}
   ${tw`flex flex-col w-screen border-box`};
`
const Body = styled.div`
   box-sizing: border-box;
   ${tw`p-1`};
`
const NavBar = styled.div`
   margin-top: 80px;
   margin-bottom: 80px;
   ${tw` flex items-center justify-center`};
`
const NavBtn = styled.button`
   border-width: 1px;
   border-style: solid;
   border-color: ${Colors.lightBlueGrey};
   background: ${(props: NavBtnProps) =>
      props.isSelected ? Colors.brightBlue : Colors.white};
   ${tw`p-2 my-2 focus:outline-none`};
`

export { Root, Body, NavBar, NavBtn }
