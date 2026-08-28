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
import { TiStarFullOutline } from "react-icons/ti";
import { TbTrash } from "react-icons/tb";
import { useState } from "react";

function Basket() {
  const [basketProducts, setBasketProducts] = useState(() => {
    const saved = localStorage.getItem("mahsulot");
    if (!saved) return [];
    // Eski format (oddiy array) → quantity bilan formatlash
    const parsed = JSON.parse(saved);
    const withQty = {};
    parsed.forEach((item) => {
      if (withQty[item.id]) {
        withQty[item.id].quantity += 1;
      } else {
        withQty[item.id] = { ...item, quantity: 1 };
      }
    });
    return Object.values(withQty);
  });

  const updateStorage = (items) => {
    // localStorage ga qaytarish: quantity bo'yicha takrorlash
    const flat = items.flatMap((item) =>
      Array(item.quantity).fill({ ...item, quantity: undefined })
    );
    localStorage.setItem("mahsulot", JSON.stringify(flat));
  };

  const increaseQty = (id) => {
    setBasketProducts((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateStorage(updated);
      return updated;
    });
  };

  const decreaseQty = (id) => {
    setBasketProducts((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      updateStorage(updated);
      return updated;
    });
  };

  const removeFromBasket = (id) => {
    setBasketProducts((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      updateStorage(updated);
      return updated;
    });
  };

  const textLimitFunc = (text, limit) => {
    if (!text) return "";
    const harf = text.split(" ");
    if (harf.length > limit) {
      return harf.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const totalPrice = basketProducts.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  if (basketProducts.length === 0) {
    return (
      <Container size={"100%"} px={"140"}>
        <Title
          w={"fit-content"}
          p={"5px 20px"}
          pb={10}
          bdrs={"50px"}
          bg={"aliceblue"}
          mb={35}
          order={2}
          fw={500}
        >
          Sizning savatingiz
        </Title>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          mt={80}
          gap={15}
        >
          <Text fz={60}>🛒</Text>
          <Title order={3} c={"#8B8E99"}>
            Savat bo'sh
          </Title>
          <Text c={"#8B8E99"}>
            Mahsulotlarni savatga qo'shish uchun bosh sahifaga o'ting
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container size={"100%"} px={"140"}>
      <Flex justify={"space-between"} align={"center"} mb={35}>
        <Title
          w={"fit-content"}
          p={"5px 20px"}
          pb={10}
          bdrs={"50px"}
          bg={"aliceblue"}
          order={2}
          fw={500}
        >
          Ajoyib! mana sizning savatingiz ({basketProducts.length} xil mahsulot):
        </Title>
        <Title order={3} c={"#7000FF"}>
          Jami: {totalPrice.toLocaleString()} so'm
        </Title>
      </Flex>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {basketProducts.map((item) => (
          <Box
            key={item.id}
            pos={"relative"}
            style={{
              cursor: "pointer",
              border: "1px solid #f0f0f0",
              borderRadius: "12px",
              padding: "10px",
            }}
          >
            <Box pos={"relative"}>
              {item.badge && (
                <Text
                  bg={item.bgColor}
                  c={"white"}
                  p={"1px 15px"}
                  bdrs={5}
                  bottom={10}
                  left={10}
                  pos={"absolute"}
                  style={{ zIndex: 1 }}
                >
                  {item.badge}
                </Text>
              )}
              <Image
                radius={12}
                fallbackSrc="https://placehold.co/232x309?text=Afsus... usbu rasm topilmadi"
                w={"100%"}
                src={item.images}
                alt={item.title}
              />
            </Box>

            {/* O'chirish tugmasi */}
            <Button
              onClick={() => removeFromBasket(item.id)}
              bg={"none"}
              c={"grey"}
              pos={"absolute"}
              top={10}
              right={5}
              size="20"
            >
              <TbTrash style={{ fontSize: "18px", color: "#ff4444" }} />
            </Button>

            <Title fw={500} size={16} mt={8} order={3}>
              {item.title} {textLimitFunc(item.description, 6)}
            </Title>

            <Flex align={"center"} gap={2} mt={4}>
              <TiStarFullOutline color="#FFB54C" />
              <Text c="#8B8E99">
                {item.rating} ({item.reviewCount} sharh)
              </Text>
            </Flex>

            {item.monthlyPrice && (
              <Text p={"2px 5px"} bg={"#FFFF00"} bdrs={4} w={"fit-content"} mt={4}>
                {item.monthlyPrice}
              </Text>
            )}

            <Flex justify={"space-between"} align={"center"} mt={8}>
              <Box>
                <s style={{ color: "#8B8E99", fontSize: "13px" }}>
                  {item.oldPrice} so'm
                </s>
                <Text fw={600}>{item.price} so'm</Text>
              </Box>

              {/* Quantity boshqaruvi */}
              <Flex
                align={"center"}
                gap={4}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "30px",
                  padding: "2px 6px",
                }}
              >
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#f0f0f0",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <Text fw={600} fz={16} w={20} ta={"center"}>
                  {item.quantity}
                </Text>
                <button
                  onClick={() => increaseQty(item.id)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#7000FF",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Basket;
