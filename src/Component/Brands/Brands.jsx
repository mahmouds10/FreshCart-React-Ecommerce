import axios from "axios";
import "./Brands.css";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Brands() {
  const [gettingBrands, setGettingBrands] = useState(false);
  const [brands, setBrands] = useState([]);
  async function getAllBrands() {
    setGettingBrands(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    ).then().catch();
    setGettingBrands(false);
    setBrands(data.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {gettingBrands ? (
        <LoadingScreen />
      ) : (
        <div className="container py-4">
          <h1 className="text-center text-main">Our Partners</h1>
          <div className="row">
            {brands?.map((brand , idx) => {
              return (
                <div key={idx} className="brand col-md-3 p-2">
                  <div className="inner-brand w-100 h-100">
                    <img
                      className="w-100 h-100"
                      src={brand.image}
                      alt={brand.name}
                      style={{borderRadius:"20px"}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
