import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData"

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const navigateToProducts = () => {
    navigate('/products')
  }

  const increaseQuantity = (id, quantity, stock) => {
    const newQnt = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQnt));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQnt = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQnt));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
     navigate('/login?redirect=shipping')
  }
  return (
    <>

<MetaData title="Cart"/>
      {cartItems.length === 0 ? (
        <div className=" h-screen flex flex-col justify-center text-center">
          <div >
            <MdRemoveShoppingCart className="mx-auto text-8xl text-red" />
            <p className="mt-4 text-base font-bold text-4xl leading-none text-gray-800">
              No items in the Cart
            </p>
            <button onClick={navigateToProducts} className="text-xl font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 mt-6 md:w-72 w-60">
              Browse Products
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full font-Roboto">
          <div className="lg:mx-16">
            <div className=" justify-end">
              <h2 className="text-center text-2xl lg:my-8 my-4 lg:text-4xl font-Roboto font-bold product">
                CART
              </h2>
              <div className="md:pl-10 pl-6 pr-10 md:pr-4">
                <div className="md:flex md:justify-between hidden mt-6 py-4 text-gray-600 font-bold text-xl border-t border-gray-200">
                  <p>Product</p>
                  <p className="ml-56">Quantity</p>
                  <p className="mr-16">Subtotal</p>
                </div>
                {cartItems &&
                  cartItems.map((item) => (
                    <div
                      key={item.product}
                      className="md:flex md:justify-between py-8 border-t border-gray-200"
                    >
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteCartItems}
                      />

                      <div className=" flex text-lg mt-8">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                          className="cursor-pointer border border-secondary-variant-2 border-r-0 w-7 h-7 flex items-center justify-center pb-1 "
                        >
                          -
                        </button>
                        <input
                          readOnly
                          className="border border-secondary-variant-2 h-7 text-center w-14 pb-1"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => e.target.value}
                        />
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                          className="cursor-pointer border border-secondary-variant-2 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                        >
                          +
                        </button>
                      </div>
                      <div className="md:w-2 md:mr-16">
                        <p className="font-bold  text-base mt-8 ">
                          <span className="md:hidden">Subtotal:</span>{" "}
                          {`₹${item.price * item.quantity}`}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="md:flex md:justify-end">
                <div className="md:w-1/2 px-6">
                  <div className="flex flex-col md:px-14 mb-16 justify-between">
                    <div>
                      <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                        <p className="text-2xl leading-normal text-gray-800">
                          Total
                        </p>
                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                          {`₹${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}`}
                        </p>
                      </div>
                      <button onClick={checkoutHandler} className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-xl font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-5 w-full">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
