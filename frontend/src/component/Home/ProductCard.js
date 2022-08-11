import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ products }) => {
  return (
    <div className="px-8 lg:px-16 py-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 font-Roboto">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <div  className="group relative">
            <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </h3>
              </div>
              <p className="text-lg ml-2 flex justify-end">
              ₹{product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
