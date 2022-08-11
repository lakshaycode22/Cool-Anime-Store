import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/MetaData";

const categories = [
  "T-Shirts",
  "Posters",
  "Action Figures",
  "Phone Covers",
  "Stickers",
];

const animes = [
  "One Piece",
  "Naruto",
  "Demon Slayer",
  "Dragon Ball Z",
  "Attack on Titan",
  "Hunter X Hunter",
  "Jujutsu Kaisen",
  "Other",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [anime, setAnime] = useState("");

  const {
    error,
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, anime, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    anime,
    ratings,
    alert,
    error,
  ]);

  //for mobile function
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 640;
  //for mobile end

  if (isMobile) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <MetaData title="PRODUCTS -- CoolAnimeStore" />
            <div>
              <h2 className="text-center text-xl lg:text-3xl font-Roboto font-bold pt-8 pb-4 product">
                PRODUCTS
              </h2>
            </div>
            <div className="md:flex">
              <div className="md:flex-1">
                {products && <ProductCard products={products} />}
              </div>
              <div className="w-full p-8 md:ml-6 font-Roboto bg-secondary-variant-2 text-primary-variant-2">
                <div className="font-semibold text-xl mb-2">Filters</div>
                <p className="font-medium text-lg">Price</p>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={2000}
                />
                <div className="py-2">
                  <p className="font-medium text-lg">Anime</p>
                  <ul>
                    {animes.map((anime) => (
                      <li
                        className="pl-2 text-md"
                        key={anime}
                        onClick={() => setAnime(anime)}
                      >
                        {anime}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-2">
                  <p className="font-medium text-lg">Categories</p>
                  <ul>
                    {categories.map((category) => (
                      <li
                        className="pl-2 text-md"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                

                <fieldset>
                  <p className="font-medium text-lg mt-2">Rated Above</p>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
            </div>

            {resultPerPage < count && (
              <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4 font-Roboto text-md lg:text-xl bg-secondary-variant-2 text-primary-variant-2 font-medium ">
                <Pagination
                  innerClass="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200"
                  activeClass=" cursor-pointer border-t-2 border-primary font-bold pt-4 mx-2 px-2"
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  prevPageText={
                    <div className="flex items-center pt-3 cursor-pointer">
                      <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.1665 4H12.8332"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.1665 4L4.49984 7.33333"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.1665 4.00002L4.49984 0.666687"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-md lg:text-xl ml-3 leading-none ">
                        Previous
                      </p>
                    </div>
                  }
                  nextPageText={
                    <div className="flex items-center pt-3 cursor-pointer">
                      <p className="text-md lg:text-xl leading-none mr-3">
                        Next
                      </p>
                      <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.1665 4H12.8332"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 7.33333L12.8333 4"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 0.666687L12.8333 4.00002"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  }
                  hideFirstLastPages
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <MetaData title="PRODUCTS -- CoolAnimeStore" />
            <div>
              <h2 className="text-center text-xl lg:text-3xl font-Roboto font-bold pt-8 pb-4 product">
                PRODUCTS
              </h2>
            </div>
            <div className="md:flex">
              <div className="w-52 pl-2 md:ml-6 font-Roboto">
                <div className="font-semibold text-xl mb-2">Filters</div>
                <p className="font-medium text-lg">Price</p>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={2000}
                />
                 <div className="py-2">
                  <p className="font-medium text-lg">Anime</p>
                  <ul>
                    {animes.map((anime) => (
                      <li
                        className="pl-2 text-md"
                        key={anime}
                        onClick={() => setAnime(anime)}
                      >
                        {anime}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="py-2">
                  <p className="font-medium text-lg">Categories</p>
                  <ul>
                    {categories.map((category) => (
                      <li
                        className="pl-2 text-md"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
               

                <fieldset>
                  <p className="font-medium text-lg mt-2">Rated Above</p>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
              <div className="md:flex-1">
                {products && <ProductCard products={products} />}
              </div>
            </div>

            {resultPerPage < count && (
              <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4 font-Roboto text-md lg:text-xl text-secondary-variant-2 font-medium">
                <Pagination
                  innerClass="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200"
                  activeClass=" cursor-pointer text-secondary border-t-2 border-secondary font-bold pt-4 mx-2 px-2"
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  prevPageText={
                    <div className="flex items-center pt-3 text-secondary-variant-2 hover:secondary cursor-pointer">
                      <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.1665 4H12.8332"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.1665 4L4.49984 7.33333"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.1665 4.00002L4.49984 0.666687"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-md lg:text-xl ml-3 leading-none ">
                        Previous
                      </p>
                    </div>
                  }
                  nextPageText={
                    <div className="flex items-center pt-3 text-secondary-variant-2 hover:secondary cursor-pointer">
                      <p className="text-md lg:text-xl leading-none mr-3">
                        Next
                      </p>
                      <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.1665 4H12.8332"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 7.33333L12.8333 4"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 0.666687L12.8333 4.00002"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  }
                  hideFirstLastPages
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  }
};

export default Products;
