import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css' ;

const Navbar = () => {
    const menu = <>  
    <li> <NavLink to='/'>  Home                 </NavLink> </li>
    <li> <NavLink to='/my-profile'>  My Profile </NavLink> </li>
    <li> <NavLink to='/login'>  Log in          </NavLink> </li> 
    </>

    return (
        <div className="navbar bg-gray-300 w-full px-0 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-1 shadow bg-base-100 rounded-box w-52 ">
             {menu}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl"> <span className='text-pink-600 font-bold mr-1 text-2xl '> HK </span>  Based </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            {menu}
          </ul>
        </div>
     
      </div>
    );
};

export default Navbar;