import React, { useState } from "react";
import { PiTriangleDashedFill } from "react-icons/pi";
import Preview from "./Preview";
import Enhanced from "./Enhanced";
import { GetEnhancedImg } from "../utils/Api";
import toast from "react-hot-toast";

const Hero = () => {
  const [enhancedImgData, setEnhancedImgData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const ImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setPreview(URL.createObjectURL(file));
      setEnhancedImgData(null); // Clear previous enhanced image
    }
  };

  const UploadImg = async () => {
    if (!uploadedFile) {
      toast.error("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Enhancing image...");
      const data = await GetEnhancedImg(uploadedFile);
      toast.dismiss();

      if (data?.image) {
        setEnhancedImgData(data);
        toast.success("Image enhanced successfully!");
      } else {
        toast.error("Failed to enhance image.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log("API Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!enhancedImgData?.image) return;

    const link = document.createElement("a");
    link.href = enhancedImgData.image;
    link.download = "enhanced-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImage = () => {
    setUploadedFile(null);
    setPreview(null);
    setEnhancedImgData(null);
  };

  return (
    <div className="Hero min-h-screen w-full flex items-center flex-col px-4 py-10">
      {/* Header */}
      <div className="top min-h-[25%] max-w-3xl text-center mb-10">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] font-semibold leading-tight mb-4">
          Online AI Enhancer to Improve Color and Contrast
        </h1>
        <p className="text-lg text-zinc-300">
          Automatically enhance your photos with AI-powered color correction and
          detail improvement.
        </p>
      </div>

      {/* Option: Image type */}
      <div className="ImageSingle h-[8vh] w-[13vw] min-w-[160px] bg-zinc-800 rounded-lg p-[5px] hover:cursor-pointer hover:bg-zinc-600">
        <div className="box h-full w-full rounded-md bg-[#0D1B2A] flex justify-center items-center gap-1.5 text-lg font-medium text-center">
          <PiTriangleDashedFill /> Single Image
        </div>
      </div>

      {/* Upload Section */}
      <div className="mainHero w-full max-w-6xl flex flex-col items-center gap-5 mt-10">
        <div className="upload min-h-[50vh] w-full flex justify-center items-center rounded-md bg-[repeating-conic-gradient(#2a2a2a_0_25%,#1c1c1c_0_50%)] bg-[length:48px_48px] border-2 border-zinc-100 px-6 py-6">
          {preview ? (
            <div className="mainImgCon w-full flex flex-col md:flex-row justify-between items-start px-4 gap-4">
              <Preview PreviewImg={preview} />

              <div className="hidden md:block self-stretch w-[2px] bg-white bg-opacity-30" />

              <Enhanced EnhancedImg={enhancedImgData} />
            </div>
          ) : (
            <label className="w-64 h-64 border-2 rounded-md border-dashed border-gray-600 flex items-center justify-center m-10 bg-black/40 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={ImageHandler}
              />
              <span className="text-gray-300">Upload Image</span>
            </label>
          )}
        </div>

        {/* Action Buttons */}
        {preview && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={UploadImg}
              disabled={loading}
              className={`text-lg font-medium px-6 py-2 rounded-md bg-[#9D00FF] hover:bg-[#7d00cc] transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Upload & Start"}
            </button>

            {enhancedImgData?.image && (
              <button
                onClick={downloadImage}
                className={`text-lg font-medium px-6 py-2 rounded-md bg-[#9D00FF] hover:bg-[#7d00cc] transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              >
                Download Enhanced
              </button>
            )}

            <button
              onClick={resetImage}
              className="text-lg font-medium px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white"
            >
              Upload New Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;


