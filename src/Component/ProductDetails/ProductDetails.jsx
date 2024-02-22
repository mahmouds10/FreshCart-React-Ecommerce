import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { cartContxt } from "../../Contexts/CartContext";
import { ThreeCircles } from "react-loader-spinner";

export default function ProductDetails() {
  const [adding, setAdding] = useState(false);

  const { addProductToCart } = useContext(cartContxt);
  const params = useParams();
  let [productId, setProductId] = useState("");
  async function getProductDetailsById(queryData) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${queryData.queryKey[1]}`
    );
  }
  let { data, isLoading } = useQuery(
    ["productDetails", productId],
    getProductDetailsById
  );
  function getClickedImage(event) {
    document
      .getElementById("main-image")
      .setAttribute("src", event.target.getAttribute("src"));
    const productImages = Array.from(
      document.querySelectorAll('img[alt="product image"]')
    );

    productImages.map((image) => {
      image.classList.remove("clicked-img");
    });
    event.target.classList.add("clicked-img");
  }

  useEffect(() => {
    document.title = "Product Details";
    setProductId(params.id);
  }, []);

  async function addProduct(id) {
    setAdding(true);
    await addProductToCart(id);

    setAdding(false);
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="row justify-content-center align-items-center flex-md-row flex-column-reverse">
              <div className="col-md-3 my-2 mx-md-auto d-flex flex-wrap flex-md-nowrap flex-md-column-reverse align-items-center justify-content-center ">
                <div className="row justify-content-center">
                  {data?.data.data.images?.map((image, idx) => {
                    return (
                      <div key={idx} className="col-2 col-md-12">
                        <img
                          onClick={getClickedImage}
                          src={image}
                          className=" w-75 m-1"
                          alt="product image"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-9">
                <img
                  id="main-image"
                  src={data?.data.data.imageCover}
                  className="w-100"
                  alt="Main Image"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h2>{data?.data.data.title}</h2>
            <p className="text-muted">{data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category?.name}</h6>
            <div className="d-flex justify-content-between">
              <span>{data?.data.data.price} EGP</span>
              <span>
                <i className="fa-solid fa-star rating-color"></i>
                {data?.data.data.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => {
                addProduct(data?.data.data.id);
              }}
              className={
                "btn d-flex justify-content-center align-items-center bg-main text-white d-block w-100 mt-3"
              }
              disabled={adding ? true : false}
            >
              {adding ? (
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <>
                  <i className="fa-solid fa-cart-shopping pe-2"></i> Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
