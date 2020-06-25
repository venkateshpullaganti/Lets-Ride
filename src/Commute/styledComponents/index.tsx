import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Colors from '../../Common/themes/Colors'

import {
   Typo20DarkBlueGreyHKGrotestBold,
   Typo8WhiteHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular
} from '../../Common/styleGuide/Typos'

interface BadgeProps {
   isAccepted: boolean
   isExpired: boolean
}

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
const AddRequestBtn = styled.button`
   height: 24px;
   ${tw`focus:outline-none`}
`
const TotalPages = styled.div`
   height: 24px;
   ${tw``};
`

const TableFooter = styled.div`
   color: ${Colors.steel};
   box-sizing: border-box;
   ${tw`flex justify-between items-center p-4`};
`
const Label = styled.label`
   color: ${Colors.steel};
   ${tw``};
`
const TableContainer = styled.div`
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`m-2 `};
`
const Header = styled.div`
   height: 64px;
   width: 100%;
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`flex justify-between items-center`};
`

const Col = styled.div`
   color: ${Colors.steel};
   height: 48px;
   width: 130px;
   ${tw``};
`

const Badge = styled.div`
   height: 16px;
   width: 72px;
   ${Typo8WhiteHKGroteskSemiBold};
   background: ${(props: BadgeProps) =>
      props.isAccepted
         ? `${Colors.greenishTeal}`
         : props.isExpired
         ? `${Colors.lightBlueGrey}`
         : `${Colors.yellowOrange}`};
   border-radius: 10px;
   ${tw` flex items-center justify-center`};
`
const Data = styled.div`
   ${Typo14SteelHKGroteskRegular};
   height: 48px;
   width: 130px;
   ${tw``};
`

const Row = styled.div`
   height: 64px;
   border: 1px solid ${Colors.lightBlueGrey40};
   ${tw`flex justify-between items-center p-2`};
`

export {
   Header,
   Heading,
   Form,
   HomePageHeader,
   AddRequestBtn,
   TotalPages,
   TableFooter,
   Label,
   TableContainer,
   Col,
   Badge,
   Data,
   Row
}
