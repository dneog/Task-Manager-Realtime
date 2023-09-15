import React, { useEffect, useState } from 'react'
import './Toast.css'
const ErrorToast = ({message}) => {
    const [show, setShow]= useState(true)
    useEffect(()=> {
        const toast= setTimeout(()=> {
            setShow(!show)
        }, 3000)

        return ()=> clearTimeout(toast)
    },[])
  return (
    <div className={`error ${show ? 'display' : 'hide'}`}>
        <p>{message}</p>
    </div>
  )
}

export default ErrorToast