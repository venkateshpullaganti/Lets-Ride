import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'
import Colors from '../../themes/Colors'

const ErrorContainer = styled.div`
   ${tw`w-screen h-screen flex items-center  justify-center`}
`
const ErrorMsg = styled.span``
const ErrorIcon = styled.img`
   ${tw``}
`
const InputContainer = styled.div`
   width: 100%;
   margin-top: 20px;
   ${tw`relative `};
`
const Required = styled.span`
   ${tw`text-red-500`};
`
const RetryBtn = styled.button`
   ${tw``};
`
const ErrorCode = styled.div`
   ${tw``};
`
const Image = styled.img`
   ${tw``};
`

export { Image, ErrorContainer, ErrorIcon, ErrorMsg, RetryBtn, ErrorCode }
