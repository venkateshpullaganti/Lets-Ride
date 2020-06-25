import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'
import Colors from '../../themes/Colors'

interface CustomInputProps {
   isError: boolean
}
interface InputContainerProps {
   shouldShow: boolean
}

const CustomInput = styled.input`
   height: 40px;
   width: 100%;
   box-sizing: content-box;
   border-width: 1px;
   border-style: solid;
   border-color: ${(props: CustomInputProps) =>
      props.isError ? Colors.neonRed : Colors.steel};
   background: ${(props: CustomInputProps) =>
      props.isError ? Colors.neonRed5 : Colors.white};
   border-radius: 2px;
   box-sizing: border-box;
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
   }
   -moz-appearance: textfield;
   &:focus {
      outline: none;
   }
   ${tw`pl-3`}
`
const Label = styled.label`
   ${Typo12SteelHKGroteskSemiBold};
   color: ${Colors.steel};
`
const Error = styled.div`
   height: 25px;

   color: ${Colors.neonRed};
`
const ErrorIcon = styled.img`
   height: 16px;
   width: 16px;
   right: 0px;
   top: 35px;
   ${tw`absolute`}
`
const InputContainer = styled.div`
   display: ${(props: InputContainerProps) =>
      props.shouldShow ? 'flex' : 'none'};
   width: 100%;
   ${tw`relative flex flex-col`};
`
const Required = styled.span`
   ${tw`text-red-500`};
`
const LabelContainer = styled.div`
   ${tw`flex items-center`};
`

export {
   CustomInput,
   Label,
   Error,
   ErrorIcon,
   InputContainer,
   Required,
   LabelContainer
}
