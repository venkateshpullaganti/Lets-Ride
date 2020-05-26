import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'

const Btn = styled.button`
   height: 40px;
   background: ${Colors.brightBlue};
   border-radius: 4px;
   ${tw`flex justify-center items-center text-white`};
   ${props =>
      props.disabled
         ? ` opacity:0.5;
            cursor:not-allowed;
           `
         : `
            opacity:1;
            cursor:pointer;
            `};
   &:focus {
      outline: none;
   }
`
export { Btn }
