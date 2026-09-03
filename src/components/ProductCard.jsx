import { Box, Button, Flex, Image, Text } from "@mantine/core";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { TbShoppingBag, TbCheck } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/storageHelper";

export default function ProductCard({ item, isLiked, onToggleWishlist, onAddToBasket, isInBasket }) {
  const [justAdded, setJustAdded] = useState(false);
  const navigate = useNavigate();

  const textLimitFunc = (text, limit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const checkAuthAndExecute = (actionCallback) => {
    const localData = localStorage.getItem("foydalanuvchi");
    if (!localData || localData.length === 0) {
      navigate("/signUp");
      return;
    }
    actionCallback();
  };

  const handleBasketClick = (e) => {
    e.stopPropagation();
    checkAuthAndExecute(() => {
      if (onAddToBasket) onAddToBasket(item);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    checkAuthAndExecute(() => {
      if (onToggleWishlist) onToggleWishlist(item);
    });
  };

  const currentPriceFormatted = formatPrice(item?.price);
  const oldPriceFormatted = item?.oldPrice ? formatPrice(item?.oldPrice) : null;

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
        padding: "6px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        background: "#ffffff",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Box>
        <Box
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "133%",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#f4f5f7",
          }}
        >
          <Image
            src={item.images}
            alt={item.title}
            fallbackSrc="https://placehold.co/300x400?text=Uzum+Market"
            fit="cover"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />

          <Text
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: item.bgColor || "#7000FF",
              color: "#ffffff",
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "2px 6px",
              borderRadius: "4px",
              letterSpacing: "0.5px",
              zIndex: 2,
            }}
          >
            {item.badge || "AKSIYA"}
          </Text>

          <button
            onClick={handleWishlistClick}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 3,
            }}
          >
            {isLiked ? (
              <FaHeart style={{ color: "#7000FF", fontSize: "14px" }} />
            ) : (
              <FaRegHeart style={{ color: "#444444", fontSize: "14px" }} />
            )}
          </button>
        </Box>

        <Box mt={8}>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#1f2026",
              lineHeight: "1.2",
            }}
          >
            {currentPriceFormatted}
          </Text>
          {oldPriceFormatted && (
            <Text
              style={{
                fontSize: "12px",
                color: "#8B8E99",
                textDecoration: "line-through",
                lineHeight: "1.2",
                marginTop: "2px",
              }}
            >
              {oldPriceFormatted}
            </Text>
          )}
        </Box>

        <Box
          style={{
            backgroundColor: "#ffff00",
            color: "#1f2026",
            fontSize: "11px",
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: "4px",
            width: "fit-content",
            marginTop: "5px",
          }}
        >
          {item.monthlyPrice || "1 748 so'm/oyiga"}
        </Box>

        <Text
          style={{
            fontSize: "11px",
            color: "#7000FF",
            fontWeight: 600,
            marginTop: "3px",
          }}
        >
          Arzonlashdi
        </Text>

        <Text
          title={`${item.title} ${item.description || ""}`}
          style={{
            fontSize: "13px",
            lineHeight: "1.3",
            color: "#1f2026",
            fontWeight: 400,
            marginTop: "6px",
            height: "34px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.title} {item.description && `, ${textLimitFunc(item.description, 4)}`}
        </Text>

        <Flex align="center" gap={4} mt={4}>
          <TiStarFullOutline style={{ color: "#FFB54C", fontSize: "14px" }} />
          <Text style={{ fontSize: "12px", color: "#1f2026", fontWeight: 700 }}>
            {item.rating || "4.9"}
          </Text>
          <Text style={{ fontSize: "12px", color: "#8B8E99" }}>
            ({item.reviewCount || 45} sharhlar)
          </Text>
        </Flex>
      </Box>

      <Button
        onClick={handleBasketClick}
        fullWidth
        radius="md"
        h={34}
        mt={10}
        style={{
          backgroundColor: justAdded ? "#00ba34" : "#7000FF",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transition: "all 0.2s ease",
        }}
      >
        {justAdded ? (
          <>
            <TbCheck size={16} /> Qo'shildi
          </>
        ) : (
          <>
            <TbShoppingBag size={15} /> Ertaga
          </>
        )}
      </Button>
    </Box>
  );
}
