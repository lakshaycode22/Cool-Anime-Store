import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import "./Shipping.css";

import { ImHome3, ImLocation2 } from "react-icons/im";
import { FaCity, FaPhoneAlt, FaGlobeAfrica, FaBus } from "react-icons/fa";

import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";

import CheckoutSteps from "./CheckoutSteps.js";
import MetaData from "../layout/MetaData";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if(phoneNo.length < 10 || phoneNo.length > 10){
      alert.error("Phone number should be 10 digits long")
      return;
    }
    dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
    navigate("/order/confirm")
  };
  return (
    <>
      
      <div className="shipping-bg">
        <MetaData title= "Shipping"/>
      <CheckoutSteps activeStep={0} />
        <div className="h-full w-full py-16 px-4 pb-52">
          <div className="flex h-full items-center justify-center font-Roboto">
            <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 pl-6">
              <h2 className="text-center text-xl lg:text-3xl font-Roboto font-bold pt-8 pb-4">
                SHIPPING DETAILS
              </h2>
              <form onSubmit={shippingSubmit}>
                <div className="relative flex items-center justify-center mt-4">
                  <ImHome3 className="mr-2 text-2xl mt-2" />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="relative flex items-center justify-center mt-4">
                  <FaCity className="mr-2 text-2xl mt-2" />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="relative flex items-center justify-center mt-4">
                  <ImLocation2 className="mr-2 text-2xl mt-2" />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="relative flex items-center justify-center mt-4">
                  <FaPhoneAlt className="mr-2 text-2xl mt-2" />
                  <input
                    type="number"
                    placeholder="Phone No."
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="relative flex items-center justify-center mt-4">
                  <FaGlobeAfrica className="mr-2 text-2xl mt-2" />
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {country && (
                  <div className="relative flex items-center justify-center mt-4">
                    <FaBus className="mr-2 text-2xl mt-2" />
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <button
                  disabled={state ? false : true}
                  className="mt-4 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
