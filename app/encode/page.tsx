"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import resizeImage from "./resizeimage";

function Encode() {
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedHiddenImage, setSelectedHiddenImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [isloading, setIsloading] = useState(false);
  const [isfinished, setisfinished] = useState(false);
  const [sizewidthcover, setSizewidthcover] = useState(0);
  const [sizewidthhiden, setSizewidthhiden] = useState(0);
  const [sizeheightcover, setSizeheightcover] = useState(0);
  const [sizeheighthiden, setSizeheighthiden] = useState(0);
  const test = null;

  const [tempimage,setTempiamge] = useState(null);
  const [textstatus, setTextStatus] = useState("");
  
  useEffect(()=>{
    setTempiamge(test);
  },[test])

  useEffect(() => {
    if (sizeheightcover != 0 && sizeheighthiden != 0) {
      if (
        sizeheightcover > 2200 ||
        sizeheighthiden > 2200 ||
        sizewidthcover > 2200 ||
        sizewidthhiden > 2200
      ) {
        alert("Maximum size of the image is 2200 X 2200 ");
        return;
      }

      if (
        sizeheightcover < sizeheighthiden ||
        sizewidthcover < sizewidthhiden
      ) {
        alert(
          `The hidden image cannot be bigger than the cover image\n Cover Image: ${sizeheightcover} X ${sizewidthcover} \n Hidden Image : ${sizeheighthiden} X ${sizewidthhiden}`
        );
        setSelectedCoverImage(null);
        setSelectedHiddenImage(null);
        return;
      }
    }
  }, [sizewidthcover, sizewidthhiden, sizeheightcover, sizeheighthiden]);

  const handleCoverImageSelect = (e: any) => {
    console.log("change the Cover Image");
    setEncodedImage(null);
    setisfinished(false);
    const file = e.target.files[0];

    if (file) {
      setSelectedCoverImage(file);

      // Create a new FileReader
      const reader = new FileReader();

      // Set up an event listener for when the FileReader has finished reading the file
      reader.onload = (event) => {
        if (event && event.target && typeof event.target.result === "string") {
          // Create an image element to get the image's dimensions
          const image = new Image();

          // Set up an event listener for when the image has loaded
          image.onload = () => {
            // Get the width and height of the image
            const width = image.width;
            setSizewidthcover(width);
            const height = image.height;
            setSizeheightcover(height);
            // Log the width and height
            console.log(`Image Width: ${width}px, Height: ${height}px`);
          };

          // Set the source of the image to the data URL obtained from FileReader
          image.src = event.target.result;
        }
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleHiddenImageSelect = (e: any) => {
    console.log("change the Hidden Image");
    setEncodedImage(null);
    setisfinished(false);
    const file = e.target.files[0];
    if (file) {
      setSelectedHiddenImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event && event.target && typeof event.target.result === "string") {
          const image = new Image();
          image.onload = () => {
            const width = image.width;
            setSizewidthhiden(width);
            const height = image.height;
            setSizeheighthiden(height);
            console.log(`Image width : ${width} px, Height : ${height}px`);
          };
          image.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("Fetching now.... ");
    setIsloading(true);
    try {
      if (!selectedCoverImage || !selectedHiddenImage) {
        alert("Please select both cover and hidden images.");
        setIsloading(false);
        setTextStatus("");
        return;
      }

      setTextStatus("sending the Image to server...");
      // Create a FormData object to send the files
      const formData = new FormData();
      formData.append("cover_image", selectedCoverImage);
      formData.append("hidden_image", selectedHiddenImage);
      setTextStatus(
        "processing image steganography (this may take a while) ... "
      );
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
        setTextStatus("send the image to server...");
        // Set the image URL to the state variable
        setEncodedImage(temporaryImageUrl);
        setIsloading(false);
        setisfinished(true);
      }
      console.log(imageBlob);
      console.log(imageUrl);
      resizedImage = resizeImage(temporaryImageUrl,test,300,300)
     
      alert("Images processed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing images.");
    }
  };
  const handleSaveImage = () => {
    const a = document.createElement("a");
    a.href = encodedImage!;
    a.download = "stego-image.png";
    a.click();
  };
  // function resize(param) {
  //   const imgEl = document.createElement(param);
  //   imgEl.addEventListener('load', () => {
  //     const resizedDataUri = resizeImage(imgEl, 300);
  //     document.querySelector('#img-preview')!.src = resizedDataUri;
  //     settest(resizedDataUri);
  //   });
  // }
  

  // function resizeImage(imgEl, wantedWidth) {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');

  //   const aspect = imgEl.width / imgEl.height;

  //   canvas.width = wantedWidth;
  //   canvas.height = wantedWidth / aspect;

  //   ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  //   return canvas.toDataURL();
  // }

  return (
    <div className=" h-screen w-full ">

      <div className="flex h-[10%] bg-encodeTheme items-center drop-shadow-xl">
        <div className="flex text-2xl ml-5">Encode </div>
      </div>
      <div className=" h-[90%]   flex-col lg:flex lg:flex-row bg-encodeThemedetail overflow-auto duration-250">
        <div className="w-[100%] h-[100%] flex flex-col lg:w-[40%]  items-center justify-center  py-5 duration-250">
          <div className="flex flex-col w-[80%] h-[95%] bg-encodeTheme rounded-2xl drop-shadow-2xl border-2 border-gray-400">
            <div className=" text-center text-xl my-5 ">Select your images</div>
            <div className="h-[50%]  flex flex-col items-center">
              <div className="flex flex-col h-[95%] w-[80%] items-center bg-white rounded-md  drop-shadow-lg">
                <div className=" text-center my-2 text-xl">Cover Image</div>
                <div className="w-[90%] h-[100%] m-3 flex flex-col ">
                  {selectedCoverImage && (
                    <div className="flex justify-center items-center w-full h-full my-auto">
                      <img
                        src={URL.createObjectURL(selectedCoverImage)}
                        alt="Selected Image"
                        className="max-w-[200px] max-h-[150px] border  border-red-400"
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
                <div className="w-[90%] h-[100%] m-3 flex flex-col  ">
                  {selectedHiddenImage && (
                    <div className=" flex w-full h-full justify-center">
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
        <div className="w-[100%] lg:w-[60%] h-[100%] flex justify-center items-center ">
          <div className="h-[80%] w-[80%] bg-encodeTheme rounded-xl drop-shadow-2xl border-2 border-gray-400 ">
            <div className=" text-center my-4 text-2xl">
              Click on the Encode button
            </div>

            <div className="flex h-[75%] justify-center">
              <div className="w-[85%] bg-slate-400">
                {isloading ? (
                  <div className=" w-full h-full flex flex-col items-center justify-center">
                    <Spinner />
                    <div>{textstatus}</div>
                  </div>
                ) : null}

                {encodedImage && (
                  <div className=" flex h-[100%] items-center justify-center">
                    <img
                      //src={encodedImage}
                      src={resizedImage}
                      alt="Encoded Image"
                      className=" object-scale-down max-w-[95%] max-h-[95%] border border-red-400   "
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
