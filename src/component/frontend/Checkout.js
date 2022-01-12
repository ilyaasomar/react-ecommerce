import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


const Checkout = () => {
    const history = useHistory();
    
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal('Warning','Login Fist to view cart page','error')
    }
    const [cart, setCart] = useState([])
    const [loading, setloading] = useState(true)
    const [error, setError] = useState([])
    const [checkoutInput, setCheckout] = useState([
        'firstname',
        'lastname',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipcode',
    ])
    var totalCartPrice = 0;
    useEffect(() => {
        let isMounted = true
        axios.get(`/api/cart`).then(res => {
            if(isMounted){
                if(res.data.status ===200){
                    console.log(res.data.cart)
                    setCart(res.data.cart)
                    setloading(false)
                }
                else if(res.data.status === 401){
                    history.push('/')
                    swal('Warning',res.data.message,'error')

                }
            }
        })
        return () => {
            isMounted = false
        }
    }, [history])

    const handleInput = (e) => {
        e.persist();
        setCheckout({...checkoutInput, [e.target.name]:e.target.value})
    }
    const orderSubmit = (e) =>{
        e.preventDefault();
        const data = {
            firstname:checkoutInput.firstname,
            lastname:checkoutInput.lastname,
            phone:checkoutInput.phone,
            email:checkoutInput.email,
            address:checkoutInput.address,
            city:checkoutInput.city,
            state:checkoutInput.state,
            zipcode:checkoutInput.zipcode,
        }
        axios.post(`/api/order-place`,data).then(res => {
            if(res.data.status === 200){
                swal("Success",res.data.message,"success")
                setError([])
                history.push('/thank-you')
            }
            else if(res.data.status === 422){
                swal('All mandatory fields are required',"","error")
                setError(res.data.errors);
            }
        })
    }
    return (
        <>
        <div className='py-3 bg-warning'>
        <div className='container'>
            <h6>Home / Checkout</h6>
        </div>
    </div>
     <div className='py-3'>
     <div className='container'>
         <div className='row'>
         <div className='col-md-7'>
         <div className='card'>
             <div className='card-header'>
            <h4>Basic Information</h4>
             </div>
             <div className='card-body'>
                 <div className='row'>
                     <div className='col-md-6'>
                         <div className='form-group mb-3'>
                         <label>First Name</label>
                         <input type='text' name ='firstname' onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                         <small className='text-danger'>{error.firstname}</small>
                         </div>
                     </div>
                     <div className='col-md-6'>
                         <div className='form-group mb-3'>
                         <label>Last Name</label>
                         <input type='text' name ='lastname' onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                         <small className='text-danger'>{error.lastname}</small>
                         
                         </div>
                     </div>
                     <div className='col-md-6'>
                         <div className='form-group mb-3'>
                         <label>Phone</label>
                         <input type='text' name ='phone' onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                         <small className='text-danger'>{error.phone}</small>
                        
                         </div>
                     </div>
                     <div className='col-md-6'>
                         <div className='form-group mb-3'>
                         <label>Email Address</label>
                         <input type='email' name ='email' onChange={handleInput} value={checkoutInput.email} className='form-control' />
                         <small className='text-danger'>{error.email}</small>
                        
                         </div>
                     </div>
                     <div className='col-md-12'>
                         <div className='form-group mb-3'>
                         <label>Full Address</label>
                        <textarea name='address' onChange={handleInput} value={checkoutInput.address} className='form-control' rows='3' />
                        <small className='text-danger'>{error.address}</small>
                        
                         </div>
                     </div>
                     <div className='col-md-4'>
                         <div className='form-group mb-3'>
                         <label>City</label>
                         <input type='text' name ='city' onChange={handleInput} value={checkoutInput.city} className='form-control' />
                         <small className='text-danger'>{error.city}</small>
                         
                         </div>
                     </div>
                     <div className='col-md-4'>
                         <div className='form-group mb-3'>
                         <label>State</label>
                         <input type='text' name ='state' onChange={handleInput} value={checkoutInput.state} className='form-control' />
                         <small className='text-danger'>{error.state}</small>
                        
                         </div>
                     </div>
                     <div className='col-md-4'>
                         <div className='form-group mb-3'>
                         <label>Zip Code</label>
                         <input type='text' name ='zipcode' onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                         <small className='text-danger'>{error.zipcode}</small>
                       
                         </div>
                     </div>
                     <div className='col-md-12'>
                         <div className='form-group text-end'>
                             <button type='button' className='btn btn-primary btn-sm' onClick={orderSubmit}>Place Order</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         </div>
         <div className='col-md-5'>
             <table className='table table-bordered'>
                 <thead>
                     <tr>
                         <th width='50%'>Product</th>
                         <th>Price</th>
                         <th>Quantity</th>
                         <th>Total</th>
                     </tr>
                 </thead>
                 <tbody>
                 {
                    cart.map((item ,idx) => {
                        totalCartPrice+= item.product.selling_price * item.product_qty
                    return (
                        <tr>
                            <td>{item.product.name}</td>
                            <td>${item.product.selling_price}</td>
                            <td>{item.product_qty}</td>
                            <td>${item.product.selling_price * item.product_qty}</td>

                        </tr>
                        )
                    })
                    }
                    <tr>
                        <td colSpan='2' className='text-end fw-bold'>Grand Total</td>
                        <td colSpan='2' className='text-end fw-bold'>${totalCartPrice}</td>


                    </tr>
                 </tbody>
             </table>
         </div>
        

         </div>
     </div>

 </div>
 </>
    )


}

export default Checkout