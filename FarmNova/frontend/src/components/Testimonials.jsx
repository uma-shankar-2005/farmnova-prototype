import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Amit Sharma",
    text: "FarmNova delivers the freshest veggies! Highly recommended.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    text: "Great quality and fast delivery. My family loves it!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Singh",
    text: "The organic produce is top-notch. Will subscribe again.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patel",
    text: "Excellent service and fresh products every time.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center justify-center mb-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.3 15,17.1 9.9,14.1 4.8,17.1 6,11.3 1.6,7.3 7.5,6.6" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => (
  <section className="py-10 bg-gray-50">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
      What Our Customers Say
    </h2>
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="!pb-10"
    >
      {testimonials.map((testimonial, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center mx-2 transition-transform duration-300 hover:scale-105">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4 object-cover shadow"
            />
            <StarRating rating={testimonial.rating} />
            <p className="text-center text-lg mb-3">{testimonial.text}</p>
            <span className="font-semibold text-green-700">{testimonial.name}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);



export default Testimonials;
