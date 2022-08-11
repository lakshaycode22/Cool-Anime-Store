import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  MdAccountTree,
  MdDescription,
  MdStorage,
  MdSpellcheck,
  MdAttachMoney,
} from "react-icons/md";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/porductConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [anime, setAnime] = useState("");

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
    "Other"
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("anime", anime);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="flex">
        <SideBar />

        <div className="login-bg flex-1">
          <div className="h-full w-full py-16 px-4 pb-52">
            <div className="flex h-full items-center justify-center font-Roboto">
              <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                <div className="newProductContainer">
                  <form
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                  >
                    <h1 className="text-2xl font-extrabold leading-6 text-gray-800">
                      Create Product
                    </h1>

                    <div className="relative flex items-center justify-center">
                      <MdSpellcheck className="mr-2 text-2xl mt-1" />
                      <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="relative flex items-center justify-center">
                      <MdAttachMoney className="mr-2 text-2xl mt-1" />
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>

                    <div className="relative flex items-center justify-center">
                      <MdDescription className="mr-2 text-2xl mt-1" />
                      <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      ></textarea>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <MdAccountTree className="mr-2 text-2xl mt-1" />
                      <select
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <MdAccountTree className="mr-2 text-2xl mt-1" />
                      <select
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                        onChange={(e) => setAnime(e.target.value)}
                      >
                        <option value="">Choose Anime</option>
                        {animes.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <MdStorage className="mr-2 text-2xl mt-1" />
                      <input
                        className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>

                    <div className="relative flex items-center justify-center">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                        className="mb-2 bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                      />
                    </div>

                    <div className="flex">
                      {imagesPreview.map((image, index) => (
                        <img className="h-20 mr-2" key={index} src={image} alt="Product Preview" />
                      ))}
                    </div>

                    <button
                      className="mt-8 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-variant-2 text-sm font-semibold leading-none text-white focus:outline-none bg-secondary-variant-2 border rounded hover:bg-secondary py-4 w-full"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
