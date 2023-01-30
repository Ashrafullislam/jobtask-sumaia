import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import './SignUp.css' ;
import { toast } from 'react-hot-toast';

const SignUp = () => {
const {CreateUserByEmail,sendEmailForVerify} =  useContext(AuthContext);
const navigate = useNavigate() ;
 
    const SignUpHandlar = e => {
     e.preventDefault()
     const form = e.target ;
     const name = form.name.value ;
     const email = form.email.value ;
     const password = form.password.value ;
    
     CreateUserByEmail(email,password)
     .then(result => {
        console.log(result,'result')
        toast.success('Successfully created account ')
        navigate('/')
     })
     .catch(err => {
        // toast.error(err.message)
        console.log(err.message)
        if(err.message == 'Firebase: Error (auth/email-already-in-use).'){
            toast.error(' Email already in use . Try another email ')
        }
     })
    }

    return (
        <section className='signup-bg flex justify-center items-center'>
            <div className=' glass lg:w-3/5 w-10/12  rounded-md'>
            <h2 className='text-2xl font-semibold text-center mt-3'> Sign Up here  </h2>

             <form onSubmit={SignUpHandlar} className='lg:px-10 px-4 py-3 mb-3'>
             <div className='mt-4'>
            <label className='ml-1'> Enter your name : </label>
            <input type="text" name='name' placeholder="Enter your name " className="input input-bordered input-accent w-full block mt-1 h-10 text-slate-800 " required />
            </div>

            <div className='mt-4'>
            <label className='ml-1'> Enter your email: </label>
            <input type="text" name='email' placeholder="Enter your email " className="input input-bordered input-accent w-full block mt-1 h-10 text-slate-800 " required />
            </div>
           
            <div className='mt-4'>
            <label className='ml-1'> Create password  : </label>
            <input type="password" name='password' placeholder="Create a password" className="input input-bordered input-accent w-full block mt-1 h-10 text-slate-800 " required />
            </div>
             
           
             
            <input type='submit' className='w-24 text-center  h-10 bg-slate-50  text-slate-800 mt-4 cursor-pointer  hover:bg-slate-600  rounded-md py-2  hover:text-white font-semibold' value={'Sign up '}   />
          <span> Already you have an account ? <Link className='text-sky-300 ml-2 lg:mt-0 mt-4 hover:text-blue-600' to='/login ' > Log in here  </Link> </span>        
             </form>
            </div>
        </section>
    );
};

export default SignUp;