import { Box, Container, Flex, Image, Text } from "@mantine/core";
import { CiLocationOn } from "react-icons/ci";
import uzbekistanFlag from "../assets/uzbekistanFlag.png";

// ushbu komponent headerning tepasida turuvchi kichik komponent hisoblanadi.
function HeaderTop() {
  return (
    <section
      style={{ background: "#F2F4F7", padding: "5px 0", marginBottom: "20px" }}
    >
      <Container size={"100%"} px={"140"}>
        <Flex justify={"space-between"} align={"center"}>
          <Box display={"flex"}>
            <Text style={{ display: "flex", alignItems: "center" }}>
              <CiLocationOn /> <Text mr={4}>Shahar:</Text> <u>Toshkent</u>
            </Text>
            <Text fw={700} ml={10}>
              Topshirish punkitlari
            </Text>
          </Box>

          <Box>
            <Text c={"grey"}>
              Buyurtmangizni 1 kunda bepul yetkazib beramiz!
            </Text>
          </Box>
          <Box
            c={"#00000088"}
            display={"flex"}
            style={{ alignItems: "center", gap: "15px" }}
          >
            <Text fw={600}>Savol-javoblar</Text>{" "}
            <Text fw={600}>Buyurtmalarim</Text>{" "}
            <Text display={"flex"} style={{ alignItems: "center", gap: "5px" }}>
              <Image w={20} src={uzbekistanFlag} alt="o'zbekistion" /> O'zbekcha
            </Text>
          </Box>
        </Flex>
      </Container>
    </section>
  );
}

export default HeaderTop;
