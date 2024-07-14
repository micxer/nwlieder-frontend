import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import "./reload.css";

const Spinner: React.FC = () => {
  return (
    <div className="overlay">
      <HashLoader color="red" />
    </div>
  );
};

export default Spinner;
