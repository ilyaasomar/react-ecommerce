import Home from '../component/frontend/Home';
import About from '../component/frontend/About';
import Contact from '../component/frontend/Contact';
import Login from '../component/frontend/auth/Login';
import Register from '../component/frontend/auth/Register';
import ViewCategory from '../component/frontend/colections/ViewCategory';
import ViewProduct from '../component/frontend/colections/ViewProduct';
import ProductDetail from '../component/frontend/colections/ProductDetail';



const PublicRoutesList = [
    { path : '/admin', exact : true, name : 'Home' , component : Home},
    { path : '/about', exact : true, name : 'About', component : About},
    { path : '/contact', exact : true, name : 'Contact', component : Contact},
    { path : '/login', exact : true, name : 'Login', component : Login},
    { path : '/register', exact : true, name : 'Register', component : Register},
    { path : '/collections', exact : true, name : 'ViewCategory', component : ViewCategory},
    { path : '/collections/:slug', exact : true, name : 'ViewProduct', component : ViewProduct},
    { path : '/collections/:category/:product', exact : true, name : 'ProductDetail', component : ProductDetail},


];

export default PublicRoutesList;
