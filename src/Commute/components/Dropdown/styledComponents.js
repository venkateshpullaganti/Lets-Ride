import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

const Container = styled.button`
   ${tw`relative m-2 flex`}
   &:focus {
      outline: none;
   }
`

const Links = styled.ul`
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   background: ${Colors.white};
   top: 100%;
   left: 10%;
   border-radius: 4px;
   ${tw`flex flex-col items-start p-1 absolute shadow-lg`};
`
const ArrowIcon = styled.img`
   ${props =>
      props.shouldRotate
         ? `transform:rotate(0deg);
          
         `
         : `transform:rotate(180deg);
          filter: grayscale(80%);`};

   ${tw`mx-1 mt-1`};
`
const DisplayName = styled.div`
   color: ${props =>
      props.isBlueColor ? `${Colors.brightBlue}` : `${Colors.darkBlueGrey}`};
   ${tw``}
`
const LinkItem = styled.span`
   width: 120px;
   margin: 3px;
   padding: 5px 10px 5px 10px;
   ${tw`text-left`};
   cursor: pointer;
   &:hover {
      background: lightgray;
   }
`

export { Container, Links, ArrowIcon, DisplayName, LinkItem }
