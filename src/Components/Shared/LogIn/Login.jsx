import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css' ;
import google from '../../../Images/google.png'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Login = () => {
        
        const {SignUpWithGoogle,LogInWithEmail} = useContext(AuthContext)
        const provider = new GoogleAuthProvider();
        const [err , setErr] = useState('')
        
        const location = useLocation()
        const navigate = useNavigate()
        const from  = location.state?.from?.pathname || "/"
        
        const LogInHandlar =  (e) => {
        e.preventDefault()
        const form = e.target ;
        const email = form.email.value ;
        const password = form.password.value ;
        LogInWithEmail(email,password)
        .then(result => {
          const user = result.user ;   
          toast.success('Successfully Log in')
          e.form.reset()
          navigate(from,{replace:true})
        })
        .catch(err => {
          // toast.error(err.message)
          setErr(err.message)

        })
        }
      
        const GoogleLogInUser = () => {
           SignUpWithGoogle(provider)
        }

    return (
        <div className='  login-bg flex justify-center items-center'>
         <div className='glass lg:w-3/5 w-10/12 h-96 mx-auto py-5 rounded-md'>
         <h2 className='text-center text-2xl font-semibold'> Log In here </h2>
            <form className='w-10/12 mx-auto' onSubmit={LogInHandlar}> 
          <div>
           <label className='ml-1'> Enter email : </label>
            <input type="email" name='email' placeholder=" Enter your email " required className="input input-bordered input-accent text-slate-800 w-full h-10 mt-1" />
          </div>


            <div className='mt-4'>
            <label className='ml-1'> Enter password : </label>
            <input type="password" name='password' required placeholder="  Enter your password" className="input input-bordered input-accent w-full block mt-1 h-10 text-slate-800 " />
            </div>
           
           <input type='submit' className='lg:w-24 w-10/12 bg-slate-50 mx-auto text-center  h-10   text-slate-800 mt-4 cursor-pointer  hover:bg-slate-600  rounded-md py-2  hover:text-white font-semibold' value={'Log in'}   />
           {
            err && <span className='text-red-500'> {err} </span>
           }
          <span> You have no account ? <Link className='text-blue-400 ml-2 hover:text-blue-600' to='/signup' > Sign up here  
           </Link> </span>        
         </form>

         <div className='w-10/12  mx-auto mt-4'>
          <button onClick={GoogleLogInUser} className='flex gap-2 bg-gray-500 hover:bg-gray-700 px-1 py-1 rounded-md '> <img src={google} className='w-8 h-8'  alt=''/> Log in with google </button>

         </div>
         </div>
        </div>
    );
};

export default Login;