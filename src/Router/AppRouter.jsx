import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import Header from "../components/Header";
import SignUp from "../pages/SignUp";
import Footer from "../components/Footer";
import LogIn from "../pages/LogIn";
import WishList from "../pages/WishList";
import HeaderTop from "../components/HeaderTop";
import Headerbottom from "../components/Headerbottom";
import { Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";

function AppRouter() {
  const location = useLocation();
  return (
    <>
      <Box
        mt={15}
        pb={35}
        pos={"sticky"}
        top={2}
        bg={"#ffffff5d"}
        style={{ zIndex: "100", backdropFilter: "blur(22px)" }}
      >
        {location.pathname !== "/signUp" && location.pathname !== "/logIn" && (
          <>
            <HeaderTop />
            <Header />
            <Headerbottom />
          </>
        )}
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/wishList" element={<WishList />} />
      </Routes>
      {location.pathname !== "/signUp" && location.pathname !== "/logIn" && (
        <Footer />
      )}
    </>
  );
}

export default AppRouter;
