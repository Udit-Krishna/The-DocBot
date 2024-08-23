import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import "./slider.css";

// import required modules
import { EffectCreative } from "swiper/modules";

import "./slider.css";

// import required modules
import { EffectCards, Autoplay } from "swiper/modules";

function Slider() {
  return (
    <div>
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
            opacity: 0,
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className="mySwiper3"
      >
        <SwiperSlide>
          <div className="m-10">
            "Doc Bot is your personal health assistant! It provides quick,
            reliable medical advice through its smart chatbot and can even
            analyze brain scans to detect potential tumors. It’s like having a
            doctor and a medical lab at your fingertips!"
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-10">
            "Doc Bot’s medical chatbot is your go-to for quick and trustworthy
            health advice. It’s like having a virtual doctor available 24/7 to
            help you understand your symptoms, answer your health questions, and
            provide guidance on what to do next. No appointments, just instant
            support whenever you need it."
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-10">
            "Doc Bot’s brain tumor image analysis feature is like having a
            cutting-edge radiologist at your service. It uses advanced AI to
            scan brain images and detect potential tumors with precision,
            providing you with early insights that could be life-saving. Trust
            in technology that looks out for your health, every step of the
            way."
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="m-10">
            "With Doc Bot, you're not just receiving medical insights; you're
            gaining a powerful tool for proactive health management. Harness
            cutting-edge technology to stay informed, take control, and gain
            peace of mind, knowing you're always a step ahead in safeguarding
            your well-being."
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
