import React, { useState } from 'react';
import styles from './Users.module.css';
import { useSelector } from 'react-redux';
import { selectID, selectUserName, selectUsers } from '../../redux/slice/AuthSlice';
import { useParams } from 'react-router-dom';
import NavLayout from '../../components/Layout/NavLayout';
import { selectTasks } from '../../redux/slice/PostSlice';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import Toast from '../../toast/Toast';
const Users = () => {

    const {id}= useParams()
    const users= useSelector(selectUsers)
    const userName= useSelector(selectUserName)
    const tasks= useSelector(selectTasks)
    const currentID= useSelector(selectID)
    const [showToastMessage, setShowToastMessage]= useState(false)
    const [toastMessage, setToastMessage]= useState('')

    const filterTask= tasks.find((item)=> item.id== id)
    const currentDate= new Date().toLocaleDateString()
    const NewUser= users.filter((user)=> user.id !== currentID)
    console.log(users);
    console.log(filterTask);
  

    const handleData= async (user)=> {
      
        const docRef = await addDoc(collection(db, "shared"), {
            id: filterTask.id,
            people1: userName,
            people2: user.name,
            userID: [user.id,filterTask.userID],
            name: filterTask.name,
            pogress: filterTask.pogress,
            description: filterTask.description,
            currentDate,
            createdAt: Timestamp.now().toDate()
            });

            setToastMessage('Task Shared Successfully')
            setShowToastMessage(!showToastMessage)
             setTimeout(()=> {
               setShowToastMessage(false)
          
             }, 3000)
           
    }

  return (
    <NavLayout>
         {showToastMessage && <Toast message={toastMessage}/>}
    <div className={styles.users}>
    <div className={styles.u1}>
        <p>Users</p>
        <p className={styles.u2}>{NewUser ? NewUser.length : 0}</p>
       </div>
    {NewUser && NewUser.map((user)=> (
        <div className={styles.l1}>
            <div>
            <p>{user.name}</p>
        <p className={styles.e1}>{user.email}</p>
            </div>
      <div>
        <button className={styles.u3} onClick={()=> handleData(user)}>Add</button>
      </div>

        </div>
      
    ))}

  </div>
    </NavLayout>
    
  )
}

export default Users