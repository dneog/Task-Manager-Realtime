import React from 'react';
import {NavLink} from 'react-router-dom';
import './Layout.css'
const Navbar = ({navItems}) => {
    const activeClass= ({isActive})=> (isActive ? 'active items': 'items')
  return (
    <div className='navs'>
         {navItems.map(item => {
    return  <NavLink key={item.href} to={item.href} className={activeClass}>

    <item.icon className='itemIcon' />
    <p className='labelShow'>{item.label}</p>
    </NavLink>
  })}
    </div>
  )
}

export default Navbar