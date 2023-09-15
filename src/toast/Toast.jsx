import React, { useEffect, useState } from 'react'
import './Toast.css'
const Toast = ({message}) => {
    const [show, setShow]= useState(true)
    useEffect(()=> {
        const toast= setTimeout(()=> {
            setShow(!show)
        }, 3000)

        return ()=> clearTimeout(toast)
    },[])
  return (
    <div className={`toast ${show ? 'display' : 'hide'}`}>
        <p>{message}</p>
    </div>
  )
}

export default Toast