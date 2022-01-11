import React, {useState,useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const ViewProduct = (props) => {
    const history = useHistory();
    const product_slug = props.match.params.slug
    const [categoryList, setCategory] = useState([])
    const [productList, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const produtCount = productList.length

    useEffect(() => {
        let isMounted = true
        axios.get(`/api/fetchproducts/${product_slug}`).then(res =>{
            if(isMounted){
                if(res.data.status === 200){
                    setProduct(res.data.product_data.product)
                    setCategory(res.data.product_data.category)
                        setLoading(false)
                }
                else if(res.data.status === 400){
                    swal("Warning",res.data.message,"warning")
                    history.push('/collections')
                }
                else{
                    swal("Warning",res.data.message,"warning")
                }
            }
           
        })
        return () =>{
            isMounted = false
        }
      
    }, [props.match.params.slug,history])
    if(loading){
        return <h4>Loading Product</h4>
    }
    else{
        var showProductList = '';

        if(produtCount){

        showProductList = productList.map((item, idx) => {
            return(
                <div className='col-md-4' key={idx}>
                <div className='card'>
                    <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                        <img src={`http://127.0.0.1:8000/${item.image}`} className='w-50' alt={item.name} />
                        </Link>
                <div className='card-body'>
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                        <h5>{item.name}</h5>
                        </Link>
                </div>
            </div>
            </div>
            )
        })
    }
    else{
        showProductList = 
        <div className='col-md-12'>
            <h4>No Product Avaliable For /{categoryList.name}</h4>
        </div>
    }
    }
   

    return (
        <div>
             <div className='py-3 bg-warning'>
                 <div className='container'>
                     <h6>Collections / {categoryList.name}</h6>
                 </div>
             </div>

             <div className='py-3'>
                 <div className='container'>
                     <div className='row'>
                    {showProductList}
                     </div>
                 </div>
             </div>
        </div>
    )
}

export default ViewProduct
