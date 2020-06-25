import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'

interface DateInputProps {
   shouldShow: boolean
}
interface ErrorComponentProps {
   isError: boolean
}
interface RequiredComponentProps {
   isRequired: boolean
}

const DateInput = styled.div`
   display: ${(props: DateInputProps) => (props.shouldShow ? 'flex' : 'none')};
   ${tw`text-sm  flex-col mt-4`};
`
const Label = styled.label`
   color: ${Colors.steel};
   ${Typo12SteelHKGroteskSemiBold};
   ${tw`flex`}
`
const Error = styled.span`
   display: ${(props: ErrorComponentProps) =>
      props.isError ? 'block' : 'none'};
   color: red;
   ${tw``};
   ${Typo12SteelHKGroteskSemiBold};
`
const Required = styled.span`
   display: ${(props: RequiredComponentProps) =>
      props.isRequired ? 'flex' : 'none'};
   color: ${Colors.neonRed};
   ${tw``};
`

export { DateInput, Label, Error, Required }
