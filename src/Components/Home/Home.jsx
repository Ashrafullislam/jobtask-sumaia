import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import './Home.css'

const Home = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const [selectors, setSelectors] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    

    // const onSubmit =(e,  data) => {
    //  const info = data.name; 
    //  console.log(info)
    // };
    const onSubmit = (data,e) =>  {
     e.preventDefault();
     const slot = e.target.slot.value;
     const name = e.target.name.value;
     const email = user?.email ;
     const userInfo = {name,slot,email,agree:isChecked}
     console.log(userInfo)
     fetch('https://save-data-server-rosy.vercel.app/userdata',  {
      method: 'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
      
     })
     .then(res =>  res.json())
     .then(data => {
      console.log(data)
      if(data.acknowledged === true){
         toast.success('Successfully submitted')
         e.target.reset();
         navigate('/my-profile')
      }
     })
     .catch(err => {
      setErr(err.message)
     })

    }

    
  const  handleChange = (event) =>  {
   setIsChecked(event.target.checked);
   

 }

    useEffect(() => {
       fetch('https://save-data-server-rosy.vercel.app/slots')
       .then(res => res.json())
       .then( data => {
        setSelectors(data[0].selectors)
        console.log(data)
       })
    }, []);

    const UserInfoSaveAlert = () => {
     if(!user){
      toast.error('Please Log in before ')
      navigate('/login')
     }
    }

  

    return (
        <section  className='w-full h-screen background flex justify-center items-center text-slate-900'>
        <div className='lg:w-3/5 w-11/12 px-2 rounded-md lg:px-14 h-96 form glass '>
           <h1 className='text-slate-800 font-semibold text-center text-2xl mt-6'> Form  </h1>  
        <form onSubmit={handleSubmit(onSubmit)}>
      <label> <span className='text-slate-800'> Name :  </span> </label>
      <input placeholder='Enter your name ' {...register("name")} className='border-black border w-full  bg-white
       px-1 mt-2 h-10  rounded-md'/>
      {errors.name && <span className='text-red-400'> Name  is required </span>}


      <label > Sectors: </label>
      <select  {...register('slot')} className='lg:w-3/5 w-10/12 border border-black  mt h-10 mt-7 rounded-md' >
       {selectors.map(( slot, i) => <option key={i} >  {slot}  </option> ) }
      </select>
      {errors.name && <span>  Sectors select required  </span>}

     <div  className='mt-4'>
     <input
        type="checkbox"
        id="checkbox1"
        checked={isChecked}
        onChange={handleChange}
        className='w-4 h-4'
        required
      />
      <label htmlFor="checkbox1"> Agree to term </label>

     </div>
     
     {
      err && <span className='text-red-500'> {err} </span>
     }

    <input type="submit"  onClick={UserInfoSaveAlert} value='Save' className='px-4 py-1 font-semibold border-black  bg-white border text-slate-700 rounded-md cursor-pointer hover:bg-slate-700  hover:text-white mt-4 block' />


    </form>
    <div className='text-end'>
    <Link to='/my-profile' className='hover:text-blue-600 text-sky-400' > Click for see result </Link>

    </div>
    </div>
 </section>
    );
};

export default Home;