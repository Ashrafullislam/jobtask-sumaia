import React, { useContext,  useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import  './MyProfile.css'
import {  FaPen } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';


const MyProfile = () => {
    const {user} = useContext(AuthContext);
    const closeButton = useRef();
    // get user info from database by signed in user
    const url = `https://save-data-server-rosy.vercel.app/userinfo/${user?.email}`
    const {data:userInfo,refetch,isLoading} = useQuery({
      queryKey:[user?.email],
      queryFn: async ()=> {
        const res = await fetch(url)
        const data = res.json();
        return  data ;
      }
    })

 

    if(isLoading){
      return <div> Loading .... </div>
    }
   

  const userInfoFormHandlar = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const sectors = e.target.sectors.value ;
    const email =  user?.email ;
    const agree = userInfo?.agree ;
    const updateinfo = { name,sectors,email,agree }
        
  // update user information 
  fetch(`https://save-data-server-rosy.vercel.app/userinfo/updateinfo/${user?.email}`,{
    method: "PUT",
    headers:{
        'Content-type': 'application/json',
    },
    body:  JSON.stringify(updateinfo)
    
  })
  .then(res => res.json())
  .then(data => {
    console.log(data ,'data')
    if(data.modifiedCount > 0){
        toast.success('Your information hasbeen updated')
        refetch()
        closeButton.current.click();
        
    }
  })
  }


    return (
        <section className='w-full  flex justify-center items-center my-profile'>
        <div className='lg:w-3/5 w-10/12 mx-auto h-80 glass shadow-lg px-10 py-11'>
        <h2 className='text-2xl font-bold text-center text-slate-50'> See your result </h2>
     <div className='flex justify-between'>

        <div>
         <h1 className=' text-slate-100 mt-1' > Name: <span className='font-bold mt-4'> {userInfo?.name} </span>  </h1>
         <h2 className=' text-slate-100 mt-2'> Sector: <span className='font-bold'>   {userInfo?.slot} </span> </h2>
         <h2 className=' text-slate-100 mt-2'> <span className='mr-2'>  Agree: </span>
        {
            userInfo?.agree ?

             "true"
             :
             "false"
        }
        </h2>
            </div>
            <div >
            <label htmlFor="my-modal-3" className=" btn   border-none btn-sm  bg-gray-500 hover:bg-gray-700"> Update info <FaPen className='ml-2' />
          </label>
            </div>

         </div>

         <div className='text-end'>
            <Link to={'/'} className="hover:text-blue-500 text-sky-300"> Back to home </Link>
         </div>
        
        </div>
     <div>
          {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" ref={closeButton} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative ">
            <label htmlFor="my-modal-3"  className="btn btn-sm btn-circle absolute 
                 right-2 top-2">✕</label>
            <h3 className="text-lg font-bold"> Hey <span className='text-blue-600'> {userInfo?.name} </span> Update your information  </h3>
               <div>
                <form className='my-10' onSubmit={userInfoFormHandlar} >
                <label className='ml-1'> Name : </label>
            <input type="text" defaultValue={userInfo?.name} name='name' placeholder=" Enter your name " required className="input input-bordered input-accent text-slate-800 w-full h-10 mt-1 mb-4" />

            <label className='ml-1 '> Sectors  : </label>
            <input type="text" name='sectors' defaultValue={userInfo?.slot} placeholder=" Write your sectors name " required className="input  input-bordered input-accent text-slate-800 w-full h-10 mt-1" />

            <input  type={'submit'} value='Save ' className='bg-blue-500 hover:bg-blue-700 text-slate-100 px-4 rounded-md py-1 cursor-pointer mt-5' />
             </form>
               </div>
            </div>
            </div>
        </div>
    </section>
    );
};

export default MyProfile;