import React, { useEffect, useState } from 'react'
import styles from './Task.module.css';
import NavLayout from '../../components/Layout/NavLayout'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {  useDispatch, useSelector } from 'react-redux';
import {db} from '../../config/Firebase';
import { selectID } from '../../redux/slice/AuthSlice';
import { NOTIFY, selectNotification } from '../../redux/slice/NotifySlice';
import TaskData from '../../components/task/TaskData';

const Tasks = () => {
  const dispatch= useDispatch()
  const userID= useSelector(selectID)
 const notification= useSelector(selectNotification)

  
  useEffect(()=> {
    const q = query(collection(db, "shared"), where("userID", "array-contains", userID));

const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const sharedTasks = [];
  querySnapshot.forEach((doc) => {
    
      const taskData= doc.data()
      taskData.id = doc.id
      sharedTasks.push(taskData)
  });
  
  dispatch(NOTIFY({
    notify: sharedTasks
  }))
  console.log(sharedTasks);

  return ()=> {
    unsubscribe()
  }
  
 
});
  }, [userID])

 
  return (
   <NavLayout>
     <div className={styles.users}>
    <div className={styles.u1}>
        <p>Tasks</p>
        <p className={styles.u2}>{notification ? notification.length : 0}</p>
       </div>
      {/* {!notification && <p>No Shared Tasks Found</p>} */}
      {notification && notification.map((task)=> (
        <TaskData key={task.id} task={task} />
      ))}

       </div>
   </NavLayout>
  )
}

export default Tasks