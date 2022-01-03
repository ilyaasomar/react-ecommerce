import axios from "axios";
import React, {useState} from "react";
import swal from "sweetalert";
function Category() {
    const [categoryInput, setCategory] = useState({
        slug:'',
        name:'',
        descrip:'',
        status:'',
        meta_title:'',
        meta_keyword:'',
        meta_descrip:'',
        list_error:[],
    })
    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput,[e.target.name]:e.target.value})
    }
    const categorySubmit = (e) => {
        e.preventDefault()
        const data = {
            slug:categoryInput.slug,
            name:categoryInput.name,
            description:categoryInput.descrip,
            status:categoryInput.status,
            meta_title:categoryInput.meta_title,
            meta_keyword:categoryInput.meta_keyword,
            meta_description:categoryInput.meta_descrip,
        }
        axios.post(`api/store-category`,data).then(res=>{
            if(res.data.status === 200){
              swal('Success',res.data.message,'success')
              document.getElementById('CATEGORY_FROM').reset();

            }
            else if(res.data.status === 400){
              setCategory({...categoryInput,list_error:res.data.errors});
            }
        });
    }
    var display_errors = [];
    if(categoryInput.list_error){
      display_errors = [
        categoryInput.list_error.slug,
        categoryInput.list_error.name,
        categoryInput.list_error.meta_title,

      ]
    }
  return (
    <div className="container-fluid px-5">
      <h4 className="mt-4">Add Category</h4>
      {
        display_errors.map((item) => {
          return(<p className="mb-1 text-danger">{item}</p>)
        })
      }
          <form onSubmit={categorySubmit} id="CATEGORY_FROM">
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
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" className="form-control" name="name" onChange={handleInput} value={categoryInput.name} />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea className="form-control" name="descrip" onChange={handleInput} value={categoryInput.descrip}></textarea>
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
            </div>
            <div className="form-group mb-3">
              <label>Meta Keyword</label>
              <textarea className="form-control" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword}></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea className="form-control" name="meta_descrip" onChange={handleInput} value={categoryInput.meta_descrip}></textarea>
            </div>
           

          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
        </form>
      
    </div>
  );
}
export default Category;
