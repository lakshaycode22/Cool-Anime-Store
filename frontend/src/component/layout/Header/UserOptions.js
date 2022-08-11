import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Profile from "../../../assets/Profile.png"
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  function navigateToAccount(){
    navigate('/account')
  }
  const navigateToUpadateProfile = () => {
    if(user._id === "62f2bc6ff2c1afc0dcc0fb10"){
      alert.error("You can not update Guest Profile")
      return;
    }
    navigate('/me/update')
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate("/")
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.avatar.url ? user.avatar.url : Profile}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
            {({ active }) => (
              <a
                onClick={navigateToAccount}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-secondary-variant-2"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
               onClick={navigateToUpadateProfile}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-secondary-variant-2"
                )}
              >
                Update Profile
              </a>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={logoutUser}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-secondary-variant-2"
                )}
              >
                Logout
              </a>
            )}
          </Menu.Item>
          {user.role === "admin" && <Menu.Item>
            {({ active }) => (
              <a
                href="/admin/dashboard"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-secondary-variant-2"
                )}
              >
                Dashboard
              </a>
            )}
          </Menu.Item>}
          
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserOptions;
