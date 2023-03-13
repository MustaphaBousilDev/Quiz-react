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

const getRandom=(max)=>{return Math.floor(Math.random()*Math.floor(max))}
const Questions = () => {
  const [value,setValue]=useState(1)
  const {question_difficulty,question_type,amount_questions,score}=useSelector(state=>state)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let apiUrl=`http://localhost:3000/data?_limit=${amount_questions}`
  if(question_difficulty){apiUrl +=`&difficulty=${question_difficulty}`}
  if(question_type){apiUrl+=`&type=${question_type}`}
  const {response,loading}=useAxios({url:apiUrl})
  const [randomData, setRandomData] = useState([]);
  const [questionIndex,setQuestionIndex]=useState(0)
  const [options,setOptions]=useState([])
  const ps=(1/amount_questions)*100
  const [progress, setProgress] = useState(ps);
  const [randomItem,setRandomItem]=useState([])
  const rn=[]
  const randome_data=[]

  useEffect(()=>{
    if(response){
      var mainSerie = []
        var aliasSerie=[]
        var q= 0
        var result
        let n=response.length
        for (var i = 0; i < n ; i++) {mainSerie.push(i)}
        const s=n
        while(aliasSerie.length<s){
            q=mainSerie[Math.floor(Math.random() *  n)];
            n--
            aliasSerie.push(q)
            result = q
            mainSerie.splice(mainSerie.indexOf(q),1)
        }
        for(let i=0;i<aliasSerie.length;i++){
            let n=aliasSerie[i];
            rn.push(response[n])
            setRandomData(rn)
        }
        
        
      /*for(let i=0;i<response.length;i++){
        const randomIndex = Math.floor(Math.random() * response.length);
        rn.push(response[randomIndex])
        setRandomData(rn)
      }*/
      const question=rn[questionIndex]?.question
      const options=[...rn[questionIndex]?.answer]
      setOptions(options)
      options.map((data,id)=>(console.log(data.id)))
      
    }
  },[response])

  if(randomData.length===0){return (<Box mt={20}><CircularProgress/></Box>)}
  if(loading){return (<Box mt={20}><CircularProgress/></Box>)}
  const handleAnswer=(e)=>{
    setProgress((prevProgress) => (prevProgress >= 100 ? ps : prevProgress + ps));
    const question=randomData[questionIndex]
    if(parseInt(e.target.id)===question.correct_answer){
  dispatch(handleScoreChange(score + 1))
   }
    if(questionIndex +1 < response.length){
      setQuestionIndex(questionIndex + 1)
    }else{
      navigate('/score')
    }
  }

  console.log('fuck me')
  console.log(randomData)
  return (
    <>
    <Box>
      <Typography mb={2} variant='h2'>Questions {questionIndex + 1}</Typography>
      <HorizontalLabelPositionBelowStepper activeStep={value} steps={['','','']} />
      <Typography mt={5} variant='h4'>{randomData[questionIndex].question}</Typography>
      {
        options.map((data,id)=>(
          <Box mt={2} key={id}>
            <Button id={data.id} onClick={handleAnswer} variant='contained'>
              {decode(data.choix)}
            </Button>
          </Box>
        ))
      }
      <Box mt={5}>
        Score: {(score)}/{response.length}
      </Box>
    </Box>

    <LinearProgressWithLabel value={progress} />
    </>
  )
}

export default Questions