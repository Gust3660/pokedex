import React from "react";
import Main from "./pages/Main";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Toaster />
    </>
  );
};

export default App;