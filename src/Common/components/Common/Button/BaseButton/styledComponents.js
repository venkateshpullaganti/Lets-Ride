import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import colors from '../../../../themes/Colors'

const Button = styled.button`
padding:4px;
border-radius:2px;

   ${props =>
      props.isDisabled
         ? `
   opacity:0.4;
   cursor:not-allowed;
   `
         : `
   cursor:pointer;
   `}
   background: ${colors.brightBlue};
   ${tw`text-white focus:outline-none`};
`
const ButtonName = styled.span`
   ${tw``};
`

export { Button, ButtonName }
