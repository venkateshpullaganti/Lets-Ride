import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const DatePickers = styled.div`
   height: ${props => (props.shouldShow ? `initial` : `0px`)};
   visibility: ${props => (props.shouldShow ? 'visible' : 'hidden')};
   ${tw`flex items-center m-2`};
`
const FlexibleContainer = styled.div`
   ${tw`flex flex-wrap justify-center items-center`};
`
export { DatePickers, FlexibleContainer }
