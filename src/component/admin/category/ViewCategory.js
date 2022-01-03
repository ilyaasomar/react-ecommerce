import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCategory (){
    const [loading, setloading] = useState(true)
    const [categorylist, setCategorylist] = useState([])
    useEffect(() => {
       axios.get(`/api/view-category`).then(res => {
           if(res.data.status === 200){
               console.log(res.data.category);
               setCategorylist(res.data.category)
           }
           setloading(false)
       })
    }, [])

    const deleteCategory = (e,id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';
        axios.delete(`/api/delete-category/${id}`).then(res => {
            if(res.data.status === 200){
                swal('Succeas',res.data.message,'success')
                thisClicked.closest('tr').remove();

            }
            else if(res.data.status === 404){
                swal('Succeas',res.data.message,'success')
        thisClicked.innerText = 'Delete';

            }
        })
    }

    if(loading){
        return(<h4>Loading Category ...</h4>)
    }
    else{
        var category_HTMLTABLE = ''
        category_HTMLTABLE = categorylist.map((item) =>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={ (e) => deleteCategory(e,item.id)} className='btn btn-danger btn-sm'>Delete</button>
                    </td>
                </tr>
            )
            
        })
    }

 
   
    return(
       <div className='container-fluid px-4'>
           <div className='card mt-4'>
               <div className='card-header'>
                   <h4>View Categories
                   <Link to="/admin/add-category" className='btn btn-primary btn-sm float-end'>Add Category</Link>
                   </h4>
               </div>
               <div className='card-body'>
                   <table className='table table-bordered table-striped'>
        <thead>
            <tr>
                <td>No</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Status</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        </thead>
        <tbody>
            {category_HTMLTABLE}
        </tbody>
                   </table>
               </div>
           </div>
       </div>
    );
   
}
export default ViewCategory;