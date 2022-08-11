import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="m-8 lg:m-16 font-Roboto md:w-80 w-56"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1 className="text-4xl mb-8">Process Order</h1>

                  <div className="relative flex items-center justify-center">
                    <AccountTreeIcon className="mr-2"/>
                    <select
                      className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    className="focus:ring-2 mt-8 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
              <div className="m-8 lg:m-16 font-Roboto">
                <div className="">
                  <p className="text-4xl mb-8">Shipping Info</p>
                  <div className="text-lg">
                    <div className="flex mt-2">
                      <p>Name:</p>
                      <span className="ml-2">
                        {order.user && order.user.name}
                      </span>
                    </div>
                    <div className="flex mt-2">
                      <p>Phone:</p>
                      <span className="ml-2">
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex mt-2">
                      <p>Address:</p>
                      <span className="ml-2 mb-8">
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-4xl mb-8">Payment</p>
                  <div className="text-lg">
                    <div className="font-bold ">
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-green"
                            : "text-red"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex mt-2 text-lg">
                      <p>Amount:</p>
                      <span className="ml-2 mb-8">
                        {order.totalPrice && order.totalPrice}
                      </span>
                    </div>
                  </div>

                  <p className="text-4xl mb-8">Order Status</p>
                  <div className="">
                    <div className="font-bold text-lg mb-8">
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-green"
                            : "text-red"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <p className="text-4xl mb-8">Order Items:</p>
                  <div className="">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="mt-8 ml-8 md:flex md:justify-between"
                        >
                          <div className="md:flex">
                            <img
                              src={item.image}
                              alt="Product"
                              className="bg-gray-200 rounded-md w-20 h-28"
                            />
                            <Link
                              className="md:ml-2 md:mt-2"
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>{" "}
                          </div>

                          <span className="mr-8">
                            {item.quantity} X ₹ {item.price} ={" "}
                            <b>₹ {item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
