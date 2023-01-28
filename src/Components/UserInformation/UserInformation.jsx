import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserInformation = () => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(()=> {
        fetch(`http://localhost:5000/userinfo`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserInfo(data)
        })
    },  [])

    console.log(userInfo.agree)
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <div className='w-3/5 mx-auto h-80 shadow-lg px-10 py-11'>
            <h2> See your result </h2>
            <h1> Name: {userInfo?.name}  </h1>
            <h2> Sector: {userInfo?.slot} </h2>
            <h2> <span className='mr-2'>  Agree: </span>
            {
                userInfo.agree ?

                 "true"
                 :
                 "false"

            }
            </h2>
             <div className='text-end'>
                <Link to={'/'} className="hover:text-blue-500"> Back to home </Link>
             </div>
            </div>
            
        </section>
    );
};

export default UserInformation;