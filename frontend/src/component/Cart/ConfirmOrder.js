import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import MetaData from "../layout/MetaData";

const ConfirmOrder = () => {
    const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
        subtotal,
        shippingCharges,
        tax,
        totalPrice
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment")
  }
  return (
    <div className="font-Roboto text-secondary">
      <MetaData title="Confirm Order"/>
      <CheckoutSteps activeStep={1} />
      <div className="md:flex my-16">
        <div className="md:w-2/3 md:mx-16 mx-8">
          <div className="mb-16">
            <p className="text-4xl">Shipping Info</p>
            <div className="mt-8 ml-8">
              <div className="flex mb-2">
                <p>Name:</p>
                <span className="ml-4">{user.name}</span>
              </div>
              <div className="flex mb-2">
                <p>Phone:</p>
                <span className="ml-4">{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex">
                <p>Address</p>
                <span className="ml-4">{address}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-4xl ">Your Cart Items</p>
            <div>
              {cartItems &&
                cartItems.map((item) => (
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
        {/* */}
        <div className="md:w-1/3 md:my-12 md:mr-16 mx-8 mt-16">
            <div className="flex justify-center">
          <p className="text-4xl mb-4">Order Summary</p>
                
            </div>
          <hr className="mb-8 border border-secondary" />
          <div>
            <div className="flex justify-between mb-8">
              <p>Subtotal:</p>
              <span>₹ {subtotal}</span>
            </div>
            <div className="flex justify-between mb-8">
              <p>Shipping Charges:</p>
              <span>₹ {shippingCharges}</span>
            </div>
            <div className="flex justify-between mb-8">
              <p>GST:</p>
              <span>₹ {tax}</span>
            </div>
          </div>
          <hr className="mb-8 border border-secondary" />
          <div className="flex justify-between">
            <p>
              <b>Total:</b>
            </p>
            <span>₹ {totalPrice}</span>
          </div>

          <button onClick={proceedToPayment}
          className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 mt-8 w-full">
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
