import { useState } from 'react'
import {FaAlignLeft,FaUserCircle,FaCaretDown} from 'react-icons/fa';
import {useAppContext} from '../context/appContext';
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'
export const Navbar = () => {
  const {toggleSidebar,logoutUser,user }=useAppContext();
  const [showLogout,setShowLogout]=useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
        <FaAlignLeft/>
        </button>
      </div>
      <div>
        <Logo/>
      </div>
      <div className='btn-container'>
        <button className='btn' onClick={()=>setShowLogout(!showLogout)}>
          <FaUserCircle/>
          {user?.name}
          <FaCaretDown/>
        </button>
        <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
          <button onClick={logoutUser} className='dropdown-btn'>Logout</button>
        </div>
      </div>
    </Wrapper>
  )
}
