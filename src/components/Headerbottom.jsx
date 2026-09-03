import { Container, Flex, Image, Text } from "@mantine/core";
import unionIcon from "../assets/icons/union.png.png";
import { Link } from "react-router-dom";

function Headerbottom() {
  const categories = [
    { name: "Muddatli to'lov", path: "/category/muddatliTolov", icon: unionIcon, isSpecial: true },
    { name: "Elektronika", path: "/category/elektronika" },
    { name: "Arzon narxlar", path: "/category/arzonNarx" },
    { name: "Issiq Texnika", path: "/category/issiqTexnika" },
  ];

  return (
    <Container size="100%" px={140} mt={14} className="headerbottom-container">
      <Flex
        justify="flex-start"
        align="center"
        gap={28}
        style={{ overflowX: "auto", paddingBottom: "4px" }}
        className="headerbottom-flex"
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease",
            }}
          >
            {cat.icon && (
              <Image w={22} mr={6} src={cat.icon} alt={cat.name} />
            )}
            <Text
              size="14.5px"
              fw={cat.isSpecial ? 600 : 400}
              style={{
                color: cat.isSpecial ? "#7000FF" : "#1f2026",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7000FF")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = cat.isSpecial ? "#7000FF" : "#1f2026")
              }
            >
              {cat.name}
            </Text>
          </Link>
        ))}
      </Flex>
    </Container>
  );
}

export default Headerbottom;
