import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Home/Dashboard";
import Home from "../pages/Home"

/* controllers routes */
import Controllers from "../pages/controllers"
import Country from "../pages/controllers/Country"
import State from "../pages/controllers/State"
import City from "../pages/controllers/City"
import Pincode from "../pages/controllers/Pincode"
import BusinessType from "../pages/controllers/BusinessType"
import BusinessDomain from "../pages/controllers/BusinessDomain"
import BusinessCategory from "../pages/controllers/BusinessCategory"
import BulkUpload from "../pages/controllers/BulkUpload"
import BulkUploadBusinessCategory from "../pages/controllers/BulkUploadBusinessCategory"

/* dhiclub routes */
import Dhiclub from "../pages/dhiclub"
import Teams from "../pages/dhiclub/Teams"
import Registration from "../pages/dhiclub/Registration"
import Members from "../pages/dhiclub/Members"
import AddMemberForm from "../pages/dhiclub/Registration/AddMember/AddMemberForm";
import Visitor from "../pages/dhiclub/Visitors/index"
import Responsibility from "../pages/dhiclub/Responsibility"

/* crm routes */
import CRM from "../pages/CRM"
import Clients from "../pages/CRM/Clients"
import Leads from "../pages/CRM/Leads"
import Report from "../pages/CRM/Report"

/*meeting routes */
import Meeting from "../pages/Meeting"
import Attendance from "../pages/Meeting/Attendance"
import TYFCB from "../pages/Meeting/TYFCB"
import FaceToFace from "../pages/Meeting/FaceToFace"
import Reference from "../pages/Meeting/Reference"
import Guest from "../pages/Meeting/Guest"
import Training from "../pages/Meeting/Training"
import Testimonial from "../pages/Meeting/Testimonial"
import CreditNote from "../pages/Meeting/CreditNote"

/* account routes */
import Account from "../pages/Account"
import Billing from "../pages/Account/Billing"

/* inventory routes*/
import Inventory from "../pages/Inventory"
import Product from "../pages/Inventory/Product"
import Stock from "../pages/Inventory/Stock"
import Suppliers from "../pages/Inventory/Suppliers"
import AddRegistration from "../pages/dhiclub/Registration/modals/AddRegistration";

const AllRoute = [
  { path: "/login", element: <Login />, permission: { read: true } },
  { path: "/dashboard", element: <Dashboard />, permission: { read: true } },
  { path: "/", element: <Home />, permission: { read: true } },

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
    path: "/Dhiclub/registration/AddMember/personalDetail",
    element: <AddMemberForm />,
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
    path: "/Meeting/Tyfcb",
    element: <TYFCB />,
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
    path: "/Inventory",
    element: <Inventory />,
    permission: { read: true },
  },
  {
    path: "/Inventory/Product",
    element: <Product />,
    permission: { read: true },
  },
  {
    path: "/Inventory/Stock",
    element: <Stock />,
    permission: { read: true },
  },
  {
    path: "/Inventory/Suppliers",
    element: <Suppliers />,
    permission: { read: true },
  },
];

export default AllRoute;
