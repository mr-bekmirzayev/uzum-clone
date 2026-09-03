import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import Header from "../components/Header";
import SignUp from "../pages/SignUp";
import Footer from "../components/Footer";
import LogIn from "../pages/LogIn";
import WishList from "../pages/WishList";
import CategoryPage from "../pages/CategoryPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import HeaderTop from "../components/HeaderTop";
import Headerbottom from "../components/Headerbottom";
import { Box } from "@mantine/core";

function AppRouter() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signUp" || location.pathname === "/logIn";
  
  return (
    <>
      {!isAuthPage && (
        <Box
          pb={15}
          pos="sticky"
          top={0}
          bg="rgba(255, 255, 255, 0.95)"
          style={{ zIndex: 100, backdropFilter: "blur(16px)", borderBottom: "1px solid #f2f4f7" }}
        >
          <HeaderTop />
          <Header />
          <Headerbottom />
        </Box>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryKey" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/wishList" element={<WishList />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default AppRouter;
