import React from "react";

const Enhanced = ({EnhancedImg}) => {
  console.log(EnhancedImg);
  return (
    <div className="main h-full w-full md:w-1/2 rounded-md overflow-hidden py-4">
      {EnhancedImg ? (
        <div className="wrap">
          <h1 className="bg-black/60 text-md font-medium text-white w-full text-center mb-2 rounded-md ">
            Enhanced Image
          </h1>
          <img
            className="h-full w-full object-cover object-center rounded-md"
            src={EnhancedImg.image}
            alt="PreviewImg!"
          />
        </div>
      ) : (
        <div className="">Loading!</div>
      )}
    </div>
  );
};

export default Enhanced;
