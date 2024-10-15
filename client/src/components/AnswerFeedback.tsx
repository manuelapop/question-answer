import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const QuizCardContainer = styled(Box)`
    background-color: rgb(248, 248, 248);
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    padding-top: 3rem;
`

const FeedbackTextContainer = styled(Box)`
    opacity: 1;
    padding-top: 30px;
    padding-bottom: .2rem;
    word-wrap: break-word;
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 1.5rem;
    max-height: 74rem;
    overflow: auto;
    padding-left: 11.1111111111%;
    padding-right: 11.1111111111%;
    text-align: center;
`

interface Props {
    isCorrect?: Boolean;
    text: string;
}

const AnswerFeedback = (props: Props) => {

  return (  
    <QuizCardContainer>
         {props.isCorrect ? (
            <Box>
                <CheckCircleOutlineIcon sx={{ fontSize: 80, stroke: "#ffffff", strokeWidth: 1 }}/>
                <div>Correct</div>
            </Box>
         ): (
            <Box>
                <CancelOutlinedIcon sx={{ fontSize: 80, stroke: "#ffffff", strokeWidth: 1}}/>
                <div>Incorrect</div>
            </Box>
            )
         }
        <FeedbackTextContainer>
            {props.text}
        </FeedbackTextContainer>

   
    </QuizCardContainer>
 );
};

export default AnswerFeedback;