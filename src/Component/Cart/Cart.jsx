import { cartContxt } from "../../Contexts/CartContext";
import "./Cart.css";
import noItems from "../../Imgs/empty-cart.svg";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Cart() {
  const {
    getLoggedUserData,
    allProducts,
    totalCartPrice,
    numOfCartItems,
    gettingCart,
    updateCount,
    removeCartItem,
    clearCart,
  } = useContext(cartContxt);

  useEffect(() => {
    document.title = "Cart";
  }, []);
  const [deleteLoadingStates, setDeleteLoadingStates] = useState({});
  const [plusLoadingStates, setPlusLoadingStates] = useState({});
  const [minusLoadingStates, setMinusLoadingStates] = useState({});
  const [clearCartLoading, setClearCartLoading] = useState(false);

  const toggleDeleteLoadingState = (itemId) => {
    setDeleteLoadingStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };
  const togglePlusLoadingState = (itemId) => {
    setPlusLoadingStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };

  const toggleMinusLoadingState = (itemId) => {
    setMinusLoadingStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };

  const handleRemoveItem = async (itemId) => {
    toggleDeleteLoadingState(itemId);
    try {
      await removeCartItem(itemId);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      toggleDeleteLoadingState(itemId);
    }
  };

  const handleClearCart = async () => {
    setClearCartLoading(true);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart().then(() => {
            toast.success("Your cart has been cleared");
          });
        }
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setClearCartLoading(false);
    }
  };

  const handleUpdateCount = async (itemId, count, cueentCount) => {
    if (count > cueentCount) {
      togglePlusLoadingState(itemId);
    } else {
      toggleMinusLoadingState(itemId);
    }
    try {
      await updateCount(itemId, count);
    } catch (error) {
      console.error("Error updating count:", error);
    } finally {
      if (count > cueentCount) {
        togglePlusLoadingState(itemId);
      } else {
        toggleMinusLoadingState(itemId);
      }
    }
  };

  const loading = Object.values(deleteLoadingStates).some(Boolean);

  return gettingCart ? (
    <LoadingScreen />
  ) : (
    <>
      {allProducts?.length === 0  || allProducts === null? (
        <div
          style={{ backgroundImage: `url(${noItems})` }}
          className="cart-page d-flex justify-content-center align-items-end "
        ></div>
      ) : (
        <>
          <div className="container py-4">
            <div className="col-md-12  d-flex justify-content-between">
              <h2>Shop Cart</h2>
              <button
                onClick={() => {
                  handleClearCart();
                }}
                className="btn border btn-danger"
              >
                {clearCartLoading ? (
                  <ThreeCircles />
                ) : (
                  <>
                    <i className="fa-solid fa-trash"></i> Clear The Cart
                  </>
                )}
              </button>
            </div>

            {allProducts?.map((product, idx) => {
              const isLoading =
                deleteLoadingStates[product.product._id] || false;
              const plusLoading =
                plusLoadingStates[product.product._id] || false;
              const minusLoading =
                minusLoadingStates[product.product._id] || false;
              return (
                <div
                  key={idx}
                  className="w-100 d-flex justify-content-between align-items-center mb-1 py-1 px-2 cart-item"
                >
                  <div className="col-2 col-md-1">
                    <img
                      src={product?.product?.imageCover}
                      alt={product?.product.title}
                      className="w-100"
                    />
                  </div>
                  <div className="col-6 d-flex flex-column h-100 justify-content-between align-items-md-start align-items-center text-center text-md-start">
                    <Link to={"/ProductsDetails/" + product.product.id}>
                      <h5>{product?.product.title}</h5>
                    </Link>
                    <h6>Price: {product.price} EGP</h6>
                    <button
                      style={{ width: "146.562px", height: "37.6px" }}
                      onClick={() => handleRemoveItem(product.product._id)}
                      className={`btn btn-danger d-flex align-items-center + ${
                        isLoading
                          ? " justify-content-center "
                          : " justify-content-between "
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ThreeCircles
                          width={"20px"}
                          height={"20px"}
                          color="#fff"
                        />
                      ) : (
                        <>
                          <i className="fa-solid fa-trash"></i> Remove Item
                        </>
                      )}
                    </button>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div>
                      <button
                        disabled={minusLoading}
                        style={{ width: "26px", height: "26px" }}
                        onClick={() =>
                          handleUpdateCount(
                            product.product._id,
                            product.count + 1,
                            product.count
                          )
                        }
                        className="border-0 bg-success text-white rounded"
                      >
                        {plusLoading ? (
                          <ThreeCircles
                            color="#fff"
                            width={"100%"}
                            height={"100%"}
                          />
                        ) : (
                          <i className="fa-solid fa-plus"></i>
                        )}
                      </button>
                      <span className="h5 mx-3">{product.count}</span>
                      <button
                        disabled={product.count === 0 || plusLoading}
                        style={{ width: "26px", height: "26px" }}
                        onClick={() =>
                          handleUpdateCount(
                            product.product._id,
                            product.count - 1,
                            product.count
                          )
                        }
                        className="border-0 bg-danger text-white rounded"
                      >
                        {minusLoading ? (
                          <ThreeCircles
                            color="#fff"
                            width={"100%"}
                            height={"100%"}
                          />
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-md-12 d-flex justify-content-between align-items-center mt-4">
              <h5 className="h5 text-main">
                Total cart price: {totalCartPrice} EGP
              </h5>
              <Link to={"/checkout"} className="btn bg-main text-white">
                Confirm Payment
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
