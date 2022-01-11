import React, {useState,useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const ProductDetail = (props) => {
    const history = useHistory()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    const category_slug = props.match.params.category
    const product_slug = props.match.params.product

    //start increment and decrement quantity using hooks
    const handleDecrement =() => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1)
        }
    }
    const handleIncrement =() => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1)
        }
    }
    //end increment and decrement quantity using hooks

        const submitAddtocart = (e) => {
            e.preventDefault()
            const data = {
                product_id : product.id,
                product_qty : quantity,
            }
            axios.get(`/api/add-to-cart`,data).then(res =>{
                if(res.data.status === 201){
                swal("Success",res.data.message,"success")
                   
               }
               else if(res.data.status === 409){
                swal("Warning",res.data.message,"warning")
            }
            else if(res.data.status === 401){
                swal("Error",res.data.message,"error")
            }
            })
            }


    useEffect(() => {
        let isMounted = true
       axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
           if(isMounted){
               if(res.data.status === 200){
                    setProduct(res.data.product)
                    setLoading(false)
               }
               else if(res.data.status === 400){
                swal("Error",res.data.message,"error")
                history.push('/collections')
            }
            else{
                swal("Warning",res.data.message,"warning")
            }
           }
         
       })
       return () => {
        isMounted = false
    }
    }, [props.match.params.category,props.match.params.product,history])
    let avaliable_stock = ''

    if(loading){
        return <h4>Product Details Loading</h4>
    }
    else{
        if(product.qty > 0){
            avaliable_stock = <div>
   <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>
                        <div className='row'>
                            <div className='col-md-3 mt-3'>
                                <div className='input-group'>
        <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
        <div className='form-control text-center'>{quantity}</div>
        <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                                </div>
                            </div>
                            <div className='col-md-3 mt-3'>
                            <button type='button' className='btn btn-primary w-100' onClick={submitAddtocart}> Add to Cart</button>
                             </div>
                        </div>
            </div>
        }
        else{
            avaliable_stock = <div>
            <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
            </div>
        }
    }
    return (
        <div>
        <div className='py-3 bg-warning'>
            <div className='container'>
                <h6>Collections / {product.category.name} /{product.name}</h6>
            </div>
        </div>

        <div className='py-3'>
            <div className='container'>
                <div className='row'>
               <div className='col-md-4 border-end'>
                   <img src={`http://127.0.0.1:8000/${product.image}`} alt='Product Image' className='w-50' />
               </div>
                <div className='col-md-8'>
                    <h4>Product Name
                    <span className='float-end badge btn-sm btn-danger badge-pil'>{product.brand}</span>
                    </h4>
                    <p>{product.description}</p>
                    <h4 className='mb-1'>${product.selling_price}
                    <s className='ms-2'>${product.original_price}</s>
                    </h4>
                    <div>
                     {avaliable_stock}
                    </div>
                    <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>

                </div>



                </div>
            </div>
        </div>
   </div>
    )
}

export default ProductDetail
