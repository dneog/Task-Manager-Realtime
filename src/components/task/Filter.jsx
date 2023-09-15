import React, { useEffect, useState } from 'react';
import styles from './tasklist.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/slice/PostSlice';
import { FILTER_BY_POGRESS } from '../../redux/slice/FilterTaskSlice';

const Filter = () => {
  const dispatch= useDispatch()
  const tasks= useSelector(selectTasks)
const [pogress, setPogress]= useState('All')

 const allPogress= [
    'All',
    ...new Set(tasks.map(task=> task.pogress)),
  ]

  useEffect(()=> {
    dispatch(FILTER_BY_POGRESS({
      pogress, tasks
    }))
  },[dispatch, pogress, tasks])

  return (
    <div className={styles.category}>
         <select className={styles.select} value={pogress} onChange={(e)=> setPogress(e.target.value)}>
      {allPogress.map((brand, index)=> {
        return(
          <option key={index} value={brand}>{brand}</option>
        )
      })}
     
      </select>

    </div>
  )
}

export default Filter