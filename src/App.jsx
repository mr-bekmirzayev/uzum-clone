import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AppRouter from "./Router/AppRouter";
import { Box, Flex, Image, Text } from "@mantine/core";

function App() {
  const userLocalData = JSON.parse(localStorage.getItem("userInf"));
  const localData = JSON.parse(localStorage.getItem("foydalanuvchi"));
  return (
    <>
      {userLocalData =="true" ? (
        <Box className="userInfsBox">
          <center>
            <Image
              w={255}
              src={localData.userProfileIcon}
              alt={localData.name}
            />
          </center>
          <Flex>
            <Text>
              ismingiz: <br />
              {localData.name}
            </Text>
            <Text>
              parolingiz: <br />
              {localData.password}
            </Text>
          </Flex>
          <Text>emailingiz: {localData.email}</Text>
        </Box>
      ): null}
      <AppRouter />
    </>
  );
}
export default App;
