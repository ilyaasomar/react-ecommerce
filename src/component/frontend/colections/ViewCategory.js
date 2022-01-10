import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const ViewCategory = () => {
const [categoryList, setCategory] = useState([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMountred = true;
        axios.get(`/api/getCategory`).then(res =>{
            if(isMountred){
                if(res.data.status === 200){
                    setCategory(res.data.category)
                    setLoading(false)
                }
            }
        })
        return () => {
            isMountred = false
        }
    }, [])
    if(loading){
        return <h4>Loading</h4>
    }
    else{
        var showCategorylist = '';
        showCategorylist = categoryList.map((item, idx) => {
            return(
                <div className='col-md-4' key={idx}>
                <div className='card'>
                    <Link to="">
                        <img src="" className='w-100' alt={item.name} />
                        </Link>
                <div className='card-body'>
                    <Link to={`collections/${item.slug}`}>
                        <h5>{item.name}</h5>
                        </Link>
                </div>
            </div>
            </div>
            
            )
        })
    }
    return (
        <div>
             <div className='py-3 bg-warning'>
                 <div className='container'>
                     <h6>Category Page</h6>
                 </div>
             </div>

             <div className='py-3'>
                 <div className='container'>
                     <div className='row'>
                    {showCategorylist}
                     </div>
                 </div>
             </div>
        </div>
    )
}

export default ViewCategory
