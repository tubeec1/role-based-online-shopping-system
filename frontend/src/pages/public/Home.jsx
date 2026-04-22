import React from "react";
import HomeHero from "../../components/ui/HomePage/HomeHero";
import HomeCategories from "../../components/ui/HomePage/HomeCategories";
import HomeFeaturedProducts from "../../components/ui/HomePage/HomeFeaturedProducts";
import HomeNewArrivals from "../../components/ui/HomePage/HomeNewArrivals";
import HomePromotion from "../../components/ui/HomePage/HomePromotion";
import HomeWhyChooseUs from "../../components/ui/HomePage/HomeWhyChooseUs";
import HomeTestimonial from "../../components/ui/HomePage/HomeTestimonial";
import HomeNewsLetter from "../../components/ui/HomePage/HomeNewsLetter";

const Home = () => {
  return (
    <div>
      <HomeHero />
      <HomeCategories />
      <HomeFeaturedProducts />
      <HomeNewArrivals />
      <HomePromotion />
      <HomeWhyChooseUs />
      <HomeTestimonial />
      <HomeNewsLetter />
    </div>
  );
};

export default Home;
