import React, { useEffect, useState } from 'react'
import styles from './tasklist.module.css'
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { Timestamp, addDoc, collection, deleteDoc, doc, orderBy, serverTimestamp } from 'firebase/firestore';
import {  query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../config/Firebase';
import ErrorToast from '../../toast/ErrorToast';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/slice/AuthSlice';

const TaskData = ({task}) => {
  const [open, setOpen]= useState(false)
  const [message, setMessage]= useState('')
  const [newMessage, setNewMessage]= useState(null)

  const userName = useSelector(selectUserName)

  useEffect(()=> {
    const q = query(collection(db, "message"), where("taskID", "==", task.id));

const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const sharedTasks = [];
  querySnapshot.forEach((doc) => {
    
      const taskData= doc.data()
      // taskData.id = doc.id
      
      if(taskData.createdAt){
        sharedTasks.push(taskData)
      }
     
  });
  sharedTasks.sort((a,b)=> a.createdAt.toDate() - b.createdAt.toDate())
  
 setNewMessage(sharedTasks)
  

  return ()=> {
    unsubscribe()
  }
  
 
});
  }, [])


  console.log(newMessage);

  const handleDelete= async (id)=> {
    await deleteDoc(doc(db, "shared", id));
  }

  const handleMessage= async (e)=> {
    e.preventDefault()
    const docRef = addDoc(collection(db, "message"), {
      taskID: task.id,
      name: userName,
      message,
      createdAt: serverTimestamp()
  
      });
      setMessage('')
  }

  const handleOpen=()=> {
    setOpen(!open)
  }

  return (
    <div className={styles.card}>
      
    <p className={styles.m1}>{task.name}</p>
    <p className={styles.m2}>{task.description}</p>

    <div className={styles.ol3}>
    <p><span className={styles.ss}>Collaborators : </span> {task.people1} , {task.people2}</p>
      </div>

    <div className={styles.sp1}>
    
      {task.editedDate ?  <p className={styles.sp5}>Edited At : {task.editedDate}</p> :  <p className={styles.sp5}>Created At : {task.currentDate}</p>}
     
      <div className={styles.sp2}>
        <p className={styles.sp6}>{task.pogress}</p>
        <Link to={`/SharedUpdate/${task.id}`}> <p className={styles.sp4}><BiSolidEdit size={20} /></p></Link>
     
      <p className={styles.sp3}><AiOutlineDelete onClick={()=> handleDelete(task.id)} size={20} /></p>

      <p className={styles.sp8}><BiCommentDetail size={20} onClick={handleOpen} /></p>
      </div>

      


     
    </div>
   

    {open && <div className={styles.message}>
      {newMessage && newMessage.map((message)=> (
           <div className={styles.ol1}>
           <span className={styles.me6}>{message.name}</span>
           <p className={styles.me1}>{message.message}</p>
           </div>
      ))}
     
      
      <div className={styles.me5}>
      <form className={styles.me4}>
      <input type="text" placeholder='Add Comment' value={message} onChange={(e)=> setMessage(e.target.value)}  className={styles.me2} />
      <button type='submit' onClick={handleMessage} className={styles.a1}>Send</button>
      </form>
      </div>
     
      
    </div> }
    
    

</div>
    
  )
}

export default TaskData