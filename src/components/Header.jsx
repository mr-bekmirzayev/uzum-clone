import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import Logo from "/Logo.png";
import categoryIcon from "../assets/icons/category.png";
import { IconSearch } from "@tabler/icons-react";
import {
  FaRegHeart,
  FaRegUser,
  FaTimes,
  FaSignOutAlt,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductsOne,
  fetchPriductsTwo,
  fetchPriductsThree,
  fetchPriductsFour,
} from "../api/productsApi";
import ProductCard from "./ProductCard";
import {
  getWishlistFromStorage,
  getBasketFromStorage,
  toggleWishlistInStorage,
  addToBasketStorage,
} from "../utils/storageHelper";
import "./Header.css";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapperRef = useRef(null);
  const userModalRef = useRef(null);

  const [userInf, setUserInf] = useState(() => {
    return localStorage.getItem("userInf") === "true";
  });

  useEffect(() => {
    localStorage.setItem("userInf", String(userInf));
  }, [userInf]);

  const handleUserInfChange = () => {
    setUserInf((prev) => !prev);
  };

  const [wishlist, setWishlist] = useState(getWishlistFromStorage());
  const [basket, setBasket] = useState(getBasketFromStorage());

  const navigate = useNavigate();
  const localData = localStorage.getItem("foydalanuvchi");
  const trueLocalData = JSON.parse(localStorage.getItem("foydalanuvchi")) || {};

  const handleLogOut = () => {
    localStorage.removeItem("foydalanuvchi");
    setUserInf(false);
    navigate("/");
  };

  const { data: list1 = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsOne,
  });
  const { data: list2 = [] } = useQuery({
    queryKey: ["elektornika"],
    queryFn: fetchPriductsTwo,
  });
  const { data: list3 = [] } = useQuery({
    queryKey: ["muddatliTolov"],
    queryFn: fetchPriductsThree,
  });
  const { data: list4 = [] } = useQuery({
    queryKey: ["issiqTexnika"],
    queryFn: fetchPriductsFour,
  });

  const allProducts = [...list1, ...list2, ...list3, ...list4];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target)
      ) {
        setUserInf(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      setWishlist(getWishlistFromStorage());
      setBasket(getBasketFromStorage());
    };
    window.addEventListener("storage_wishlist_updated", updateCounts);
    window.addEventListener("storage_basket_updated", updateCounts);
    return () => {
      window.removeEventListener("storage_wishlist_updated", updateCounts);
      window.removeEventListener("storage_basket_updated", updateCounts);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchValue.trim()) {
        setIsSearchOpen(false);
        navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      }
    }
  };

  const handleToggleWishlist = (item) => {
    const updated = toggleWishlistInStorage(item);
    setWishlist(updated);
  };

  const handleAddToBasket = (item) => {
    const updated = addToBasketStorage(item);
    setBasket(updated);
  };

  const goToLogIn = () => {
    if (!localData || localData.length === 0) {
      navigate("/signUp");
    } else {
      navigate("/logIn");
    }
  };

  const displayModalProducts = searchValue.trim()
    ? allProducts
        .filter(
          (item) =>
            item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 6)
    : allProducts.slice(0, 6);

  const wishlistCount = wishlist.length;
  const basketCount = basket.reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <Container size="100%" px={140} className="header-container">
      <Flex justify="space-between" align="center" gap={24} className="header-flex">
        <Flex align="center" gap={20} className="header-logo-section">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Image w={220} src={Logo} alt="Uzum Market Logo" className="header-logo" />
          </Link>
          <Link to="/category/elektronika" style={{ textDecoration: "none" }} className="header-catalog-link">
            <Flex
              bg="#F0F0FF"
              px={16}
              py={9}
              bdrs={8}
              c="#7000FF"
              align="center"
              gap={8}
              className="header-catalog-btn"
              style={{
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14.5px",
                transition: "background-color 0.2s ease",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F0F0FF")}
            >
              <Image w={18} src={categoryIcon} alt="Katalog" />
              <span className="catalog-text">Katalog</span>
            </Flex>
          </Link>
        </Flex>

        <Box
          ref={searchWrapperRef}
          className="header-search-box"
          style={{ flex: 1, maxWidth: "560px", position: "relative" }}
        >
          <TextInput
            radius="md"
            size="md"
            placeholder="Mahsulotlar va turkumlar izlash"
            value={searchValue}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchValue(e.currentTarget.value);
              setIsSearchOpen(true);
            }}
            onKeyDown={handleSearchSubmit}
            styles={{
              input: {
                border: "1.5px solid #e4e7ec",
                fontSize: "14.5px",
                paddingRight: "65px",
              },
            }}
          />
          <Button
            onClick={handleSearchSubmit}
            pos="absolute"
            bg="#F2F4F7"
            c="#1f2026"
            radius="sm"
            h={34}
            w={52}
            right={4}
            top={4}
            p={0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e4e7ec")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F2F4F7")}
          >
            <IconSearch size={18} />
          </Button>

          {isSearchOpen && (
            <Box className="search-dropdown">
              <Text fw={700} size="18px" c="#1f2026" mb={16}>
                {searchValue.trim() ? "Qidiruv natijalari" : "Mashhur"}
              </Text>

              <SimpleGrid cols={3} spacing={12} className="search-grid">
                {displayModalProducts.map((item, index) => {
                  const isLiked = wishlist.some((w) => w.id === item.id);
                  const isInBasket = basket.some((b) => b.id === item.id);
                  return (
                    <ProductCard
                      key={`${item.id}-${index}`}
                      item={item}
                      isLiked={isLiked}
                      isInBasket={isInBasket}
                      onToggleWishlist={handleToggleWishlist}
                      onAddToBasket={handleAddToBasket}
                    />
                  );
                })}
              </SimpleGrid>

              {searchValue.trim() && (
                <Button
                  onClick={handleSearchSubmit}
                  fullWidth
                  variant="light"
                  color="violet"
                  mt={14}
                  h={38}
                  style={{ fontWeight: 600 }}
                >
                  Barcha natijalarni ko'rish →
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Group gap={16} align="center" style={{ position: "relative" }} className="header-actions">
          {localData ? (
            <Box style={{ position: "relative" }} ref={userModalRef}>
              <Button
                variant="subtle"
                color="gray"
                h={40}
                onClick={handleUserInfChange}
                px={12}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: userInf ? "#7000FF" : "#1f2026",
                  backgroundColor: userInf ? "#F0F0FF" : "transparent",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <FaRegUser style={{ marginRight: "8px", fontSize: "16px" }} />
                <span className="btn-text">{trueLocalData.name || "Profil"}</span>
              </Button>

              {userInf && (
                <Box className="user-modal">
                  <Flex justify="space-between" align="center" mb={16}>
                    <Flex align="center" gap={10}>
                      <Box className="user-avatar">
                        {trueLocalData.name ? trueLocalData.name[0].toUpperCase() : "U"}
                      </Box>
                      <Box>
                        <Text fw={700} size="15px" c="#1f2026" lh="1.2">
                          Foydalanuvchi ma'lumotlari
                        </Text>
                        <Text size="11px" c="#8B8E99">
                          Shaxsiy kabinet
                        </Text>
                      </Box>
                    </Flex>
                    <button
                      onClick={() => setUserInf(false)}
                      className="modal-close-btn"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Flex>

                  <Flex direction="column" gap={10} mb={16}>
                    <Box className="modal-info-row">
                      <Flex align="center" gap={8}>
                        <FaUser color="#7000FF" size={13} />
                        <Text size="12px" c="#8B8E99" fw={500}>Ism:</Text>
                      </Flex>
                      <Text size="14px" fw={700} c="#1f2026" mt={2} pl={21}>
                        {trueLocalData.name || "Ko'rsatilmagan"}
                      </Text>
                    </Box>

                    <Box className="modal-info-row">
                      <Flex align="center" gap={8}>
                        <FaEnvelope color="#7000FF" size={13} />
                        <Text size="12px" c="#8B8E99" fw={500}>Email:</Text>
                      </Flex>
                      <Text size="13.5px" fw={600} c="#1f2026" mt={2} pl={21}>
                        {trueLocalData.email || "Ko'rsatilmagan"}
                      </Text>
                    </Box>

                    <Box className="modal-info-row">
                      <Flex align="center" gap={8}>
                        <FaLock color="#7000FF" size={13} />
                        <Text size="12px" c="#8B8E99" fw={500}>Parol:</Text>
                      </Flex>
                      <Text size="14px" fw={700} c="#1f2026" mt={2} pl={21}>
                        {trueLocalData.password || "••••••••"}
                      </Text>
                    </Box>
                  </Flex>

                  <Button
                    onClick={handleLogOut}
                    fullWidth
                    color="red"
                    variant="light"
                    radius="md"
                    h={36}
                    leftSection={<FaSignOutAlt size={14} />}
                    style={{ fontWeight: 600, fontSize: "13px" }}
                  >
                    Chiqish (Log Out)
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Button
              onClick={goToLogIn}
              variant="subtle"
              color="gray"
              h={40}
              px={12}
              style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026" }}
            >
              <FaRegUser style={{ marginRight: "8px", fontSize: "16px" }} />
              <span className="btn-text">Kirish</span>
            </Button>
          )}

          <Link to="/wishList" style={{ textDecoration: "none" }}>
            <Button
              variant="subtle"
              color="gray"
              h={40}
              px={12}
              pos="relative"
              style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026" }}
            >
              <FaRegHeart style={{ marginRight: "8px", fontSize: "16px" }} />
              <span className="btn-text">Saralangan</span>
              {wishlistCount > 0 && (
                <Box className="badge">{wishlistCount}</Box>
              )}
            </Button>
          </Link>

          <Link to="/basket" style={{ textDecoration: "none" }}>
            <Button
              variant="subtle"
              color="gray"
              h={40}
              px={12}
              pos="relative"
              style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026" }}
            >
              <SlBasket style={{ marginRight: "8px", fontSize: "17px" }} />
              <span className="btn-text">Savat</span>
              {basketCount > 0 && (
                <Box className="badge">{basketCount}</Box>
              )}
            </Button>
          </Link>
        </Group>
      </Flex>
    </Container>
  );
}

export default Header;
