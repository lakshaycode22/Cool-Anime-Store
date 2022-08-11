import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"
import MetaData from "../layout/MetaData";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginGuestEmail = "guest@gmail.com"
  const loginGuestPassword = "12345678"

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const loginSubmitGuest = (e) => {
    e.preventDefault();
    dispatch(login(loginGuestEmail, loginGuestPassword));
  };

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  return (
    <>
    <MetaData title="Login"/>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-bg">
          <div className="h-full w-full py-16 px-4 pb-52">
            <div className="flex h-full items-center justify-center font-Roboto">
              <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                <p className="text-2xl font-extrabold leading-6 text-gray-800">
                  Login to your account
                </p>
                <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                  >
                    Sign up here
                  </a>
                </p>

                <form onSubmit={loginSubmit}>
                  <div className="mt-4">
                    <div className="font-medium leading-none text-gray-800">
                      Email
                    </div>
                    <div className="relative flex items-center justify-center">
                      <MailOutlineIcon className="mr-2" />
                      <input
                        type="email"
                        placeholder="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>
                  </div>
                  <div className="mt-6  w-full">
                    <div className="font-medium leading-none text-gray-800">
                      Password
                    </div>
                    <div className="relative flex items-center justify-center">
                      <LockOpenIcon className="mr-2" />
                      <input
                        type="password"
                        placeholder="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>
                    <div className="font-medium text-sm text-secondary-variant-2 hover:text-secondary mt-2">
                      <a href="/password/forgot">Forgot your password?</a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full"
                    >
                      Log In
                    </button>
                    <button onClick={loginSubmitGuest}
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full mt-4"
                    >
                      Log In as Guest
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
