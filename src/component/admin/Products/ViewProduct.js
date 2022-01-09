import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
function ViewProduct (){
const [productList, setProduct] = useState([])
const [loading, setLoading] = useState(true)
useEffect(() => {
    document.title = 'view product'
    axios.get(`/api/view-product`).then(res => {
        if(res.data.status === 200){
            // console.log(res.data.products)
            setProduct(res.data.products)
            setLoading(false);
        }
    })
}, [])
var display_productData = '';
if(loading){
   return(<h4>Product Data Loading</h4>)
}
else{
display_productData = productList.map((item) => {
    var productStatus = '';
if(item.status == 0){
productStatus = 'Show'
}
else if(item.status == 1){
productStatus = "Hidden"
}
    return(
        <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category.name}</td>
                <td>{item.name}</td>
                <td>${item.selling_price}</td>
                <td><img src={`http://127.0.0.1:8000/${item.image}`} width='50' alt="image"/></td>
                <td>
                    <Link to={`/admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                    </td>
                    <td>
                    {productStatus}
                    </td>
            
            </tr>
    )
})
}
    return(
       <div className='card'>
           <div className='card card-header'>
               <h4>View Products
                   <Link to={'/admin/product'} className='btn btn-primary btn-sm float-end'>Create Product</Link>
               </h4>
               <div className='card card-body'>
               <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Selling Price</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {display_productData}
                    </tbody>
                    </table>
               </div>
           </div>
           </div>
    );
   
}
export default ViewProduct;