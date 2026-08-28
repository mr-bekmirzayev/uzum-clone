import { Container, createTheme, Flex, Image, Text } from "@mantine/core";
import unionIcon from "../assets/icons/union.png.png";
import { FaChevronDown } from "react-icons/fa";

function Headerbottom() {
  return (
    <Container size={"100%"} px={"140"} mt={20}>
      <Flex justify={"space-between"}>
        <Flex gap={36} align={"center"}>
          <Flex align={"center"} fw={500}>
            <Image w={30} mr={10} src={unionIcon} alt="union error icon ##" />{" "}
            <Text size="18px">Muddatli to'lov</Text>
          </Flex>
          <Text size="17px" c={"grey"}>Eektronika</Text>
          <Text size="17px" c={"grey"}>Mishiy Texnika</Text>
          <Text size="17px" c={"grey"}>Kiyim</Text>
          <Text size="17px" c={"grey"}>Poyabzallar</Text>
          <Text size="17px" c={"grey"}>Aksessuarlar</Text>
          <Text size="17px" c={"grey"}>Goʻzallik va parvarish</Text>
          <Text size="17px" c={"grey"}>Salomatlik</Text>
          <Text size="17px" c={"grey"}>Uy-roʻzgʻor buyumlari</Text>
          <Text size="17px" c={"grey"}>Qurilish va taʼmirlash</Text>
        </Flex>
        <Flex c={"grey"} align={"center"} gap={5}>
          Yana <FaChevronDown />
        </Flex>
      </Flex>
    </Container>
  );
}

export default Headerbottom;
