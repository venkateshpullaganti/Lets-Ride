import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   height: 70px;
   width: 100%;
   background: ${Colors.white};
   padding: 0px 48px 0px 48px;
   ${tw`flex justify-between items-center`};
`
const Actions = styled.div`
   ${tw`flex`};
`
const ProfileIcon = styled.span`
   cursor: pointer;
   height: 40px;
   width: 40px;
   color: ${Colors.turquoiseBlue};
   background: ${Colors.duckEggBlue};
   ${tw`rounded-full m-2 flex justify-center items-center`};
`
export { Container, Actions, ProfileIcon }
