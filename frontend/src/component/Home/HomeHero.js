import React, { useState, useEffect } from "react";
import HeroImage1 from "../../assets/HeroImage1.jpg";
import HeroImage2 from "../../assets/HeroImage2.jpg";

const Home = () => {
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
  if (isMobile) {
    return (
      <>
        <div>
          <div>
            <img src={HeroImage2} alt="HEROIMAGE" className="w-full" />
          </div>
          <div className="text-center">
            <div className="text-primary-variant bg-secondary text-5xl font-Marker py-8">
              I Paused My Anime <br />
              To Be Here
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="lg:h-screen">
          <div className="">
            <img
              src={HeroImage1}
              alt="HEROIMAGE"
              className="hidden lg:block lg:h-screen lg:w-screen"
            />
            <div className="sm:mt-60 lg:absolute  lg:bottom-24 lg:left-32 text-center">
              <div className="text-secondary text-7xl font-Marker ">
                I Paused My Anime <br />
                To Be Here
              </div>
              <a href="#featuredProducts" >
                <button className="bg-transparent text-xl font-Roboto font-bold border-2 hover:bg-secondary px-2 py-2 mt-16 hover:text-primary border border-secondary hover:border-transparent rounded">
                  View Products
                </button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
