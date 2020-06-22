import styled from '@emotion/styled'
import tw from 'tailwind.macro'

// import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'
import Colors from '../../themes/Colors'

export const LoadingViewContainer = styled.div`
   ${'' /* height: 50%; */}
   height: 200px;
   ${'' /* box-sizing: border-box; */}
   ${tw`flex flex-col justify-center items-center self-center`};
`

export const FailureViewContainer = styled.div`
   height: 100%;
   min-height: 400px;
   ${tw`flex flex-col justify-center items-center `};
`

export const FailureViewMessage = styled.p`
   ${tw`m-6 text-2xl text-center`};
`

const RetryButton = styled.button`
   ${tw`px-4 bg-blue-500 py-1 text-white text-lg rounded`};
   &:focus {
      outline: none;
   }
`

const ErrorContainer = styled.div`
   height: 100%;
   ${tw`p-4 flex flex-col items-center  justify-center`}
`
const ErrorMsg = styled.span``
const ErrorIcon = styled.img`
   ${tw`m-4`};
`
const BackToHomeBtn = styled.button`
   ${tw`px-4 py-2 my-3  bg-blue-500 text-white rounded`};
   &:focus {
      outline: none;
   }
`
const ErrorCode = styled.div`
   ${tw`text-3xl`};
`
const Image = styled.img`
   width: 300px;
   ${tw``};
`
const MsgContainer = styled.div`
   ${tw`flex p-2 items-center justify-center`};
`
const Message = styled.div`
   ${tw`text-lg`};
`
const ImgContainer = styled.div`
   width: 80px;
   height: 80px;
   border: 1px solid ${Colors.lightBlueGrey};
   ${tw`p-2 mx-3 rounded flex items-center justify-center`};
`

export {
   MsgContainer,
   Message,
   Image,
   ErrorContainer,
   ErrorIcon,
   ErrorMsg,
   BackToHomeBtn,
   ErrorCode,
   ImgContainer,
   RetryButton
}
