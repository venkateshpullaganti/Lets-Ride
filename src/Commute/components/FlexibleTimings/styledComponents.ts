import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../../Common/themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

interface DatePickersProps {
   shouldShow: boolean
}
interface ErrorProps {
   isError: boolean
}
const DatePickers = styled.div`
   width: 100%;
   height: ${(props: DatePickersProps) =>
      props.shouldShow ? `initial` : `0px`};
   visibility: ${(props: DatePickersProps) =>
      props.shouldShow ? 'visible' : 'hidden'};
   ${tw`flex justify-between my-2`};
`
const FlexibleContainer = styled.div`
   color: ${Colors.steel};
   ${Typo12SteelHKGroteskSemiBold}
   ${tw`flex flex-wrap items-start my-2`};
`
const Checkbox = styled.input`
   ${tw`mr-2`};
`
const Error = styled.span`
   visibility: ${(props: ErrorProps) => (props.isError ? 'visible' : 'hidden')};
   ${Typo12SteelHKGroteskSemiBold}
   ${tw`text-red-500`};
`
const CheckboxContainer = styled.div`
   ${tw``};
`
export { DatePickers, FlexibleContainer, Checkbox, Error, CheckboxContainer }
