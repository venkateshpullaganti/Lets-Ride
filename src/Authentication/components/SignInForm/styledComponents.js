import styled from '@emotion/styled'
import tw from 'tailwind.macro'

// import { Typo12SteelHKGroteskSemiBold } from '../../'

import { Typo14BrightBlueHKGroteskRegular } from '../../../Common/styleGuide/Typos'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   min-height: 100vh;
   min-width: 100vw;
   background: ${Colors.iceBlue};
   border: 1px solid green;
   box-sizing: border-box;
   ${tw`p-4 flex justify-center items-center h-screen`};
`
const Form = styled.form`
   height: 587px;
   width: 400px;
   background: ${Colors.white};
   padding: 50px;
   box-sizing: border-box;

   ${tw`flex items-center flex-col shadow-lg rounded`};
`
const AskSignUp = styled.div`
   ${Typo14BrightBlueHKGroteskRegular}
`
const SignUpLink = styled.a`
   margin-left: 2px;
   color: ${Colors.brightBlue};
`

export { Container, Form, AskSignUp, SignUpLink }
