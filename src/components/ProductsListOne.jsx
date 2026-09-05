import { Box, Button, Flex, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsOne } from "../api/productsApi";
import ProductCard from "./ProductCard";
import { getWishlistFromStorage, toggleWishlistInStorage, addToBasketStorage, getBasketFromStorage } from "../utils/storageHelper";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function ProductsList() {
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());
  const [basket, setBasket] = useState(getBasketFromStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setWishlist(getWishlistFromStorage());
      setBasket(getBasketFromStorage());
    };
    window.addEventListener("storage_wishlist_updated", handleStorageChange);
    window.addEventListener("storage_basket_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage_wishlist_updated", handleStorageChange);
      window.removeEventListener("storage_basket_updated", handleStorageChange);
    };
  }, []);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsOne,
  });

  const handleToggleWishlist = (item) => {
    const updated = toggleWishlistInStorage(item);
    setWishlist(updated);
  };

  const handleAddToBasket = (item) => {
    const updated = addToBasketStorage(item);
    setBasket(updated);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" gap={10} my={50}>
        <Loader color="#7000FF" size="sm" />
        <Text c="#7000FF" size="15px">Arzon narx tovarlari yuklanmoqda...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Box ta="center" my={30}>
        <Text c="red" fw={600}>Xatolik: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box mb={45}>
      <Flex align="center" justify="space-between" mb={18}>
        <Link
          to="/category/arzonNarx"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#1f2026",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7000FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#1f2026")}
        >
          <Title order={2} size={24} fw={700}>
            Arzon narxlar
          </Title>
          <FaChevronRight size={18} />
        </Link>
      </Flex>

      <SimpleGrid cols={{ base: 2, sm: 2, md: 4, lg: 5 }} spacing={16}>
        {products?.slice(0, 10).map((item) => {
          const isLiked = wishlist.some((w) => w.id === item.id);
          const isInBasket = basket.some((b) => b.id === item.id);
          return (
            <ProductCard
              key={item.id}
              item={item}
              isLiked={isLiked}
              isInBasket={isInBasket}
              onToggleWishlist={handleToggleWishlist}
              onAddToBasket={handleAddToBasket}
            />
          );
        })}
      </SimpleGrid>

      <Flex justify="center" mt={25}>
        <Link to="/category/arzonNarx" style={{ textDecoration: "none" }}>
          <Button
            variant="light"
            color="gray"
            radius="md"
            h={42}
            px={35}
            style={{
              backgroundColor: "#f2f4f7",
              color: "#1f2026",
              fontWeight: 600,
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e4e7ec")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f2f4f7")}
          >
            Barcha "Arzon narxlar" mahsulotlarini ko'rish ({products?.length || 0})
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
