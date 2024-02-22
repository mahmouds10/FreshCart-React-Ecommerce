import "./Products.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import { useQuery } from "react-query";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { cartContxt } from "../../Contexts/CartContext";
import { ThreeCircles } from "react-loader-spinner";

export default function Product() {
  const { addProductToCart } = useContext(cartContxt);
  useEffect(() => {
    document.title = "Products";
  }, []);
  const [page, setPage] = useState();
  const [addingProduct, setAddingProduct] = useState("");

  async function getAllProducts(queryData) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=36&page=${queryData.queryKey[1]}`
    );
  }

  function createPaginater(numOfPages) {
    const pages = [];
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(
        <li key={i} className="page-item">
          <a
            className="page-link"
            onClick={() => {
              getPage(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  }

  const { isFetching, isLoading, data } = useQuery(
    ["getAllProducts", page],
    getAllProducts
  );

  function getPage(pageNum) {
    setPage(pageNum);
  }

  async function handleAddToCart(id) {
    setAddingProduct(id);
    try {
      await addProductToCart(id);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setAddingProduct("");
    }
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="container">
      <>
        <div className="pb-5 pt-3 mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
          {data?.data.data.map((product) => {
            return (
              <div key={product._id} className="col">
                <div className="product pb-2 pt-0 border-none  h-100 bg-transparent">
                  <div className="card-body h-100 d-flex flex-column justify-content-between">
                    <Link
                      className="flex-grow-1 d-flex flex-column"
                      to={"/ProductsDetails/" + product.id}
                    >
                      <div className="card-img">
                        <img
                          src={product.imageCover}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="card-text flex-grow-1 d-flex flex-column flex-grow-1 justify-content-between">
                        <h6 className="text-main">{product.category.name}</h6>
                        <h5>
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h5>
                        <div className="d-flex align-content-center justify-content-between">
                          {product.priceAfterDiscount ? (
                            <>
                              <div>
                                <span className="befor-price">
                                  {product.price}
                                </span>
                                <span>
                                  {" " + product.priceAfterDiscount} EGP
                                </span>
                              </div>
                            </>
                          ) : (
                            <span>{product.price} EGP</span>
                          )}
                          <span>
                            <i className="fa-solid fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="btn bg-main text-white d-block w-100 mt-3 d-flex justify-content-center"
                    >
                      {addingProduct === product.id ? (
                        <ThreeCircles color="#fff" height={20} width={20} />
                      ) : (
                        <>
                          <i className="fa-solid fa-cart-shopping pe-2"></i> Add
                          to cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination col-md-12 d-flex justify-content-center mb-2">
          <div aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => {
                    getPage(page - 1);
                  }}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {createPaginater(data?.data.metadata.numberOfPages)}
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => {
                    getPage(page + 1);
                  }}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}
