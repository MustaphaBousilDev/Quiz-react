import { Button, CircularProgress, Typography } from "@mui/material"
import TextFieldComp from "../components/TextFieldComp"
import { Box } from "@mui/system"
import { useState } from "react"
import SelectField from "../components/SelectField"
import HorizontalLabelPositionBelowStepper from "../components/steperComponent"
import { useNavigate } from 'react-router-dom';
import useAxios from "../hooks/useAxios"

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate=useNavigate()
  const [value,setValue]=useState(0)


  const handleSubmit=(e)=>{
    e.preventDefault()
    setValue(value+1)
    navigate('/questions')
    //console.log(value)
  }
  //difficulty options 
  const difficultyOptions=[
    {id:'easy',name:'Easy'},
    {id:'medium',name:'Medium'},
    {id:'hard',name:'Hard'}
  ]

  //type options
  const typeOptions=[
    {id:'multiple',name:'Multiple Choice'},
    {id:'boolean',name:'True/False'}
  ]
  //console.log(response)
  if(loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }
  if(error){
    return (
      <Typography variant='h6' mt={20} color='red'>
        Some Went Wrong!
      </Typography>
    )
  }
  

  return (
    <>
    <HorizontalLabelPositionBelowStepper activeStep={value} steps={['','','']} />
    <form onSubmit={handleSubmit}>
      <SelectField options={response.trivia_categories} label='Category' />
      <SelectField options={difficultyOptions} label='Difficulty' />
      <SelectField options={typeOptions} label='Type' />
      <TextFieldComp />
      <Box mt={3} width='100%'>
        <Button fullWidth  variant='contained' type='submit'>
          Start Quiz
        </Button>
      </Box>
    </form>
    </>
  )
}

export default Settings