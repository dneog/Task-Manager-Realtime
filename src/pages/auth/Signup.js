import React, { useState } from 'react'
import styles from './Auth.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {auth, db} from '../../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import loader from '../../assets/loader.gif';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Toast from '../../toast/Toast';
import ErrorToast from '../../toast/ErrorToast';
const Signup = () => {
    const navigate= useNavigate()
  const [email, setEmail]= useState('');
  const [name, setName]= useState('');
  const [password, setPassword]= useState('');
  const [showToastMessage, setShowToastMessage]= useState(false)
  const [showErrorMessage, setShowErrorMessage]= useState(false)
  const [isLoading, setLoading]= useState(false);
  const [toastMessage, setToastMessage]= useState('')
  const [errorMessage, setErrorMessage]= useState('')


  const storeUserProfile= async (id)=> {
    const docRef = await addDoc(collection(db, "user"), {
      
      userID: id,
      name,
      email,
      createdAt: Timestamp.now().toDate()
  
      });
   
  }


    const handleSubmit= async (e)=> {
      e.preventDefault()
      setLoading(true)
      
      if(password.length < 6){
        setErrorMessage('Password must have six Characters')
        setShowErrorMessage(!showErrorMessage)
        setLoading(false)
         setTimeout(()=> {
          setShowErrorMessage(false)
          
         }, 4000)
      }else{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         
          const user = userCredential.user;
          const id= user.uid
            
          storeUserProfile(id)  

         setLoading(false);
         setToastMessage('Account Created Successfully')
         setShowToastMessage(!showToastMessage)
          setTimeout(()=> {
            setShowToastMessage(false)
            navigate('/login')
          }, 1000)
        
        }).catch((error) => {
          setErrorMessage(error.message)
          setShowErrorMessage(!showErrorMessage)
           setTimeout(()=> {
            setShowErrorMessage(false)
            
           }, 4000)
          setLoading(false)
        });
      
      }
      
       
    


      }  
    
  

  return (
    <>
    {showToastMessage && <Toast message={toastMessage}/>}
    {showErrorMessage && <ErrorToast message={errorMessage}/>}

    <div className={styles.login}>
        <p className={styles.para}>Signup</p>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name'  value={name} onChange={(e)=> setName(e.target.value)} required/>
        <input type="email" className={styles.email} placeholder='Email'  value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        <input type="Password"  placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
       
      
      <button type='submit' className={styles.signup}>{isLoading ? <div className='loading'></div> : <p className={styles.signuptext}>Signup</p>}</button>
        </form>
    </div>
    <div className={styles.ac}>
    <p className=''>Already Have an Account ? 
    <Link to={'/login'}>&nbsp;<span>Login</span></Link></p>
    </div>
  
    </>
  )
}

export default Signup