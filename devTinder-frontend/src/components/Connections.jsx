import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector ((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
    try{
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true});
      dispatch(addConnections(res.data.data));
   

    }
    catch(err){
        console.log(err)
    }
};

useEffect(() => {
    fetchConnections();
},[]);

if(!connections) return;
if(connections.length === 0) return <h1>No Connections found</h1>;

  return (
    
        <div className=' text-center my-10'>
         <h1 className='text-bold text-white text-3xl'>Connections</h1>
         
            {connections.map((connection) => {
                const {firstName, lastName, photoUrl,age, gender, about } = connection;

                return(
                    <div className='flex mx-auto p-4 border rounded-lg bg-base-300 w-1/2'>
                        <div> <img className='w-20 h-20 rounded-full mx-14 ' src={photoUrl} alt="photo" /></div>
                        <div className='text-left mx-4'>  
                            <h2 className='font-bold text-xl'>{firstName+" "+ lastName}</h2>
                             <p>{about}</p>
                           {  age && gender && <p>{age +" "+gender}</p>}
                            
                        </div>
                       
                      
                    </div>
                )
            })}
        
        </div>
      );
      
 
}

export default Connections
