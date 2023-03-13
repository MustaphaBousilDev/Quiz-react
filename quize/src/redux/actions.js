import {
     CHANGE_AMOUNT,
     
     CHANGE_DIFFICULTY,
     CHANGE_SCORE,
     CHANGE_TYPE,
} from './actionsTypes'



export const handleDifficultyChange=(payload)=>({
     type:CHANGE_DIFFICULTY,
     payload
})

export const handleTypeChange=(payload)=>({
     type:CHANGE_TYPE,
     payload
})

export const handleAmountChange=(payload)=>({
     type:CHANGE_AMOUNT,
     payload
})

export const handleScoreChange=(payload)=>({
     type:CHANGE_SCORE,
     payload
})