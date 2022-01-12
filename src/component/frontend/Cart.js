import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


const Cart = () => {
    const history = useHistory();
    const [cart, setCart] = useState([])
    const [loading, setloading] = useState(true)
    var totalCartPrice = 0;
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal('Warning','Login Fist to view cart page','error')
    }
    const handleDecrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                cart_id === item.id ? {...item, product_qty:item.product_qty - (item.product_qty > 1 ? 1:0)}:item
            )
        )
        updateCartQuantity(cart_id,'dec')
    }
    const handleIncrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                cart_id === item.id ? {...item, product_qty:item.product_qty + (item.product_qty < 10 ? 1:0)}:item
            )
        )
        updateCartQuantity(cart_id,'inc')
        
    }
    function updateCartQuantity(cart_id,scope){
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if(res.data.status === 200){
            console.log(res.data.message)
            }
           
        })
    }
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
    const deleteCartItem = (e,cart_id) => {
        e.preventDefault();
        let thisClicked = e.currentTarget;
        thisClicked.innerText = 'Removing'
        axios.delete(`/api/deleteCartItem/${cart_id}`).then(res => {
            if(res.data.status === 200){
                swal('Success',res.data.message,'success')
                thisClicked.closest('tr').remove()
            }
            else if(res.data.status === 404){
                swal('Error',res.data.message,'error')
                thisClicked.innerText('Remove')
            }
        })

    }
    if(loading){
        return <h4>Cart Loading</h4>
    }
    var cart_HTML = ''
    if(cart.length > 0){
                    cart_HTML =<div className='table-responsive'>
                    <table className='table table-bordered'>
                    <thead>
                    <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th className='text-center'>Price</th>
                    <th className='text-center'>Quantity</th>
                    <th className='text-center'>Total</th>
                    <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    cart.map((item ,idx) => {
                        totalCartPrice+= item.product.selling_price * item.product_qty
                    return (
                    <tr key={item.id}>
                    <td width='10%'><img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width='50px' heigth='50px' /></td>
                    <td>{item.product.name}</td>
                    <td width='16%' className='text-center'> ${item.product.selling_price}</td>
                    <td width='15%'>
                    <div className='input-group'>
                        <button type='button' className='input-group-text' onClick={() => handleDecrement(item.id)}>-</button>
                        <div className='form-control text-center'>{item.product_qty}</div>
                        <button type='button' className='input-group-text' onClick={() => handleIncrement(item.id)}>+</button>
                    </div>

                    </td>
                    <td width='16%' className='text-center'> ${item.product.selling_price * item.product_qty}</td>
                    <td width='10%'>
                    <button type='button' className='btn btn-danger btn-sm' onClick={(e) => deleteCartItem(e,item.id)}>Remove</button>

                    </td>

                    </tr>
                    )
                    })
                    }
                    </tbody>
                    </table>
                    </div>
    }
    else{

        cart_HTML = <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Your Shopping Cart is Empty</h4>
            </div>
        </div>
    }
    
    return (
        <div>
            <div className='py-3 bg-warning'>
            <div className='container'>
                <h6>Home / Cart</h6>
            </div>
        </div>

        <div className='py-3'>
            <div className='container'>
                <div className='row'>
                <div className='col-md-12'>
                   {cart_HTML}
                </div>
                <div className='col-md-8'></div>
                <div className='col-md-4'>
                    <div className='card card-body mt-3'>
                        <h4>Sub Total
                            <span className='float-end'>${totalCartPrice}</span>
                        </h4>
                        <h4>Grand Total
                            <span className='float-end'>${totalCartPrice}</span>
                        </h4>
                        <hr />
                        <Link to='/checkout' className='btn btn-primary'>Checkout</Link>
                    </div>
                </div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Cart
