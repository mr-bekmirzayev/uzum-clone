import { useQuery } from "@tanstack/react-query";
import { fetchProductsOne } from "../api/productsApi";
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
  FaChevronUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { TbBasketPlus } from "react-icons/tb";

const ProductsList = () => {
  const [hoverFunc, setHoverFunc] = useState(null);
  const [wishList, setWishList] = useState(() => {
    const saved = localStorage.getItem("wishList");
    return saved ? JSON.parse(saved) : [];
  });
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsOne,
  });

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);
  if (isLoading)
    return (
      <p style={{ marginTop: "200px", marginLeft: "700px", display: "flex", alignItems: "center", gap: "10px" }} >
        <Loader color="blue" /> Arzon narx tovarlari yuklanmoqda...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center" }}>
        Xatolik yuz berdi:{" "}
        <span style={{ color: "red", fontWeight: "600" }}>{error.message}</span>
      </p>
    );

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
  const textLimitFunc = (text, limit) => {

    const harf = text.split(" ");
    if (harf.length > limit) {
      return harf.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div>
      <Button
        pos={"absolute"}
        right={70}
        bg={"#7000FF"}
        h={55}
        style={{
          fontSize: "45px",
          width: "55px",
          paddingBottom: "4px",
          borderRadius: "50px",
          transform: "translateY(69px)",
        }}
      >
        <FaChevronUp />
      </Button>
      <List>
        <Title c={"#1f2026b9"} mb={20}>
          Arzon narxlar <FaChevronRight size={22} />
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>
          {products.slice(0, 20).map((item) => {
            const isLiked = wishList.some((w) => w.id === item.id);
            return (
              <List.Item
                onMouseEnter={() => setHoverFunc(item.id)}
                onMouseLeave={() => setHoverFunc(null)}
                style={{
                  transform:
                    hoverFunc === item.id ? "translateY(-10px)" : "none",
                  transition: "0.35s",
                  cursor: "pointer",
                }}
                pos={"relative"}
                key={item.id}
              >
                <Flex
                  justify={"space-between"}
                  direction={"column"}
                  align={"start"}
                >
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
                    onMouseEnter={() => setHoverFunc(item.id)}
                    onMouseLeave={() => setHoverFunc(null)}
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
                        color="white"
                        style={{
                          color: hoverFunc == item.id ? "red" : "grey",
                          transition: "250ms",
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        style={{
                          color: hoverFunc == item.id ? "red" : "grey",
                          transition: "250ms",
                        }}
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
                  <button style={{fontSize: "35px", width: "55px", borderRadius: "80px", background:hoverFunc == item.id ? "rgba(0, 0, 0, 0.1)": "none", border: "none", cursor: "pointer", transition: "0.2s"}}>
                    <TbBasketPlus />
                  </button>
                </Flex>
              </List.Item>
            );
          })}
        </SimpleGrid>
      </List>
      <center>
        <Button
          mb={80}
          c={"#1F2026"}
          w={955}
          size="20"
          h={50}
          bg={"rgba(16, 16, 16, 0.24)"}
          mt={30}
        >
          Yana ko'rsatish 20
        </Button>
      </center>
    </div>
  );
};
export default ProductsList;
