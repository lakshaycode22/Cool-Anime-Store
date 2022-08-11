import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated, navigate]);

  return (
    <>
    <MetaData title="Update Profile"/>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-bg">
          <div className="h-full w-full py-16 px-4 pb-52">
            <div className="flex h-full items-center justify-center font-Roboto">
              <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-8">
                <p className="text-2xl font-extrabold leading-6 text-gray-800">
                  Update Profile
                </p>
                <form onSubmit={updateProfileSubmit}>
                  <div className="mt-8">
                    <div className="font-medium leading-none text-gray-800">
                      Name
                    </div>
                    <div className="relative flex items-center justify-center">
                      <FaceIcon className="mr-2" />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>
                  </div>
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
                  <div className="mt-6  w-full">
                    <div className="font-medium leading-none text-gray-800">
                      Avatar
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-12 mr-2 mt-2">
                        <img src={avatarPreview} alt="Avatar Preview" />
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>
                    <p className="font-medium text-sm text-secondary-variant-2 mt-2">
                      SVG, PNG, JPG OR JPEG (MAX. 500kb)
                    </p>
                  </div>
                  <div className="mt-8">
                    <button className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full">
                      Update Profile
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

export default UpdateProfile;
