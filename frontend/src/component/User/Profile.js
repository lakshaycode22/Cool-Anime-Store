import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import {useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import "./Login.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const navigateToOrders = () => {
    navigate('/orders')
  }
  const navigateToUpdatePassword = () => {
    navigate('/password/update')
  }
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-bg h-screen">
          <MetaData title={`${user.name}'s Profile`} />
          <div className=" max-w-4xl flex items-center justify-center mx-auto py-28">
            <div className="border border-secondary-variant-2 border-4 lg:w-2/3 rounded-lg shadow-2xl bg-primary-variant text-secondary mx-6">
              <div className="p-4 md:p-12 text-center">
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className=" block rounded-full shadow-xl mx-auto -mt-20 h-40 w-40"
                />
                <h1 className="text-3xl font-bold pt-8">{user.name}</h1>
                <div className="mx-auto w-4/5 pt-3 border-b-2 border-secondary opacity-25"></div>
                <p className="pt-2  text-sm flex items-center justify-center">
                  {user.email}
                </p>
                <p className="pt-2 text-sm flex items-center justify-center">
                  Joined on: {String(user.createdAt).substr(0, 10)}
                </p>
                
                <div className="pt-8 pb-8">
                  <button
                  onClick={navigateToOrders}
                  className="w-48 bg-secondary-variant text-primary text-xl font-Roboto font-bold border-2 py-2 rounded-full border border-secondary rounded mx-2 hover:text-secondary hover:bg-primary">
                    Orders
                  </button>
                  <button  onClick={navigateToUpdatePassword}
                   className="w-52 bg-secondary-variant text-primary text-xl font-Roboto font-bold border-2 py-2 rounded-full border border-secondary rounded mx-2 lg:mt-2 mt-4 hover:text-secondary hover:bg-primary">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
