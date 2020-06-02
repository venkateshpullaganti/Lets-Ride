import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'

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
   ${tw`flex my-4`};
`
const Label = styled.label`
   margin-right: 15px;
   ${tw``}
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
export { Btn, CounterContainer, Label, Input, Error }
