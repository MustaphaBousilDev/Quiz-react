import { Box, Button, CircularProgress, Typography } from "@mui/material"
import HorizontalLabelPositionBelowStepper from "../components/steperComponent"
import { useState } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector } from "react-redux"
const Questions = () => {
  const [value,setValue]=useState(1)
  //use useSelector
  const {
    question_category,
     question_difficulty,
     question_type,
     amount_questions
  }=useSelector(state=>state)
  //console.log('hello motheer fucker')
  //console.log(amount_questions,question_category,question_difficulty,question_type)
  let apiUrl=`api.php?amount=${amount_questions}`
  if(question_category){
      apiUrl.concat(`&category=${question_category}`)
  }
  if(question_difficulty){
      apiUrl.concat(`&difficulty=${question_difficulty}`)
  }
  if(question_type){
      apiUrl.concat(`&type=${question_type}`)
  }
  const {response,loading}=useAxios({url:apiUrl})
 if(loading){
    return (
      <Box>
        <CircularProgress/>
      </Box>
    )
 }
  
  return (
    <Box>
      <Typography mb={2} variant='h2'>Questions</Typography>
      <HorizontalLabelPositionBelowStepper activeStep={value} steps={['','','']} />
      <Typography mt={5} variant='h4'>This is Questions ? </Typography>
      <Box mt={2}>
        <Button variant='contained'>Answer 1</Button>
      </Box>
      <Box mt={2}>
        <Button variant="contained">Answer 2</Button>
      </Box>
      <Box mt={5}>
        Score: 2/6
      </Box>
    </Box>
  )
}

export default Questions