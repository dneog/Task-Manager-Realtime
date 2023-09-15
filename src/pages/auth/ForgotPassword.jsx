import React, { useState } from 'react'
import styles from './Auth.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../../config/Firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import Toast from '../../toast/ErrorToast';

const ForgotPassword = () => {
    
  const [email, setEmail]= useState('');
  const [isLoading, setLoading]= useState(false);
  const [showToastMessage, setShowToastMessage]= useState(false)
  const [toastMessage, setToastMessage]= useState('')
  
 

    const handleSubmit=(e)=> {
      e.preventDefault();
    
      sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setToastMessage('A reset Password Link is Send to your Email')
        setShowToastMessage(!showToastMessage)
         setTimeout(()=> {
           setShowToastMessage(false)

         }, 4000)
      })
      .catch((error) => {
        setLoading(false);
       console.log(error);
      });
     
    
      
    }

  return (
    <>
       {showToastMessage && <Toast message={toastMessage}/>}
    <div className={styles.login}>
        <p className={styles.para}>Reset Password</p>
        <form onSubmit={handleSubmit}>
        <input type="email" className={styles.email} placeholder='Email'  value={email} onChange={(e)=> setEmail(e.target.value)} required/>
      
       
      
        <button type='submit' className={styles.buttonss}>{isLoading ? <div className='loading'></div> : <p className={styles.signuptext}>Reset</p>}</button>
      
        </form>
    </div>
    <div className={styles.ac}>
    <p className=''>Don't Have an Account ? 
    <Link to={'/signup'}>&nbsp;<span>Signup</span></Link></p>
    </div>
  
    </>
  )
}

export default ForgotPassword