import React, { useState } from 'react'
import './register.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useRegisterMutation } from '../../redux/slices/userApiSlice'
// import { setCredentials } from '../../redux/slices/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch();  
  const navigate = useNavigate();
   
  // const [register, { isLoading }] = useRegisterMutation();

  // const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await register({ name, email, password }).unwrap();
    //   console.log(res)
    //   dispatch(setCredentials({ ...res }));
    //   navigate('/');
    // } catch (err) {
    //   console.log(err)
    // }
  };

  return (
    <div className='registerContainer'>
        <div className='registerWrapper'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => {setName(e.target.value)}} placeholder='Name'/>
                <input type='text' onChange={(e) => {setEmail(e.target.value)}} placeholder='Email'/>
                <input type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='password'/>
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register