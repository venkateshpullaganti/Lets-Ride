import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   ${tw`relative m-2 `}
`

const List = styled.div`
   display: ${props => (props.shouldShow ? 'flex' : 'none')};
   background: ${Colors.white};
   top: 110%;
   right: 5%;
   border-radius: 4px;
   ${tw` flex-col items-start p-2 absolute shadow-lg z-20`};
`
const ArrowIcon = styled.img`
   ${props =>
      props.shouldRotate
         ? `transform:rotate(180deg);
          filter: grayscale(80%); 
         `
         : `transform:rotate(0deg)`};

   ${tw`mx-1 inline-block`};
`
const DisplayName = styled.button`
   cursor: pointer;
   color: ${props =>
      props.isSelected ? `${Colors.darkBlueGrey}` : `${Colors.steel}`};
   ${tw``}
   &:focus {
      outline: none;
   }
`
const Item = styled.button`
   font-size: 14px;
   width: 100%;
   color: ${Colors.steel};
   ${tw`p-2 focus:outline-none text-left`};
   &:hover {
      background: lightgray;
      cursor: pointer;
   }
`
const SortingOptions = styled.div`
   display: ${props => (props.shouldShowSortOptions ? 'flex' : 'none')};
   background: ${Colors.white};

   right: 100%;
   border-radius: 4px;
   ${tw` flex-col items-start p-2 relative shadow-lg z-20`};
`

export { Container, List, ArrowIcon, DisplayName, Item, SortingOptions }
