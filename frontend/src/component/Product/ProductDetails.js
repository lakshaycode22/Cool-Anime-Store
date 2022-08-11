import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { ReviewCard } from "./ReviewCard";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@material-ui/lab";

//For rating Stars
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { NEW_REVIEW_RESET } from "../../constants/porductConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };
  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const numOfReviews = product.numOfReviews;
  const totalStars = 5;
  const activeStars = Math.round(product.ratings);
  const reviews = product.reviews;

  const addToCartHandler = () => {
    if(quantity < 1){
      alert.error("Please increase product quantity")
      return;
    }
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 font-Roboto">
          <MetaData title={`${product.name} -- CoolAnimeStore`} />
          <div className="flex lg:flex-row flex-col gap-8">
            {/* <!-- Preview Images Div For larger Screen--> */}
            <div className="lg:w-2/5">
              <div className="lg:my-8">
                <div className=" mx-auto rounded-md md:w-96 md:h-96  w-72 h-full">
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="w-full overflow-hidden"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
              </div>
            </div>

            {/* <!-- Description Div --> */}

            <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
              <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 mt-4">
                {product.name}
              </h2>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">
                  <Box>
                    {[...new Array(totalStars)].map((arr, index) => {
                      return index < activeStars ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon />
                      );
                    })}
                  </Box>
                </div>
                <p className="font-normal text-base leading-4">
                  {numOfReviews} reviews
                </p>
              </div>

              <p className=" font-normal text-lg leading-6 text-secondary-variant-2 mt-7">
                {product.description}
              </p>
              <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
                ₹ {product.price}
              </p>
              <p className="font-semibold text-md  lg:leading-6 leading-5 mt-6">
                Status:{" "}
                {product.stock > 0 ? (
                  <span className="text-green">In Stock </span>
                ) : (
                  <span className="text-red">Out of Stock </span>
                )}
              </p>

              <div className="lg:mt-11 mt-10">
                <div className="flex flex-row justify-between">
                  <p className=" font-medium text-lg leading-4 text-secondary-variant-2">
                    Select quantity
                  </p>
                  <div className="flex">
                    <span
                      onClick={minusQuantity}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary cursor-pointer border border-secondary-variant-2 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                    >
                      -
                    </span>
                    <input
                      readOnly
                      className="border border-secondary-variant-2 h-full text-center w-14 pb-1"
                      type="number"
                      value={quantity}
                      onChange={(e) => e.target.value}
                    />
                    <span
                      onClick={addQuantity}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary cursor-pointer border border-secondary-variant-2 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={product.stock < 1}
                onClick={addToCartHandler}
                className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-secondary hover:bg-secondary-variant-2 font-medium text-base leading-4 text-white bg-secondary w-full py-5 lg:mt-6 mt-3"
              >
                Add to Cart
              </button>
              <button
                onClick={submitReviewToggle}
                className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-secondary hover:bg-secondary-variant-2 font-medium text-base leading-4 text-white bg-secondary w-full py-5 lg:mt-6 mt-3"
              >
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="flex flex-col">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className=" mt-8"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <div>
            <h2 className="text-center text-2xl lg:text-3xl lg:mt-8 text-secondary-variant font-Roboto font-bold py-8">
              REVIEWS
            </h2>
            <div>
              {numOfReviews !== 0 ? (
                <div>
                  {reviews &&
                    reviews.map((review) => <ReviewCard review={review} />)}
                </div>
              ) : (
                <div>
                  <p className="text-center font-Roboto text-lg">
                    No reviews for this product yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
