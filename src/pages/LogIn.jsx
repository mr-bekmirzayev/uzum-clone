import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { use, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const succesMess = document.querySelector(".succesMess");
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
    const localData = JSON.parse(localStorage.getItem("foydalanuvchi"))
    const goFinally = (e) => {
    e.preventDefault()
    if(localData.email == email && localData.password == password){
      navigate("/")
    }else{
      alert("Malumotlar xato kiritildi. o'ylab yoz uka?")
    }
  }
  console.log(localData);
  setTimeout(() => {
    localStorage.removeItem("hozirOtdi");
  }, 5000);
  const [hovered, setHovered] = useState(null);
  return (
    <Container size={"100%"} px={"140"}>
      <Flex justify={"center"} align={"center"} h={"90vh"}>
        <Box
          style={{
            background: "#7000FF",
            filter: "blur(95px)",
            position: "absolute",
            padding: "50px",
            zIndex: "-1",
            right: "780px",
            top: "360px",
          }}
        ></Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            backdropFilter: "blur(20px)",
            background: "none",
            width: "500px",
            zIndex: "10",
            border: "solid 2px #0707072d",
            padding: "50px 20px",
            borderRadius: "10px",
            height: "465px",
            position: "relative",
          }}
        >
          <Flex justify={"center"} w={"100%"}>
            <Box>
              <svg
                data-v-3bcdbef0=""
                width="106"
                height="24"
                viewBox="0 0 106 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ui-icon "
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.9905 18.6441C23.3061 16.6669 24.0032 14.345 23.9981 11.9698C23.9981 10.3956 23.6863 8.83664 23.083 7.38415C22.4797 5.92912 21.595 4.61098 20.4797 3.49816C19.3668 2.38535 18.0436 1.50574 16.5886 0.904971C15.1336 0.304202 13.5746 -0.00251931 12.0005 1.55844e-05C9.62526 1.55844e-05 7.3033 0.704715 5.32862 2.02539C3.35648 3.34354 1.8178 5.21935 0.91031 7.41457C0.00281964 9.60978 -0.232925 12.023 0.233495 14.3526C0.697379 16.6796 1.84315 18.819 3.52378 20.4946C5.20441 22.1727 7.3464 23.3134 9.67596 23.7722C12.0055 24.2336 14.4187 23.9902 16.6114 23.0777C18.8041 22.1651 20.6748 20.6213 21.9905 18.6441ZM11.9979 4.09893C12.4669 4.09893 12.9282 4.11414 13.3769 4.15723V10.5401H10.6265V4.15723C11.0778 4.11668 11.529 4.09893 11.9979 4.09893ZM16.6596 7.10531C17.6989 7.29036 18.723 7.54638 19.7268 7.87592V12.497C19.6609 14.4996 18.8193 16.4008 17.377 17.7949C15.9346 19.1891 14.0081 19.9699 12.003 19.9699C9.99789 19.9699 8.07137 19.1891 6.62902 17.7949C5.1892 16.4008 4.34509 14.5021 4.27918 12.497V7.87845C5.283 7.55145 6.30709 7.29289 7.3464 7.10785V12.4615C7.3464 16.3196 8.98647 18.3501 12.003 18.3501C15.0195 18.3501 16.6596 16.3196 16.6596 12.4615V7.10531Z"
                  fill="#7000FF"
                ></path>
                <path
                  d="M90.4477 4.57803V17.0218H87.6365V4.57803H90.4477Z"
                  fill="#7000FF"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M93.738 17.0218V4.57803H98.7799C100.803 4.57803 102.382 5.12557 103.518 6.21811C104.653 7.32078 105.219 8.84679 105.219 10.8012C105.219 12.7531 104.653 14.2816 103.528 15.3741C102.39 16.4768 100.81 17.0218 98.7799 17.0218H93.738ZM98.7799 14.5655C99.9079 14.5655 100.775 14.2182 101.383 13.5338C101.981 12.8494 102.286 11.9368 102.286 10.8012C102.286 9.66302 101.981 8.753 101.383 8.06858C100.775 7.38416 99.9079 7.03688 98.7799 7.03688H96.5416V14.568H98.7799V14.5655Z"
                  fill="#7000FF"
                ></path>
                <path
                  d="M62.7844 12.3729C62.7844 13.9293 61.9048 14.6467 60.5968 14.6467C59.2888 14.6467 58.4422 13.942 58.4422 12.3729V7.23718H55.6208V12.4717C55.6208 15.8837 58.4751 17.2196 60.6196 17.2196C62.7642 17.2196 65.621 15.8837 65.621 12.4717V7.23718H62.7996L62.7844 12.3729Z"
                  fill="#7000FF"
                ></path>
                <path
                  d="M53.233 7.23459V9.61992L47.5928 14.6542H53.5727V17.0395H43.8412V14.6542L49.4889 9.61992H44.0617V7.23459H53.233Z"
                  fill="#7000FF"
                ></path>
                <path
                  d="M79.7479 7.04955C77.9583 7.04955 76.6123 7.77706 75.9456 8.88481C75.2662 7.77706 73.7859 7.04955 72.2523 7.04955C69.2357 7.04955 67.6666 8.97099 67.6666 11.3462V17.0395H70.488V11.7467C70.488 10.6111 71.0837 9.61232 72.4525 9.61232C72.7314 9.59458 73.0102 9.63767 73.2713 9.73906C73.5324 9.83792 73.7707 9.99255 73.9659 10.1903C74.1636 10.388 74.3157 10.6263 74.4145 10.8874C74.5134 11.1485 74.5539 11.4273 74.5362 11.7087V17.0421H77.3575V11.7061C77.3575 10.568 78.0267 9.60979 79.3829 9.60979C80.7365 9.60979 81.3905 10.6085 81.3905 11.7442V17.0345H84.2119V11.3513C84.2119 8.9786 82.7543 7.05462 79.7226 7.05462L79.7479 7.04955Z"
                  fill="#7000FF"
                ></path>
                <path
                  d="M36.9844 14.6467C38.2848 14.6467 39.1618 13.9293 39.1618 12.3729L39.1669 7.23718H41.9882V12.4717C41.9882 15.8837 39.1517 17.2196 36.997 17.2196C34.8424 17.2196 31.9982 15.8837 31.9982 12.4717V7.23718H34.8196V12.3729C34.8196 13.942 35.6865 14.6467 36.9844 14.6467Z"
                  fill="#7000FF"
                ></path>
              </svg>
            </Box>
          </Flex>
          <Title fw={600} mb={45} order={3} w={"100%"} ta={"center"}>
            Xush kelibsiz, ma'lumotlaringizni kiriting
          </Title>
          <label style={{ width: "100%", marginBottom: "10px" }}>
            Emailingiz:
            <TextInput
              required
              type="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="emailingizni yozing..."
              mt={10}
              w={"100%"}
            />
          </label>
          <label style={{ width: "100%" }}>
            Yangi parolingiz:
            <PasswordInput
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="yangi parolingizni yozing..."
              mt={10}
              w={"100%"}
            />
          </label>
          <button onClick={goFinally}
            style={{
              background: hovered ? "#7000FF" : "#6f00ffc6",
              border: "none",
              color: hovered ? "white" : "aliceblue",
              width: "100%",
              padding: "10px 20px",
              cursor: "pointer",
              transition: "0.11s",
              borderRadius: "7px",
              marginTop: "30px",
            }}
          >
            <Group
              w={"100%"}
              justify="center"
              align="center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(null)}
            >
              <Text size="20px" fw={"700"}>
                Nihoyat
              </Text>{" "}
              <FaArrowRight
                style={{
                  transform: hovered ? "translateX(10px)" : "translateX(0)",
                  transition: "0.15s",
                }}
              />
            </Group>
          </button>
        </form>
      </Flex>
    </Container>
  );
}
export default LogIn;
