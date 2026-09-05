import { Image, Text } from "@mantine/core";
import { CiLocationOn } from "react-icons/ci";
import uzbekistanFlag from "../assets/uzbekistanFlag.png";

function HeaderTop() {
  return (
    <div className="headertop-section">
      <div className="headertop-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "13px" }}>
            <CiLocationOn />
            <span style={{ color: "#666" }}>Shahar:</span>
            <u style={{ fontWeight: 600 }}>Toshkent</u>
          </span>
          <span style={{ fontWeight: 700, fontSize: "13px" }}>Topshirish punkitlari</span>
        </div>

        <div className="headertop-center">
          <span style={{ color: "#555", fontSize: "13px" }}>
            Buyurtmangizni 1 kunda bepul yetkazib beramiz!
          </span>
        </div>

        <div className="headertop-right">
          <span style={{ fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Savol-javoblar</span>
          <span style={{ fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Buyurtmalarim</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px" }}>
            <Image w={18} src={uzbekistanFlag} alt="O'zbekiston" />
            O'zbekcha
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
