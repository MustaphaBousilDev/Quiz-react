import { Box, Button, CircularProgress, Typography } from "@mui/material"
import HorizontalLabelPositionBelowStepper from "../components/steperComponent"
import { useState,useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { useNavigate } from "react-router-dom"
import LinearProgressWithLabel from "../components/progressBar"
import { useDispatch } from "react-redux"
import { decode } from "html-entities"
import { handleScoreChange } from "../redux/actions"

const getRandom=(max)=>{
  return Math.floor(Math.random()*Math.floor(max))
}
const Questions = () => {
  /////////////////////////////////////
  

  
  //////////////////////////
  const [value,setValue]=useState(1)
  //use useSelector
  const {
    question_category,
     question_difficulty,
     question_type,
     amount_questions,
     score
  }=useSelector(state=>state)

  //history
  const navigate=useNavigate()
  //dispatch
  const dispatch=useDispatch()




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
  const [questionIndex,setQuestionIndex]=useState(0)
  const [options,setOptions]=useState([])
 
  const ps=(1/amount_questions)*100
  const [progress, setProgress] = useState(ps);
  //console.log(options)
  useEffect(() => {
    if(response?.results.length){
      const question=response.results[questionIndex]
      let answers=[...question.incorrect_answers]
      answers.splice(getRandom(question.incorrect_answers.length),0,question.correct_answer)
      setOptions(answers)
      console.log(response)
    }
  }, [response,questionIndex]);
 if(loading){
    return (
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
 }
  
  

  const handleAnswer=(e)=>{
    setProgress((prevProgress) => (prevProgress >= 100 ? ps : prevProgress + ps));
    const question=response.results[questionIndex]
    if(e.target.textContent===question.correct_answer){
        dispatch(handleScoreChange(score + 1))
    }
    if(questionIndex + 1 < response.results.length){
      setQuestionIndex(questionIndex + 1)
    }else{
      navigate('/score')
    }
  }
  return (
    <>
    <Box>
      <Typography mb={2} variant='h2'>Questions {questionIndex + 1}</Typography>
      <HorizontalLabelPositionBelowStepper activeStep={value} steps={['','','']} />
      <Typography mt={5} variant='h4'>{decode(response.results[questionIndex].question)}</Typography>
      {
        options.map((data,id)=>(
          <Box mt={2} key={id}>
            <Button onClick={handleAnswer} variant='contained'>
              {decode(data)}
            </Button>
          </Box>
        ))
      }
      <Box mt={5}>
        Score: {(score)}/{response.results.length}
      </Box>
    </Box>

    <LinearProgressWithLabel value={progress} />
    </>
  )
}

export default Questions