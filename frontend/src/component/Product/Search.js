import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <div className="h-screen search-bg">
       <MetaData title="SEARCH -- CoolAnimeStore"/>
      <div className="lg:w-96 w-72 mx-auto py-6 ">
        <div className="lg:mt-60 mt-28 ">
          <p className="text-xl font-semibold leading-none text-primary ml-1">
            <span className="bg-secondary p-1 rounded">Search Products</span>
          </p>
          <div className="border border-gray-300 w-full rounded outline-none bg-white relative mt-4">
            <form
              className="relative px-5 py-[12px] flex items-center justify-between w-full shadow-md"
              onSubmit={searchSubmitHandler}
            >
              <input
                className="text-left font-medium text-secondary text-xl text-sm"
                type="text"
                placeholder="One Piece..."
                onChange={(e) => setKeyword(e.target.value)}
              ></input>
              <button className="rounded-full" type="submit">
                <SearchIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
