import React from "react";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="md:flex">
      <img
        src={item.images}
        alt={item.name}
        className="mx-auto w-48 h-48 bg-gray-200 rounded-md overflow-hidden"
      />
      <div className="md:ml-8">
        <p className="mt-4 text-base font-black leading-none text-gray-800">
          {item.name}
        </p>
        <p className="mt-2 text-base font-medium leading-none text-gray-800">
          ₹{item.price}
        </p>
        <p
          onClick={() => deleteCartItems(item.product)}
          className="mt-4 text-xs leading-3 underline text-red cursor-pointer"
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
