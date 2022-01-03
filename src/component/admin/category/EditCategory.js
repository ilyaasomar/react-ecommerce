import React, { useEffect, useState } from 'react';
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function EditCategory (props){
    const history = useHistory();
   const category_id = props.match.params.id;
   const [loading, setLoading] = useState(true)
    const [categoryInput, setCategory] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
       axios.get(`/api/edit-category/${category_id}`).then(res =>{
           console.log(res.data.category)
           if(res.data.status === 200){
            setCategory(res.data.category)
           }
           else if(res.data.status === 404){
               swal('Error',res.data.message,'error')
               history.push('/admin/view-category')
           }
           setLoading(false)
       })
    }, [props.match.params.id])
    const handleInput = (e) => {
        e.persist()
        setCategory({...categoryInput,[e.target.name]:e.target.value})
    }
    if(loading){
        return <h4>Loading Edit Category...</h4>

    }
    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`,data).then(res => {
            if(res.data.status === 200){
                swal('Success', res.data.message,'success');
                setError([])
            }
            else if(res.data.status === 422){
                swal('All Fields Are Mandetory','','error')
                setError(res.data.errors)
            }
            else{
                swal('Error',res.data.message,'error')
                history.push('/admin/view-category')
            }
        })
    }
    return(
        <div className="container px-4">
        <h4 className="mt-4">Edit Category
        <Link to="/admin/view-category" className='btn btn-danger btn-sm float-end'>Back</Link>
        </h4>
            <form onSubmit={updateCategory}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="seo-tags-tab"
                data-bs-toggle="tab"
                data-bs-target="#seo-tags"
                type="button"
                role="tab"
                aria-controls="seo-tags"
                aria-selected="false"
              >
                SEO Tags
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane card-body-border fade show active"id="home"role="tabpanel"aria-labelledby="home-tab" >
              <div className="form-group mb-3">
                <label>Slug</label>
                <input type="text" className="form-control"  name="slug" onChange={handleInput} value={categoryInput.slug} />
                <small className='text-danger'>{error.slug}</small>
              </div>
              <div className="form-group mb-3">
                <label>Name</label>
                <input type="text" className="form-control" name="name" onChange={handleInput} value={categoryInput.name} />
                <small className='text-danger'>{error.name}</small>
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <textarea className="form-control" name="description" onChange={handleInput} value={categoryInput.description}></textarea>
              </div>
              <div className="form-group mb-3">
                <label>Status</label>
                <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/> Status 0=show/1=hidden
              </div>
            </div>
            <div
              className="tab-pane card-body-border fade"id="seo-tags"role="tabpanel"aria-labelledby="seo-tags-tab">
              <div className="form-group mb-3">
                <label>Meta Title</label>
                <input type="text" className="form-control" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} />
                <small className='text-danger'>{error.meta_title}</small>
              </div>
              <div className="form-group mb-3">
                <label>Meta Keyword</label>
                <textarea className="form-control" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword}></textarea>
              </div>
              <div className="form-group mb-3">
                <label>Meta Description</label>
                <textarea className="form-control" name="meta_description" onChange={handleInput} value={categoryInput.meta_description}></textarea>
              </div>
             
  
            </div>
          </div>
          <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
          </form>
        
      </div>
    );
   
}
export default EditCategory;