import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../../Imgs/slider-image-1.jpeg";
import img2 from "../../Imgs/slider-image-2.jpeg";
import img3 from "../../Imgs/slider-image-3.jpeg";
export default function MainSlider() {
  return (
    <>
      <div className="mt-3">
        <div className="row justify-content-center g-0">
          <div className="col-md-9 flex-grow-1">
            <Slider
            autoplay={true}
              arrows={false}
              afterChange={(e) => {
                if(e == 0 ){
                  document.getElementById("static-top").setAttribute("src" , img2)
                  document.getElementById("static-bot").setAttribute("src" , img3)
                }
                else if(e == 1 ){
                  document.getElementById("static-top").setAttribute("src" , img1)
                  document.getElementById("static-bot").setAttribute("src" , img3)
                }
                else{
                  document.getElementById("static-top").setAttribute("src" , img1)
                  document.getElementById("static-bot").setAttribute("src" , img2)
                }
              }}
            >
              <div className="item slick-slider">
                <img className="w-100 owl-img" height={400} src={img1} alt="" />
              </div>
              <div className="item slick-slider">
                <img className="w-100 owl-img" height={400} src={img2} alt="" />
              </div>
              <div className="item slick-slider">
                <img className="w-100 owl-img" height={400} src={img3} alt="" />
              </div>
            </Slider>
          </div>
          <div className="col-md-3 d-none d-lg-block">
            <img id="static-top" className="w-100" height={200} src={img2} alt="" />
            <img id="static-bot" className="w-100" height={200} src={img3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
