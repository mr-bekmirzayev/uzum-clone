import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Input,
  Text,
  TextInput,
} from "@mantine/core";
import Logo from "/Logo.png";
import categoryIcon from "../assets/icons/category.png";
import { BiSearch } from "react-icons/bi";
import { IconSearch } from "@tabler/icons-react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate();
  const localData = localStorage.getItem("foydalanuvchi");
  const trueLocalData = JSON.parse(localStorage.getItem("foydalanuvchi")) || [];
  const goToLogIn = () => {
    if (!localData || localData.length == 0) {
      // ro'yxatdan o'tish sahifasi
      navigate("/signUp");
    } else {
      //kirish sahifasi
      navigate("/logIn");
    }
  };
  return (
    <Container size={"100%"} px={"140"}>
      <Flex justify={"space-between"}>
        <Flex align={"center"}>
          <Link to={"/"}>
            <Image w={300} src={Logo} alt="Logo" />
          </Link>
          <Text>
            <Flex bg={"#F0F0FF"} p={"10px 20px"} bdrs={4} c={"#7000FF"}>
              <Image mr={7} w={20} src={categoryIcon} alt="catolog" />
              Katalog
            </Flex>
          </Text>
        </Flex>
        <Group pos={"relative"}>
          <TextInput
            w={"727px"}
            radius={0}
            placeholder="Mahsulotlar va turkumlar izlash"
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <Button
            pos={"absolute"}
            bg={"#F2F4F7"}
            radius={2}
            c={"grey"}
            h={30}
            right={2}
          >
            <IconSearch />
          </Button>
        </Group>
        <Group gap={0}>
          {localData ? (
            <Button
              style={{
                fontSize: "15px",
                height: "88%",
                background: "none",
                color: "#1f2026c2",
              }}
            >
              <FaRegUser style={{ marginRight: "10px", fontSize: "18" }} />
              {trueLocalData.name}
            </Button>
          ) : (
            <Button
              onClick={goToLogIn}
              style={{
                fontSize: "15px",
                height: "88%",
                background: "none",
                color: "#1f2026c2",
              }}
            >
              <FaRegUser style={{ marginRight: "10px", fontSize: "18" }} />{" "}
              Kirish
            </Button>
          )}
          {localData ? (
            <Link to={"/wishList"}>
              <Button
                style={{
                  fontSize: "15px",
                  height: "88%",
                  background: "none",
                  color: "#1f2026c2",
                }}
              >
                <FaRegHeart style={{ marginRight: "10px", fontSize: "18" }} />
                Saralangan
              </Button>
            </Link>
          ) : (
            <Link to={localData ? "/logIn" : "/signUp"}>
              <Button
                style={{
                  fontSize: "15px",
                  height: "88%",
                  background: "none",
                  color: "#1f2026c2",
                }}
              >
                <FaRegHeart style={{ marginRight: "10px", fontSize: "18" }} />
                Saralangan
              </Button>
            </Link>
          )}
          <Link to={"/basket"}>
            <Button
              style={{
                fontSize: "15px",
                height: "88%",
                background: "none",
                color: "#1f2026c2",
              }}
            >
              <SlBasket style={{ marginRight: "10px", fontSize: "18" }} /> Savat
            </Button>
          </Link>
        </Group>
      </Flex>
    </Container>
  );
}

export default Header;
