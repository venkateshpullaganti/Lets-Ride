import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

const Btn = styled.button`
   height: 40px;
   width: 40px;
   border: 1px solid lightgrey;
   ${tw``};
   &:focus {
      outline: none;
   }
`

const CounterContainer = styled.div`
   color: ${Colors.steel};
   ${tw`flex my-8`};
`
const Label = styled.label`
   margin-right: 15px;
   ${tw``}
   ${Typo12SteelHKGroteskSemiBold};
`
const Input = styled.input`
   height: 40px;
   width: 45px;
   ${props =>
      props.isError
         ? ` border:1px solid red;background:${Colors.neonRed5}`
         : `border:1px solid lightgrey;`};

   ${tw`text-center`};
   &:focus {
      outline: none;
   }
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
   }
`
const Error = styled.span`
   color: ${Colors.neonRed};
   ${tw`text-sm ml-1`};
`

const Required = styled.span`
   ${tw`text-red-500`};
`
export { Btn, CounterContainer, Label, Input, Error, Required }
