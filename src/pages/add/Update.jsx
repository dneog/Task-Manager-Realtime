import React, { useEffect, useState } from 'react'
import NavLayout from '../../components/Layout/NavLayout';
import styles from './Add.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import {useSelector} from 'react-redux';
import { selectID } from '../../redux/slice/AuthSlice';
import { selectTasks } from '../../redux/slice/PostSlice';
import { selectNotification } from '../../redux/slice/NotifySlice';

const initialData= {
    name: '',
    description: '',
    pogress: ''
}

const Update = () => {
  const navigate= useNavigate()
  const {id} = useParams();
  const userID= useSelector(selectID)
  const AllTasks= useSelector(selectNotification)

  const currentProduct= AllTasks.find((task)=> task.id=== id)
  console.log(currentProduct);
    const currentDate= new Date().toLocaleDateString()
   
    
    const [task, setTask]= useState(initialData)
    
    const {name, description, pogress}= task

    
   
      
      
     
    
  
    useEffect(()=> {
      if(id){
        setTask(currentProduct)
      }else{
        setTask(initialData)
      }
    }, [id])

    const handleInput= (e)=> {
        const{name, value}= e.target
        setTask({...task, [name]: value})
    }

    const handleSubmit= async (e)=> {
      e.preventDefault();
      const docRef= doc(db, "shared", id)
        await getDoc(docRef).then((docSnapshot)=> {
            if(docSnapshot.exists()){
                const existingData= docSnapshot.data()
                existingData.name= name;
                existingData.description= description;
                existingData.pogress= pogress;
                existingData.editedDate= currentDate;

                setDoc(docRef, existingData).then(()=> console.log('Data Updated Successfully'))

            }
        })
      
       
          navigate('/collab')
      
    
    
    }

    const Pogress= [
        {id: 1, name: 'Pending'},
        {id: 2, name: 'In Pogress'},
        {id: 3, name: 'Completed'}
    ]

  return (
   <NavLayout>
        <div className={styles.wid}>

       
        <div className={styles.addTask}>
            <p className={styles.addT}>Add Task</p>
          <form onSubmit={handleSubmit} className={styles.forms}>
            
              <input type="text" name='name' value={name} onChange={handleInput} placeholder='Name'  />
             <select className={styles.pending} name="pogress" id="" value={pogress} onChange={handleInput}>
             <option value="" disabled>Select Pogress</option>
               {Pogress.map((item)=> {
                return (
                  <>
                   <option key={item.id} value={item.name}>{item.name}</option>
                  </>
                   
                )
               })}
             </select>
           

            
            <textarea rows={4} type="text" name="description" value={description || ''} placeholder='Description'  id="" onChange={handleInput} className={styles.desc} />
            <button type='submit' className={styles.btnForm}>{id ? 'Update' : 'Add'}</button>
           
          </form>

        

        </div>
        </div>
     
   </NavLayout>
  )
}

export default Update