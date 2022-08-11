import React from "react";
import { StepLabel, Typography, Step, Stepper } from "@material-ui/core";
import { FaBlackTie, FaShippingFast } from "react-icons/fa";
import { MdAccountBalanceWallet, MdLibraryAddCheck } from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      lable: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast />,
    },
    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      lable: <Typography>Payment</Typography>,
      icon: <MdAccountBalanceWallet />,
    },
  ];

  const stepStyles = {
    "background-color": "#1b1b1b",
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-secondary">
      <Stepper alternateLable activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              className={classNames(
                activeStep >= index ? "text-green" : "text-red",
                "flex flex-col text-lg md:text-xl"
              )}
              icon={item.icon}
            >
              <span className={classNames(
                activeStep >= index ? "text-green" : "text-red"
              )}>{item.lable}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
