import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import './Login.css'
import MetaData from "../layout/MetaData";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
    <MetaData title="Forgot Password" />
    {loading ? (
      <Loader />
    ) : (
      <div className="login-bg h-screen">
        <div className="h-full w-full py-16 px-4 pb-52">
          <div className="flex h-full items-center justify-center font-Roboto">
            <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-8">
              <p className="text-2xl font-extrabold leading-6 text-gray-800">
                Forgot Password
              </p>
              <form onSubmit={forgotPasswordSubmit}>
                <div className="mt-4">
                  <div className="font-medium leading-none text-gray-800">
                    Email
                  </div>
                  <div className="relative flex items-center justify-center">
                    <MailOutlineIcon className="mr-2" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full">
                    Forgot Password
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

export default ForgotPassword;