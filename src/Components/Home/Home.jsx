import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const [selectors, setSelectors] = useState([])
    const [isChecked, setIsChecked] = useState(false);


    // const onSubmit =(e,  data) => {
    //  const info = data.name; 
    //  console.log(info)
    // };
    const onSubmit = (data,e) =>  {
     e.preventDefault();
     const slot = e.target.slot.value;
     const name = e.target.name.value;
     
     const userInfo = {name,slot,agree:isChecked}
     console.log(userInfo)
     fetch('http://localhost:5000/userdata',  {
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
      }
     })
     .catch(err => console.log(err))
    }

    
  const  handleChange = (event) =>  {
   setIsChecked(event.target.checked);
   

 }

    useEffect(() => {
       fetch('http://localhost:5000/slots')
       .then(res => res.json())
       .then( data => {
        setSelectors(data[0].selectors)
        console.log(data)
       })
    }, []);


  

    return (
        <section className='w-full h-screen flex justify-center items-center'>
        <div className='w-3/5 px-14 h-96 form '>
           <h1 className='text-slate-600 font-semibold text-center text-2xl mt-6'> Form  </h1>  
        <form onSubmit={handleSubmit(onSubmit)}>
      <label> <span className='text-slate-600'> Name :  </span> </label>
      <input placeholder='Enter your name ' {...register("name")} className='border-black border w-full rounded-sm bg-white
       px-1 mt-2 h-9' />
      {errors.name && <span className='text-red-400'> Name  is required </span>}


      <label > Sectors: </label>
      <select  {...register('slot')} className='w-2/4 border border-black rounded-sm mt h-9 mt-7 ' >
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


    <input type="submit"  value='Save' className='px-4 py-1 font-semibold border-black  bg-white border text-slate-700 rounded-md cursor-pointer hover:bg-slate-700  hover:text-white mt-4 block' />


    </form>
    <div className='text-end'>
    <Link to='/userinfo' className='hover:text-blue-400' > Click for see result </Link>

    </div>
    </div>
 </section>
    );
};

export default Home;