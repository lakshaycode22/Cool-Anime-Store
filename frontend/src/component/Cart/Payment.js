import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { AiFillCreditCard } from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import { MdVpnKey } from "react-icons/md";
import "./Shipping.css";
import { clearErrors, createOrder } from "../../actions/orderAction.js";
import MetaData from "../layout/MetaData.js";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div className="shipping-bg">
      <MetaData title= "Payment"/>
      <CheckoutSteps activeStep={2} />
      <div className="h-full w-full py-16 px-4 pb-52">
        <div className="flex h-full items-center justify-center font-Roboto">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 pl-6">
            <form onSubmit={(e) => submitHandler(e)}>
              <p className="text-center text-xl lg:text-3xl font-Roboto font-bold pt-8 pb-4 product">
                CARD INFO
              </p>
              <div className="flex mt-4">
                <AiFillCreditCard className="mr-2 text-3xl mt-3" />
                <CardNumberElement className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
              </div>
              <div className="flex mt-4">
                <RiCalendarEventFill className="mr-2 text-3xl mt-3" />
                <CardExpiryElement className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
              </div>
              <div className="flex mt-4">
                <MdVpnKey className="mr-2 text-3xl mt-3" />
                <CardCvcElement className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
              </div>
              <input
                type="submit"
                value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="mt-8 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
