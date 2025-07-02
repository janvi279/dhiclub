import AddMember from "../components/AddMember"
import MobileVerify from "../components/mobileVerify";
import BusinessDetail from "../components/BusinessDetail";
import References from "../components/Refrences";
import Registration from "../components/Registration";
import Login from '../pages/Auth/Login';
import Dashboard from "../components/Dashboard";
import Country from "../components/controllers/country";
import State from "../components/controllers/state";
import City from "../components/controllers/city";
import Controllers from "../components/controllers";
import Currency from "../components/controllers/Currency"
import Pincode from "../components/controllers/Pincode"
import BusinessDomain from "../components/controllers/BusinessDomain"
import BusinessproductService from "../components/controllers/BusinessproductService"
import BusinessCategory from "../components/controllers/BusinessCategory"

const AllRoute = [
    { path: '/', element: <Login />, permission: { read: true } },
    { path: '/AddMember', element: <AddMember />, permission: { read: true } },
    { path: '/verification', element: <MobileVerify />, permission: { read: true } },
    { path: '/BusinessDetail', element: <BusinessDetail />, permission: { read: true } },
    { path: '/References', element: <References />, permission: { read: true } },
    { path: '/memberSignUp', element: <Registration />, permission: { read: true } },
    { path: '/dashboard', element: <Dashboard />, permission: { read: true } },
    { path: '/Controller', element: <Controllers />, permission: { read: true } },
    { path: '/Controller/country', element: <Country />, permission: { read: true } },
    { path: '/Controller/state', element: <State />, permission: { read: true } },
    { path: '/Controller/city', element: <City />, permission: { read: true } },
    { path: '/Controller/pincode', element: <Pincode />, permission: { read: true } },
    { path: '/Controller/currency', element: <Currency />, permission: { read: true } },
    { path: '/Controller/BusinessDomain', element: <BusinessDomain />, permission: { read: true } },
    { path: '/Controller/BusinessCategory', element: <BusinessCategory/>, permission: { read: true } },
    { path: '/Controller/BusinessProductService', element: <BusinessproductService />, permission: { read: true } },




]

export default AllRoute
