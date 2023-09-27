"use client";

import { useState } from "react";
import { Spinner } from "@nextui-org/react";
function Encode() {
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedHiddenImage, setSelectedHiddenImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [isloading, setIsloading] = useState(false);
  const [isfinished, setisfinished] = useState(false);

  const handleCoverImageSelect = (e: any) => {
    console.log("change the Cover Image");
    const file = e.target.files[0];
    if (file) {
      setSelectedCoverImage(file);
    }
  };

  const handleHiddenImageSelect = (e: any) => {
    console.log("change the Hidden Image");
    const file = e.target.files[0];
    if (file) {
      setSelectedHiddenImage(file);
    }
  };

  const handleSubmit = async () => {
    console.log("Fetching now.... ");
    setIsloading(true);
    try {
      if (!selectedCoverImage || !selectedHiddenImage) {
        alert("Please select both cover and hidden images.");
        return;
      }

      // Create a FormData object to send the files
      const formData = new FormData();
      formData.append("cover_image", selectedCoverImage);
      formData.append("hidden_image", selectedHiddenImage);

      const response = await fetch("https://steganocors2.onrender.com/upload", {
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
        setEncodedImage(temporaryImageUrl);
        setIsloading(false);
        setisfinished(true);
      }
      console.log(imageBlob);
      console.log(imageUrl);
      alert("Images processed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing images.");
    }
  };
  const handleSaveImage = () => {
    const a = document.createElement("a");
    a.href = encodedImage!;
    a.download = "edited-image.png";
    a.click();
  };

  return (
    <div className=" h-screen w-full ">
      <div className="flex h-[10%] bg-encodeTheme items-center">
        <div className="flex text-2xl ml-5">Encode </div>
      </div>
      <div className=" h-[90%]   flex-col lg:flex lg:flex-row bg-encodeThemedetail overflow-auto">
        <div className="w-[100%] h-[100%] flex flex-col lg:w-[40%]  items-center justify-center  py-5">
          <div className="flex flex-col w-[80%] h-[90%] bg-encodeTheme rounded-2xl drop-shadow-2xl">
            <div className=" text-center text-xl my-5 ">Select Your images</div>
            <div className="h-[50%]  flex flex-col items-center">
              <div className="flex flex-col h-[95%] w-[80%] items-center bg-white rounded-md  drop-shadow-lg">
                <div className=" text-center my-2 text-xl">Cover Image</div>
                <div className="w-[90%] h-[100%] m-3 flex flex-col ">
                  {selectedCoverImage && (
                    <div className="flex justify-center  my-auto">
                      <img
                        src={URL.createObjectURL(selectedCoverImage)}
                        alt="Sele cted Image"
                        className="max-w-[200px] max-h-[150px] border border-red-400"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*,.png"
                    onChange={handleCoverImageSelect}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="h-[50%] flex flex-col items-center">
              <div className=" h-[95%]  w-[80%] flex flex-col items-center bg-white  rounded-md drop-shadow-lg">
                <div className=" text-center my-2  text-lg">Hidden Image</div>
                <div className="w-[90%] h-[100%]  justify-center  ">
                  {selectedHiddenImage && (
                    <div className="mt-3 flex w-[100%] justify-center">
                      <img
                        src={URL.createObjectURL(selectedHiddenImage)}
                        alt="Selected Image"
                        className="max-w-[200px] max-h-[150px] border border-red-400"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*,.png"
                    onChange={handleHiddenImageSelect}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[60%] h-[100%] flex justify-center items-center">
          <div className="h-[80%] w-[80%] bg-encodeTheme rounded-xl drop-shadow-2xl">
            <div className=" text-center my-4 text-2xl">
              Click on the Encode button
            </div>

            <div className="flex h-[70%] justify-center">
              <div className="w-[70%] bg-slate-400">
                {isloading ? (
                  <div className=" w-full h-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : null}

                {encodedImage && (
                  <div className=" flex h-[100%] items-center justify-center">
                    <img
                      src={encodedImage}
                      alt="Encoded Image"
                      className="max-w-[90%] max-h-[90%] border border-red-400"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="h-[20%] flex items-center justify-center">
              {isfinished ? (
                <button
                  id="encodeButton"
                  onClick={handleSaveImage}
                  className="h-[30%] w-[40%] flex justify-center items-center rounded-lg  bg-white  shadow-2xl hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 "
                >
                  <div>Download</div>
                </button>
              ) : (
                <button
                  id="encodeButton"
                  onClick={handleSubmit}
                  className="h-[30%] w-[40%] flex justify-center items-center rounded-lg  bg-white  shadow-2xl hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 "
                >
                  <div>Encode</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Encode;
