import { useQuery } from "@tanstack/react-query";
import { fetchPriductsTwo } from "../api/productsApi";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  List,
  Loader,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import {
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { TbBasketPlus } from "react-icons/tb";

const ProductsListTwo = () => {
  const [hoverFunc, setHoverFunc] = useState(null);
  const [basketProducts, setBasketProducts] = useState(() => {
    const saved = localStorage.getItem("mahsulot");
    return saved ? JSON.parse(saved) : [];
  });

  const addToBasket = (id) => {
    const foundItem = products.find((item) => item.id == id);
    if (foundItem) {
      setBasketProducts((prev) => {
        const exists = prev.find((i) => i.id === foundItem.id);
        let updated;
        if (exists) {
          updated = prev.map((i) =>
            i.id === foundItem.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          );
        } else {
          updated = [...prev, { ...foundItem, quantity: 1 }];
        }
        // localStorage ga flat array sifatida saqlash
        const flat = updated.flatMap((i) => Array(i.quantity || 1).fill({ ...i, quantity: undefined }));
        localStorage.setItem("mahsulot", JSON.stringify(flat));
        return updated;
      });
    }
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["elektornika"],
    queryFn: fetchPriductsTwo,
  });

  const [wishList, setWishList] = useState(() => {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  if (isLoading) {
    return (
      <p style={{ marginTop: "200px", marginLeft: "700px", display: "flex", alignItems: "center", gap: "10px" }}>
        <Loader color="blue" /> Elektronika tovarlari yuklanmoqda...
      </p>
    );
  }
  if (error) {
    return (
      <p style={{ textAlign: "center" }}>
        Elektronika mahsulotlarini olib kelishda xatolik yuz berdi:{" "}
        <span style={{ color: "red", fontWeight: "600" }}>{error.message}</span>
      </p>
    );
  }

  const textLimitFunc = (text, limit) => {
    if (!text) return "";
    const harf = text.split(" ");
    if (harf.length > limit) {
      return harf.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const toggleWishList = (item) => {
    setWishList((prevWishList) => {
      const exists = prevWishList.some((w) => w.id === item.id);
      if (exists) {
        return prevWishList.filter((w) => w.id !== item.id);
      } else {
        return [...prevWishList, item];
      }
    });
  };

  return (
    <div>
      <List>
        <Title c={"#1f2026b9"} mb={20}>
          Elektronika <FaChevronRight size={22} />
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>
          {products?.slice(0, 20).map((item) => {
            const isLiked = wishList.some((w) => w.id === item.id);
            return (
              <List.Item
                onMouseEnter={() => setHoverFunc(item.id)}
                onMouseLeave={() => setHoverFunc(null)}
                style={{
                  transform: hoverFunc === item.id ? "translateY(-10px)" : "none",
                  transition: "0.35s",
                  cursor: "pointer",
                }}
                pos={"relative"}
                key={item.id}
              >
                <Flex justify={"space-between"} direction={"column"} align={"start"}>
                  <Box pos={"relative"}>
                    <Text
                      bg={item.bgColor}
                      c={"white"}
                      p={"1px 15px"}
                      bdrs={5}
                      bottom={10}
                      left={10}
                      pos={"absolute"}
                    >
                      {item.badge}
                    </Text>
                    <Image
                      radius={12}
                      fallbackSrc="https://placehold.co/232x309?text=Afsus... usbu rasm topilmadi"
                      w={300}
                      src={item.images}
                      alt={item.title}
                    />
                  </Box>

                  <Title fw={500} size={18} mt={5} order={3}>
                    {item.title} {textLimitFunc(item.description, 8)}
                  </Title>
                  <Button
                    onClick={() => toggleWishList(item)}
                    bg={"none"}
                    c={"grey"}
                    pos={"absolute"}
                    top={10}
                    right={5}
                    size="20"
                  >
                    {isLiked ? (
                      <FaHeart
                        style={{ color: hoverFunc == item.id ? "red" : "grey", transition: "250ms" }}
                      />
                    ) : (
                      <FaRegHeart
                        style={{ color: hoverFunc == item.id ? "red" : "grey", transition: "250ms" }}
                      />
                    )}
                  </Button>
                  <Flex align={"center"} gap={2}>
                    <TiStarFullOutline color="#FFB54C" />{" "}
                    <Text c="#8B8E99">
                      {item.rating} ({item.reviewCount} sharh)
                    </Text>
                  </Flex>
                  <Text p={"2px 5px"} bg={"#FFFF00"} bdrs={4} w={"fit-content"}>
                    {item.monthlyPrice}
                  </Text>
                </Flex>
                <Flex justify={"space-between"} align={"end"}>
                  <Box>
                    <s style={{ color: "#8B8E99" }}>{item.oldPrice} so'm</s>
                    <Text>{item.price} so'm</Text>
                  </Box>
                  <button onClick={() => addToBasket(item.id)}
                    style={{
                      fontSize: "35px",
                      width: "55px",
                      borderRadius: "80px",
                      background: hoverFunc == item.id ? "rgba(0, 0, 0, 0.1)" : "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    <TbBasketPlus />
                  </button>
                </Flex>
              </List.Item>
            );
          })}
        </SimpleGrid>
      </List>
    </div>
  );
};

export default ProductsListTwo;