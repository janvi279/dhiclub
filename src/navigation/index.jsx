import MobileVerify from "../components/mobileVerify";
import BusinessDetail from "../components/BusinessDetail";
import References from "../components/Refrences";
import Registration from "../components/Registration";
import Login from "../pages/Auth/Login";
import Dashboard from "../components/Dashboard";
import Country from "../components/controllers/country";
import State from "../components/controllers/state";
import City from "../components/controllers/city";
import Controllers from "../components/controllers";
import Currency from "../components/controllers/Currency";
import Pincode from "../components/controllers/Pincode";
import BusinessDomain from "../components/controllers/BusinessDomain";
import BusinessCategory from "../components/controllers/BusinessCategory";
import BusinessType from "../components/controllers/BusinessType";
import BulkUpload from "../components/controllers/BulkUpload";
import BulkUploadBusinessCategory from "../components/controllers/BulkUploadBusinessCategory";
import Teams from "../components/dhiclub/Teams";
import Dhiclub from "../components/dhiclub"
import Members from "../components/dhiclub/Members";
import AddMember from "../components/dhiclub/Members/AddMember";
import PersonalDetail from "../components/dhiclub/Members/PersonalDetail";
import SignUp from "../components/SignUp"
import Account from "../components/Account";

const AllRoute = [
  { path: "/", element: <Login />, permission: { read: true } },
  
  {
    path: "/verification",
    element: <MobileVerify />,
    permission: { read: true },
  },
  {
    path: "/personal-detail",
    element: <SignUp />,
    permission: { read: true },
  },
  {
    path: "/BusinessDetail",
    element: <BusinessDetail />,
    permission: { read: true },
  },
  { path: "/references", element: <References />, permission: { read: true } },
  {
    path: "/memberSignUp",
    element: <Registration />,
    permission: { read: true },
  },
  { path: "/dashboard", element: <Dashboard />, permission: { read: true } },
  { path: "/Controller", element: <Controllers />, permission: { read: true } },
  {
    path: "/Controller/country",
    element: <Country />,
    permission: { read: true },
  },
  { path: "/Controller/state", element: <State />, permission: { read: true } },
  { path: "/Controller/city", element: <City />, permission: { read: true } },
  {
    path: "/Controller/pincode",
    element: <Pincode />,
    permission: { read: true },
  },
  {
    path: "/Controller/currency",
    element: <Currency />,
    permission: { read: true },
  },
  {
    path: "/Controller/business-domain",
    element: <BusinessDomain />,
    permission: { read: true },
  },
  {
    path: "/Controller/business-type",
    element: <BusinessType />,
    permission: { read: true },
  },
  {
    path: "/Controller/business-category",
    element: <BusinessCategory />,
    permission: { read: true },
  },
  {
    path: "/Controller/bulkUpload-country",
    element: <BulkUpload />,
    permission: { read: true },
  },
  {
    path: "/Controller/bulkUpload-businessCategory",
    element: <BulkUploadBusinessCategory />,
    permission: { read: true },
  },
  { path: "/Dhiclub", element: <Dhiclub />, permission: { read: true } },
  {
    path: "/Dhiclub/teams",
    element: <Teams />,
    permission: { read: true },
  },
  {
    path: "/Dhiclub/leaders",
    element: <Teams />,
    permission: { read: true },
  },
  {
    path: "/Dhiclub/members",
    element: <Members />,
    permission: { read: true },
  },
   {
    path: "/Dhiclub/members/AddMember",
    element: <AddMember />,
    permission: { read: true },
  },
   {
    path: "/Dhiclub/members/AddMember/personalDetail",
    element: <PersonalDetail />,
    permission: { read: true },
  },
  {
    path: "/Dhiclub/registration",
    element: <Teams />,
    permission: { read: true },
  },
  {
    path: "/Account",
    element: <Account />,
    permission: { read: true },
  },
];

export default AllRoute;
