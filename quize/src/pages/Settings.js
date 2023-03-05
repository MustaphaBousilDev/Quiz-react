import { Button } from "@mui/material"
import TextFieldComp from "../components/TextFieldComp"
import { Box } from "@mui/system"
import SelectField from "../components/SelectField"
const Settings = () => {
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <SelectField label='Category' />
      <SelectField label='Difficulty' />
      <SelectField label='Type' />
      <TextFieldComp />
      <Box mt={3} width='100%'>
        <Button fullWidth variant='contained' type='submit'>
          Start Quiz
        </Button>
      </Box>
    </form>
  )
}

export default Settings