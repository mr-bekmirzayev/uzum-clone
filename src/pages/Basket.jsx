import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import { useState, useEffect } from "react";
import { getBasketFromStorage, parsePrice, formatPrice } from "../utils/storageHelper";

function Basket() {
  const [basketProducts, setBasketProducts] = useState(getBasketFromStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setBasketProducts(getBasketFromStorage());
    };
    window.addEventListener("storage_basket_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage_basket_updated", handleStorageChange);
    };
  }, []);

  const updateStorageAndState = (newItems) => {
    setBasketProducts(newItems);
    const flat = newItems.flatMap((item) =>
      Array(item.quantity || 1).fill({ ...item, quantity: undefined })
    );
    localStorage.setItem("mahsulot", JSON.stringify(flat));
    window.dispatchEvent(new Event("storage_basket_updated"));
  };

  const increaseQty = (id) => {
    const updated = basketProducts.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateStorageAndState(updated);
  };

  const decreaseQty = (id) => {
    const updated = basketProducts
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateStorageAndState(updated);
  };

  const removeFromBasket = (id) => {
    const updated = basketProducts.filter((item) => item.id !== id);
    updateStorageAndState(updated);
  };

  const textLimitFunc = (text, limit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const totalQuantity = basketProducts.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = basketProducts.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
    0
  );
  const totalOldPrice = basketProducts.reduce(
    (sum, item) => sum + parsePrice(item.oldPrice || item.price) * (item.quantity || 1),
    0
  );
  const discountAmount = totalOldPrice > totalPrice ? totalOldPrice - totalPrice : 0;

  if (basketProducts.length === 0) {
    return (
      <Container size="100%" px={140} mt={30} mb={100}>
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
          <Image radius={20}
            w={120}
            fallbackSrc="https://placehold.co/120x120?text=:("
            alt="Bo'sh savat"
          />
          <Title order={2} size={24} fw={700} c="#1f2026">
            Savatingiz hozircha bo'sh
          </Title>
          <Text c="#8B8E99" size="15px" ta="center" maw={420}>
            Bosh sahifadagi qiziqarli to'plamlardan boshlang yoki qidiruvdan foydalaning
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
      </Container>
    );
  }

  return (
    <Container size="100%" px={140} mt={25} mb={100}>
      <Title order={1} size={26} fw={700} c="#1f2026" mb={24}>
        Savatingiz, <Text span c="#8B8E99" fw={400} size={22}>{totalQuantity} ta mahsulot</Text>
      </Title>

      <Flex gap={30} align="flex-start" direction={{ base: "column", lg: "row" }}>
        <Box style={{ flex: 1, width: "100%" }}>
          <Box
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #f0f0f0",
              padding: "20px",
            }}
          >
            {basketProducts.map((item, index) => {
              const itemPrice = parsePrice(item.price);
              const itemOldPrice = item.oldPrice ? parsePrice(item.oldPrice) : null;
              const qty = item.quantity || 1;

              return (
                <Box key={item.id || index}>
                  <Flex justify="space-between" align="center" gap={16} py={16}>
                    <Image
                      w={100}
                      h={120}
                      fit="cover"
                      radius="md"
                      src={item.images}
                      fallbackSrc="https://placehold.co/100x120?text=Uzum"
                      alt={item.title}
                    />

                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="16px" c="#1f2026">
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text size="13.5px" c="#8B8E99" mt={4}>
                          {textLimitFunc(item.description, 10)}
                        </Text>
                      )}
                      {item.monthlyPrice && (
                        <Text
                          size="11.5px"
                          fw={600}
                          bg="#ffff00"
                          c="#1f2026"
                          p="2px 6px"
                          bdrs={4}
                          w="fit-content"
                          mt={8}
                        >
                          {item.monthlyPrice}
                        </Text>
                      )}
                    </Box>

                    <Flex
                      align="center"
                      gap={8}
                      style={{
                        border: "1px solid #e4e7ec",
                        borderRadius: "8px",
                        padding: "4px 8px",
                        background: "#f9fafb",
                      }}
                    >
                      <button
                        onClick={() => decreaseQty(item.id)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          border: "none",
                          background: "#ffffff",
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        }}
                      >
                        −
                      </button>
                      <Text fw={600} size="15px" w={28} ta="center">
                        {qty}
                      </Text>
                      <button
                        onClick={() => increaseQty(item.id)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          border: "none",
                          background: "#ffffff",
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        }}
                      >
                        +
                      </button>
                    </Flex>

                    <Box ta="right" w={140}>
                      <Text fw={700} size="17px" c="#1f2026">
                        {formatPrice(itemPrice * qty)} so'm
                      </Text>
                      {itemOldPrice && (
                        <Text size="12.5px" c="#8B8E99" td="line-through">
                          {formatPrice(itemOldPrice * qty)} so'm
                        </Text>
                      )}
                    </Box>

                    <button
                      onClick={() => removeFromBasket(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8B8E99",
                        cursor: "pointer",
                        padding: "8px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4d4f")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#8B8E99")}
                      title="O'chirish"
                    >
                      <TbTrash size={20} />
                    </button>
                  </Flex>
                  {index < basketProducts.length - 1 && <hr style={{ border: "0.5px solid #f2f4f7", margin: 0 }} />}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          w={{ base: "100%", lg: 380 }}
          p={24}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #f0f0f0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <Title order={3} size={18} fw={700} mb={16}>
            Sizning buyurtmangiz
          </Title>

          <Flex justify="space-between" mb={10}>
            <Text size="14.5px" c="#8B8E99">Mahsulotlar ({totalQuantity}):</Text>
            <Text size="14.5px" fw={600} c="#1f2026">
              {formatPrice(totalOldPrice > totalPrice ? totalOldPrice : totalPrice)} so'm
            </Text>
          </Flex>

          {discountAmount > 0 && (
            <Flex justify="space-between" mb={10}>
              <Text size="14.5px" c="#00ba34">Tejovingiz:</Text>
              <Text size="14.5px" fw={600} c="#00ba34">
                -{formatPrice(discountAmount)} so'm
              </Text>
            </Flex>
          )}

          <Flex justify="space-between" mb={14}>
            <Text size="14.5px" c="#8B8E99">Yetkazib berish:</Text>
            <Text size="14.5px" fw={600} c="#00ba34">
              Bepul (1 kun)
            </Text>
          </Flex>

          <hr style={{ border: "0.5px solid #f2f4f7", margin: "16px 0" }} />

          <Flex justify="space-between" align="center" mb={20}>
            <Text size="16px" fw={700} c="#1f2026">Jami to'lov:</Text>
            <Text size="22px" fw={800} c="#7000FF">
              {formatPrice(totalPrice)} so'm
            </Text>
          </Flex>

          <Button
            fullWidth
            size="lg"
            radius="md"
            style={{
              backgroundColor: "#7000FF",
              fontWeight: 600,
              fontSize: "16px",
              height: "48px",
            }}
          >
            Rasmiylashtirishga o'tish
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default Basket;
