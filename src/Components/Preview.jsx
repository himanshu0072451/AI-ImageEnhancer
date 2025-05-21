import React from "react";
// import DevImg from "../assets/TempTesting.jpg";

const Preview = ({ PreviewImg }) => {
  return (
    <div className="main h-full w-full md:w-1/2 rounded-md overflow-hidden py-4">
      <h1 className="bg-black/60 text-md font-medium text-white w-full text-center mb-2 rounded-md ">
        Original Image
      </h1>
      <img
        className="h-full w-full object-cover object-center rounded-md"
        src={PreviewImg}
        alt="PreviewImg!"
      />
    </div>
  );
};

export default Preview;
