import React from 'react'
import NavLayout from '../../components/Layout/NavLayout'
import styles from './UserDetails.module.css';
import {useSelector} from 'react-redux'
import { selectIsLoggedIn, selectUserName, selectemail } from '../../redux/slice/AuthSlice';

const UserDetails = () => {
  const userName= useSelector(selectUserName)
  const email= useSelector(selectemail)
  const isLoggedin= useSelector(selectIsLoggedIn)
  return (
    <NavLayout>
      {isLoggedin && <div>
      <div className={styles.userDetails}>
      <p className={styles.nameP}>Name</p>
      <p className={styles.emailP}>{userName}</p>
      <p className={styles.nameP}>Email</p>
      <p className={styles.emailP}>{email}</p>
      </div>
      </div> }
      
     
    </NavLayout>
  )
}

export default UserDetails