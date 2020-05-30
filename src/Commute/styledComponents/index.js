import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../Common/themes/Colors'

import { Typo20DarkBlueGreyHKGrotestBold } from '../../Common/styleGuide/Typos'

const Heading = styled.p`
   ${Typo20DarkBlueGreyHKGrotestBold};
   height: 32px;
   ${tw`p-1 self-center`}
`

const Form = styled.form`
   max-height: 656px;
   max-width: 497px;
   background: ${Colors.white};
   padding: 50px;
   border-radius: 6px;
   box-sizing: border-box;
   ${tw`flex m-4 items-start flex-col  mx-auto shadow-2xl`};
`
const HomePageHeader = styled.p`
   ${tw`text-lg p-2`}
`
export { Heading, Form, HomePageHeader }
