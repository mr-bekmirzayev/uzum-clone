import { Box, Button, Container, Flex, Group, List, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { FaApple, FaGooglePlay, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { LuBadgeHelp } from "react-icons/lu";

function Footer() {
  return (
    <footer style={{ marginTop: "70px"}}>
      <Container size={"100%"} px={140}>
        <List>
          <Flex justify={"space-between"}>
            <List.Item>
              <Flex direction={"column"} gap={20}>
                <Title c={"#1F2026"} order={3}>Biz haqimizda</Title>
                <Text c={"grey"}>Topshirish punktlari</Text>
                <Text c={"grey"}>Vakansiyalar</Text>
              </Flex>
            </List.Item>

            <List.Item>
              <Flex direction={"column"} gap={20}>
                <Title c={"#1F2026"} order={3}>Foydalanuvchilarga</Title>
                <Text c={"grey"}>Biz bilan bogʻlanish</Text>
                <Text c={"grey"}>Savol-Javob</Text>
              </Flex>
            </List.Item>

            <List.Item>
              <Flex direction={"column"} gap={20}>
                <Title c={"#1F2026"} order={3}>Tadbirkorlarga</Title>
                <Text c={"grey"}>Uzumda soting</Text>
                <Text c={"grey"}>Sotuvchi kabinetiga kirish</Text>
              </Flex>
            </List.Item>

            <List.Item>
              <Flex direction={"column"} gap={20}>
                <Title c={"#1F2026"} order={3}>Ilovani yuklab olish</Title>
                <Group>
                  <Text>
                    <Flex align={"center"} gap={5}>
                      <FaApple style={{ fontSize: "25px" }} /> App store
                    </Flex>
                  </Text>
                  <Text>
                    <Flex align={"center"} gap={8}>
                      <FaGooglePlay style={{ fontSize: "25px" }} /> Google Play
                    </Flex>
                  </Text>
                </Group>
              </Flex>
                <Stack mt={20}>
                <Text ta={"center"}>Uzum ijtimoiy tarmoqlarda</Text>
                <Flex mt={"-10px"} justify={"center"} gap={5}>
                  <FaInstagramSquare style={{color: "#F40000"}} size={44} /> <FaTelegram style={{color: "#2AABEE"}} size={44} /> <IoLogoYoutube style={{color: "#FF0000"}} size={44} /> <ImFacebook2 style={{color: "#3B5998"}} size={44} />
                </Flex>
              </Stack>
            </List.Item>
          </Flex>
        </List>
        <hr style={{marginTop: "100px", marginBottom: "30px"}} />

        <Flex mb={20} justify={"space-between"}>
          <Box display={"flex"} style={{gap: "18px"}}>
            <Text>Maxfiylik kelishuvi</Text>
          <Text>Foydalanuvchi kelishuvi</Text>
          </Box>
          <Text c={"grey"}>«2024© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan»</Text>
        </Flex>
      </Container>
    </footer>
  );
}

export default Footer;
