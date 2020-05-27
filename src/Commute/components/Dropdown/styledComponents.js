import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   ${tw`relative m-2`}
`

const Links = styled.ul`
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   background: ${Colors.white};
   top: 110%;
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

   ${tw`mx-1 inline-block`};
`
const DisplayName = styled.span`
   cursor: pointer;
   color: ${props =>
      props.isBlueColor ? `${Colors.brightBlue}` : `${Colors.darkBlueGrey}`};
   ${tw``}
`
const LinkItem = styled.span`
   width: 120px;
   margin: 3px;
   padding: 5px 10px 5px 10px;
   ${tw``};
   &:hover {
      background: lightgray;
   }
`

export { Container, Links, ArrowIcon, DisplayName, LinkItem }
