import { Box, Button, Container, Flex, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsOne, fetchPriductsTwo, fetchPriductsThree, fetchPriductsFour } from "../api/productsApi";
import ProductCard from "../components/ProductCard";
import { getWishlistFromStorage, toggleWishlistInStorage, addToBasketStorage, getBasketFromStorage } from "../utils/storageHelper";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaSearch } from "react-icons/fa";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

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

  const { data: list1 = [] } = useQuery({ queryKey: ["products"], queryFn: fetchProductsOne });
  const { data: list2 = [] } = useQuery({ queryKey: ["elektornika"], queryFn: fetchPriductsTwo });
  const { data: list3 = [] } = useQuery({ queryKey: ["muddatliTolov"], queryFn: fetchPriductsThree });
  const { data: list4 = [] } = useQuery({ queryKey: ["issiqTexnika"], queryFn: fetchPriductsFour });

  const allProducts = [...list1, ...list2, ...list3, ...list4];

  const filteredProducts = allProducts.filter((item) => {
    if (!query.trim()) return true;
    const titleMatch = item.title?.toLowerCase().includes(query.toLowerCase());
    const descMatch = item.description?.toLowerCase().includes(query.toLowerCase());
    return titleMatch || descMatch;
  });

  const handleToggleWishlist = (item) => {
    const updated = toggleWishlistInStorage(item);
    setWishlist(updated);
  };

  const handleAddToBasket = (item) => {
    const updated = addToBasketStorage(item);
    setBasket(updated);
  };

  return (
    <Container size="100%" px={140} mt={25} mb={100}>
      <Flex align="center" gap={8} mb={20}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#7000FF",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: 500,
          }}
        >
          <FaChevronLeft size={12} /> Bosh sahifa
        </Link>
        <Text c="#8B8E99" size="14px">/</Text>
        <Text c="#1f2026" size="14px" fw={600}>
          Qidiruv natijalari
        </Text>
      </Flex>

      <Box mb={30}>
        <Title order={1} size={26} fw={700} c="#1f2026">
          «{query}» so'rovi bo'yicha natijalar
        </Title>
        <Text c="#8B8E99" size="14.5px" mt={6}>
          Topildi: {filteredProducts.length} ta mahsulot
        </Text>
      </Box>

      {filteredProducts.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={80}
          gap={16}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #f0f0f0",
          }}
        >
          <FaSearch size={48} color="#8B8E99" />
          <Title order={2} size={22} fw={700} c="#1f2026">
            Afsuski, hech narsa topilmadi
          </Title>
          <Text c="#8B8E99" size="15px" ta="center" maw={420}>
            So'rovni to'g'ri yozganingizga ishonch hosil qiling yoki boshqa kalit so'zlardan foydalanib ko'ring
          </Text>
          <Link to="/" style={{ textDecoration: "none", marginTop: "10px" }}>
            <Button
              size="md"
              radius="md"
              style={{
                backgroundColor: "#7000FF",
                fontWeight: 600,
                padding: "0 28px",
              }}
            >
              Bosh sahifaga qaytish
            </Button>
          </Link>
        </Flex>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 5 }} spacing={16}>
          {filteredProducts.map((item, index) => {
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
      )}
    </Container>
  );
}
