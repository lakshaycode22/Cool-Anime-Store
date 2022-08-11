import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData"

import Sidebar from "./Sidebar";

const Header = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
    <MetaData title = "Dashboard -- Admin"/>
      <div className="flex">
        <Sidebar />
        <div className="m-8 flex-1 font-Roboto">
          <div className="flex justify-center text-4xl font-semibold">
            <p>Dashboard</p>
          </div>

          <div className="">
            <div className="flex justify-center bg-secondary-variant-2 text-primary mt-4 p-4 text-2xl font-medium">
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="md:flex md:justify-between md:p-12 p-8">
              <div className="bg-secondary-variant-2 text-primary rounded-full w-40 h-40 text-xl mt-2">
                <div className="flex justify-center">
                  <div className="mt-12">
                    <Link to="/admin/products">
                      <p>Product</p>
                      <p className="ml-6">{products && products.length}</p>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-variant-2 text-primary rounded-full w-40 h-40 text-xl mt-2">
                <div className="flex justify-center">
                  <div className="mt-12">
                    <Link to="/admin/orders">
                      <p>Orders</p>
                      <p className="ml-6">{orders && orders.length}</p>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-variant-2 text-primary rounded-full w-40 h-40 text-xl mt-2">
                <div className="flex justify-center">
                  <div className="mt-12">
                    <Link to="/admin/users">
                      <p>Users</p>
                      <p className="ml-4">{users && users.length}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Header;
