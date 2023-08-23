import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import UserOrders from "./pages/user/UserOrders";
import UserProfile from "./pages/user/UserProfile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Privacy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
