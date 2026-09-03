import { Container, Title, SimpleGrid, Box, Text, Flex, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getWishlistFromStorage, toggleWishlistInStorage, addToBasketStorage, getBasketFromStorage } from "../utils/storageHelper";
import { useState, useEffect } from "react";

function WishList() {
  const [wishList, setWishList] = useState(getWishlistFromStorage());
  const [basket, setBasket] = useState(getBasketFromStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setWishList(getWishlistFromStorage());
      setBasket(getBasketFromStorage());
    };
    window.addEventListener("storage_wishlist_updated", handleStorageChange);
    window.addEventListener("storage_basket_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage_wishlist_updated", handleStorageChange);
      window.removeEventListener("storage_basket_updated", handleStorageChange);
    };
  }, []);

  const handleToggleWishlist = (item) => {
    const updated = toggleWishlistInStorage(item);
    setWishList(updated);
  };

  const handleAddToBasket = (item) => {
    const updated = addToBasketStorage(item);
    setBasket(updated);
  };

  return (
    <Container size="100%" px={140} mt={25} mb={100}>
      <Title order={1} size={26} fw={700} c="#1f2026" mb={24}>
        Istaklarim <Text span c="#8B8E99" fw={400} size={22}>({wishList.length} ta)</Text>
      </Title>

      {wishList.length === 0 ? (
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
          <Text fz={64}>💜</Text>
          <Title order={2} size={22} fw={700} c="#1f2026">
            Sizga yoqqan mahsulotlar hozircha yo'q
          </Title>
          <Text c="#8B8E99" size="15px" ta="center" maw={420}>
            Mahsulotdagi yurakcha belgisini bosing. Siz yoqtirgan barcha tovarlar shu yerda saqlanadi
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
              Bosh sahifaga o'tish
            </Button>
          </Link>
        </Flex>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 5 }} spacing={16}>
          {wishList.map((item) => {
            const isLiked = wishList.some((w) => w.id === item.id);
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

export default WishList;