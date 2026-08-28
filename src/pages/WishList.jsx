import { Container, Title, SimpleGrid, Box, Image, Text, Flex, Button } from '@mantine/core'
import { TiStarFullOutline } from 'react-icons/ti'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'

function WishList() {
  const [wishList, setWishList] = useState(() => {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromWishList = (id) => {
    setWishList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("wishList", JSON.stringify(updated));
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

  return (
    <Container size={"100%"} px={"140"}>
      <Title mb={30}>
        Ajoyib! tanishing, siz yoqtirganlar:
      </Title>

      {wishList.length === 0 ? (
        <Flex direction={"column"} align={"center"} justify={"center"} mt={80} gap={15}>
          <Text fz={60}>🤍</Text>
          <Title order={3} c={"#8B8E99"}>
            Saralangan mahsulotlar yo'q
          </Title>
          <Text c={"#8B8E99"}>
            Mahsulot yonidagi yurak belgisini bosib saralash ro'yxatini to'ldiring
          </Text>
        </Flex>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} mb={80}>
          {wishList.map((item) => (
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

              {/* Yoqtirganlardan o'chirish */}
              <Button
                onClick={() => removeFromWishList(item.id)}
                bg={"none"}
                pos={"absolute"}
                top={10}
                right={5}
                size="20"
              >
                <FaHeart style={{ color: "red", fontSize: "18px" }} />
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

              <Flex justify={"space-between"} align={"center"} mt={6}>
                <Box>
                  <s style={{ color: "#8B8E99", fontSize: "13px" }}>{item.oldPrice} so'm</s>
                  <Text fw={600}>{item.price} so'm</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default WishList