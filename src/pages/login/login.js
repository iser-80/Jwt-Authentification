import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useLoginMutation } from '../../redux/slices/userApiSlice'
import { setCredentials } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { loginAsync } from '../../redux/slices/userApiSlice'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state) => state.auth)

    // useEffect(()=>{
    //     if(userInfo){
    //         console.log('user logged in')
           
    //     }
    // }, [userInfo])

    async function handleSubmit (e) {
        e.preventDefault();
        const data = {email, password}
        dispatch(loginAsync({email, password}));
        setEmail('')
        setPassword('')
            // try {
            //   const res = await login({ email, password }).unwrap();
            //   dispatch(setCredentials({ ...res }));
            // } catch (err) {
            //   console.log(err)
            // }
        // try {
        //     const response = await axios.post('http://localhost:5000/api/login', {email, password})
        //     if(response){
        //         console.log(response)
        //     }else{
        //         console.log('something went wrong')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

  return (
    <div className='loginContainer'>
        <div className='loginWrapper'>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login