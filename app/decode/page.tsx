"use client";
import React, { useState } from "react";
import { Spinner } from "@nextui-org/react";
function Decode() {
  const [selectedEncodeImage, setSelectedEncodeImage] = useState(null);
  const [DecodeImage, setDecodeImage] = useState<string | null>(null);
  const [isfinished, setisfinished] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [textstetus,settextstetus] = useState("");
  const handletheEncodeimage = (e: any) => {
    console.log("the value of Encode Image is changed.");
    const file = e.target.files[0];
    if (file) {
      setSelectedEncodeImage(file);
    }
  };
  const handleSaveImage = () => {
    console.log("saved image.");
    const a = document.createElement("a");
    a.href = DecodeImage!;
    a.download = "recovered-image.png";
    a.click();
  };

  const handleSubmit = async () => {
    // console.log("send data to the server");
    settextstetus("sending images to the server...");
    setIsloading(true);
    try {
      if (!selectedEncodeImage) {
        alert("Please select the encoded images.");
        return;
      }

      // Create a FormData object to send the files
      const formData = new FormData();
      formData.append("cover_image", selectedEncodeImage);
      settextstetus("Processing image steganography (this may take a while) ... ");
      const response = await fetch("https://steganocors2.onrender.com/decode", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to process images: ${response.status} ${response.statusText}`
        );
      }
      const imageBlob = await response.blob();

      // Create a data URL from the Blob
      const imageUrl = await URL.createObjectURL(imageBlob);

      // Set the temporary image URL in a variable
      const temporaryImageUrl = await imageUrl;

      // Check if the temporary image URL is valid
      if (temporaryImageUrl) {
        // Set the image URL to the state variable
        setDecodeImage(temporaryImageUrl);
        setIsloading(false)
        setisfinished(true);
      }
      console.log(imageBlob);
      console.log(imageUrl);

      alert("Images processed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing images.");
      setisfinished(true);
      setIsloading(false);
    }
  };
  return (
    <div className="h-screen w-full duration-250 ">
      <div className="flex h-[10%] bg-DecodeTheme items-center  drop-shadow-xl">
        <div className="flex text-2xl ml-5">Decode </div>
      </div>
      <div className="flex-col lg:flex lg:flex-row lg:h-[90%] h-[90%] w-[100%] bg-[#F1D9ED] justify-around overflow-auto duration-250">
        <div className="w-[100%] h-[70%] lg:w-[50%] lg:h-[100%]   items-center flex flex-col justify-center duration-250">
          <div className="flex flex-col bg-DecodeTheme drop-shadow-2xl  h-[80%]   rounded-xl items-center w-[90%] border-2 border-gray-400 duration-250">
            <div className=" text-center py-4 text-2xl">
              Please select the encoded image
            </div>
            <div className=" border-2 w-[70%] h-[60%] bg-white drop-shadow-xl flex items-center justify-center">
              {selectedEncodeImage && (
                <div className="flex h-full w-full justify-center items-center">
                  <img
                    src={URL.createObjectURL(selectedEncodeImage)}
                    alt="Selected Image"
                    className="  max-w-[95%] max-h-[95%] border border-red-400"
                  />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*,.png"
              onChange={handletheEncodeimage}
              className="block  mt-3 w-[40%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
            />
          </div>
        </div>
        <div className=" flex h-[100%]  drop-shadow-2xl w-[100%] lg:w-[40%] justify-center items-center">
          <div className=" w-[90%] lg:w-[100%] h-[80%] items-center flex flex-col rounded-2xl  bg-DecodeTheme border-2 border-gray-400">
            <div className=" h-[15%] lg:h-[10%] w-[40 %] items-center text-2xl flex justify-center ">
              Click the Decode button
            </div>
            <div className=" border-2 w-[75%]  justify-center items-center bg-white drop-shadow-xl h-[60%] flex">
              {isloading ? (
                <div className=" w-full h-full flex-col flex items-center justify-center">
                  <Spinner />
                  <div>{textstetus}</div>
                </div>
              ) : null}
              {DecodeImage && (
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                  <img
                    src={DecodeImage}
                    alt="Selected Image"
                    className=" max-h-[90%] max-w-[90%] border border-red-400"
                  />
                </div>
              )}
            </div>
            {isfinished ? null : (
              <div
                className=" transition h-[7%] m-auto w-[40%] flex justify-center items-center rounded-lg  bg-white  shadow-2xl hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700"
                onClick={handleSubmit}
              >
                <button>Decode</button>
              </div>
            )}
            {isfinished ? (
              <button
                id="encodeButton"
                onClick={handleSubmit}
                className=" transition  h-[30%] w-[40%] flex justify-center items-center rounded-lg  bg-white  shadow-2xl hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 "
              >
                <div>Download</div>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decode;
