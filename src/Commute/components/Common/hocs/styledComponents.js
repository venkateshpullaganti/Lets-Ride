import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../../Common/themes/Colors'

const Container = styled.div`
   height: 70px;
   width: 100%;
   background: ${Colors.white};
   padding: 0px 48px 0px 48px;
   top: 0px;
   ${tw`flex justify-between items-center sticky z-30`};
`
const Actions = styled.div`
   ${tw`flex`};
`
const ProfileIcon = styled.img`
   cursor: pointer;
   height: 40px;
   width: 40px;
   color: ${Colors.turquoiseBlue};
   background: ${Colors.duckEggBlue};
   ${tw`rounded-full m-2 flex justify-center items-center`};
`
const profileImage = styled.img`
   ${tw``};
`
export { Container, Actions, ProfileIcon }