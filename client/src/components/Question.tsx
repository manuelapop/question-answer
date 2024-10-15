import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { QuestionItem } from '../../src/App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AnswerFeedback from './AnswerFeedback';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const QuizCardContainer = styled(Box)`
    min-height: 21rem;
    background: transparent;
`
const QuizCardTitle = styled.div`
    margin-bottom: 1rem;
    font-size: 19px;
    font-weight: 500;
    letter-spacing: -.02rem;
    line-height: 2;
    text-align:left;
`
const QuizMediaContainer = styled(Box)`
    & >img {
     width:100%;
     height:auto;
}
`
const QuizCardInteractiveContainer = styled(Box)`
    margin: 1.5rem 0 2rem;
    margin-bottom: 1.5rem;
    border-top: .1rem solid;
    padding: 1rem 0;
`
const QuizCardInteractiveAnswersContainer = styled(Box)`
    text-align:left;
    margin-top: 10px;
`
const SubmitButtonDiv = styled(Box)`
      padding-top:60px;
      padding-bottom:20px;
`

const FormLabelDiv = styled(Box)`
      padding-bottom: 20px;
      padding-top: 15px;
      padding-left: 15px;
      &:hover {
        background-color: #f7f7f8;
      }
`
const FormLabelSelectSubmitDiv= styled(Box)`
      padding-bottom: 20px;
      padding-top: 15px;
      padding-left: 15px;
      border: 2px solid rgb(116, 122, 126);
`

const FormLabelSubmitDiv = styled(Box)`
      padding-bottom: 20px;
      padding-top: 15px;
      padding-left: 15px;
`

const QuizSubmitButton = styled(Button)`
  &.button {
    align-items: center;
    background-color: rgb(116, 122, 126);
    border: 1px solid rgb(116, 122, 126);
    border-radius: 2rem;
    box-sizing: border-box;
    color: #fff;
    display: inline-flex;
    font-size: 1.2rem;
    font-weight: 700;
    height: 4rem;
    justify-content: center;
    letter-spacing: .04em;
    max-width: 17rem;
    min-width: 10rem;
    outline-offset: .2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-decoration: none;
    text-overflow: ellipsis;
    text-transform: uppercase;
    transition: background .3s, border-color .3s, color .3s;
    width: 100%;
}
`

interface Props {
    question?: QuestionItem;
}

const Question = (props: Props) => {
    const [value, setValue] = React.useState('');
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [isSubmit, setIsSubmit] = React.useState(false);

    useEffect(() => {
        setValue(props.question?.questionAnswersId || '');
        if (props.question?.questionAnswersId){
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
        props.question?.answers?.forEach(el => {
            if(el.id === props.question?.questionAnswersId && el.isCorrect){
                setIsCorrect(true);
            }}
        )
    }, [props.question?.questionAnswersId, setValue, setIsSubmit, props.question?.answers]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
      setIsCorrect(false);
    };

    const handleSubmit = async () => {
        props.question?.answers?.forEach(el => {
            if(el.id === value && el.isCorrect){
                setIsCorrect(true);
            }}
        )
        setIsSubmit(true);
        console.log(props.question?.questionId, value, 'props.question?.questionId post');

        try {
            let result = fetch('http://localhost:5001/question-block-save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({  id: props.question?.questionId,
                    answersId: value })
            })
            result.then((sucess) => { console.log(sucess) })
        } catch (error) {
            console.log(error)
        }
      };

    const onClickTakeAgain = () => {
        setIsSubmit(false);
        setValue('');
        try {
            let result = fetch('http://localhost:5001/question-block-save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({  id: props.question?.questionId,
                    answersId: '' })
            })
            result.then((sucess) => { console.log(sucess, 'reload'); })
        } catch (error) {
            console.log(error)
        }
    }

  return (  
    <QuizCardContainer>
        <QuizCardTitle>{props.question?.text}</QuizCardTitle>
        <QuizMediaContainer>
            <img src={props.question?.url}/>
        </QuizMediaContainer>
        <QuizCardInteractiveContainer>
        <QuizCardInteractiveAnswersContainer>
            <FormControl style={{ width: "100%" }}>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group-answers"
                name="controlled-radio-buttons-group-answers"
                value={value}
                onChange={handleChange}
                >
                    {props.question?.answers?.map(el =>
                    <>
                    {isSubmit && value === el.id && <FormLabelSelectSubmitDiv key={`${el.id}-FormLabelSelectSubmitDiv`} >
                    <FormControlLabel value={el.id} style={{ width: "100%" }} key={`${el.id}-formcontrolabel`}
                        control={el.isCorrect ? <CheckCircleOutlineIcon  key={`${el.id}-CheckCircleOutlineIcon`} sx={{ fontSize: 24, padding: '9px', color: 'rgba(0, 0, 0, 0.6)', stroke: "#ffffff", strokeWidth: 1 }}/> : <CancelOutlinedIcon sx={{ fontSize: 24, padding: '9px', color: 'rgba(0, 0, 0, 0.6)', stroke: "#ffffff", strokeWidth: 1 }}/>} label={
                            <Box component="div" fontSize={17} sx={{paddingLeft: '20px'}}>
                               {el.text}
                             </Box>
                       }/>
                    </FormLabelSelectSubmitDiv>}  
                    {isSubmit && value !== el.id && <FormLabelSubmitDiv key={`${el.id}-FormLabelSubmitDiv`}>
                    <FormControlLabel value={el.id} style={{ width: "100%" }}
                        control={el.isCorrect ? <CheckCircleOutlineIcon sx={{ fontSize: 24, padding: '9px', color: 'rgba(0, 0, 0, 0.6)', stroke: "#ffffff", strokeWidth: 1 }}/> : <CancelOutlinedIcon sx={{ fontSize: 24, padding: '9px', color: 'rgba(0, 0, 0, 0.6)', stroke: "#ffffff", strokeWidth: 1 }}/>} key={el.id} label={
                            <Box component="div" fontSize={17} sx={{paddingLeft: '20px'}}>
                               {el.text}
                             </Box>
                       }/>
                    </FormLabelSubmitDiv>}              
                    {(!isSubmit) && <FormLabelDiv  key={`${el.id}-FormLabelDiv`}>
                        <FormControlLabel value={el.id} style={{ width: "100%" }}  key={`${el.id}-FormLabelDiv-FormControlLabel`}
                        control={<Radio sx={{stroke: "#ffffff", strokeWidth: 1,

                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                    '&.MuiButtonBase-root.MuiRadio-root:hover': {
                                        backgroundColor: 'transparent'
                                    },
                                    '&.MuiButtonBase-root.MuiRadio-root.Mui-checked': {
                                        backgroundColor: 'transparent',
                                        color: 'rgba(0, 0, 0, 0.6)'
                                    }
                                }}/>} label={
                            <Box component="div" fontSize={17} sx={{paddingLeft: '20px'}}>
                               {el.text}
                             </Box>
                       }/>
                    </FormLabelDiv>}
                    </>
                    )}
                </RadioGroup>
            </FormControl>
        </QuizCardInteractiveAnswersContainer>
        <SubmitButtonDiv>
        {!isSubmit && <QuizSubmitButton className={'button'} onClick={handleSubmit}>Submit</QuizSubmitButton>}
        {isSubmit && <AnswerFeedback text={props.question?.feedback || ''} isCorrect={isCorrect}/>}
        {isSubmit && <Box onClick={onClickTakeAgain}><div>Take again</div><ReplayIcon sx={{ fontSize: 30, paddingTop: '10px', stroke: "#ffffff", strokeWidth: 1 }}/></Box>}
        </SubmitButtonDiv>
        </QuizCardInteractiveContainer>
    </QuizCardContainer>);
};

export default Question;