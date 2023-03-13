import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {  handleDifficultyChange, handleTypeChange } from '../redux/actions'
import { useDispatch } from 'react-redux'
const SelectField = (props) => {
    const {label,options}=props
    const [value,setValue]=useState('')
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        console.log(e.target.value)
        setValue(e.target.value)
        switch(label){
            case 'Difficulty':
                dispatch(handleDifficultyChange(e.target.value))
                break
            case 'Type':
                dispatch(handleTypeChange(e.target.value))
                break
            default:
                return 
        }
    }
  return (
    <Box mt={3} width='100%'>
        <FormControl size="small" fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={handleChange}>
                {
                    options.map((opt)=>(
                        <MenuItem key={opt.id} value={opt.id}>
                            {opt.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </Box>
  )
}

export default SelectField