import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "react-query";
export default function CategorySlider() {


  const {data , isLoading } = useQuery("Category Slider" , getAllCategorySlides)
  async function getAllCategorySlides() {
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

  }
  const sliderSetting = {
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay : true,
    dots: true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    dotsClass: "slick-dots",
  };
  return (
    <div className="my-3">
      <h3>Shop popular categories </h3>
      <div className="row">
        <Slider {...sliderSetting}>
          {data?.data.data.map((category) => {
            return (
              <div key={category._id} className="slick-slider">
                <img
                  className="w-100"
                  src={category.image}
                  height={200}
                  alt=""
                />
                <h5 className="text-black">{category.name}</h5>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
