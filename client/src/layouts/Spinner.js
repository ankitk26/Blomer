import React from "react";
import spinner from "../assets/images/spinner.gif";

const Spinner = ({ className }) => {
  return (
    <div className="flex justify-center">
      <img src={spinner} alt="Loading blogs..." className={`h-8 ${className}`} />
    </div>
  );
};

export default Spinner;
