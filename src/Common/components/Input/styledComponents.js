import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../../styleGuide/Typos'
import Colors from '../../themes/Colors'

const CustomInput = styled.input`
   height: 40px;
   width: 100%;
   border-width: 1px;
   border-style: solid;
   border-color: ${props => (props.isError ? Colors.neonRed : Colors.steel)};
   background: ${props => (props.isError ? Colors.neonRed5 : Colors.white)};
   border-radius: 2px;
`
const CustomLabel = styled.label`
   margin-bottom: 8px;
   color: ${Colors.steel};
`
const Error = styled.span`
   color: ${Colors.neonRed};
`
const ErrorIcon = styled.img`
   height: 16px;
   width: 16px;
   right: 10px;
   top: 35px;
   ${tw`absolute`}
`
const InputContainer = styled.div`
   width: 100%;
   margin-top: 48px;
   ${tw`relative `};
`

export { CustomInput, CustomLabel, Error, ErrorIcon, InputContainer }
