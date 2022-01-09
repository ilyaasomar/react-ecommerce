import Home from '../component/frontend/Home';
import About from '../component/frontend/About';
import Contact from '../component/frontend/Contact';
import ViewCategory from '../component/frontend/colections/ViewCategory';
const PublicRoutesList = [
    { path : '/admin', exact : true, name : 'Home' , component : Home},
    { path : '/about', exact : true, name : 'About', component : About},
    { path : '/contact', exact : true, name : 'Contact', component : Contact},
    { path : '/collections', exact : true, name : 'ViewCategory', component : ViewCategory},

];

export default PublicRoutesList;
