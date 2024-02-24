import axios from "axios";
import toast from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authContext } from "./Authentication";

export const cartContxt = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [gettingCart, setGettingCart] = useState(false);
  const [updating, setupdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [cartId, setCartId] = useState("");
  const [cartOwner, setCartOwner] = useState("");
  const { token } = useContext(authContext);

  async function addProductToCart(productID) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        { productId: productID },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      if (data?.status === "success") {
        toast.success(data.message, {
          style: { maxWidth: "none" },
        });
        getLoggedUserData();
      }

      return data;
    } catch (err) {
      toast.error("Product dos'nt adddd");
    }
  }

  async function getLoggedUserData() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        localStorage.setItem("userId" , res.data.data.cartOwner);
        setGettingCart(false);
      })
      .catch((err) => {});
  }

  async function updateCount(productId, newCount) {
    setupdating(true);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setupdating(false);
      })
      .catch((err) => {});
  }

  async function clearCart() {
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token: localStorage.getItem("tkn") },
    });
    setAllProducts([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
  }

  async function removeCartItem(id) {
    setDeleting(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        toast.success("Removed Successfully");
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setDeleting(false);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getLoggedUserData();
  }, [token]);

  return (
    <cartContxt.Provider
      value={{
        setAllProducts,
        setNumOfCartItems,
        setTotalCartPrice,
        addProductToCart,
        getLoggedUserData,
        updateCount,
        numOfCartItems,
        totalCartPrice,
        gettingCart,
        allProducts,
        updating,
        removeCartItem,
        deleting,
        clearCart,
        cartId,
        cartOwner,
      }}
    >
      {children}
    </cartContxt.Provider>
  );
}
