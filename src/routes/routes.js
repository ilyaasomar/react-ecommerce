import Dashboard from '../component/admin/Dashboard';
import Profile from '../component/admin/Profile';
import Category from '../component/admin/category/Category';
import ViewCategory from '../component/admin/category/ViewCategory';
import EditCategory from '../component/admin/category/EditCategory';
import Product from '../component/admin/Products/Product';
import ViewProduct from '../component/admin/Products/ViewProduct';
import EditProduct from '../component/admin/Products/EditProduct';
const routes = [
    { path : '/admin', exact : true, name : 'Admin'},
    { path : '/admin/dashboard', exact : true, name : 'Dashboard', component : Dashboard},
    { path : '/admin/profile', exact : true, name : 'Profile', component : Profile},
    { path : '/admin/add-category', exact : true, name : 'Category', component : Category},
    { path : '/admin/view-category', exact : true, name : 'ViewCategory', component : ViewCategory},
    { path : '/admin/edit-category/:id', exact : true, name : 'EditCategory', component : EditCategory},
    { path : '/admin/product', exact : true, name : 'Product', component : Product},
    { path : '/admin/view-product', exact : true, name : 'ViewProduct', component : ViewProduct},
    { path : '/admin/edit-product/:id', exact : true, name : 'EditProduct', component : EditProduct},
    
];

export default routes;
