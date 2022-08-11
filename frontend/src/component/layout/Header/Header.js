import React from "react";
import logo from "../../../assets/logo.png";
import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const navigation = [
  { name: "HOME", href: "/", current: false },
  { name: "PRODUCTS", href: "/products", current: false },
  { name: "CONTACT", href: "/contact", current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const navigateToSearch = () => {
    navigate("/search");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-secondary">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                  {/* Logo-CoolAnimeStore */}
                  <div className="flex-shrink-0 px-2">
                    <img
                      className="h-8 scale-125 px-2"
                      src={logo}
                      alt="Workflow"
                    />
                  </div>

                  {/* Navbar Menu List */}
                  <div className="flex m-auto items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "text-primary underline underline-offset-4 font-bold"
                                : "text-primary hover:text-primary hover:bg-secondary-variant-2 font-normal hover:font-bold",
                              "px-3 py-2 rounded-md text-lg font-Roboto"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navbar Buttons */}
                  <div className="hidden md:block">
                    <div className="flex items-baseline space-x-4">
                      <button
                        type="button"
                        onClick={navigateToSearch}
                        className="bg-secondary p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                      >
                        <SearchIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={navigateToCart}
                        className="bg-secondary p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                      </button>
                      {isAuthenticated && (
                        <div className="p-3">
                          <UserOptions className="" user={user} />
                        </div>
                      )}
                      {!isAuthenticated && (
                        <button
                          type="button"
                          onClick={navigateToLogin}
                          className="bg-secondary p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                        >
                          <UserCircleIcon className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-secondary inline-flex items-center justify-center p-2 rounded-md text-primary-variant-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden flex flex-col">
                {/* Navbar Menu Items */}
                <div className="mx-auto my-8">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-primary underline underline-offset-4 font-bold"
                          : "text-primary hover:text-primary hover:bg-secondary-variant-2 font-normal hover:font-bold",
                        "block py-4 px-4 text-center rounded-md text-base text-lg font-Roboto"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>

                {/* Navbar Buttons */}
                <div className="my-4">
                  <div className="flex mx-12 mb-8">
                    <button
                      type="button"
                      onClick={navigateToSearch}
                      className="m-auto bg-secondary flex-shrink-0 p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                    >
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="m-auto bg-secondary flex-shrink-0 p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                    >
                      <ShoppingCartIcon
                        onClick={navigateToCart}
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>

                    {isAuthenticated && (
                      <div className="p-3 m-auto">
                        <UserOptions className="" user={user} />
                      </div>
                    )}
                    {!isAuthenticated && (
                      <button
                        type="button"
                        onClick={navigateToLogin}
                        className="m-auto bg-secondary flex-shrink-0 p-3 rounded-full text-primary-variant-2 hover:text-primary hover:bg-secondary-variant-2"
                      >
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
