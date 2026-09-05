import {
  Box,
  Button,
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

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapperRef = useRef(null);

  const [userInf, setUserInf] = useState(() => {
    return localStorage.getItem("userInf") === "true";
  });

  useEffect(() => {
    localStorage.setItem("userInf", String(userInf));
    if (userInf) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
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

  const { data: list1 = [] } = useQuery({ queryKey: ["products"], queryFn: fetchProductsOne });
  const { data: list2 = [] } = useQuery({ queryKey: ["elektornika"], queryFn: fetchPriductsTwo });
  const { data: list3 = [] } = useQuery({ queryKey: ["muddatliTolov"], queryFn: fetchPriductsThree });
  const { data: list4 = [] } = useQuery({ queryKey: ["issiqTexnika"], queryFn: fetchPriductsFour });

  const allProducts = [...list1, ...list2, ...list3, ...list4];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setIsSearchOpen(false);
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
    navigate(!localData || localData.length === 0 ? "/signUp" : "/logIn");
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
    <>
      <div className="main-px header-wrap">
        <Flex
          justify="space-between"
          align="center"
          gap={24}
          className="header-row"
          style={{ flexWrap: "wrap" }}
        >
          <Flex align="center" gap={16} style={{ flexShrink: 0 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Uzum Market Logo"
                className="header-logo-img"
                style={{ width: "180px", objectFit: "contain", pointerEvents: "none", userSelect: "none" }}
              />
            </Link>
            <Link to="/category/elektronika" style={{ textDecoration: "none" }}>
              <Flex
                bg="#F0F0FF"
                px={14}
                py={8}
                c="#7000FF"
                align="center"
                gap={6}
                className="header-catalog-btn"
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "background-color 0.2s ease",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e5ff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F0F0FF")}
              >
                <img
                  src={categoryIcon}
                  alt="Katalog"
                  style={{ width: "17px", pointerEvents: "none", userSelect: "none" }}
                />
                <span className="catalog-text">Katalog</span>
              </Flex>
            </Link>
          </Flex>

          <Box
            ref={searchWrapperRef}
            className="header-search-wrap"
            style={{ flex: 1, maxWidth: "560px", position: "relative", minWidth: "180px" }}
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
                  fontSize: "14px",
                  paddingRight: "62px",
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
              w={50}
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
              <IconSearch size={17} />
            </Button>

            {isSearchOpen && (
              <Box className="search-dropdown">
                <Text fw={700} size="16px" c="#1f2026" mb={12}>
                  {searchValue.trim() ? "Qidiruv natijalari" : "Mashhur"}
                </Text>
                <SimpleGrid cols={{ base: 2, sm: 3 }} spacing={10}>
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
                    mt={12}
                    h={36}
                    style={{ fontWeight: 600 }}
                  >
                    Barcha natijalarni ko'rish →
                  </Button>
                )}
              </Box>
            )}
          </Box>

          <Group gap={8} align="center" className="header-actions" style={{ flexShrink: 0 }}>
            {localData ? (
              <Button
                variant="subtle"
                color="gray"
                h={40}
                onClick={handleUserInfChange}
                px={10}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1f2026",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  minWidth: 0,
                }}
              >
                <FaRegUser style={{ marginRight: "6px", fontSize: "16px", flexShrink: 0 }} />
                <span className="btn-text">{trueLocalData.name || "Profil"}</span>
              </Button>
            ) : (
              <Button
                onClick={goToLogIn}
                variant="subtle"
                color="gray"
                h={40}
                px={10}
                style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026", minWidth: 0 }}
              >
                <FaRegUser style={{ marginRight: "6px", fontSize: "16px", flexShrink: 0 }} />
                <span className="btn-text">Kirish</span>
              </Button>
            )}

            <Link to="/wishList" style={{ textDecoration: "none" }}>
              <Button
                variant="subtle"
                color="gray"
                h={40}
                px={10}
                pos="relative"
                style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026", minWidth: 0 }}
              >
                <FaRegHeart style={{ fontSize: "16px", flexShrink: 0 }} />
                <span className="btn-text" style={{ marginLeft: "6px" }}>Saralangan</span>
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </Button>
            </Link>

            <Link to="/basket" style={{ textDecoration: "none" }}>
              <Button
                variant="subtle"
                color="gray"
                h={40}
                px={10}
                pos="relative"
                style={{ fontSize: "14px", fontWeight: 500, color: "#1f2026", minWidth: 0 }}
              >
                <SlBasket style={{ fontSize: "17px", flexShrink: 0 }} />
                <span className="btn-text" style={{ marginLeft: "6px" }}>Savat</span>
                {basketCount > 0 && <span className="badge">{basketCount}</span>}
              </Button>
            </Link>
          </Group>
        </Flex>
      </div>

      {userInf && (
        <div
          className="user-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setUserInf(false);
          }}
        >
          <div className="user-modal-card">
            <Flex justify="space-between" align="center" mb={16}>
              <Flex align="center" gap={10}>
                <div className="user-avatar">
                  {trueLocalData.name ? trueLocalData.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <Text fw={700} size="15px" c="#1f2026" lh="1.2">
                    Foydalanuvchi ma'lumotlari
                  </Text>
                  <Text size="11px" c="#8B8E99">Shaxsiy kabinet</Text>
                </div>
              </Flex>
              <button onClick={() => setUserInf(false)} className="modal-close-btn">
                <FaTimes size={13} />
              </button>
            </Flex>

            <Flex direction="column" gap={10} mb={16}>
              <div className="modal-info-row">
                <Flex align="center" gap={8} mb={4}>
                  <FaUser color="#7000FF" size={13} />
                  <Text size="12px" c="#8B8E99" fw={500}>Ism:</Text>
                </Flex>
                <Text size="15px" fw={700} c="#1f2026" style={{ paddingLeft: "21px" }}>
                  {trueLocalData.name || "Ko'rsatilmagan"}
                </Text>
              </div>

              <div className="modal-info-row">
                <Flex align="center" gap={8} mb={4}>
                  <FaEnvelope color="#7000FF" size={13} />
                  <Text size="12px" c="#8B8E99" fw={500}>Email:</Text>
                </Flex>
                <Text size="14px" fw={600} c="#1f2026" style={{ paddingLeft: "21px" }}>
                  {trueLocalData.email || "Ko'rsatilmagan"}
                </Text>
              </div>

              <div className="modal-info-row">
                <Flex align="center" gap={8} mb={4}>
                  <FaLock color="#7000FF" size={13} />
                  <Text size="12px" c="#8B8E99" fw={500}>Parol:</Text>
                </Flex>
                <Text size="15px" fw={700} c="#1f2026" style={{ paddingLeft: "21px" }}>
                  {trueLocalData.password || "••••••••"}
                </Text>
              </div>
            </Flex>

            <Button
              onClick={handleLogOut}
              fullWidth
              color="red"
              variant="light"
              radius="md"
              h={38}
              leftSection={<FaSignOutAlt size={14} />}
              style={{ fontWeight: 600, fontSize: "13px" }}
            >
              Chiqish (Log Out)
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
