import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { REMOVE_USER, SET_USER, STORE_USERS, selectID, selectIsLoggedIn } from '../../redux/slice/AuthSlice';
import { selectNotification } from '../../redux/slice/NotifySlice';
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const isLoggedIn= useSelector(selectIsLoggedIn)
  const userID= useSelector(selectID)
  const notification= useSelector(selectNotification)

  useEffect(()=> {
    getUsers()
    onAuthStateChanged(auth,  (user) => {
      if (user) {
        const userEmail= user.email
       
        try{
          const postRef= collection(db, "user");
          
        
         onSnapshot(postRef, (snapshot) => {
          const allPosts= snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }))
         const requiredUser= allPosts.filter((item)=> item.email === userEmail)
         
         requiredUser.map((user)=> (
         
          dispatch(SET_USER(
            {
              email: user.email,
              userName: user.name,
              userID: user.id,          
            }
          ))
         ))
        });
        
         }catch(error){
          console.log(error.message)       
         }

      } else {
        dispatch(REMOVE_USER())
      }
    });

  },[dispatch])

 



  const getUsers = async ()=> {
    
    try{
  const postRef= collection(db, "user" );
  const snapshot= await getDocs(postRef)

  const allUsers=  snapshot.docs.map((doc)=> ({
    id: doc.id,
    ...doc.data()
  }))

  console.log(allUsers);
 
  dispatch(STORE_USERS({
    users: allUsers
    }))

 }catch(error){
 console.log(error);
 }

}

  const logout=()=> {
    
    signOut(auth).then(() => {
     navigate('/login')
    }).catch((error) => {
     console.log(error);
    });
  }

  return (
    <div className={styles.header}>
    <Link to={'/'}><p className={styles.task}>Task Manager</p></Link> 
     <div className={styles.bell1}>
     <Link to={'/collab'}><FaRegBell className={styles.bell} /></Link> 
      <p className={styles.bell3}>{notification ? notification.length : 0}</p>
      {isLoggedIn ?  <button className={styles.btnH} onClick={logout}>Logout</button> :  <button className={styles.btnH}><Link to={'/login'}>Login</Link></button> }
     </div>
     
    
    </div>
  )
}

export default Header