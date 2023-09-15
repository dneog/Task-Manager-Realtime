import React, { useState } from 'react'
import styles from './Auth.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../config/Firebase';
import loader from '../../assets/loader.gif'
import ErrorToast from '../../toast/ErrorToast';


const Login = () => {
    const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [isLoading, setLoading]= useState(false);
  const [showErrorMessage, setShowErrorMessage]= useState(false)
  const [errorMessage, setErrorMessage]= useState('')
 

    const handleSubmit=(e)=> {
      e.preventDefault();
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
    
      setErrorMessage(error.message)
          setShowErrorMessage(!showErrorMessage)
           setTimeout(()=> {
            setShowErrorMessage(false)
            
           }, 4000)
          setLoading(false)
  
    });
     
     
    
      
    }

  return (
    <>
      {showErrorMessage && <ErrorToast message={errorMessage}/>}
    <div className={styles.login}>
        <p className={styles.para}>Login</p>
        <form onSubmit={handleSubmit}>
        <input type="email" className={styles.email} placeholder='Email'  value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        <input type="Password"  placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
       
      
        <button type='submit' className={styles.button}>{isLoading ? <div className='loading'></div> : <p className={styles.signuptext}>Login</p>}</button>
      <Link to={'/forgotPassword'}><p className={styles.pass}>Forgot Password ?</p></Link>
        </form>
    </div>
    <div className={styles.ac}>
    <p className=''>Don't Have an Account ? 
    <Link to={'/signup'}>&nbsp;<span>Signup</span></Link></p>
    </div>
  
    </>
  )
}

export default Login