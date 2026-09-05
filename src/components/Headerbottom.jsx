import { Image } from "@mantine/core";
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
    <div className="headerbottom-inner">
      <div className="headerbottom-links">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: cat.isSpecial ? 600 : 400,
              color: cat.isSpecial ? "#7000FF" : "#1f2026",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7000FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = cat.isSpecial ? "#7000FF" : "#1f2026")}
          >
            {cat.icon && (
              <Image
                w={20}
                src={cat.icon}
                alt={cat.name}
                style={{ pointerEvents: "none", userSelect: "none" }}
              />
            )}
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Headerbottom;
