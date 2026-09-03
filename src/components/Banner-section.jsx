import { Box, Flex, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import banner1 from "../assets/main__banner.png";
import banner2 from "../assets/muddatliTolovBanner.png";
import banner3 from "../assets/issiqTexnikalar.png";
import banner4 from "../assets/elektronika.png";

export default function BannerSection() {
  const slides = [
    { id: 1, image: banner1, title: "Asosiy aksiya" },
    { id: 2, image: banner2, title: "Muddatli to'lov aksiyasi" },
    { id: 3, image: banner3, title: "Issiq texnikalar" },
    { id: 4, image: banner4, title: "Elektronika" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        margin: "24px 0 36px 0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        backgroundColor: "#f2f4f7",
      }}
    >
      <Box
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          width: "100%",
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            style={{
              minWidth: "100%",
              height: "auto",
              cursor: "pointer",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fallbackSrc={banner1}
              fit="cover"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "420px",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>

      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(4px)",
          color: "#1f2026",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          zIndex: 5,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)")}
      >
        <FaChevronLeft size={16} />
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(4px)",
          color: "#1f2026",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          zIndex: 5,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)")}
      >
        <FaChevronRight size={16} />
      </button>

      <Flex
        gap={8}
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          background: "rgba(0, 0, 0, 0.25)",
          padding: "5px 10px",
          borderRadius: "20px",
          backdropFilter: "blur(4px)",
        }}
      >
        {slides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: currentIndex === idx ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Flex>
    </Box>
  );
}
