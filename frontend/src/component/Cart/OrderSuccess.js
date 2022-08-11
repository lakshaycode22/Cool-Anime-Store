import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const navigateToOrders = () => {
    navigate("/orders");
  };
  return (
    <div className=" h-screen flex flex-col justify-center text-center">
      <MetaData title="Order Success"/>
      <div>
        <FaCheckCircle className="mx-auto text-8xl text-green" />
        <p className="mt-4 text-base font-bold text-4xl leading-none text-gray-800">
          Your Order has been placed
        </p>
        <button
          onClick={navigateToOrders}
          className="text-xl font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 mt-6 md:w-72 w-60"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
