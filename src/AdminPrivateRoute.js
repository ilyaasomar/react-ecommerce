import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';

 function AdminPrivateRoute ({...rest}) {
   
        return (
           <Route {...rest} 
           render={ ({props, location}) => 
           localStorage.getItem('auth_token') ?
           ( <MasterLayout {...props} /> ):
           (<Redirect to={{pathname: "/login", state: {from: location} }} />)
        }
           
           
           />


          
        )
}
export default AdminPrivateRoute;
