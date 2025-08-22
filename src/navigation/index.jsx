import MobileVerify from "../components/mobileVerify";
import BusinessDetail from "../components/BusinessDetail";
import References from "../components/Refrences";
import Login from "../pages/Auth/Login";
import Dashboard from "../components/Dashboard";
import Country from "../components/controllers/Country";
import State from "../components/controllers/State";
import City from "../components/controllers/City";
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
import CRM from "../components/CRM"
import Clients from "../components/CRM/Clients";
import Leads from "../components/CRM/Leads";
import Report from "../components/CRM/Report";
import Meeting from "../components/Meeting"
import Attendance from "../components/Meeting/Attendance";
import FaceToFace from "../components/Meeting/FaceToFace";
import Reference from "../components/Meeting/Reference";
import Guest from "../components/Meeting/Guest";
import Training from "../components/Meeting/Training";
import Testimonial from "../components/Meeting/Testimonial";
import CreditNote from "../components/Meeting/CreditNote";
import Billing from "../components/Account/Billing";
import Inventory from "../components/Inventry";
import Product from "../components/Inventry/Product";
import Stock from "../components/Inventry/Stock";
import Suppliers from "../components/Inventry/Suppliers";
import Registration from "../components/dhiclub/Registration";
import AddRegistration from "../components/dhiclub/Registration/AddRegistration";
import Visitor from "../components/dhiclub/Visitors";
import Responsibility from "../components/dhiclub/Responsibility";

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
    element: <Registration />,
    permission: { read: true },
  },
    {
    path: "/Dhiclub/registration/AddRegistration",
    element: <AddRegistration />,
    permission: { read: true },
  },
   {
    path: "/Dhiclub/visitor",
    element: <Visitor />,
    permission: { read: true },
  },
   {
    path: "/Dhiclub/responsibility",
    element: <Responsibility />,
    permission: { read: true },
  },
  {
    path: "/CRM",
    element: <CRM />,
    permission: { read: true },
  },
  {
    path: "/CRM/Clients",
    element: <Clients />,
    permission: { read: true },
  },
  {
    path: "/CRM/Leads",
    element: <Leads />,
    permission: { read: true },
  },
  {
    path: "/CRM/Report",
    element: <Report />,
    permission: { read: true },
  },
  {
    path: "/Meeting",
    element: <Meeting />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Attendance",
    element: <Attendance />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Face to Face",
    element: <FaceToFace />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Reference",
    element: <Reference />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Guest",
    element: <Guest />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Training",
    element: <Training />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Testimonial",
    element: <Testimonial />,
    permission: { read: true },
  },
  {
    path: "/Meeting/Credit Note",
    element: <CreditNote />,
    permission: { read: true },
  },

  {
    path: "/Account",
    element: <Account />,
    permission: { read: true },
  },
  {
    path: "/Account/Billing",
    element: <Billing />,
    permission: { read: true },
  },
  {
    path: "/Inventry",
    element: <Inventory />,
    permission: { read: true },
  },
  {
    path: "/Inventry/Product",
    element: <Product />,
    permission: { read: true },
  },
  {
    path: "/Inventry/Stock",
    element: <Stock />,
    permission: { read: true },
  },
  {
    path: "/Inventry/Suppliers",
    element: <Suppliers />,
    permission: { read: true },
  },
];

export default AllRoute;
