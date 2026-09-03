import { Box, Button, Container, Flex, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsOne, fetchPriductsTwo, fetchPriductsThree, fetchPriductsFour } from "../api/productsApi";
import ProductCard from "../components/ProductCard";
import { getWishlistFromStorage, toggleWishlistInStorage, addToBasketStorage, getBasketFromStorage } from "../utils/storageHelper";
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

const categoryConfig = {
  arzonNarx: {
    title: "Arzon narxlar",
    fetcher: fetchProductsOne,
    queryKey: ["category_arzonNarx"],
    desc: "Eng hamyonbop va arzon narxlardagi barcha mahsulotlar to'plami",
  },
  elektronika: {
    title: "Elektronika",
    fetcher: fetchPriductsTwo,
    queryKey: ["category_elektronika"],
    desc: "Smartfonlar, gadjetlar, televizorlar va barcha zamonaviy elektronika mahsulotlari",
  },
  muddatliTolov: {
    title: "Muddatli to'lov",
    fetcher: fetchPriductsThree,
    queryKey: ["category_muddatliTolov"],
    desc: "Boshlang'ich to'lovsiz, qulay va muddatli to'lovga olish mumkin bo'lgan tovarlar",
  },
  issiqTexnika: {
    title: "Issiq Texnika",
    fetcher: fetchPriductsFour,
    queryKey: ["category_issiqTexnika"],
    desc: "Isitgichlar, konditsionerlar va barcha iqlim maishiy texnikalari",
  },
};

export default function CategoryPage() {
  const { categoryKey } = useParams();
  const currentConfig = categoryConfig[categoryKey] || categoryConfig.elektronika;

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
    queryKey: currentConfig.queryKey,
    queryFn: currentConfig.fetcher,
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
    <Container size="100%" px={140} mt={25} mb={80}>
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
          {currentConfig.title}
        </Text>
      </Flex>

      <Box
        mb={35}
        p="20px 24px"
        style={{
          background: "#F2F4F7",
          borderRadius: "16px",
        }}
      >
        <Title order={1} size={28} c="#1f2026" fw={700}>
          {currentConfig.title}
        </Title>
        <Text c="#8B8E99" size="14.5px" mt={6}>
          {currentConfig.desc}
        </Text>
        {products && (
          <Text size="13px" fw={600} c="#7000FF" mt={10}>
            Jami {products.length} ta mahsulot topildi
          </Text>
        )}
      </Box>

      {isLoading && (
        <Flex justify="center" align="center" gap={12} py={100}>
          <Loader color="#7000FF" size="md" />
          <Text size="16px" c="#7000FF" fw={500}>
            {currentConfig.title} mahsulotlari yuklanmoqda...
          </Text>
        </Flex>
      )}

      {error && (
        <Box ta="center" py={60}>
          <Text c="red" fw={600} size="16px">
            Mahsulotlarni yuklashda xatolik yuz berdi: {error.message}
          </Text>
        </Box>
      )}

      {!isLoading && !error && products && products.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 5 }} spacing={16}>
          {products.map((item) => {
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
      )}
    </Container>
  );
}
