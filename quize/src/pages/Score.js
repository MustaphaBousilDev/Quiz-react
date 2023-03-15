import React,{useState} from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './score.scss'
import { handleAmountChange, handleScoreChange ,handleChoiceAnswer } from '../redux/actions'
import HorizontalLabelPositionBelowStepper from '../components/steperComponent'
const Score = () => {
const [value,setValue]=useState(2)
const {score}=useSelector(state=>state)
//get question_random from redux
const {question_random}=useSelector(state=>state)
//get choice_answer from redux
const {choice_answer}=useSelector(state=>state)
console.log('hello mother fucker')
console.log(question_random)
console.log(choice_answer)
const dispatch=useDispatch()
const navigate=useNavigate() 
  const handlePlay=()=>{
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    navigate('/')
  }
  return (
    <>
    <Box mt={30}>
    <HorizontalLabelPositionBelowStepper activeStep={value} steps={['','','']} />
      <Typography textAlign={'center'} variant='h3'  fontWeight='bold' mb={3}>
        Final Score {score} of {question_random.length}
      </Typography>
      <Button onClick={handlePlay} variant='outlined'>
        Play Again
      </Button>
      {/*correction all question ans answer of this question */}
    </Box>
    
    {question_random.map((item,index)=>(
     
        <Box key={index} mb={2} mt={4}>
          <Typography variant='h5' fontWeight='bold' mb={1}>
            #01 : {item.question}
          </Typography>
          <Typography style={{display:'flex',gap:20}}  variant='h6' fontWeight='bold' mb={1}>
            Correct Answer: 
            <div className='answer__quize'>{item.answer.map((data)=>(data.id===item.correct_answer ? data.choix :''))}</div>
          </Typography>
          <Typography style={{display:'flex',gap:20}} variant='h6' fontWeight='bold' mb={1}>
            Your Answer: 
            <div className='choice__quize'>{item.answer.map((data)=>(data.id===parseInt(choice_answer[index]) ? data.choix  : '' ))}</div>
          </Typography>
          <Typography style={{display:'flex',gap:20}} variant='h6' fontWeight='bold' mb={1}>
            Explication: 
            <div className='explications'>{item.explication}</div>
          </Typography>
        </Box>
      
    ))}
   
    </>
  )
}

export default Score