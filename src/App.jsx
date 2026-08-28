import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AppRouter from "./Router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}
export default App;
