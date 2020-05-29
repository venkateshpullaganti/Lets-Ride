import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   ${tw`relative m-2 `}
`

const List = styled.div`
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   background: ${Colors.white};
   top: 110%;
   left: 10%;
   border-radius: 4px;
   ${tw`flex flex-col items-start p-1 absolute shadow-lg z-20`};
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
      props.isSelected ? `${Colors.darkBlueGrey}` : `${Colors.steel}`};
   ${tw``}
`
const Item = styled.span`
   width: 120px;
   margin: 3px;
   padding: 5px 10px 5px 10px;
   ${tw``};
   &:hover {
      background: lightgray;
      cursor: pointer;
   }
`

export { Container, List, ArrowIcon, DisplayName, Item }
