import React, { useEffect, useState } from 'react'
import logoRise360 from './logo-rise-360.svg'
import logoRiseCom from './logo-rise-com.svg'
import './App.css'
import Box from '@mui/material/Box';
import Question from './components/Question';
import { styled as materialuistyled} from '@mui/material/styles';

export interface Answer{
  id: string;
  knowledgeCheckBlockId: string;
  questionId: string;
  text: string;
  pos: number;
  isCorrect: boolean;
}

export interface QuestionItem{
  feedback: string;
  knowledgeCheckBlocksId: string;
  questionId: string;
  text: string;
  url: string;
  questionAnswersId: string;
  answers: Answer[];
}

const BlockKnowledgeContainer = materialuistyled(Box)`
    max-width: 92rem;
    @media(min-width:60em){
      padding-left: 6rem;
      padding-right: 6rem;
    }
    @media(min-width:33.75em){
      padding-left: 3rem;
      padding-right: 3rem;
    }
`

const BlockKnowledgeMainContainer = materialuistyled(Box)`
    padding: 3rem 0;
    transition: padding .5s;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
`

const BlockKnowledgeRow = materialuistyled(Box)`
    margin-left: -1.5rem;
    margin-right: -1.5rem;
`

const ContentDiv = materialuistyled(Box)`
    border: .1rem solid #ddd;
    box-shadow: 0 .2rem 3rem rgba(0, 0, 0, .1);
    padding: 6.5rem 6rem 4rem;
`

function App() {
  const [question, setQuestion] = useState<QuestionItem>();

  useEffect(() => {
    fetch('http://localhost:5001/knowledge-check-blocks')
        .then(response => response.json())
        .then(json => {console.log(json); setQuestion(json[0]);})
        .catch(error => console.error(error));
      }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoRiseCom} className="App-logo" alt="logo" />
        <h1>Rise Tech Challenge</h1>
        <img src={logoRise360} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        <BlockKnowledgeMainContainer>
          <BlockKnowledgeContainer>
            <BlockKnowledgeRow>
              <ContentDiv>
                <Question question={question || undefined}/>
              </ContentDiv>
            </BlockKnowledgeRow>
          </BlockKnowledgeContainer>
        </BlockKnowledgeMainContainer>
      </section>
    </div>
  )
}

export default App
