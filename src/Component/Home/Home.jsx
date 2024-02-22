import "./Home.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import { useQuery } from "react-query";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

import { cartContxt } from "../../Contexts/CartContext";

import Product from "../Products/Products";

export default function Home() {
  const { addProductToCart } = useContext(cartContxt);
  useEffect(() => {
    document.title = "Fresh Cart";
  }, []);
  const [page, setPage] = useState();
  const [adding, setAdding] = useState(false);
  async function getAllProducts(queryData) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=36&page=${queryData.queryKey[1]}`
    );
  }

  const { isLoading, data } = useQuery(
    ["getAllProducts", page],
    getAllProducts
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <MainSlider />
          <CategorySlider />
          <Product />
        </div>
      )}
    </>
  );
}
