import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import slide1 from '../../assets/coffee-laptop.jpg';
import slide2 from '../../assets/coffee-laptop.jpeg';
import slide3 from '../../assets/books.jpg';

const images = [
    slide1, slide2, slide3
];

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    return (
        <Box sx={{
            width: "100%",
            height: "400px",
            overflow: "hidden",
        }}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{
                                width: "100vw",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </Box>
    );
};

export default ImageSlider;
