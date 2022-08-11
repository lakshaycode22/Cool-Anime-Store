import { React, useEffect } from "react";
import HomeHero from "./HomeHero";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";

const Home = () => {

  const alert = useAlert();
  const {error, loading, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert ]);

  return (
    <>
      {loading ? (
       <Loader/>
      ) : (
        <>
          <MetaData title="CoolAnimeStore" />
          <HomeHero />
          <div>
            <h2 className="text-center text-2xl lg:text-4xl bg-secondary-variant-2 text-primary-variant font-Roboto font-bold py-8 product">
              FEATURED PRODUCTS
            </h2>
            <div className="bg-secondary-variant-2 text-primary-variant-2 " id="featuredProducts">
              {products && <ProductCard products={products} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
