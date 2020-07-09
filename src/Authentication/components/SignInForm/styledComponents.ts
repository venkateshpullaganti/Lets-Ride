import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Typo14BrightBlueHKGroteskRegular } from '../../../Common/styleGuide/Typos'

import Colors from '../../../Common/themes/Colors'

const Container = styled.div`
   background: ${Colors.iceBlue};
   border: 1px solid green;
   box-sizing: border-box;
   ${tw`p-4 flex items-center h-screen flex-col`};
`
const Form = styled.form`
   height: 587px;
   width: 400px;
   background: ${Colors.white};
   padding: 50px;
   box-sizing: border-box;
   ${tw`flex items-center flex-col shadow-lg rounded `};
`
const AskSignUp = styled.div`
   ${Typo14BrightBlueHKGroteskRegular}
   ${tw`text-lg`}
`
const SignUpLink = styled.a`
   margin-left: 2px;
   color: ${Colors.brightBlue};
`

export { Container, Form, AskSignUp, SignUpLink }
