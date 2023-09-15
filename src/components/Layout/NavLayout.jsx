import React from 'react'
import { RiHomeLine } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { PiUserSquareFill } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import Navbar from './Navbar';

const navItems= [
    {href: '/', icon:RiHomeLine, label: 'Home'},
    {href: '/add', icon:IoAddCircleOutline, label: 'Add Task'},
    {href: '/collab', icon:MdPeopleAlt, label: 'Collaborations'},
    {href: '/userDetails', icon:PiUserSquareFill, label: 'Profile'},
]

const NavLayout = ({children}) => {
   
  return (

    <div className='main1'>
      <div className='main3'>
      <Navbar navItems={navItems} />
      </div>
   
    <div className='main2'>
    {children}
    </div>
    </div>

  )
}

export default NavLayout