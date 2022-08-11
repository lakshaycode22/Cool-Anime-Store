import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="m-8 lg:m-16 font-Roboto">
            <div className="">
              <p className="lg:text-5xl text-3xl mb-16 ">Order #{order && order._id}</p>
              <p className="text-4xl mb-8">Shipping Info</p>
              <div className="text-lg">
                <div className="flex mt-2">
                  <p>Name:</p>
                  <span className="ml-2">{order.user && order.user.name}</span>
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
                          src={item.images}
                          alt="Product"
                          className="bg-gray-200 rounded-md w-28 h-28"
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
