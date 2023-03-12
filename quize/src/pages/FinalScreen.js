import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleAmountChange, handleScoreChange } from '../redux/actions'
const Score = () => {
const {score}=useSelector(state=>state)
const dispatch=useDispatch()
const navigate=useNavigate() 
  const handlePlay=()=>{
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(50))
    navigate('/')
  }
  return (
    <Box mt={30}>
      <Typography variant='h3' fontWeight='bold' mb={3}>
        Final Score {score}
      </Typography>
      <Button onClick={handlePlay} variant='outlined'>
        Play Again
      </Button>
    </Box>
  )
}

export default Score