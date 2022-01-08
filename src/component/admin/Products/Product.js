import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
function Product (){

  const [categoryList, setCategory] = useState([])
  const [productInput, setProduct] = useState({
    category_id:'',
    slug:'',
    name:'',
    description:'',

    meta_title:'',
    meta_keyword:'',
    meta_descrip:'',

    selling_price:'',
    original_price:'',
    qty:'',
    brand:'',
    featured:'',
    papular:'',
    status:'',
  })
  const [picture, setPicture] = useState([])
  const [errors, setErrors] = useState([])

  const handleInput = (e) => {
    e.persist()
    setProduct({...productInput,[e.target.name]:e.target.value})
  }
  const handlePicture = (e) => {
    setPicture({image:e.target.files[0]})
  }

  useEffect(() => {
    axios.get(`/api/all-category`).then(res=>{
      if(res.data.status === 200){
        setCategory(res.data.category);
        console.log(res.data.category)
      }
    })
  }, [])

  const submitProduct = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image',picture.image)
    formData.append('category_id',productInput.category_id)
    formData.append('slug',productInput.slug)
    formData.append('name',productInput.name)
    formData.append('description',productInput.description)
    formData.append('meta_title',productInput.meta_title)
    formData.append('meta_keyword',productInput.meta_keyword)
    formData.append('meta_descrip',productInput.meta_descrip)
    formData.append('selling_price',productInput.selling_price)
    formData.append('original_price',productInput.original_price)
    formData.append('qty',productInput.qty)
    formData.append('brand',productInput.brand)
    formData.append('featured',productInput.featured)
    formData.append('papular',productInput.papular)
    formData.append('status',productInput.status)
    axios.post(`/api/store-product`,formData).then(res => {
      if(res.data.status === 200){
        swal('Success',res.data.message,'success')
        setProduct({...productInput,
          category_id:'',
          slug:'',
          name:'',
          description:'',
      
          meta_title:'',
          meta_keyword:'',
          meta_descrip:'',
      
          selling_price:'',
          original_price:'',
          qty:'',
          brand:'',
          featured:'',
          papular:'',
          status:'',
        })
      }
      else if(res.data.status === 422){
        swal('All fields are mandetory',"",'error')
        console.log(res.data.errors)
        setErrors(res.data.errors)

      }
    })
   

  }

    return(
        <div className="container-fluid px-5">
      <h4 className="mt-4">Add Product
      <Link to={'/admin/view-product'} className='btn btn-success btn-sm float-end'>Back</Link>
      </h4>
          <form onSubmit={submitProduct}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"id="home-tab"data-bs-toggle="tab"data-bs-target="#home"type="button"
              role="tab"aria-controls="home"aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab"
              data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags
            </button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab"
              data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details
            </button>
          </li>
        </ul>
          {/* // first tab */}

        <div className="tab-content" id="myTabContent">
          <div className="tab-pane card-body-border fade show active"id="home"role="tabpanel"aria-labelledby="home-tab" >
            <div className="form-group mb-3">
              <label>Select Category</label>
              <select name="category_id" className="form-control" onChange={handleInput} value={productInput.category_id}>
                <option>Select Category</option>
                  {
                  categoryList.map( (item) => {
                    return(
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                  }
                </select>
                <small className='text-danger'>{errors.category_id}</small>

            </div>
            <div className="form-group mb-3">
              <label>Slug</label>
              <input type="text" className="form-control"  name="slug" onChange={handleInput} value={productInput.slug} />
              <small className='text-danger'>{errors.slug}</small>
           
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" className="form-control" name="name" onChange={handleInput} value={productInput.name} />
              <small className='text-danger'>{errors.name}</small>
            
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea className="form-control" name="description" onChange={handleInput} value={productInput.description}></textarea>
            </div>
          </div>
          {/* // second tab */}

          <div className="tab-pane card-body-border fade"id="seo-tags"role="tabpanel"aria-labelledby="seo-tags-tab">
            <div className="form-group mb-3">
              <label>Meta Title</label>
              <input type="text" className="form-control" name="meta_title" onChange={handleInput} value={productInput.meta_title} />
              <small className='text-danger'>{errors.meta_title}</small>
            
            </div>
            <div className="form-group mb-3">
              <label>Meta Keyword</label>
              <textarea className="form-control" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword}></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea className="form-control" name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} ></textarea>
            </div>
           

          </div>

          {/* // third tab */}

          <div className="tab-pane card-body-border fade"id="otherdetails"role="tabpanel"aria-labelledby="otherdetails-tab" >
            <div className="form-group mb-3">
              <label>Selling Price</label>
              <input type="text" className="form-control"  name="selling_price" onChange={handleInput} value={productInput.selling_price} />
              <small className='text-danger'>{errors.selling_price}</small>
            </div>
            <div className="form-group mb-3">
              <label>Original Price</label>
              <input type="text" className="form-control" name="original_price" onChange={handleInput} value={productInput.original_price}/>
              <small className='text-danger'>{errors.original_price}</small>
            </div>
            <div className="form-group mb-3">
              <label>QTY</label>
              <input type="text" className="form-control" name="qty" onChange={handleInput} value={productInput.qty}/>
           <small className='text-danger'>{errors.qty}</small>
            </div>
            <div className="form-group mb-3">
              <label>Brand</label>
              <input type="text" className="form-control" name="brand" onChange={handleInput} value={productInput.brand}/>
           <small className='text-danger'>{errors.brand}</small>
            </div>
            <div className="form-group mb-3">
              <label>Image</label>
              <input type="file" className="form-control" name="image" onChange={handlePicture}/>
           <small className='text-danger'>{errors.image}</small>
            </div>
            
            <div className="col-md-4 form-group mb-3">
              <label>Featurd(checked=show)</label>
              <input type="checkbox" name="featured" className="w-50 h-30" onChange={handleInput} value={productInput.featured} />
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>Papular(checked=show)</label>
              <input type="checkbox" name="papular" className="w-50 h-30" onChange={handleInput} value={productInput.papular} />
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>Status(checked=hidden)</label>
              <input type="checkbox" name="status" className="w-50 h-30" onChange={handleInput} value={productInput.status} />
            </div>
           
          </div>

        </div>
        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
        </form>
      
    </div>
    );
   
}
export default Product;