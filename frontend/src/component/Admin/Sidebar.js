import React, { useState } from "react";
import logo from "../../assets/logo.png";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdPostAdd,
  MdAdd,
  MdListAlt,
  MdPeopleAlt,
  MdRateReview,
} from "react-icons/md";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";


const Sidebar = () => {
  const navigate = useNavigate();
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const navigateToDashboard = () => {
    navigate("/admin/dashboard");
  };
  const navigateToAllProducts = () => {
    navigate("/admin/products");
  };
  const navigateToCreateProduct = () => {
    navigate("/admin/product");
  };
  const navigateToAllOrdres = () => {
    navigate("/admin/orders");
  };
  const navigateToAllUsers = () => {
    navigate("/admin/users");
  };
  const navigateToAllReviews = () => {
    navigate("/admin/reviews");
  };

  
  return (
    <div className="font-Roboto">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarContent>
          <div className="ml-6 mt-4" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle className="text-2xl"/> : <FiArrowLeftCircle className="text-2xl"/>}
          </div>
          <Menu iconShape="square">
            <MenuItem
              onClick={navigateToDashboard}
              icon={<MdOutlineDashboard />}
            >
              Dashboard
            </MenuItem>
            <MenuItem onClick={navigateToAllProducts} icon={<MdPostAdd />}>
              All Products
            </MenuItem>
            <MenuItem onClick={navigateToCreateProduct} icon={<MdAdd />}>
              Add Product
            </MenuItem>
            <MenuItem onClick={navigateToAllOrdres} icon={<MdListAlt />}>
              Orders
            </MenuItem>
            <MenuItem onClick={navigateToAllUsers} icon={<MdPeopleAlt />}>
              Users
            </MenuItem>
            <MenuItem onClick={navigateToAllReviews} icon={<MdRateReview />}>
              Reviews
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
