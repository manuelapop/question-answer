import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import knex from './knex'

const getKnowledgeCheckBlocks = async (req: Request, res: Response) => {
const knowledgeCheckBlocks = await knex('knowledgeCheckBlocks')
  .innerJoin('questions', 'knowledgeCheckBlocks.questionId', 'questions.id')
  .innerJoin('media', 'questions.mediaId', 'media.id')
  .leftJoin('answers', 'knowledgeCheckBlocks.id', '=', 'answers.knowledgeCheckBlockId')
  .select(
    'knowledgeCheckBlocks.id as knowledgeCheckBlocksId',
    'questions.text as text',
    'questions.id as questionId',
    'questions.answersId as questionAnswersId',
    'knowledgeCheckBlocks.feedback as feedback',
    'media.url as url',
    knex.raw(
      "case when count(answers) = 0 then '[]' else json_agg(answers.*) end as answers",
    ),
  )
  .groupBy('knowledgeCheckBlocks.id', 'questions.id', 'knowledgeCheckBlocks.feedback', 'media.url', 'questions.text');


  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(knowledgeCheckBlocks)
}

const saveQuestionBlock = async (req: Request, res: Response) => {
  const result = await knex('questions').where({ id: req.body.id }).update(
    {
      answersId: req.body.answersId,
    },
    ['id', 'answersId']
  );
  
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(result);
}

const app = express()
const port = 5001

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/knowledge-check-blocks', getKnowledgeCheckBlocks)
app.post('/question-block-save', saveQuestionBlock)

app.listen(port, () => console.log(`Listening on port ${port}`))
