import { Container } from "@mantine/core";
import React from "react";
import BannerSection from "../components/Banner-section";
import ProductsList from "../components/ProductsListOne";
import ProductsListTwo from "../components/ProductsTwo";
import ProductsListThree from "../components/ProductsListThree";
import ProductsListFour from "../components/ProductsListFour";

function Home() {
  return (
    <Container size={"100%"} px={"140"}>
      <BannerSection />
      <ProductsList/>
      <ProductsListTwo/>
      <ProductsListThree/>
      <ProductsListFour/>
    </Container>
  );
}

export default Home;
