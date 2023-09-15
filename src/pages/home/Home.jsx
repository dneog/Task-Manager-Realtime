import React, { useEffect, useState } from 'react'
import NavLayout from '../../components/Layout/NavLayout'
import styles from './Home.module.css';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { STORE_TASKS, selectTasks } from '../../redux/slice/PostSlice';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../components/task/Filter';
import { selectFilteredProducts } from '../../redux/slice/FilterTaskSlice';
import TaskList from '../../components/task/TaskList';
import { selectID, selectIsLoggedIn } from '../../redux/slice/AuthSlice';
import {  where } from "firebase/firestore";
import { NOTIFY } from '../../redux/slice/NotifySlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch= useDispatch()
  const userID= useSelector(selectID)
  const filteredTasks= useSelector(selectFilteredProducts)
  const [isLoading, setLoading] = useState(false)
  const isLoggedIn= useSelector(selectIsLoggedIn)
  const tasks= useSelector(selectTasks)
  
  useEffect(()=> {
    getTasks()
  }, [userID])

  useEffect(()=> {
    const q = query(collection(db, "shared"), where("userID", "array-contains", userID));

const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const sharedTasks = [];
  querySnapshot.forEach((doc) => {
      sharedTasks.push(doc.data());
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
 

  const getTasks=()=> {
    setLoading(true)
     try{
   const postRef= collection(db, "tasks");
   const qw = query(postRef, orderBy("createdAt", "desc"));
 
  onSnapshot(qw, (snapshot) => {
   const allTasks= snapshot.docs.map((doc)=> ({
    
     id: doc.id,
     ...doc.data()
   }))

   const userSepficTasks= allTasks.filter((data)=> data.userID == userID)
   
 dispatch(STORE_TASKS({
   tasks: userSepficTasks
 }))
  setLoading(false)
 });
 
  }catch(error){
   console.log(error);
  setLoading(false)
  }
 
   }

  

  return (

    
    <NavLayout>
     <div className={styles.w1}>
      {isLoading ? <div className=''></div> : <Filter tasks={tasks} />}

      <div className={styles.mainPage}>
      {!isLoading && !isLoggedIn && <div className={styles.mp1}>
        <p className={styles.mp2}>Welcome To the <span className={styles.mp5}> Task Manager Application</span></p>
        <p className={styles.mp3}>Please <Link to={'/login'}><span className={styles.mp4}>Login</span></Link>  or <Link to={'/signup'}><span className={styles.mp4}>Signup</span></Link> to Manage Tasks</p>
        </div>}
        {isLoggedIn && !isLoading && filteredTasks && filteredTasks.length== 0 && 
        <div>
          <p className={styles.mp10}>No Tasks Found</p>
         
          </div>}
      {isLoading ? <div className='pageLoading'></div> : filteredTasks.map((task)=> (
        <TaskList key={task.id} task={task} />
      ))}
      </div>
      
     

     </div>
    </NavLayout>
  )
}

export default Home