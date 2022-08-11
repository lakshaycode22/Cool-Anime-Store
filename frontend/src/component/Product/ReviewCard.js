import React from "react";
import user from "../../assets/Profile.png"

import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const ReviewCard = ({review}) => {
  const totalStars = 5;
  const activeStars = review.rating;

  return (
    <div className="py-4 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex justify-start items-center flex-row space-x-2.5">
              <div>
                <img
                  src={user}
                  alt="girl-avatar"
                  className="w-12 h-12"
                />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium leading-none text-gray-800">
                  {review.name}
                </p>
              </div>
            </div>

            <div className=" mt-2 md:mt-0">
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
          </div>

          <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 mt-6">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};
