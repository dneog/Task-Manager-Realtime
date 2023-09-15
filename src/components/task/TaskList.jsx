import React, { useState } from 'react'
import styles from './tasklist.module.css'
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MdPersonAddAlt } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import ErrorToast from '../../toast/ErrorToast';
import { useSelector } from 'react-redux';

const TaskList = ({task}) => {

  const handleDelete= async (id)=> {
    await deleteDoc(doc(db, "tasks", id));
  }

  

  return (
    <>
    <div className={styles.card}>
      
          <p className={styles.m1}>{task.name}</p>
          <p className={styles.m2}>{task.description}</p>
          <div className={styles.sp1}>
            {task.currentDate ?  <p className={styles.sp5}>Created At : {task.currentDate}</p> :  <p className={styles.sp5}>Edited At : {task.editedDate}</p>}
           
            <div className={styles.sp2}>
              <p className={styles.sp6}>{task.pogress}</p>
              <Link to={`/update/${task.id}`}> <p className={styles.sp4}><BiSolidEdit size={20} /></p></Link>
           
            <p className={styles.sp3}><AiOutlineDelete onClick={()=> handleDelete(task.id)} size={20} /></p>

            <p className={styles.sp8}><Link to={`/users/${task.id}`}><MdPersonAddAlt size={22} /></Link></p>
            </div>
           
          </div>

      
    </div>

   
    </>
  )
}

export default TaskList