import axios from 'axios';
import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import swal from 'sweetalert';
function Navbar(){
const history = useHistory();
  const btnSubmit = (e) => {
    e.preventDefault();
    // alert('You Clicked Me');
    axios.post(`api/logout`).then(res => {
      if(res.data.status === 200){
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_name');
      swal('Success', res.data.message ,'success');
      history.push('/');
      }
    });
  }

  var AuthButtons = '';

    if(!localStorage.getItem('auth_token')){
       AuthButtons = (
        <ul className='navbar-nav'>
        <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              </ul>
       );
  }
  else{
    AuthButtons = (
      <li className="nav-item">
        <button className="nav-link btn btn-danger btn-sm text-white" onClick={btnSubmit}>Logout</button>
      </li>
    );
  }
  
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
    <div className="container">
  <Link className="navbar-brand" to="#">Navbar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">Collection</Link>
      </li>
      {AuthButtons}
    </ul>
  </div>
  </div>
</nav>
    );
}
export default Navbar;