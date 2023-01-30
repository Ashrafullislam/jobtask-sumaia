import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import  './MyProfile.css'

const MyProfile = () => {
    const {user} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({})

    useEffect(()=> {
        fetch(`http://localhost:5000/userinfo/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserInfo(data)
        })
    },  [])

    return (
        <section className='w-full  flex justify-center items-center my-profile'>
        <div className='lg:w-3/5 w-10/12 mx-auto h-80 glass shadow-lg px-10 py-11'>
         <div>
         <h2 className='text-2xl font-bold text-center '> See your result </h2>
         <h1> Name: <span className='font-bold mt-4'> {userInfo?.name} </span> 
          </h1>
         <h2> Sector: <span className='font-bold'>   {userInfo?.slot} </span> </h2>
         <h2> <span className='mr-2'>  Agree: </span>
        {
            userInfo.agree ?

             "true"
             :
             "false"

        }
        </h2>
         </div>
         <div className='text-end'>
            <Link to={'/'} className="hover:text-blue-500"> Back to home </Link>
         </div>
        </div>
        
    </section>
    );
};

export default MyProfile;