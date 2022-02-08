import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
