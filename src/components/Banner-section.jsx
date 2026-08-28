import { Image } from "@mantine/core";
import bannerImage from "../assets/main__banner.png";

function BannerSection() {
  return (
    <>
      <Image m={"50px auto"} src={bannerImage} alt="error" />
    </>
  );
}

export default BannerSection;
