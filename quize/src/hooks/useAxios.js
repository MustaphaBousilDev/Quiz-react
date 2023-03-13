import React, { useEffect } from 'react'
import axios from 'axios'   
//useEffect its well be running every time when url changes
//axios.defaults.baseURL='https://opentdb.com/'
const useAxios = ({url}) => {
    const [response, setResponse] = React.useState(null)
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    useEffect(()=>{
        const fetchData=()=>{
            axios.get(url)
            .then(res=>{
                setResponse(res.data)
                setLoading(false)
            })
            .catch(err=>{
                setError(err.message)
                setLoading(false)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchData()
    },[url])
  return {response,error,loading}
}

export default useAxios