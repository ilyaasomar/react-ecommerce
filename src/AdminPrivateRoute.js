import React, { useEffect, useState } from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import MasterLayout from './layouts/admin/MasterLayout';
import swal from 'sweetalert';

 function AdminPrivateRoute ({...rest}) {
   const history = useHistory();
   const [Authonticated, setAuthonticated] = useState(false)
   const [loading, setloading] = useState(true)
   useEffect(() => {
      axios.get(`/api/checkingAuthonticated`).then(res => {
         if(res.status === 200){
            setAuthonticated (true)  
                }
         setloading(false)
        
      })
      return () => {
         setAuthonticated (false)

      }
   }, [])

   axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
      if(err.response.status === 401){
         swal('Unauthorized', err.response.data.message,'warning');
         history.push('/');
      }
      return Promise.reject(err);

   })
   axios.interceptors.response.use(function(response){
      return response
   },function(error){
      if(error.response.status === 403){
         swal('Forbiden',error.response.data.message,'warning')
         history.push('/403')
      }
      else if(error.response.data.status === 404){
         swal('404 Error',"URL Page not found",'warning')
         history.push('/404')
      return Promise.reject(error);

      }
   })

   if(loading){
      return <h3>Loading.....</h3>
   }
        return (
           <Route {...rest} 
           render={ ({props, location}) => 
             Authonticated ?
           ( <MasterLayout {...props} /> ):
           (<Redirect to={{pathname: "/login", state: {from: location} }} />)
        }
           
           
           />


          
        )
}
export default AdminPrivateRoute;
