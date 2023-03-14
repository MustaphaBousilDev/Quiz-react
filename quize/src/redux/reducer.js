import { 
     CHANGE_AMOUNT, 
     CHANGE_DIFFICULTY, 
     CHANGE_SCORE, 
     CHANGE_TYPE,
     RANDOM_QUESTION,CHOICE_ANSWER } from "./actionsTypes"

const initialState={
     question_difficulty:'',
     question_type:'',
     question_random:[],
     choice_answer:[],
     amount_questions:10,
     score:0
}

const reducer=(state=initialState,action)=>{
     switch(action.type){
          case CHANGE_DIFFICULTY: 
          return {
               ...state,
               question_difficulty:action.payload
          }
          
          case CHANGE_TYPE:
          return {
               ...state,
               question_type:action.payload
          }
          case CHANGE_AMOUNT:
          return {
               ...state,
               amount_questions:action.payload
          }
          case CHANGE_SCORE:
          return {
               ...state,
               score:action.payload
          }
          case RANDOM_QUESTION:
          return {
               ...state,
               question_random:action.payload
          }
          case CHOICE_ANSWER:
          return {
               ...state,
               choice_answer:action.payload

          }

          default: 
               return state 
     }
}


export default reducer