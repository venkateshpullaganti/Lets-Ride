import styled from '@emotion/styled'
import tw from 'tailwind.macro'

// import { Typo12SteelHKGroteskSemiBold } from '../../'

import { Typo14BrightBlueHKGroteskRegular } from '../../../styleGuide/Typos'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   background: ${Colors.iceBlue};
   ${tw`p-2 flex justify-center items-center h-screen`};
`
const Form = styled.form`
   height: 687px;
   width: 536px;
   max-height: 687px;
   max-width: 536px;
   background: ${Colors.white};
   padding-top: 48px;
   box-sizing: border-box;
   padding-left: 108px;
   padding-right: 108px;
   padding-bottom: 141px;
   ${tw`flex items-center flex-col`};
`
const AskSignUp = styled.div`
   ${Typo14BrightBlueHKGroteskRegular}
`
const SignUpLink = styled.a`
   margin-left: 2px;
   color: ${Colors.brightBlue};
`

export { Container, Form, AskSignUp, SignUpLink }
